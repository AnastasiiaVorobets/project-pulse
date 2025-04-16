import { FC, useState } from "react";
import { TProject, TDevice } from "../../../../types";
import { useStore } from "../../../../store/store";
import { EmptyStateImg } from "../../../../utils/constants/images";
import { Pagination } from "../../../../components/Pagination";
import { EmptyList } from "../../../../components/EmptyList";
import { AddDeviceModal } from "../../../../components/AddDeviceModal";
import { DeleteIco, EditIco } from "../../../../utils/constants/images.tsx";
import { useNavigate } from "react-router-dom";
import { AdminPaths, EAdminRoutes } from "../../../../routes/Routes";
import { ConfirmationModal } from "../../../../components/ConfirmationModal";
import { ConnectionTypes } from "../../../../utils/constants";

type ProjectDevicesTableProps = {
  currentPage: number;
  pageSize: number;
  devices: TDevice[];
  onRemoveDevice: (deviceId: string) => void;
};

const ProjectDevicesTable: FC<ProjectDevicesTableProps> = ({ 
  currentPage, 
  pageSize, 
  devices,
  onRemoveDevice
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deviceToRemove, setDeviceToRemove] = useState<string | null>(null);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentItems = devices.slice(startIdx, endIdx);

  const handleGoToDevice = (deviceId: string) => {
    navigate(AdminPaths[EAdminRoutes.DEVICE].replace(':id', deviceId));
  };

  const handleRemoveClick = (e: React.MouseEvent, deviceId: string) => {
    e.stopPropagation();
    setDeviceToRemove(deviceId);
    setShowDeleteModal(true);
  };

  const handleConfirmRemove = () => {
    if (!deviceToRemove) return;
    onRemoveDevice(deviceToRemove);
    setShowDeleteModal(false);
    setDeviceToRemove(null);
  };

  const handleCancelRemove = () => {
    setShowDeleteModal(false);
    setDeviceToRemove(null);
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
                  onClick={() => {}}
                >
                  {EditIco}
                </button>

                <button 
                  className="action-btn remove"
                  onClick={(e) => handleRemoveClick(e, device.id)}
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
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="Remove Device from Project"
        message="Are you sure you want to remove this device from the project? The device will still exist in the system."
        confirmText="Remove"
        cancelText="Cancel"
      />
    </>
  );
};

type TProps = {
  project: TProject;
};

export const DevicesTab: FC<TProps> = ({ project }) => {
  const [{ devices }, setState] = useStore();
  const [pageValues, setPageValues] = useState({
    currentPage: 1,
    pageSize: 6,
    isAddModalOpen: false,
  });

  const handlePageChange = (page: number) => {
    setPageValues((prevState) => ({ ...prevState, currentPage: page }));
  };

  const handleRemoveDevice = (deviceId: string) => {
    setState(prev => ({
      ...prev,
      devices: {
        ...prev.devices,
        items: prev.devices.items.map(device => 
          device.id === deviceId
            ? { ...device, projectId: '' }
            : device
        ),
        filteredItems: prev.devices.filteredItems.map(device => 
          device.id === deviceId
            ? { ...device, projectId: '' }
            : device
        )
      }
    }));
  };

  const projectDevices = devices.filteredItems.filter(device => device.projectId === project.id);

  return (
    <div>
      <AddDeviceModal
        isOpen={pageValues.isAddModalOpen}
        onClose={() => setPageValues((prev) => ({ ...prev, isAddModalOpen: false }))}
        onSubmit={() => {}}
      />

      {projectDevices.length > 0 ? (
        <>
          <ProjectDevicesTable 
            currentPage={pageValues.currentPage} 
            pageSize={pageValues.pageSize} 
            devices={projectDevices}
            onRemoveDevice={handleRemoveDevice}
          />

          <div className="devices-footer">
            <p className="devices-count">
              <span>{projectDevices.length}</span> devices
            </p>
            <Pagination
              currentPage={pageValues.currentPage}
              pageSize={pageValues.pageSize}
              totalItems={projectDevices.length}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <EmptyList
          image={EmptyStateImg}
          title={"Nothing was found for your query"}
        />
      )}
    </div>
  );
};
