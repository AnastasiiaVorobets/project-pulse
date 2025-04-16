import { FC, useState } from 'react';
import { mockDevices, mockUsers } from '../../utils/mockData';
import { TDevice, TUser } from '../../types';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, selectedDeviceIds: string[], selectedUserIds: string[]) => void;
}

export const AddProjectModal: FC<TProps> = ({ isOpen, onClose, onAdd }) => {
  const [pageValues, setPageValues] = useState({
    selectedDevices: [] as string[],
    selectedUsers: [] as string[],
    deviceSearch: '',
    userSearch: '',
    showDeviceDropdown: false,
    showUserDropdown: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('projectName') as string;
    if (name.trim()) {
      onAdd(name, pageValues.selectedDevices, pageValues.selectedUsers);
      onClose();
    }
  };

  const handleDeviceSelect = (deviceId: string) => {
    setPageValues(prev => ({
      ...prev,
      selectedDevices: prev.selectedDevices.includes(deviceId) 
        ? prev.selectedDevices.filter(id => id !== deviceId)
        : [...prev.selectedDevices, deviceId]
    }));
  };

  const handleUserSelect = (userId: string) => {
    setPageValues(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userId)
        ? prev.selectedUsers.filter(id => id !== userId)
        : [...prev.selectedUsers, userId]
    }));
  };

  const handleDeviceSearch = (value: string) => {
    setPageValues(prev => ({
      ...prev,
      deviceSearch: value,
      showDeviceDropdown: value.length > 0
    }));
  };

  const handleUserSearch = (value: string) => {
    setPageValues(prev => ({
      ...prev,
      userSearch: value,
      showUserDropdown: value.length > 0
    }));
  };

  const toggleDeviceDropdown = () => {
    if (pageValues.deviceSearch.length > 0) {
      setPageValues(prev => ({
        ...prev,
        showDeviceDropdown: !prev.showDeviceDropdown
      }));
    }
  };

  const toggleUserDropdown = () => {
    if (pageValues.userSearch.length > 0) {
      setPageValues(prev => ({
        ...prev,
        showUserDropdown: !prev.showUserDropdown
      }));
    }
  };

  const filteredDevices = mockDevices.filter(device => 
    device.type.toLowerCase().includes(pageValues.deviceSearch.toLowerCase()) ||
    device.deviceId.toLowerCase().includes(pageValues.deviceSearch.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(user => {
    const userId = user.id as string;
    return userId && (
      user.firstName.toLowerCase().includes(pageValues.userSearch.toLowerCase()) ||
      user.lastName.toLowerCase().includes(pageValues.userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(pageValues.userSearch.toLowerCase())
    );
  });

  const firstSelectedDevice = pageValues.selectedDevices.length > 0
    ? mockDevices.find(device => device.id === pageValues.selectedDevices[0]) 
    : null;
    
  const firstSelectedUser = pageValues.selectedUsers.length > 0 
    ? mockUsers.find(user => user.id === pageValues.selectedUsers[0]) 
    : null;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create projects</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Project name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              placeholder="Type here..."
              required
            />
          </div>
          <div className="form-group">
            <label>Connect devices</label>
            <div className="search-container">
              {firstSelectedDevice && !pageValues.showDeviceDropdown && (
                <div className="selected-item">
                  {firstSelectedDevice.type} - {firstSelectedDevice.deviceId}
                  {pageValues.selectedDevices.length > 1 && ` +${pageValues.selectedDevices.length - 1}`}
                </div>
              )}
              <input
                type="text"
                placeholder="Search devices..."
                value={pageValues.deviceSearch}
                onChange={(e) => handleDeviceSearch(e.target.value)}
                className={`search-input ${firstSelectedDevice && !pageValues.showDeviceDropdown ? 'has-selected' : ''}`}
                onFocus={() => {
                  if (pageValues.deviceSearch.length > 0) setPageValues(prev => ({ ...prev, showDeviceDropdown: true }));
                }}
              />
              <div 
                className={`dropdown-indicator ${pageValues.showDeviceDropdown ? 'active' : ''}`}
                onClick={toggleDeviceDropdown}
              >▼</div>
            </div>
            {pageValues.showDeviceDropdown && (
              <div className="dropdown-container">
                {filteredDevices.length > 0 ? (
                  filteredDevices.map((device: TDevice) => (
                    <div key={device.id} className="dropdown-item">
                      <input
                        type="checkbox"
                        id={`device-${device.id}`}
                        checked={pageValues.selectedDevices.includes(device.id)}
                        onChange={() => handleDeviceSelect(device.id)}
                      />
                      <label htmlFor={`device-${device.id}`}>
                        {device.type} - {device.deviceId}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No devices found</div>
                )}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Add users</label>
            <div className="search-container">
              {firstSelectedUser && !pageValues.showUserDropdown && (
                <div className="selected-item">
                  {firstSelectedUser.firstName} {firstSelectedUser.lastName}
                  {pageValues.selectedUsers.length > 1 && ` +${pageValues.selectedUsers.length - 1}`}
                </div>
              )}
              <input
                type="text"
                placeholder="Search users..."
                value={pageValues.userSearch}
                onChange={(e) => handleUserSearch(e.target.value)}
                className={`search-input ${firstSelectedUser && !pageValues.showUserDropdown ? 'has-selected' : ''}`}
                onFocus={() => {
                  if (pageValues.userSearch.length > 0) setPageValues(prev => ({ ...prev, showUserDropdown: true }));
                }}
              />
              <div 
                className={`dropdown-indicator ${pageValues.showUserDropdown ? 'active' : ''}`}
                onClick={toggleUserDropdown}
              >▼</div>
            </div>
            {pageValues.showUserDropdown && (
              <div className="dropdown-container">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user: TUser) => {
                    const userId = user.id as string;
                    return userId && (
                      <div key={userId} className="dropdown-item">
                        <input
                          type="checkbox"
                          id={`user-${userId}`}
                          checked={pageValues.selectedUsers.includes(userId)}
                          onChange={() => handleUserSelect(userId)}
                        />
                        <label htmlFor={`user-${userId}`}>
                          {user.firstName} {user.lastName} ({user.email})
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-results">No users found</div>
                )}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="submit-button"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};