import "./index.scss";
import { FC } from "react";

type TProps = {
  title: string;
};

export const PageHeading: FC<TProps> = ({ title, }) => {
  return (
    <div className="page-heading">
      <p className="page-heading-title">{title}</p>
    </div>
  );
};