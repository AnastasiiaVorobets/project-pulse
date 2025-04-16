import "./index.scss";
import { ConnectionTypes } from "../../../utils/constants";
import { TDevice } from "../../../types";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AdminPaths, EAdminRoutes } from "../../../routes/Routes";

type TProps = {
  device: TDevice;
  setCenter: (center: [number, number]) => void;
}

export const DeviceItem: FC<TProps> = ({ device, }) => {
  const navigate = useNavigate();

  const handleGoToDevice = () => {
    navigate(AdminPaths[EAdminRoutes.DEVICE].replace(':id', device.id));
  };

  return (
    <li className="devices-list__item device-item" onClick={handleGoToDevice}>
      <div className="device-item__text-block">
        <p className="device-item__name">{device.deviceId}</p>
        <p className="device-item__address">{device.fw_version}</p>
      </div>
      <div className="device-item__status-block conn">
        <div className="conn__ico">
          {device.status === "Connected" ? ConnectionTypes[1].ico : ConnectionTypes[5].ico}
        </div>
        <div className={`conn__status ${device.status}`}>
          {device.status}
        </div>
      </div>
    </li>
  );
};