import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

import distributeTimelinePositions from '../../utils/distributeTimelinePositions';
import getColorByCategory from '../../utils/getColorByCategory';

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

	const formattedData = rawData.map((item, idx) => ({
		careerId: item.careerId,
		category: item.category,
		y: [new Date(item.startdate).getTime(), new Date(item.enddate).getTime()],
		name: item.title,
		fillColor: getColorByCategory(item.category.categoryKoName) || '#707070', // 기본 색상은 검정색
	}));

	const distributedData = distributeTimelinePositions(formattedData);

	// TODO: 임의로 네칸에 배치하는 로직 짰는데 컨펌이 필요할 듯
	// 기간이 짧아서 Bar 짧을 떄, 텍스트 어떻게 처리할지

	const series = [
		{
			data: distributedData.map((item) => ({
				careerId: item.careerId,
				category: item.category,
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
			navigate(`/mycareer/${data.category.categoryKoName}/${data.careerId}`);
		} else {
			console.error('Invalid data or careerId not found');
		}
	};

	const [options] = useState({
		chart: {
			height: 350,
			type: 'rangeBar',
			offsetX: 0,
			background: 'transparent',
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
				barHeight: '16.5px',
				borderRadius: 8,
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
				offsetX: 25,
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
		},
	});

	return <ReactApexChart options={options} series={series} type="rangeBar" height={150} />;
};

export default TimelineChart;
