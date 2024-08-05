import React from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import styled from 'styled-components';

const Window = styled.div`
  width: ${props => props.width};
  overflow-x: auto; /* Add horizontal scroll if needed */
`;

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    // Calculate the minimum and maximum dates from the data
    const dates = props.data.flatMap(item => [new Date(item.startDate).getTime(), new Date(item.endDate).getTime()]);
    let minDate = Math.min(...dates);
    let maxDate = Math.max(...dates);

    // Adjust minDate to 1 month before and maxDate to 1 month after
    minDate = moment(minDate).subtract(1, 'months').valueOf();
    maxDate = moment(maxDate).add(1, 'months').valueOf();

    // Calculate the number of months between minDate and maxDate
    const monthsDiff = moment(maxDate).diff(moment(minDate), 'months') + 1;
    // Set the width of the chart (100px per month)
    const chartWidth = monthsDiff * 100; // Now chartWidth is a number

    this.state = {
      chartWidth, // Add chartWidth to state
      series: [
        {
          data: props.data.map(item => ({
            x: item.careerName,
            y: [
              new Date(item.startDate).getTime(),
              new Date(item.endDate).getTime()
            ],
            fillColor: getBackgroundColor(item.category)
          }))
        }
      ],
      options: {
        chart: {
          height: 200,
          type: 'rangeBar',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          animations: {
            enabled: false
          },
          scrollbar: {
            enabled: true,
            autoHide: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            borderRadius: 10, // Rounded corners for bars
            barHeight: 22, // Bar height
            dataLabels: {
              hideOverflowingLabels: false,
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val, opts) {
            var label = opts.w.globals.labels[opts.dataPointIndex];
            
            return label;
          },
          style: {
            colors: ['#f3f4f5', '#fff']
          }
        },
        xaxis: {
          type: 'datetime',
          min: minDate, // Set the adjusted minimum date
          max: maxDate, // Set the adjusted maximum date
          tickAmount: monthsDiff, // 모든 달이 보이게 함
          labels: {
            formatter: function(value) {
              return moment(value).format('YYYY.MM');
            }
          }
        },
        yaxis: {
          show: false
        },
        grid: {
          row: {
            colors: ['#fff'],
            opacity: 1
          }
        }
      }
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
            height={200}
            width={this.state.chartWidth} // Set the calculated width
          />
        </div>
      </Window>
    );
  }
}

export default ApexChart;

// Helper function to get background color based on category
const getBackgroundColor = (category) => {
  let color;
  switch (category) {
    case '동아리':
      color = '#FCC400';
      break;
    case '대외활동':
      color = '#77AFF2';
      break;
    case '공모전/대회':
      color = '#BB7AEF';
      break;
    case '프로젝트':
      color = '#78D333';
      break;
    case '아르바이트/인턴':
      color = '#FA7C79';
      break;
    case '교육':
      color = '#F99538';
      break;
    case '기타 활동':
      color = '#707070';
      break;
    default:
      color = '#707070';
  }
  return color;
};
