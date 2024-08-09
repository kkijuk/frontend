import React from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import styled from 'styled-components';

const Window = styled.div`
  width: ${(props) => props.width};
  overflow-x: auto; /* Add horizontal scroll if needed */
`;

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    // Calculate the minimum and maximum dates from the data
    const allDates = props.data.flatMap(group =>
      group.flatMap(item => [new Date(item.startDate).getTime(), new Date(item.endDate).getTime()])
    );

    let minDate = Math.min(...allDates);
    let maxDate = Math.max(...allDates);

    // Adjust minDate to 1 month before and maxDate to 1 month after
    minDate = moment(minDate).subtract(1, 'months').valueOf();
    maxDate = moment(maxDate).add(1, 'months').valueOf();

    // Calculate the number of months between minDate and maxDate
    const monthsDiff = moment(maxDate).diff(moment(minDate), 'months') + 1;
    // Set the width of the chart (100px per month)
    const chartWidth = monthsDiff * 100;

    // 각 그룹별 시리즈 생성
    const series = props.data.map((group, i) => ({
      name: `그룹 ${i + 1}`,
      data: group.map(item => ({
        x: item.careerName,
        y: [new Date(item.startDate).getTime(), new Date(item.endDate).getTime()],
        fillColor: getBackgroundColor(item.category),
      })),
    }));

    this.state = {
      chartWidth,
      series,
      options: {
        chart: {
          type: 'rangeBar',
          height: 200,  // Each group will have its own height
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: false,
          },
          scrollbar: {
            enabled: true,
            autoHide: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            borderRadius: 10,
            barHeight: 22,
            dataLabels: {
              hideOverflowingLabels: false,
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.globals.labels[opts.dataPointIndex];
          },
          style: {
            colors: ['#f3f4f5', '#fff'],
          },
        },
        xaxis: {
          type: 'datetime',
          min: minDate,
          max: maxDate,
          tickAmount: monthsDiff,
          labels: {
            formatter: function (value) {
              return moment(value).format('YYYY.MM');
            },
          },
        },
        yaxis: {
          show: true,
        },
        grid: {
          row: {
            colors: ['#fff'],
            opacity: 1,
          },
        },
      },
    };
  }

  render() {
    return (
      <Window width={`${this.state.chartWidth}px`}>
        <div id="chart" style={{ width: `${this.state.chartWidth}px` }}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="rangeBar"
            height={200 * this.state.series.length}  // Adjust height based on the number of groups
            width={this.state.chartWidth}
          />
        </div>
      </Window>
    );
  }
}

export default ApexChart;

const getBackgroundColor = (category) => {
  let color;
  switch (category) {
    case '1':
      color = '#FCC400';
      break;
    case '2':
      color = '#77AFF2';
      break;
    case '3':
      color = '#BB7AEF';
      break;
    case '4':
      color = '#78D333';
      break;
    case '5':
      color = '#FA7C79';
      break;
    default:
      color = '#707070';
  }
  return color;
};
