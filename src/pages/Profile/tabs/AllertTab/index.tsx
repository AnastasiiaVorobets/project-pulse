import { FC, useState } from "react";
import { Switch } from "../../../../components/Switch";
import { AlertDescriptions, AlertTitles, AlertTypes } from "../../../../utils/enums";

export const AllertTab: FC = () => {
  const [alerts, setAlerts] = useState({
    [AlertTypes.NEW_USER]: false,
    [AlertTypes.DEVICE_OFFLINE]: false,
    [AlertTypes.THRESHOLD_EXCEEDED]: false
  });

  const handleAlertChange = (key: AlertTypes) => (checked: boolean) => {
    setAlerts(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  return (
    <div className="profile-alerts__content">
      {Object.values(AlertTypes).map((alertType) => (
        <div key={alertType} className="alert-block">
          <div className="alert-block__header">
            <Switch
              checked={alerts[alertType]}
              onChange={handleAlertChange(alertType)}
            />
            <h3>{AlertTitles[alertType]}</h3>
          </div>
          <p className="alert-block__description">
            {AlertDescriptions[alertType]}
          </p>
        </div>
      ))}
    </div>
  );
};
