import "./index.scss";

import { FC, useState } from 'react';
import {
  Bar,
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler, ChartOptions
} from 'chart.js';
import { ExpandedChartModal } from './ExpandedChartModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TProps = {
  title: string;
  data: any;
  options: ChartOptions<"line" | "bar">;
  aggregateData: {
    min: string;
    mid: string;
    max: string;
  };
  colors?: string[]
  type?: "line" | "bar";
  subtitle?: string;
}

export const DeviceChart: FC<TProps> = ({ title, data, options, aggregateData, colors, type = "line", subtitle }) => {
  const [showExpanded, setShowExpanded] = useState(false);

  const handleChartClick = () => {
    setShowExpanded(true);
  };

  return (
    <>
      <div className="device-chart" onClick={handleChartClick}>
        <h3 className="device-chart__title">
          {title}
          {subtitle && <sub>{subtitle}</sub>}
        </h3>
        <div className="device-chart__values">
          <div>MIN <span style={colors ? { backgroundColor: colors[0] } : {}}>{aggregateData.min}</span></div>
          <div>MID <span style={colors ? { backgroundColor: colors[1] } : {}}>{aggregateData.mid}</span></div>
          <div>MAX <span style={colors ? { backgroundColor: colors[2] } : {}}>{aggregateData.max}</span></div>
        </div>
        <div className="device-chart__block">
          {type === "line"
            ? <Line data={data} options={options}/>
            : <Bar data={data} options={options}/>
          }
        </div>
      </div>

      {showExpanded && (
        <ExpandedChartModal
          title={title}
          data={data}
          options={options}
          type={type}
          onClose={() => setShowExpanded(false)}
          subtitle={subtitle}
        />
      )}
    </>
  );
};
