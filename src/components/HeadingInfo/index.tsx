import "./index.scss";
import { FC } from "react";

type TProps = {
  title: string;
  subtitle: string;
};

export const HeadingInfo: FC<TProps> = ({
                                          title,
                                          subtitle,

                                        }) => {
  return (
    <div className="page-heading">
      <p className="title">{title}</p>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};