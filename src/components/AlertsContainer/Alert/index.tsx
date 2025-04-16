import { FC, MouseEvent, useEffect, useState } from "react";
import "./index.scss";
import { useAnimationTimeout } from "../../../utils/hooks";

type TProps = {
  type: string;
  message: string;
}

export const Alert:FC<TProps> = ({ type, message }) => {
  const [isShow, setIsShow] = useState(true);
  const { isVisible } = useAnimationTimeout({ isElementOpen: isShow });

  const handleClose = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShow(false);
  };

  useEffect(() => {
    if (isShow) {
      const timer = setTimeout(() => {
        setIsShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isShow]);

  return (
    isVisible && (
      <div className={`alert ${type} ${isShow ? ' alert--open' : ' alert--close'}`}>
      <span className="alert__closebtn" onClick={handleClose}>
        &times;
      </span>
        {message}
      </div>
    )
  );
};
