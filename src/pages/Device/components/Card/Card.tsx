import "./index.scss";
import { FC, ReactNode } from "react";
import { ConnectionTypes } from "../../../../utils/constants";

type TProps = {
  label: string,
  value?: string,
  connection?: number
  switchToggle?: ReactNode;
  workingTime?: string;
  status?: string;
}

export const Card: FC<TProps> = ({ label, value, connection, switchToggle, workingTime, status}) => {
  return (
    <div className='card'>
      <div className='card__info'>
        <p>{label}</p>
        <p>{connection ? ConnectionTypes[Number(connection)].name : value}</p>
      </div>
      {connection && ConnectionTypes[Number(connection)].ico}

      {switchToggle &&
        <div className="top-left">
          {switchToggle}
        </div>
      }

      {status &&
        <div className="top-left">
          <div className="conn__ico">
            {status === "Connected" ? ConnectionTypes[1].ico : ConnectionTypes[5].ico}
          </div>
        </div>
      }

      {workingTime && <div className="blue">{workingTime}</div>}
    </div>
  )
}