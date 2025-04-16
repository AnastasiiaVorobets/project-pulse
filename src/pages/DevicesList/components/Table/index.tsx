import "./index.scss";
import { FC, useState } from "react";
import { TDevice } from "../../../../types";
import { DeleteIco, EditIco } from "../../../../utils/constants/images.tsx";
import { useNavigate } from "react-router-dom";
import { AdminPaths, EAdminRoutes } from "../../../../routes/Routes";
import { ConnectionTypes } from "../../../../utils/constants";
import { deleteDevice } from "../../../../store/actions/deviceActions.ts";
import { useStore } from "../../../../store/store.tsx";
import { ConfirmationModal } from "../../../../components/ConfirmationModal";

type TableProps = {
  currentPage: number;
  pageSize: number;
  devices: TDevice[];
};

export const Table: FC<TableProps> = ({ currentPage, pageSize, devices }) => {
  const navigate = useNavigate();
  const [, setState] = useStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentItems = devices.slice(startIdx, endIdx);

  const handleGoToDevice = (deviceId: string) => {
    navigate(AdminPaths[EAdminRoutes.DEVICE].replace(':id', deviceId));
  };

  const handleDeleteClick = (e: React.MouseEvent, deviceId: string) => {
    e.stopPropagation();
    setDeviceToDelete(deviceId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deviceToDelete) return;
    
    try {
      await deleteDevice(deviceToDelete);
      setState(prev => ({
        ...prev,
        devices: {
          ...prev.devices,
          items: prev.devices.items.filter(device => device.id !== deviceToDelete),
          filteredItems: prev.devices.filteredItems.filter(device => device.id !== deviceToDelete)
        }
      }));
      setShowDeleteModal(false);
      setDeviceToDelete(null);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeviceToDelete(null);
  };
  
  const handleEditDevice = (e: React.MouseEvent, deviceId: string) => {
    e.stopPropagation();
    console.log("Edit device clicked:", deviceId);
  };

  return (
    <>
      <div className="devices-table">
        <div className="table-header">
          <span className="header-cell">Device</span>
          <span className="header-cell">Status</span>
          <span className="header-cell">Time</span>
          <span className="header-cell">Action</span>
        </div>

        <div className="table-body">
          {currentItems.map((device) => (
            <div 
              key={device.id} 
              className="table-row" 
              onClick={() => handleGoToDevice(device.id)}
            >
              <div className="cell device-info">
                <h3>{device.deviceId}</h3>
                <div className="device-location">{device.latLng.join(', ')}</div>
              </div>

              <div className="cell device-status">
                <div className="device-item__status-block conn">
                  <div className="conn__ico">
                    {device.status === "Connected" ? ConnectionTypes[1].ico : ConnectionTypes[5].ico}
                  </div>
                  <div className={`conn__status ${device.status}`}>
                    {device.status}
                  </div>
                </div>
              </div>

              <div className="cell device-time">
                {new Date(device.lastPingAt).toLocaleTimeString('uk-UA', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>

              <div className="cell device-actions">
                <button 
                  className="action-btn edit"
                  onClick={(e) => handleEditDevice(e, device.id)}
                >
                  {EditIco}
                </button>
                <button
                  className="action-btn delete"
                  onClick={(e) => handleDeleteClick(e, device.id)}
                >
                  {DeleteIco}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Device"
        message="Are you sure you want to delete this device? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};
