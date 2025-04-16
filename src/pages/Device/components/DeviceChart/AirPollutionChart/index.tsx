import { FC } from "react";
import { ChartOptions } from "chart.js";
import { DeviceChart } from "../index.tsx";
import { TimePeriod } from "../../../../../utils/enums";
import { CHART_COLORS, CHART_GRID_COLORS, CHART_LABELS, CHART_SCALES } from "../../../../../utils/constants/index.tsx";

type TProps = {
  data?: any;
  period: TimePeriod;
}

export const AirPollutionChart: FC<TProps> = ({ data, period }) => {
  const aggregateData = {
    min: data?.min || "N/A",
    mid: data?.mid || "N/A",
    max: data?.max || "N/A",
  }

  const getData = () => {
    const baseValue = 200;
    const generateMonthData = () => {
      return Array.from({ length: 31 }, (_, i) => {
        const monthCycle = Math.sin((i / 30) * Math.PI) * 0.3;
        
        const dayOfWeek = i % 7;
        let weekdayEffect = 0;
        
        switch(dayOfWeek) {
          case 0: // Monday
            weekdayEffect = 0.3;
            break;
          case 1:
          case 2:
          case 3:
            weekdayEffect = 0.2;
            break;
          case 4:
            weekdayEffect = 0.25;
            break;
          case 5:
            weekdayEffect = -0.1;
            break;
          case 6:
            weekdayEffect = -0.2;
            break;
        }
        
        const monthPosition = Math.sin((i / 30) * Math.PI) * 0.1;
        
        const combined = monthCycle + weekdayEffect + monthPosition;
        
        const value = baseValue * (1 + combined + (Math.random() * 0.08 - 0.04));
        
        return Math.round(Math.max(100, value));
      });
    };

    const baseData = data?.values || [50, 75, 100, 120, 175, 100, 50];
    switch (period) {
      case TimePeriod.DAY:
        return baseData.map((val: number) => val + Math.random() * 20 - 10);
      case TimePeriod.WEEK:
        return baseData;
      case TimePeriod.MONTH:
        return generateMonthData();
      case TimePeriod.YEAR:
        return Array.from({length: 12}, () => Math.random() * 500 + 50);
      default:
        return baseData;
    }
  };

  const defaultData = {
    labels: CHART_LABELS[period],
    datasets: [{
      label: 'Air pollution',
      data: getData(),
      fill: { value: CHART_SCALES.airPollution.min },
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
        min: CHART_SCALES.airPollution.min,
        max: CHART_SCALES.airPollution.max,
        ticks: {
          stepSize: CHART_SCALES.airPollution.stepSize,
          color: "#6C7096",
        },
        grid: {
          color: (context) => {
            if (context.tick.value === 600) return CHART_GRID_COLORS.danger;
            if (context.tick.value === 500) return CHART_GRID_COLORS.warning;
            if (context.tick.value === 400) return CHART_GRID_COLORS.caution;
            if (context.tick.value === 300) return CHART_GRID_COLORS.caution;
            if (context.tick.value === 200) return CHART_GRID_COLORS.good;
            if (context.tick.value === 100) return CHART_GRID_COLORS.excellent;
            return CHART_GRID_COLORS.default;
          },
          lineWidth: 2,
        },
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

  return <DeviceChart title={"Air pollution"} data={defaultData} options={options} aggregateData={aggregateData}
                      colors={[CHART_GRID_COLORS.excellent, CHART_GRID_COLORS.excellent, CHART_GRID_COLORS.good]} />;
};
