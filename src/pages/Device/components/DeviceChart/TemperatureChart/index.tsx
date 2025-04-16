import { FC } from "react";
import { ChartOptions } from "chart.js";
import { DeviceChart } from "../index.tsx";
import { TimePeriod } from "../../../../../utils/enums";
import { CHART_COLORS, CHART_LABELS, CHART_SCALES } from "../../../../../utils/constants";

type TProps = {
  data?: any;
  period: TimePeriod;
}

export const TemperatureChart: FC<TProps> = ({ data, period }) => {
  const aggregateData = {
    min: data?.min || "N/A",
    mid: data?.mid || "N/A",
    max: data?.max || "N/A",
  };

  const getData = () => {
    const baseData = data?.values || [2.5, 5, 7.5, 10, 4.5, 2, 0];
    switch (period) {
      case TimePeriod.DAY:
        return baseData.map((val: number) => val + Math.random() * 2 - 1);
      case TimePeriod.WEEK:
        return baseData;
      case TimePeriod.MONTH:
        return Array.from({length: 31}, () => Math.random() * 20 - 5);
      case TimePeriod.YEAR:
        return Array.from({length: 12}, () => Math.random() * 30 - 5);
      default:
        return baseData;
    }
  };

  const defaultData = {
    labels: CHART_LABELS[period],
    datasets: [{
      label: 'Temperature',
      data: getData(),
      fill: { value: CHART_SCALES.temperature.min },
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
        min: CHART_SCALES.temperature.min,
        max: CHART_SCALES.temperature.max,
        ticks: {
          callback: function (value) {
            return Number(value) % 20 === 0 ? CHART_SCALES.temperature.format(Number(value)) : '';
          },
          stepSize: CHART_SCALES.temperature.stepSize,
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

  return <DeviceChart title={"Temperature"} data={defaultData} options={options} aggregateData={aggregateData}/>;
};
