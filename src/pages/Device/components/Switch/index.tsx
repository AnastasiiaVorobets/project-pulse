import "./index.scss";
import { FC } from "react";

type TProps = {
  isActive: boolean;
  onClick: () => void;
}

export const BlueSwitch: FC<TProps> = ({ isActive, onClick }) => {

  return (
    <div className={`blue-switch ${isActive ? 'on' : 'off'}`} onClick={onClick}>
      <div className="slider"/>
    </div>
  )
}