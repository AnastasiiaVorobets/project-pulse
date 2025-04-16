//@ts-nocheck
import "../index.scss";
import "./index.scss";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext,
} from "chart.js";

type TProps = {
  currentValue: string,
  height?: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

export const PHLevelSchedule: FC<TProps> = ({ currentValue, height }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        caretPadding: 20,
        backgroundColor: '#fff',
        bodyColor: '#000213',
        padding: {
          top: 14,
          bottom: 8,
          left: 19,
          right: 19
        },
        titleColor: '#000213',
        borderColor: '#E5EFFF',
        borderWidth: 1,
        callbacks: {
          /**
           * Callback function to format tooltip label.
           * @param {object} tooltipItems - Tooltip items.
           * @returns {string} Formatted tooltip label.
           */
          title(tooltipItems: any) {
            return `${tooltipItems[0].formattedValue}`
          },
          label(tooltipItems: any) {
            return '';
          }
        }
      },
    },
    scales: {
      y: {
        position: "left",
        max: 14,
        ticks: {
          color: "#878C96",
          font: {
            size: 12,
          },
          stepSize: 1,
          callback: (value: number) => {
            return `${value}`;
          },
        },
        grid: {
          color: (context: ScriptableContext<'linear'>) => {
            const index = context.tick.value;
            return getColor(index.toString());
          }
        }
      },
      x: {
        ticks: {
          color: "#878C96",
          font: {
            size: 10
          },
        },
        grid: {
          color: '#dee4e4'
        }
      }
    }
  }

  const getColor = (label: string) => {
    switch (label) {
      case '0':
        return '#D9302F';
      case '1':
        return '#E16634';
      case '2':
        return '#F9E04B';
      case '3':
        return '#F6F549';
      case '4':
        return '#CFF05B';
      case '5':
        return '#A5DE60';
      case '6':
        return '#81D76A';
      case '7':
        return '#67BB64';
      case '8':
        return '#6CD484';
      case '9':
        return '#63D3C1';
      case '10':
        return '#669ECE';
      case '11':
        return '#3A4479';
      case '12':
        return '#4D4677';
      case '13':
        return '#4F3B71';
      case '14':
        return '#3A245F';
      default:
        return '#dee4e4';
    }
  }

  const data = {
    labels: ['00', '04', '08', '12', '16', '20'],
    datasets: [
      {
        fill: true,
        data: [1, 2, 10, 6, 4, 8],
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            height ? 650 : 400
          );
          gradient.addColorStop(0, 'rgba(65, 134, 245, 0.6)');
          gradient.addColorStop(1, 'rgba(65, 134, 245, 0)');
          return gradient;
        },
        pointBackgroundColor: 'rgba(117,206,196,0)',
        pointBorderColor: 'rgba(117,206,196,0)',
        lineTension: 0,
        borderColor: "#4186F5",
        pointHoverBackgroundColor: '#4186F5',
        pointHoverBorderColor: '#FFFFFF',
        pointHoverBorderWidth: 2,
        pointHoverRadius: 10,
      }
    ],
  }

  return (
    <div className='schedule-block ph-level__schedule-block'
         style={height ? { height } : { height: 'unset' }}
    >
      <div className='schedule-block__header'>
        <div className='schedule-block__heading'>
          <p>pH level</p>
          <p>Current</p>
        </div>
        <p>{currentValue}</p>
      </div>
      <div className='schedule-block__chart ph-level__chart'
           style={height ? { height } : { height: '433px' }}
      >
        <div className='ph-level__labels'>
          <p>Alkaline
            <span style={height ? { height: '319px' } : {height: '196px' }}/>
          </p>
          <p>Neutral
            <span style={height ? { bottom: '29px' } : { bottom: '18px'}}/>
          </p>
          <p>Acidic
            <span style={height ? { height: '279px', bottom: '-189px'} : {height: '181px', bottom: '-84px'}}/>
          </p>
        </div>
        <div className='ph-level__chart-wrap'>
          <Line options={options} data={data}/>
        </div>
      </div>
    </div>
  )
}