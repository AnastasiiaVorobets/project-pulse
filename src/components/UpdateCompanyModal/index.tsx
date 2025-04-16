import React, { useState, useEffect } from 'react';
import { TCompany, TProject, TRelatesProject } from '../../types';
import { TCompanyStatus } from '../../utils/enums';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (companyId: string, updates: Partial<TCompany>) => Promise<void>;
  company: TCompany | null;
  projects: TProject[];
  isLoading?: boolean;
}

export const UpdateCompanyModal: React.FC<TProps> = ({ isOpen, onClose, onUpdate, company, projects, isLoading }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<TCompanyStatus>(TCompanyStatus.ACTIVE);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  useEffect(() => {
    if (company) {
      setName(company.name);
      setStatus(company.status);
      setSelectedProjects(company.relatedProjects.map(project => project.id));
    }
  }, [company]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (company && name.trim()) {
      const relatedProjects: TRelatesProject[] = selectedProjects.map(projectId => ({
        id: projectId,
        name: projects.find(p => p.id === projectId)?.name || '',
        type: 'project'
      }));

      await onUpdate(company.id, { 
        name: name.trim(), 
        status,
        relatedProjects
      });
    }
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedProjects(selectedOptions);
  };

  if (!isOpen || !company) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Update Company</h2>
          <button className="close-button" onClick={onClose} disabled={isLoading}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter company name"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <div className="select-wrapper">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TCompanyStatus)}
                disabled={isLoading}
                className="form-select"
              >
                <option value={TCompanyStatus.ACTIVE}>Active</option>
                <option value={TCompanyStatus.INACTIVE}>Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="status">Related Projects</label>
            <div className="select-wrapper">
              <select
                value={selectedProjects}
                onChange={handleProjectChange}
                disabled={isLoading}
                className="form-select"
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="submit-button"
            >
              {isLoading ? 'Updating...' : 'Update Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 