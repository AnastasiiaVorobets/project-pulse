//@ts-nocheck
import "../index.scss";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip,
} from "chart.js";

type TProps = {
  currentValue: string
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

export const MixersSchedule: FC<TProps> = ({ currentValue }) => {
  const options = {
    animation: {
      duration: 0
    },
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
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
      x: {
        position: 'left',
        beginAtZero: true,
        max: 20,
        ticks: {
          color: "#878C96",
          font: {
            size: 12,
          },
          callback: (value: number) => {
            switch (value) {
              case 0:
                return '00'
              case 4:
                return '04'
              case 8:
                return '08'
              case 12:
                return '12'
              case 16:
                return '16'
              case 20:
                return '20'
              default:
                return '';
            }
          },
        },
        grid: {
          color: (context: ScriptableContext<'linear'>) => {
            const index = context.tick.value;
            return index % 4 === 0 ? '#E5EFFF' : 'rgba(117,206,196,0)';
          }
        }
      },
      y: {
        position: "bottom",
        max: 12,
        ticks: {
          color: "#878C96",
          reverse: true,
          font: {
            size: 12,
          },
          callback: (value: number) => {
            switch (value) {
              case 1:
                return `On`;
              case 11:
                return `Off`;
              default:
                return '';
            }
          },
        },
        grid: {
          color: (context: ScriptableContext<'linear'>) => {
            const index = context.tick.value;
            return index === 1 ? '#E5EFFF' : 'rgba(117,206,196,0)';
          }
        }
      }
    }
  }

  const data = {
    labels: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    datasets: [{
      data: [
        [0, "1"],
        [1, "1"],
        [1, "11"],
        [2, "11"],
        [2, "1"],
        [4, "1"],
        [4, "11"],
        [7, "11"],
        [7, "1"],
        [10, "1"],
        [10, "11"],
        [14, "11"],
        [14, "1"],
        [16, "1"],
        [16, "11"],
        [17, "11"],
        [17, "1"],
        [18, "1"],
        [18, "11"],
        [19, "11"],
        [19, "1"],
        [20, "1"],
        [20, "0"],
      ],
      backgroundColor: (context: ScriptableContext<'line'>) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 255);
        gradient.addColorStop(0, 'rgba(65, 134, 245, 0.6)');
        gradient.addColorStop(1, 'rgba(65, 134, 245, 0)');
        return gradient;
      },
      fill: true,
      pointBackgroundColor: 'rgba(117,206,196,0)',
      pointBorderColor: 'rgba(117,206,196,0)',
      lineTension: 0,
      borderColor: "#4186F5",
      pointHoverBackgroundColor: '#4186F5',
      pointHoverBorderColor: '#FFFFFF',
      pointHoverBorderWidth: 2,
      pointHoverRadius: 10,
    }]
  }

  return (
    <div className='schedule-block'>
      <div className='schedule-block__header'>
        <div className='schedule-block__heading'>
          <p>Mixers</p>
          <p>Current</p>
        </div>
        <p>{currentValue}</p>
      </div>
      <div className='schedule-block__chart'>
        <Line options={options} data={data}/>
      </div>
    </div>
  )
}