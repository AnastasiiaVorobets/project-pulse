import { FC } from "react";
import { ChartOptions } from "chart.js";
import { DeviceChart } from "../index.tsx";
import { TimePeriod } from "../../../../../utils/enums";
import { CHART_COLORS, CHART_LABELS, CHART_SCALES } from "../../../../../utils/constants";

type TProps = {
  data?: any;
  period: TimePeriod;
}

export const HumidityChart: FC<TProps> = ({ data, period }) => {
  const aggregateData = {
    min: data?.min || "N/A",
    mid: data?.mid || "N/A",
    max: data?.max || "N/A",
  };

  const getData = () => {
    const baseData = data?.values || [35, 39, 43, 47, 39, 34, 30];
    switch (period) {
      case TimePeriod.DAY:
        return baseData.map((val: number) => val + Math.random() * 5 - 2.5);
      case TimePeriod.WEEK:
        return baseData;
      case TimePeriod.MONTH:
        return Array.from({length: 31}, () => Math.random() * 50 + 20);
      case TimePeriod.YEAR:
        return Array.from({length: 12}, () => Math.random() * 60 + 20);
      default:
        return baseData;
    }
  };

  const defaultData = {
    labels: CHART_LABELS[period],
    datasets: [{
      label: 'Humidity',
      data: getData(),
      fill: { value: CHART_SCALES.humidity.min },
      ...CHART_COLORS.primary,
      tension: 0,
      borderWidth: 2,
      pointRadius: 4,
    }]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      y: {
        position: "right",
        min: CHART_SCALES.humidity.min,
        max: CHART_SCALES.humidity.max,
        ticks: {
          callback: function (value) {
            return Math.round(Number(value)) % 50 === 0 ? CHART_SCALES.humidity.format(Number(value)) : '';
          },
          stepSize: CHART_SCALES.humidity.stepSize,
          color: "#6C7096",
        },
        grid: {
          color: '#C7C9D9',
        }
      },
      x: {
        border: {
          dash: [8, 5],
          display: true
        },
        grid: {
          color: '#C7C9D9',
          tickBorderDash: [5, 5]
        },
        ticks: {
          color: "#6C7096",
        }
      }
    }
  };

  return <DeviceChart title={"Humidity"} data={defaultData} options={options} aggregateData={aggregateData}/>;
};
