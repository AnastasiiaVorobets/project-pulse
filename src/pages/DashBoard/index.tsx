import { useStore } from '../../store/store.tsx';
import './index.scss';
import { Card, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminPaths, EAdminRoutes } from '../../routes/Routes';

const Dashboard = () => {
  const [{ user, projects, devices }] = useStore();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<Array<{
    name: string;
    progress: number;
    devices: number;
    status: string;
    description: string;
    lastUpdate: string;
    id: string;
  }>>([]);

  useEffect(() => {
    if (projects.items && devices.items) {
      const processedProjects = projects.items.map(project => {
        const projectDevices = devices.items.filter(device =>
          project.devices.includes(device.id)
        );

        const connectedDevices = projectDevices.filter(device =>
          device.status === 'Connected'
        ).length;

        const progress = projectDevices.length > 0
          ? Math.round((connectedDevices / projectDevices.length) * 100)
          : 0;

        const status = progress === 100 ? 'Active' :
                      progress > 0 ? 'In Progress' : 'Not Started';

        return {
          name: project.name,
          progress,
          devices: projectDevices.length,
          status,
          description: `Monitoring project with ${projectDevices.length} devices`,
          lastUpdate: new Date().toLocaleDateString(),
          id: project.id
        };
      });

      setProjectData(processedProjects);
    }
  }, [projects.items, devices.items]);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(AdminPaths[EAdminRoutes.PROJECT_DETAILS].replace(':id', projectId));
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.firstName || 'User'}</h1>

      <div className="dashboard-grid">
        <Card 
          className="dashboard-card clickable" 
          onClick={() => handleCardClick(AdminPaths[EAdminRoutes.DEVICES_LIST])}
        >
          <h3>Total Devices</h3>
          <p className="dashboard-stat">{devices.items.length}</p>
          <Typography variant="body2" color="text.secondary">
            {devices.items.filter(d => d.status === 'Connected').length} connected
          </Typography>
        </Card>
        <Card 
          className="dashboard-card clickable"
          onClick={() => handleCardClick(AdminPaths[EAdminRoutes.PROJECTS])}
        >
          <h3>Active Projects</h3>
          <p className="dashboard-stat">{projects.items.length}</p>
          <Typography variant="body2" color="text.secondary">
            {projectData.filter(p => p.status === 'Active').length} running
          </Typography>
        </Card>
        <Card 
          className="dashboard-card clickable"
          onClick={() => handleCardClick(AdminPaths[EAdminRoutes.MAP])}
        >
          <h3>System Status</h3>
          <p className="dashboard-stat">Online</p>
          <Typography variant="body2" color="text.secondary">
            All systems operational
          </Typography>
        </Card>
      </div>

      <div className="projects-section">
        <h2>Active Projects</h2>
        <div className="projects-grid">
          {projectData.map((project, index) => (
            <Card 
              key={index} 
              className="project-card clickable"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="project-header">
                <h3>{project.name}</h3>
              </div>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {project.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Devices: {project.devices}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Last updated: {project.lastUpdate}
              </Typography>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;