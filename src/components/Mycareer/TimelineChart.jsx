import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

import distributeTimelinePositions from '../../utils/distributeTimelinePositions';
import getColorByCategory from '../../utils/getColorByCategory';
import { useFetchTimeline } from '../../hooks/Timeline/useFetchTimeline';

const TimelineChart = () => {
	const { data: rawData, isLoading, error } = useFetchTimeline();
	const navigate = useNavigate();

	const [options] = useState({
		chart: {
			height: 350,
			type: 'rangeBar',
			offsetX: -50,
			background: 'transparent',
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
			events: {
				click: (event, chartContext, config) => {
					const dataPointIndex = config.dataPointIndex;
					const seriesIndex = config.seriesIndex;
					if (dataPointIndex === -1 || seriesIndex === -1) return;

					const data = chartContext.w.config.series[seriesIndex].data[dataPointIndex];
					if (data && data.careerId) {
						navigate(`/mycareer/${data.category.categoryKoName}/${data.careerId}`, {
							state: { careerId: data.careerId, category: data.category.categoryKoName },
						});
					} else {
						console.error('Invalid data or careerId not found');
					}
				},
			},
		},
		plotOptions: {
			bar: {
				horizontal: true,
				distributed: false,
				rangeBarOverlap: false,
				barHeight: '16.5px',
				borderRadius: 8,
			},
		},
		dataLabels: {
			enabled: true,
			formatter: (val, opts) => opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].name,
			style: {
				colors: ['#fff'],
			},
		},
		tooltip: {
			custom: ({ seriesIndex, dataPointIndex, w }) => {
				const data = w.config.series[seriesIndex].data[dataPointIndex];
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
				formatter: (val) => moment(val).format('YYYY.MM'),
			},
			axisBorder: { show: false },
			axisTicks: { show: false },
		},
		yaxis: {
			show: false,
		},
		grid: {
			show: false,
		},
	});

	if (isLoading) return <div>타임라인을 불러오는 중이에요...</div>;

	if (error) {
		console.error('Error fetching timeline data:', error);
		return <div>타임라인을 불러오는 도중에 오류가 발생했어요...!</div>;
	}

	let formattedData = rawData?.data.map((item) => ({
		careerId: item.careerId,
		category: item.category,
		y: [new Date(item.startdate).getTime(), new Date(item.enddate).getTime()],
		name: item.title,
		fillColor: getColorByCategory(item.category.categoryKoName) || '#707070',
	}));

	// 만약 데이터가 없다면 현재로부터 6개월 전 x축 제공
	if (!formattedData || formattedData.length === 0) {
		const today = new Date();
		const sixMonthsAgo = new Date();
		sixMonthsAgo.setMonth(today.getMonth() - 6);

		formattedData = [
			{
				careerId: 0, // 가상의 ID
				category: { categoryKoName: '기본 데이터' },
				y: [sixMonthsAgo.getTime(), sixMonthsAgo.getTime()], // 6개월 전
				name: '6개월 전 기록',
				fillColor: '#909090',
			},
			{
				careerId: 1, // 가상의 ID
				category: { categoryKoName: '기본 데이터' },
				y: [today.getTime(), today.getTime()], // 오늘 날짜
				name: '오늘',
				fillColor: '#ff9900',
			},
		];
	}

	const distributedData = distributeTimelinePositions(formattedData);

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

	return <ReactApexChart options={options} series={series} type="rangeBar" height={150} />;
};

export default TimelineChart;
