import { mockProjects } from "../../utils/mockData";
import { TProject } from "../../types";

export const deleteProject = async (projectId: string): Promise<void> => {
  const projectIndex = mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex !== -1) {
    mockProjects.splice(projectIndex, 1);
  }
};

export const addProject = async (
  name: string,
  selectedDeviceIds: string[],
  selectedUserIds: string[]
): Promise<TProject> => {
  const newProjectId = `proj_${String(mockProjects.length + 1).padStart(3, '0')}`;
  
  const newProject: TProject = {
    id: newProjectId,
    name,
    type: "General",
    description: "New project",
    devices: selectedDeviceIds,
    userIds: selectedUserIds
  };

  mockProjects.push(newProject);
  return newProject;
};

export const updateProject = async (projectId: string, name: string, type: string, description: string): Promise<TProject> => {
  const projectIndex = mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) {
    throw new Error('Project not found');
  }

  const updatedProject: TProject = {
    ...mockProjects[projectIndex],
    name,
    type,
    description
  };

  mockProjects[projectIndex] = updatedProject;
  return updatedProject;
}; 