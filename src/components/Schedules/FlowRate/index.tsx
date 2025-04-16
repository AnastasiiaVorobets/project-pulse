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

export const FlowRateSchedule: FC<TProps> = ({ currentValue }) => {
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
            return `${tooltipItems[0].formattedValue}%`
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
        max: 110,
        ticks: {
          color: "#878C96",
          font: {
            size: 12,
          },
          callback: (value: number) => {
            return value % 20 === 0 ? `${value}%` : '';
          },
        },
        grid: {
          color: (context: ScriptableContext<'linear'>) => {
            const index = Number(context.tick.value);
            return index % 20 === 0 ? '#E5EFFF' : 'rgba(117,206,196,0)';
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
          color: (context: ScriptableContext<'linear'>) => {
            const index = Number(context.tick.label);
            return index % 4 === 0 ? '#E5EFFF' : 'rgba(117,206,196,0)';
          }
        }
      }
    }
  }

  const data = {
    labels: ['00', '04', '08', '12', '16', '20'],
    datasets: [
      {
        fill: true,
        data: [25, 50, 75, 60, 40, 85],
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
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
    <div className='schedule-block'>
      <div className='schedule-block__header'>
        <div className='schedule-block__heading'>
          <p>Flow Rate</p>
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