import { Pagination } from "../../../../components/Pagination";
import { EmptyList } from "../../../../components/EmptyList";
import { useStore } from "../../../../store/store.tsx";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AddProjectModal } from "../../../../components/AddProjectModal";
import { DeleteIco, EditIco, EmptyStateImg } from "../../../../utils/constants/images.tsx";
import { TProject } from "../../../../types";
import { deleteProject } from "../../../../store/actions/projectActions.ts";
import { AdminPaths, EAdminRoutes } from "../../../../routes/Routes";
import { ConfirmationModal } from "../../../../components/ConfirmationModal";
import './index.scss';

type ProjectsTableProps = {
  currentPage: number;
  pageSize: number;
  projects: TProject[];
  onDeleteClick: (projectId: string) => void;
};

const ProjectsTable = ({ currentPage, pageSize, projects, onDeleteClick }: ProjectsTableProps) => {
  const navigate = useNavigate();
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentItems = projects.slice(startIdx, endIdx);

  const handleRowClick = (projectId: string) => {
    navigate(AdminPaths[EAdminRoutes.PROJECT_DETAILS].replace(':id', projectId));
  };

  return (
    <div className="projects-table">
      <div className="table-header">
        <span className="header-cell">Project Name</span>
        <span className="header-cell">Devices</span>
        <span className="header-cell">Users</span>
        <span className="header-cell">Status</span>
        <span className="header-cell">Action</span>
      </div>
      <div className="table-body">
        {currentItems.map((project) => (
          <div 
            key={project.id} 
            className="table-row"
            onClick={() => handleRowClick(project.id)}
          >
            <div className="cell" data-label="Project Name">
              <div className="project-info">
                <h3>{project.name}</h3>
              </div>
            </div>
            <div className="cell" data-label="Devices">
              <span className="project-stat">{project.devices.length}</span>
            </div>
            <div className="cell" data-label="Users">
              <span className="project-stat">{project.userIds.length}</span>
            </div>
            <div className="cell" data-label="Status">
              <span className="status-badge active">Active</span>
            </div>
            <div className="cell actions" data-label="Actions" onClick={(e) => e.stopPropagation()}>
              <div className="user-actions">
                <button className="action-btn edit">
                  {EditIco}
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => onDeleteClick(project.id)}
                >
                  {DeleteIco}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectTab = () => {
  const [{ projects, users }, setState] = useStore();
  const { id: userId } = useParams();
  const [pageValues, setPageValues] = useState({
    currentPage: 1,
    pageSize: 6,
    isProjectModalOpen: false,
    showDeleteModal: false,
    projectToDelete: null as string | null,
  });

  const user = users.items.find(user => user.id === userId);
  const userProjectIds = user?.projectIds || [];

  const userProjects = projects.filteredItems.filter(project =>
    userProjectIds.includes(project.id)
  );

  const handlePageChange = (page: number) => {
    setPageValues((prev) => ({ ...prev, currentPage: page }));
  };

  const handleDeleteClick = (projectId: string) => {
    setPageValues(prev => ({
      ...prev,
      showDeleteModal: true,
      projectToDelete: projectId
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

  if (projects.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-tab">
      <AddProjectModal
        isOpen={pageValues.isProjectModalOpen}
        onClose={() => setPageValues((prev) => ({ ...prev, isProjectModalOpen: false }))}
        onAdd={() => {}}
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

      {userProjects.length ? (
        <>
          <ProjectsTable 
            currentPage={pageValues.currentPage} 
            pageSize={pageValues.pageSize} 
            projects={userProjects}
            onDeleteClick={handleDeleteClick}
          />
          <div className="projects-footer">
            <p className="projects-count">
              <span>{userProjects.length}</span> projects
            </p>
            <Pagination
              currentPage={pageValues.currentPage}
              pageSize={pageValues.pageSize}
              totalItems={userProjects.length}
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
