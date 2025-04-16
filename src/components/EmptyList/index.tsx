import './index.scss';
import { FC } from "react";

type TProps = {
  image: string,
  title?: string,
}

export const EmptyList: FC<TProps> = ({ image, title }) => {

  return (
    <div className="empty-list">
      <div className='empty-list__wrapper'>
        <h5>{title}</h5>

        <img
          src={image}
          alt="house picture"
          className='empty-list__img'
        />
      </div>
    </div>
  )
}