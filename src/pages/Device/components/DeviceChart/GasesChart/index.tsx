import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js";
import { DeviceChart } from "../index.tsx";
import { TimePeriod } from "../../../../../utils/enums";
import { CHART_COLORS, CHART_GRID_COLORS, CHART_LABELS, CHART_SCALES } from "../../../../../utils/constants";

type TProps = {
  data?: any;
  title: string;
  aggregateData: {
    min: string;
    mid: string;
    max: string;
  };
  subtitle?: string,
  values?: any;
  period: TimePeriod;
}

export const GasesChart: FC<TProps> = ({ title, aggregateData, subtitle, values, period }) => {
  const getData = () => {
    const baseValue = 150;
    const generateMonthData = () => {
      return Array.from({ length: 31 }, (_, i) => {
        const mainCycle = Math.sin((i / 30) * Math.PI * 2);
        const secondaryCycle = Math.sin((i / 15) * Math.PI * 2);
        
        const dayOfWeek = i % 7;
        const weekendEffect = (dayOfWeek === 5 || dayOfWeek === 6) ? -0.2 : 0;
        
        const combined = (mainCycle * 0.3) + (secondaryCycle * 0.2) + weekendEffect;
        
        const value = baseValue * (1 + combined + (Math.random() * 0.1 - 0.05));
        
        return Math.round(Math.max(50, value));
      });
    };

    const baseData = values || [160, 140, 90, 48, 50, 175, 70];
    switch (period) {
      case TimePeriod.DAY:
        return baseData.map((val: number) => val + Math.random() * 30 - 15);
      case TimePeriod.WEEK:
        return baseData;
      case TimePeriod.MONTH:
        return generateMonthData();
      case TimePeriod.YEAR:
        return Array.from({length: 12}, () => Math.random() * 300 + 30);
      default:
        return baseData;
    }
  };

  const defaultData: ChartData<"bar"> = {
    labels: CHART_LABELS[period],
    datasets: [{
      label: `${title}${subtitle}`,
      data: getData(),
      ...(period === TimePeriod.MONTH ? CHART_COLORS.monthBar : CHART_COLORS.bar)
    }]
  };

  const options: ChartOptions<'bar'> = {
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
          maxRotation: 0,
          minRotation: 0,
          autoSkip: period === TimePeriod.MONTH,
          autoSkipPadding: period === TimePeriod.MONTH ? 10 : 15,
          callback: function(_, index) {
            // For month view, only show every 5th day
            if (period === TimePeriod.MONTH) {
              return index % 5 === 0 ? CHART_LABELS[period][index] : '';
            }
            return CHART_LABELS[period][index];
          }
        },
      },
    }
  };

  return <DeviceChart title={title} subtitle={subtitle} data={defaultData} options={options}
                      aggregateData={aggregateData} type={"bar"}/>;
};