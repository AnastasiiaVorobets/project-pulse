import { FC } from "react";
import "./index.scss";
import { useEffect, useState } from "react";
import { PageHeading } from "../../components/PageHeading";
import { useStore } from "../../store/store";
import { TProject, TUser, TDevice } from "../../types";
import { AdminPaths, EAdminRoutes } from "../../routes/Routes";
import { Filters } from "./components/Filters";
import { Pagination } from "../../components/Pagination";
import { EmptyList } from "../../components/EmptyList";
import { AddProjectModal } from "../../components/AddProjectModal";
import { HeaderButton } from "../../components/HeaderButton";
import { EmptyStateImg, EditIco, DeleteIco } from "../../utils/constants/images.tsx";
import { DropdownMenu } from "../../components/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { deleteProject, addProject, updateProject } from "../../store/actions/projectActions.ts";
import { UpdateProjectModal } from "../../components/UpdateProjectModal";
import { ConfirmationModal } from "../../components/ConfirmationModal";

export const ProjectsPage: FC = () => {
  const [{ projects, devices, users }, setState] = useStore();
  const navigate = useNavigate();
  const [pageValues, setPageValues] = useState({
    activeDropdown: null as string | null,
    searchQuery: '',
    selectedCompany: 'All',
    isAddModalOpen: false,
    isUpdateModalOpen: false,
    selectedProject: null as TProject | null,
    currentPage: 1,
    pageSize: 9,
    isLoading: false,
    error: null as string | null,
    showDeleteModal: false,
    projectToDelete: null as string | null,
  });

  const handlePageChange = (page: number) => {
    setPageValues(prevState => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const toggleDropdown = (projectId: string) => {
    setPageValues(prevState => ({
      ...prevState,
      activeDropdown: prevState.activeDropdown === projectId ? null : projectId,
    }));
  };

  const handleDeleteClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setPageValues(prev => ({
      ...prev,
      showDeleteModal: true,
      projectToDelete: projectId,
      activeDropdown: null
    }));
  };

  const handleConfirmDelete = async () => {
    if (!pageValues.projectToDelete) return;
    
    try {
      await deleteProject(pageValues.projectToDelete);
      setState(prev => ({
        ...prev,
        projects: {
          ...prev.projects,
          items: prev.projects.items.filter(project => project.id !== pageValues.projectToDelete),
          filteredItems: prev.projects.filteredItems.filter(project => project.id !== pageValues.projectToDelete)
        }
      }));
      setPageValues(prev => ({
        ...prev,
        showDeleteModal: false,
        projectToDelete: null
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleCancelDelete = () => {
    setPageValues(prev => ({
      ...prev,
      showDeleteModal: false,
      projectToDelete: null
    }));
  };

  const handleAddProject = async (name: string, selectedDeviceIds: string[], selectedUserIds: string[]) => {
    try {
      const newProject = await addProject(name, selectedDeviceIds, selectedUserIds);
      setState(prev => ({
        ...prev,
        projects: {
          ...prev.projects,
          items: [...prev.projects.items, newProject],
          filteredItems: [...prev.projects.filteredItems, newProject]
        }
      }));
      setPageValues(prev => ({ ...prev, isAddModalOpen: false }));
    } catch (error) {
      console.error('Error adding project:', error);
      setPageValues(prev => ({ ...prev, error: 'Failed to add project' }));
    }
  };

  const handleUpdateProject = async (projectId: string, name: string, type: string, description: string) => {
    try {
      const updatedProject = await updateProject(projectId, name, type, description);
      setState(prev => ({
        ...prev,
        projects: {
          ...prev.projects,
          items: prev.projects.items.map(project => 
            project.id === projectId ? updatedProject : project
          ),
          filteredItems: prev.projects.filteredItems.map(project => 
            project.id === projectId ? updatedProject : project
          )
        }
      }));
      setPageValues(prev => ({ ...prev, isUpdateModalOpen: false, selectedProject: null }));
    } catch (error) {
      console.error('Error updating project:', error);
      setPageValues(prev => ({ ...prev, error: 'Failed to update project' }));
    }
  };

  const handleEditClick = (e: React.MouseEvent, project: TProject) => {
    e.stopPropagation();
    setPageValues(prev => ({ 
      ...prev, 
      isUpdateModalOpen: true,
      selectedProject: project
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pageValues.activeDropdown && !(event.target as Element).closest('.menu-button')) {
        setPageValues(prevState => ({
          ...prevState,
          activeDropdown: null,
        }));
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [pageValues.activeDropdown]);

  const startIndex = (pageValues.currentPage - 1) * pageValues.pageSize;
  const endIndex = startIndex + pageValues.pageSize;
  const currentPageItems = projects.filteredItems.slice(startIndex, endIndex);

  return (
    <div className="projects-list">
      <div className="projects-list__header">
        <PageHeading
          title="All projects"
        />
        <div className="projects-list__header-right">
          <Filters />
          <HeaderButton
            buttonText="+ Add Project"
            onClick={() => setPageValues(prev => ({ ...prev, isAddModalOpen: true }))}
          />
        </div>
      </div>

      {pageValues.error && (
        <div className="error-message">
          {pageValues.error}
        </div>
      )}

      <AddProjectModal
        isOpen={pageValues.isAddModalOpen}
        onClose={() => setPageValues(prev => ({ ...prev, isAddModalOpen: false }))}
        onAdd={handleAddProject}
      />
      <UpdateProjectModal
        isOpen={pageValues.isUpdateModalOpen}
        onClose={() => setPageValues(prev => ({ ...prev, isUpdateModalOpen: false, selectedProject: null }))}
        onUpdate={handleUpdateProject}
        project={pageValues.selectedProject}
      />
      <ConfirmationModal
        isOpen={pageValues.showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      {!projects.isLoading && (
        <>
          {projects.filteredItems.length ? (
            <>
              <div className="projects-list__grid">
                {currentPageItems.map((project) => {
                  const projectDeviceObjects: TDevice[] = devices.items.filter(d => d.projectId === project.id);
                  const totalDeviceCount = projectDeviceObjects.length;
                  const displayDevices = projectDeviceObjects.slice(0, 2);
                  const moreDeviceCount = totalDeviceCount > 2 ? totalDeviceCount - 2 : 0;

                  const projectUsers: TUser[] = users.items.filter(u => project.userIds.includes(u.id || ''));
                  const regularUsers = projectUsers.filter(u => u.role?.toLowerCase() !== 'admin');
                  const totalUserCount = regularUsers.length;
                  const displayUsers = regularUsers.slice(0, 5);
                  const moreUserCount = totalUserCount > 5 ? totalUserCount - 5 : 0;

                  return (
                    <div key={project.id} className="project-card"
                         onClick={() => navigate(AdminPaths[EAdminRoutes.PROJECT_DETAILS].replace(':id', project.id))}>
                      <div className="project-card__header">
                        <h3>{project.name}</h3>
                        <DropdownMenu
                          isOpen={pageValues.activeDropdown === project.id}
                          onToggle={(e) => {
                            e.stopPropagation();
                            toggleDropdown(project.id);
                          }}
                        >
                          <button onClick={(e) => handleEditClick(e, project)}>
                            {EditIco}
                            Edit
                          </button>

                          <button
                            onClick={(e) => handleDeleteClick(e, project.id)}
                          >
                            {DeleteIco}
                            Delete
                          </button>
                        </DropdownMenu>
                      </div>

                      <div className="project-card__devices">
                        <div className="label">Connected devices</div>
                        <div className="device-tags">
                          {displayDevices.map(device => (
                            <span 
                              key={device.id} 
                              className="device-tag"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(AdminPaths[EAdminRoutes.DEVICE].replace(':id', device.id));
                              }}
                            >
                              {device.deviceId}
                            </span>
                          ))}
                          {moreDeviceCount > 0 && (
                            <span 
                              className="device-tag device-tag--more"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(AdminPaths[EAdminRoutes.DEVICES_LIST]);
                              }}
                            >
                              +{moreDeviceCount}
                            </span>
                          )}
                          {totalDeviceCount === 0 && <span className="no-data">No devices</span>}
                        </div>
                      </div>

                      <div className="project-card__users">
                        <div className="label">Users</div>
                        <div className="user-avatars">
                          {displayUsers.map(user => (
                             <div 
                               key={user.id} 
                               className="avatar"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 navigate(AdminPaths[EAdminRoutes.USER_PROFILE].replace(':id', user.id || ''));
                               }}
                             >
                               {user.firstName?.charAt(0).toUpperCase()}
                             </div>
                          ))}
                          {moreUserCount > 0 && (
                             <span 
                               className="user-count"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 navigate(AdminPaths[EAdminRoutes.USERS]);
                               }}
                             >
                               +{moreUserCount}
                             </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="devices-footer">
                <p className="devices-count">
                  <span>{projects.filteredItems.length}</span> projects
                </p>
                <Pagination
                  currentPage={pageValues.currentPage}
                  pageSize={pageValues.pageSize}
                  totalItems={projects.filteredItems.length}
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
        </>
      )}

      {projects.isLoading && <p>Loading...</p>}
    </div>
  );
};
