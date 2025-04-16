import './index.scss';
import { FC } from "react";
import { useAnimationTimeout } from "../../utils/hooks";

type TProps = {
  isVisible: boolean;
  isAbsolute?: boolean;
  message?: string
}

export const Loader: FC<TProps> = ({ isVisible, isAbsolute, message }) => {
  const { isVisible: isShow } = useAnimationTimeout({ isElementOpen: isVisible });

  if (!isShow) return null;

  return (
    <div
      className={`loader${isVisible ? ' loader--open' : ' loader--close'} ${isVisible ? ' loader--is-visible' : ''}${isAbsolute ? ' loader--is-absolute' : ''}`}>
      <div className="loader__spinner"/>
      {message && <p>{message}</p>}
    </div>
  );
};