import { FC } from "react";
import './index.scss';

type TProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const TabButton: FC<TProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
