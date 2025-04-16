import { useEffect, useState } from "react";
import "./index.scss";
import { Alert } from "./Alert";

import { useStore } from "../../store/store";

export const AlertsContainer = () => {
  const [{ error }, setStore] = useStore();
  const [alerts, setAlerts] = useState<
    { id: string; type: string; message: string }[]
  >([]);

  const generateUniqueId = (): string => {
    return 'id_' + Math.random().toString(36).substr(2, 9);
  };

  const addAlert = (type: string, message: string) => {
    const id = generateUniqueId();

    setAlerts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 5200);
  };

  useEffect(() => {
    if (error && error !== '') {
      addAlert("error", error);
      setStore((prevState) => ({
        ...prevState,
        error: '',
      }));
    }
  }, [error, setStore]);

  return (
    <div className="alerts-container">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
        />
      ))}
    </div>
  );
};
