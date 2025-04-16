import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TDevice } from "../../../../../types";
import { AdminPaths, EAdminRoutes } from "../../../../../routes/Routes";
import { DevicePlaceholder, MenuIcon, TurnOffIcon, RemoveIcon } from "../../../../../utils/constants/images";
import { ConnectionTypes } from "../../../../../utils/constants";
import { useStore } from "../../../../../store/store.tsx";

type TProps = {
  device: TDevice;
};

export const Row: FC<TProps> = ({
  device: {
    id,
    deviceId,
    status,
    lastPingAt,
    type,
  },
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setState] = useStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTurnOff = async () => {
    try {
      const newStatus = status === "Connected" ? "Disabled" : "Connected";

      setState(prev => ({
        ...prev,
        devices: {
          ...prev.devices,
          items: prev.devices.items.map(device => 
            device.id === id ? { ...device, status: newStatus } : device
          ),
          filteredItems: prev.devices.filteredItems.map(device => 
            device.id === id ? { ...device, status: newStatus } : device
          ),
        }
      }));
      
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error updating device status:", error);
    }
  };

  const handleRemove = async () => {
    try {
      setState(prev => ({
        ...prev,
        devices: {
          ...prev.devices,
          items: prev.devices.items.filter(device => device.id !== id),
          filteredItems: prev.devices.filteredItems.filter(device => device.id !== id),
        }
      }));
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error deleting device:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="table__row"
         onClick={() => {
           navigate(AdminPaths[EAdminRoutes.DEVICE].replace(/:id/g, id))
         }}
    >
      <div className="table__col-400">
        <img src={DevicePlaceholder} alt="device placeholder image"/>
        <div>
          <p>{deviceId}</p>
          {/*<p>*/}
          {/*  <span>*/}
          {/*    {location}, {city}, {place}, {address}*/}
          {/*  </span>*/}
          {/*</p>*/}
        </div>
      </div>
      <p className="table__col-166">{type}</p>
      <p className="table__col-166">{new Date(lastPingAt).toDateString()}</p>
      <div className="table__col-100 conn-cell">
        <div className="conn-cell__ico">
          {ConnectionTypes[status === "Connected" ? 1 : 5].ico}
        </div>
        <div className={`conn-cell__status ${status}`}>
          {status}
        </div>
      </div>

      <div className="table__col-menu">
        <span className="menu-icon" onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}>
          {MenuIcon}
        </span>
        {isMenuOpen && (
          <>
            <div className="blur-background" onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}/>
            <div className="dropdown-menu" onClick={e => e.stopPropagation()}>
              <p onClick={handleTurnOff}>
                <span>{TurnOffIcon}</span>
                Turn {status === "Connected" ? "off" : "on"} device
              </p>
              <p onClick={handleRemove}>
                <span>{RemoveIcon}</span>
                Remove device
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
