import { FC, useState } from 'react';
import { TDevice } from '../../types';
import './index.scss';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (selectedDeviceIds: string[]) => void;
  availableDevices: TDevice[];
  title?: string;
  confirmText?: string;
};

export const AddExistingDeviceModal: FC<TProps> = ({
  isOpen,
  onClose,
  onAdd,
  availableDevices,
  title,
  confirmText,
}) => {
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<string[]>([]);

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDeviceIds(prev => {
      if (prev.includes(deviceId)) {
        return prev.filter(id => id !== deviceId);
      } else {
        return [...prev, deviceId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDeviceIds.length > 0) {
      onAdd(selectedDeviceIds);
      setSelectedDeviceIds([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-devices-overlay" onClick={onClose}>
      <div className="add-devices-content" onClick={e => e.stopPropagation()}>
        <div className="add-devices-header">
          <h2>{title}</h2>
          <button type="button" className="add-devices-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="add-devices-form-group">
            <div className="add-devices-list">
              {availableDevices.length === 0 ? (
                <div className="add-devices-empty">No available devices</div>
              ) : (
                availableDevices.map(device => (
                  <div 
                    key={device.id} 
                    className="add-devices-item"
                    onClick={() => handleDeviceSelect(device.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDeviceIds.includes(device.id)}
                      onChange={() => handleDeviceSelect(device.id)}
                      onClick={e => e.stopPropagation()}
                    />
                    <label>
                      <span className="add-devices-item-id">{device.deviceId}</span>
                      <span className={`add-devices-item-status ${device.status.toLowerCase()}`}>
                        {device.status}
                      </span>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="add-devices-footer">
            <button 
              type="submit" 
              className="add-devices-submit" 
              disabled={selectedDeviceIds.length === 0}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 