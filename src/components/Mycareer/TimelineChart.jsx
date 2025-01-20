import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

import distributeTimelinePositions from '../../utils/distributeTimelinePositions';
import getColorByCategory from '../../utils/getColorByCategory';
import { useFetchTimeline } from '../../hooks/Timeline/useFetchTimeline';

const TimelineChart = () => {
	const { data: rawData, isLoading, error } = useFetchTimeline();
	const navigate = useNavigate();

	// useState는 항상 컴포넌트의 최상단에서 호출
	const [options] = React.useState({
		chart: {
			height: 350,
			type: 'rangeBar',
			offsetX: 0,
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
						navigate(`/mycareer/${data.category.categoryKoName}/${data.careerId}`);
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

	if (isLoading) return <div>Loading...</div>;

	if (error) {
		console.error('Error fetching timeline data:', error);
		return <div>Error loading timeline data.</div>;
	}

	const formattedData = rawData.map((item) => ({
		careerId: item.careerId,
		category: item.category,
		y: [new Date(item.startdate).getTime(), new Date(item.enddate).getTime()],
		name: item.title,
		fillColor: getColorByCategory(item.category.categoryKoName) || '#707070',
	}));

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
