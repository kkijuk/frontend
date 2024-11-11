import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

const distributePositions = (data) => {
	const positions = Array(4)
		.fill(null)
		.map(() => []); // 최대 4개의 빈 칸을 초기화
	let positionCount = Math.min(data.length, 4); // 데이터 개수가 4개 이하일 경우 해당 개수만큼만 초기화

	const sortedData = data.sort((a, b) => a.y[0] - b.y[0]); // 날짜 순서로 정렬

	const updatedData = sortedData.map((item, index) => {
		// 초기 4칸을 채우는 경우
		if (index < 4) {
			positions[index].push(item); // 초기 4칸을 날짜 순서로 우선 채움
			return { ...item, x: `${index}` }; // x 값을 문자열로 할당
		}
		// 이후 항목은 겹치지 않는 칸에 배치
		for (let i = 0; i < positionCount; i++) {
			const isNonOverlapping = positions[i].every((existingItem) => {
				return item.y[1] <= existingItem.y[0] || item.y[0] >= existingItem.y[1];
			});

			if (isNonOverlapping) {
				positions[i].push(item); // 겹치지 않으면 해당 칸에 추가
				return { ...item, x: `${i}` }; // x 값을 문자열로 할당
			}
		}
		// 겹치지 않는 칸이 없으면 빈칸에 배치
		for (let i = 0; i < 4; i++) {
			if (positions[i].length === 0) {
				positions[i].push(item);
				return { ...item, x: `${i}` }; // x 값을 문자열로 할당
			}
		}
		// 예외 상황에서 첫 번째 칸에 기본 배치
		return { ...item, x: '0' };
	});

	return updatedData;
};

const TimelineChart = () => {
	const [rawData] = useState([
		{
			y: [new Date('2023-12-01').getTime(), new Date('2024-01-15').getTime()],
			name: '학원 아르바이트',
			fillColor: '#FA7C79',
		},
		{
			y: [new Date('2024-01-05').getTime(), new Date('2024-03-01').getTime()],
			name: 'UXUI 소학회',
			fillColor: '#FCC400',
		},
		{
			y: [new Date('2024-02-18').getTime(), new Date('2024-07-20').getTime()],
			name: 'IT 서비스 개발 동아리',
			fillColor: '#C48DEF',
		},
		{
			y: [new Date('2024-03-01').getTime(), new Date('2024-04-15').getTime()],
			name: '빅데이터',
			fillColor: '#C48DEF',
		},
	]);
	const distributedData = distributePositions(rawData);

	console.log(distributedData);
	// TODO: 임의로 네칸에 배치하는 로직 짰는데 컨펌이 필요할 듯
	// 기간이 짧아서 Bar 짧을 떄, 텍스트 어떻게 처리할지

	const series = [
		{
			data: distributedData.map((item) => ({
				x: item.x,
				y: item.y,
				name: item.name,
				fillColor: item.fillColor,
			})),
		},
	];

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
