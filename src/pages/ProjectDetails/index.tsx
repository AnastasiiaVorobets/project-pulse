import { useParams } from "react-router-dom";
import { useStore } from "../../store/store.tsx";
import { Box, Typography } from "@mui/material";
import "./index.scss";
import { useState } from "react";
import { UsersTab } from "./tabs/UsersTab";
import { DevicesTab } from "./tabs/DevicesTab";
import { MapTab } from "./tabs/MapTab";
import { Tabs } from "../../utils/enums";
import { TabButton } from "../../components/TabButton";
import { HeadingInfo } from "../../components/HeadingInfo";
import dayjs from "dayjs";
import { HeaderButton } from "../../components/HeaderButton";
import { AddExistingDeviceModal } from "../../components/AddExistingDeviceModal";
import { AddExistingUsersModal } from "../../components/AddExistingUsersModal";

export const ProjectDetails = () => {
  const { id } = useParams();
  const [{ projects, devices, users }, setState] = useStore();
  const [pageValues, setPageValues] = useState({
    activeTab: Tabs.PROJECT_DEVICES,
    isInviteModalOpen: false,
    isDeviceModalOpen: false,
  });

  const project = projects.items.find((p) => p.id === id);

  const handleTabChange = (tab: Tabs) => {
    setPageValues(prevState => ({ ...prevState, activeTab: tab }));
  };

  const handleModalToggle = (modal: "invite" | "device", open: boolean) => {
    setPageValues(prevState => ({
      ...prevState,
      [`is${modal.charAt(0).toUpperCase() + modal.slice(1)}ModalOpen`]: open
    }));
  };

  const handleAddDevices = (selectedDeviceIds: string[]) => {
    setState(prev => ({
      ...prev,
      devices: {
        ...prev.devices,
        items: prev.devices.items.map(device => 
          selectedDeviceIds.includes(device.id) 
            ? { ...device, projectId: project?.id || '' }
            : device
        ),
        filteredItems: prev.devices.filteredItems.map(device => 
          selectedDeviceIds.includes(device.id) 
            ? { ...device, projectId: project?.id || '' }
            : device
        )
      }
    }));
    handleModalToggle("device", false);
  };

  const handleAddUsers = (selectedUserIds: string[]) => {
    setState(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: prev.projects.items.map(p => 
          p.id === project?.id
            ? { ...p, userIds: [...new Set([...p.userIds, ...selectedUserIds])] }
            : p
        ),
        filteredItems: prev.projects.filteredItems.map(p => 
          p.id === project?.id
            ? { ...p, userIds: [...new Set([...p.userIds, ...selectedUserIds])] }
            : p
        )
      }
    }));
    handleModalToggle("invite", false);
  };

  if (!project) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error">
          Project not found
        </Typography>
      </Box>
    );
  }

  const availableDevices = devices.items.filter(device => !device.projectId || device.projectId !== project.id);
  const availableUsers = users.items.filter(user => !project.userIds.includes(user.id || ''));

  return (
    <div className="project-details">
      <div className="project-header">
        <HeadingInfo
          title={project.name ?? ''}
          subtitle={`Last updated ${dayjs().format("MMM DD, YYYY HH:mm")}`}
        />

        {pageValues.activeTab === Tabs.PROJECT_DEVICES && (
          <div className="projects-list__header-right">
            <HeaderButton
              buttonText="+ Add Device"
              onClick={() => handleModalToggle("device", true)}
            />
          </div>
        )}

        {pageValues.activeTab === Tabs.PROJECT_USERS && (
          <div className="projects-list__header-right">
            <HeaderButton
              buttonText="+ Invite Users"
              onClick={() => handleModalToggle("invite", true)}
            />
          </div>
        )}
      </div>

      <div className="tab-container">
        <TabButton
          label="Devices"
          isActive={pageValues.activeTab === Tabs.PROJECT_DEVICES}
          onClick={() => handleTabChange(Tabs.PROJECT_DEVICES)}
        />
        <TabButton
          label="Map"
          isActive={pageValues.activeTab === Tabs.PROJECT_MAP}
          onClick={() => handleTabChange(Tabs.PROJECT_MAP)}
        />
        <TabButton
          label="Users"
          isActive={pageValues.activeTab === Tabs.PROJECT_USERS}
          onClick={() => handleTabChange(Tabs.PROJECT_USERS)}
        />

        <AddExistingUsersModal
          isOpen={pageValues.isInviteModalOpen}
          onClose={() => handleModalToggle("invite", false)}
          onAdd={handleAddUsers}
          availableUsers={availableUsers}
          title="Add Users to Project"
          confirmText="Add Selected"
        />

        <AddExistingDeviceModal
          isOpen={pageValues.isDeviceModalOpen}
          onClose={() => handleModalToggle("device", false)}
          onAdd={handleAddDevices}
          availableDevices={availableDevices}
          title ={'Add Existing Devices'}
          confirmText={'Add'}
        />
      </div>

      {pageValues.activeTab === Tabs.PROJECT_DEVICES ? (
        <DevicesTab project={project}/>
      ) : pageValues.activeTab === Tabs.PROJECT_MAP ? (
        <MapTab />
      ) : (
        <UsersTab project={project}/>
      )}
    </div>
  );
};
