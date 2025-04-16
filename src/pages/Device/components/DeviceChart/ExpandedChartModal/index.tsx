import { FC } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './index.scss';

type TProps = {
  title: string;
  data: ChartData<'line'> | ChartData<'bar'>;
  options: ChartOptions<'line'> | ChartOptions<'bar'>;
  type: 'line' | 'bar';
  onClose: () => void;
  subtitle?: string;
}

export const ExpandedChartModal: FC<TProps> = ({ title, data, options, type, onClose, subtitle }) => {
  return (
    <div className="expanded-chart-modal">
      <div className="expanded-chart-modal__overlay" onClick={onClose} />
      <div className="expanded-chart-modal__content">
        <div className="expanded-chart-modal__header">
          <h3 className="expanded-chart-modal__title">
            {title}
            {subtitle && <sub>{subtitle}</sub>}
          </h3>
          <button className="expanded-chart-modal__close" onClick={onClose}>×</button>
        </div>
        <div className="expanded-chart-modal__chart">
          {type === 'line' 
            ? <Line data={data as ChartData<'line'>} options={options as ChartOptions<'line'>} />
            : <Bar data={data as ChartData<'bar'>} options={options as ChartOptions<'bar'>} />
          }
        </div>
      </div>
    </div>
  );
}; 