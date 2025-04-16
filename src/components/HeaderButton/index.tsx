import { FC } from "react";
import './index.scss'

type AddButtonProps = {
  buttonText: string;
  onClick?: () => void;
}

export const HeaderButton:FC<AddButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button className="add-item-btn" onClick={onClick}>
      {buttonText}
    </button>
  );
};
