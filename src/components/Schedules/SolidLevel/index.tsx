//@ts-nocheck
import "../index.scss";
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
import { SolidLevels } from "../../../utils/constants";

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

export const SolidLevelSchedule: FC<TProps> = ({ currentValue }) => {
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
        max: 11,
        ticks: {
          color: "#878C96",
          reverse: true,
          font: {
            size: 12,
          },
          callback: (value: number) => {
            switch (value) {
              case 1:
                return `${SolidLevels[1]} level`;
              case 3:
                return `${SolidLevels[2]} level`;
              case 5:
                return `${SolidLevels[3]} level`;
              case 7:
                return `${SolidLevels[4]} level`;
              case 9:
                return `${SolidLevels[5]} level`;
              case 11:
                return `${SolidLevels[6]} level`;
              default:
                return '';
            }
          },
        },
        grid: {
          color: (context: ScriptableContext<'linear'>) => {
            const index = context.tick.value;
            switch (index) {
              case 1:
                return `#E5EFFF`;
              case 3:
                return `#E5EFFF`;
              case 5:
                return `#E5EFFF`;
              case 7:
                return `#E5EFFF`;
              case 9:
                return `#E5EFFF`;
              case 11:
                return `#E5EFFF`;
              default:
                return 'rgba(117,206,196,0)';
            }
          }
        }
      }
    }
  }

  const data = {
    labels: [ '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',],
    datasets: [{
      data: [
        [0, "1"],
        [4, "1"],
        [4, "3"],
        [8, "3"],
        [8, "1"],
        [12, "1"],
        [12, "5"],
        [16, "5"],
        [16, "1"],
        [20, "1"],
        [20, "11"],
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
          <p>Solids level</p>
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