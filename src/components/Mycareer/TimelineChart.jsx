import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import moment, { min } from 'moment';

import distributeTimelinePositions from '../../utils/distributeTimelinePositions';
import getColorByCategory from '../../utils/getColorByCategory';
import { useFetchTimeline } from '../../hooks/Timeline/useFetchTimeline';

const TimelineChart = () => {
	const { data: rawData, isLoading, error } = useFetchTimeline();

	const navigate = useNavigate();

	const formattedData = useMemo(
		() =>
			rawData?.data?.map((item) => ({
				careerId: item.careerId,
				category: item.category,
				y: [new Date(item.startdate).getTime(), new Date(item.enddate).getTime()],
				name: item.title,
				fillColor: getColorByCategory(item.category.categoryKoName) || '#707070',
			})) || [],
		[rawData], // ✅ rawData가 변경될 때만 계산
	);

	const { minDate, maxDate } = useMemo(() => {
		if (formattedData.length > 0) {
			return {
				minDate: Math.min(...formattedData.map((item) => item.y[0])),
				maxDate: Math.max(...formattedData.map((item) => item.y[1])),
			};
		} else {
			// 데이터가 없을 경우, 기본적으로 6개월 전부터 현재까지
			const today = new Date().getTime();
			const sixMonthsAgo = new Date();
			sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

			return { minDate: sixMonthsAgo.getTime(), maxDate: today };
		}
	}, [JSON.stringify(formattedData)]); // ✅ JSON.stringify로 비교하여 불필요한 리렌더링 방지

	const options = useMemo(
		() => ({
			chart: {
				height: 350,
				width: '100%',
				type: 'rangeBar',
				offsetX: -40,
				background: 'transparent',
				zoom: { enabled: false },
				toolbar: { show: false },
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
					barHeight: '18px',
					borderRadius: 10,
				},
			},
			dataLabels: {
				enabled: true,
				formatter: (val, opts) => opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].name,
				style: { colors: ['#fff'] },
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
				tickAmount: 6,
				min: minDate, // ✅ minDate를 반영
				max: maxDate, // ✅ maxDate를 반영
				labels: {
					offsetX: 20,
					formatter: (val) => moment(val).format('YYYY.MM'),
				},
				axisBorder: { show: false },
				axisTicks: { show: false },
			},
			yaxis: { show: false },
			grid: { show: false },
		}),
		[minDate, maxDate], // ✅ minDate, maxDate가 바뀔 때만 재생성
	);

	if (isLoading) return <div>타임라인을 불러오는 중이에요...</div>;

	if (error) {
		console.error('Error fetching timeline data:', error);
		return <div>타임라인을 불러오는 도중에 오류가 발생했어요...!</div>;
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
