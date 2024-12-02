import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const distributePositions = (data) => {
	const positions = Array(4)
		.fill(null)
		.map(() => []); // 최대 4개의 빈 칸을 초기화
	let positionCount = Math.min(data.length, 4); // 데이터 개수가 4개 이하일 경우 해당 개수만큼만 초기화

	const sortedData = data.sort((a, b) => {
		// 1. 시작일이 빠른 순
		const startDiff = a.y[0] - b.y[0];
		if (startDiff !== 0) return startDiff;

		// 2. 기간이 긴 순
		const aDuration = a.y[1] - a.y[0];
		const bDuration = b.y[1] - b.y[0];
		return bDuration - aDuration;
	});

	const updatedData = sortedData.map((item) => {
		// 각 행에 대해 가장 적합한 위치 찾기
		let bestRow = 0;
		let minOverlap = Infinity;

		for (let i = 0; i < 4; i++) {
			const overlappingItems = positions[i].filter(
				(existingItem) => !(item.y[1] <= existingItem.y[0] || item.y[0] >= existingItem.y[1]),
			).length;

			if (overlappingItems < minOverlap) {
				minOverlap = overlappingItems;
				bestRow = i;
			}
		}

		positions[bestRow].push(item);
		return { ...item, x: `${bestRow}` };
	});

	return updatedData;
};

const TimelineChart = () => {
	const [rawData, setRawData] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${process.env.REACT_APP_API_URL}/career/timeline`, {
					method: 'GET',
					credentials: 'include', // 쿠키와 인증 정보를 함께 보냄
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
					},
				});
				const data = await res.json();
				console.log(data);
				setRawData(data.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	const categoryColors = {
		Circle: '#FCC400', // 예시 색상
		Project: '#78D333',
		EduCareer: '#F99538',
		Activity: '#77AFF2',
		Competition: '#BB7AEF',
		// 필요한 경우 다른 카테고리 추가
	};

	const formattedData = rawData.map((item, idx) => ({
		careerId: item.careerId,
		y: [new Date(item.startdate).getTime(), new Date(item.enddate).getTime()],
		name: item.title,
		fillColor: categoryColors[item.category] || '#707070', // 기본 색상은 검정색
	}));

	const distributedData = distributePositions(formattedData);

	// TODO: 임의로 네칸에 배치하는 로직 짰는데 컨펌이 필요할 듯
	// 기간이 짧아서 Bar 짧을 떄, 텍스트 어떻게 처리할지

	const series = [
		{
			data: distributedData.map((item) => ({
				careerId: item.careerId,
				x: item.x,
				y: item.y,
				name: item.name,
				fillColor: item.fillColor,
			})),
		},
	];

	const handleChartClick = (event, chartContext, config) => {
		const dataPointIndex = config.dataPointIndex;
		const seriesIndex = config.seriesIndex;
		console.log(dataPointIndex, seriesIndex);
		if (dataPointIndex == -1 || seriesIndex == -1) return;
		const data = chartContext.w.config.series[seriesIndex].data[dataPointIndex];

		if (data && data.careerId) {
			navigate(`/mycareer/${data.careerId}`);
		} else {
			console.error('Invalid data or careerId not found');
		}
	};

	const [options] = useState({
		chart: {
			height: 350,
			type: 'rangeBar',
			background: '#fff',
			zoom: {
				enabled: false, // 줌 기능 비활성화
			},
			toolbar: {
				show: false,
			},
			events: {
				click: handleChartClick,
			},
		},
		plotOptions: {
			bar: {
				horizontal: true,
				distributed: false,
				rangeBarOverlap: false,
				dataLabels: {
					hideOverflowingLabels: false,
				},
				barHeight: '18px',
				borderRadius: 10,
				offsetX: 0,
				states: {
					hover: {
						filter: {
							type: 'none',
						},
					},
					active: {
						allowMultipleDataPointsSelection: false,
						filter: {
							type: 'none',
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: function (val, opts) {
				return opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].name;
			},
			style: {
				colors: ['#fff'],
			},
		},
		tooltip: {
			custom: function ({ seriesIndex, dataPointIndex, w }) {
				const data = w.config.series[0].data[dataPointIndex];
				const name = data.name;
				const startDate = moment(data.y[0]).format('YYYY.MM.DD');
				const endDate = moment(data.y[1]).format('YYYY.MM.DD');
				return `
					<div style="
						background: #333;
						color: #fff;
						padding: 10px;
						border-radius: 8px;
						font-size: 14px;
						text-align: center;
						box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
					">
						<div>${name}</div>
						<div style="font-size: 12px; margin-top: 4px;">${startDate} ~ ${endDate}</div>
					</div>`;
			},
		},
		xaxis: {
			type: 'datetime',
			labels: {
				offsetX: 70,
				formatter: function (val) {
					return moment(val).format('YYYY.MM'); // 년월 포맷
				},
			},
			axisBorder: {
				show: false, // x축 경계 숨김
			},
			axisTicks: {
				show: false, // x축 눈금 숨김
			},
		},
		yaxis: {
			show: false,

			labels: {
				show: false,
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
		},
		grid: {
			show: false, // 전체 그리드를 숨기려면 이 옵션 사용
			borderColor: 'transparent', // y축 선을 투명하게 설정
			row: {
				opacity: 1,
			},
			yaxis: {
				lines: {
					show: false, // y축 라인 숨김
				},
			},
			xaxis: {
				lines: {
					show: false, // 중앙에 선이 보이도록 설정
				},
			},
		},
	});

	return <ReactApexChart options={options} series={series} type="rangeBar" height={150} />;
};

export default TimelineChart;
