import React, { useState } from 'react';
import { TProject } from '../../types';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (name: string, projectIds: string[]) => Promise<void>;
  projects?: TProject[];
  isLoading?: boolean;
}

export const AddCompanyModal: React.FC<TProps> = ({ isOpen, onClose, onAdd, projects, isLoading }) => {
  const [name, setName] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && onAdd) {
      await onAdd(name.trim(), selectedProjects);
      setName('');
      setSelectedProjects([]);
    }
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedProjects(selectedOptions);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Company</h2>
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
            <label htmlFor="projects">Related Projects</label>
            <div className="select-wrapper">
              <select
                value={selectedProjects[0] || ''}
                onChange={handleProjectChange}
                disabled={isLoading}
                className="form-select"
              >
                <option value="">Select a project</option>
                {projects && projects.map(project => (
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
              disabled={isLoading || !name.trim() || selectedProjects.length === 0}
              className="submit-button"
            >
              {isLoading ? 'Adding...' : 'Add Company'}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}; 