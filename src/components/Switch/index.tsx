import { FC } from 'react';
import './index.scss';

type TProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Switch: FC<TProps> = ({ checked, onChange }) => {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle__track" />
    </label>
  );
};
