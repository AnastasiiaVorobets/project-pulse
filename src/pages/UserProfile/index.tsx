import { FC, useState, useEffect } from 'react';
import './index.scss';
import { TabButton } from '../../components/TabButton';
import { useParams } from 'react-router-dom';
import { useStore } from '../../store/store.tsx';
import dayjs from 'dayjs';
import { AdminPaths, EAdminRoutes } from '../../routes/Routes.tsx';
import { TState } from '../../types';
import { HeaderButton } from "../../components/HeaderButton";
import { Filters } from "./components/Filters";
import { DeviceTab } from "./tabs/DeviceTab";
import { ProjectTab } from "./tabs/ProjectTab";
import { EUserProfileTabs } from "../../utils/enums";
import { Loader } from "../../components/Loader";
import { HeadingInfo } from "../../components/HeadingInfo";
import { AddExistingDeviceModal } from "../../components/AddExistingDeviceModal";
import { AddExistingProjectModal } from "../../components/AddExistingProjectModal";

export const UserProfile: FC = () => {
  const { id } = useParams();
  const [{ users, devices, projects }, setState] = useStore();
  const [activeTab, setActiveTab] = useState<EUserProfileTabs>(EUserProfileTabs.PROJECTS);
  const [pageValues, setPageValues] = useState({
    isAddCompanyModalOpen: false,
    isAddProjectModalOpen: false,
    isAddDeviceModalOpen: false,
  });

  const user = users.items.find(u => u.id === id);

  useEffect(() => {
    setState((prevState: TState) => ({
      ...prevState,
      breadcrumbs: [
        { path: AdminPaths[EAdminRoutes.USERS], name: "Users" },
        { path: `${AdminPaths[EAdminRoutes.USERS]}/${id}`, name: "User Profile" },
      ],
    }));
  }, [setState, id]);

  if (!user) {
    return <div>User not found</div>;
  }

  const availableDevices = devices.items.filter(device => !user.deviceIds?.includes(device.id));
  const availableProjects = projects.items.filter(project => !user.projectIds?.includes(project.id));

  const handleAddDevices = (selectedDeviceIds: string[]) => {
    setState(prev => ({
      ...prev,
      users: {
        ...prev.users,
        items: prev.users.items.map(u => 
          u.id === user.id
            ? { ...u, deviceIds: [...new Set([...(u.deviceIds || []), ...selectedDeviceIds])] }
            : u
        ),
        filteredItems: prev.users.filteredItems.map(u => 
          u.id === user.id
            ? { ...u, deviceIds: [...new Set([...(u.deviceIds || []), ...selectedDeviceIds])] }
            : u
        )
      }
    }));
    setPageValues(prev => ({ ...prev, isAddDeviceModalOpen: false }));
  };

  const handleAddProjects = (selectedProjectIds: string[]) => {
    setState(prev => ({
      ...prev,
      users: {
        ...prev.users,
        items: prev.users.items.map(u => 
          u.id === user.id
            ? { ...u, projectIds: [...new Set([...(u.projectIds || []), ...selectedProjectIds])] }
            : u
        ),
        filteredItems: prev.users.filteredItems.map(u => 
          u.id === user.id
            ? { ...u, projectIds: [...new Set([...(u.projectIds || []), ...selectedProjectIds])] }
            : u
        )
      }
    }));
    setPageValues(prev => ({ ...prev, isAddProjectModalOpen: false }));
  };

  const userData = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    lastUpdated: dayjs().format('MMM DD, YYYY HH:mm')
  };

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <HeadingInfo
          title="User Profile"
          subtitle={`Last updated ${dayjs().format("MMM DD, YYYY HH:mm")}`}
        />

        <AddExistingDeviceModal
          isOpen={pageValues.isAddDeviceModalOpen}
          onClose={() => setPageValues((prev) => ({ ...prev, isAddDeviceModalOpen: false }))}
          onAdd={handleAddDevices}
          availableDevices={availableDevices}
          title={'Add Existing Devices'}
          confirmText={'Add'}
        />

        <AddExistingProjectModal
          isOpen={pageValues.isAddProjectModalOpen}
          onClose={() => setPageValues((prev) => ({ ...prev, isAddProjectModalOpen: false }))}
          onAdd={handleAddProjects}
          availableProjects={availableProjects}
          title={'Add Existing Projects'}
          confirmText={'Add'}
        />

        <div className="user-profile__header-right">
          <Filters activeTab={activeTab} />
          {activeTab === EUserProfileTabs.PROJECTS && (
            <HeaderButton
              buttonText="+ Add Project"
              onClick={() => setPageValues(prev => ({ ...prev, isAddProjectModalOpen: true }))}
            />
          )}
          {activeTab === EUserProfileTabs.DEVICES && (
            <HeaderButton
              buttonText="+ Add Device"
              onClick={() => setPageValues(prev => ({ ...prev, isAddDeviceModalOpen: true }))}
            />
          )}
        </div>
      </div>

      <div className="user-profile__card">
        <div className="user-profile__info">
          <div className="user-profile__avatar">
            {userData.name[0].toUpperCase()}
          </div>
          <div className="user-profile__details">
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>
        </div>
        <div className="user-profile__actions">
          <button className="action-btn">
            <i className="fas fa-ellipsis-v" />
          </button>
        </div>
      </div>

      <div className="tab-container">
        <TabButton
          label={EUserProfileTabs.PROJECTS}
          isActive={activeTab === EUserProfileTabs.PROJECTS}
          onClick={() => setActiveTab(EUserProfileTabs.PROJECTS)}
        />
        <TabButton
          label={EUserProfileTabs.DEVICES}
          isActive={activeTab === EUserProfileTabs.DEVICES}
          onClick={() => setActiveTab(EUserProfileTabs.DEVICES)}
        />
      </div>

      {activeTab === EUserProfileTabs.PROJECTS && (
        <ProjectTab />
      )}
      {activeTab === EUserProfileTabs.DEVICES && (
        <DeviceTab />
      )}

      <Loader
        isVisible={users.isLoading}
        message="Loading user profile..."
      />
    </div>
  );
}; 