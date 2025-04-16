import { FC, useState } from 'react';
import { TProject } from '../../types';
import './index.scss';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (selectedProjectIds: string[]) => void;
  availableProjects: TProject[];
  title?: string;
  confirmText?: string;
};

export const AddExistingProjectModal: FC<TProps> = ({
  isOpen,
  onClose,
  onAdd,
  availableProjects,
  title,
  confirmText,
}) => {
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectIds(prev => {
      if (prev.includes(projectId)) {
        return prev.filter(id => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProjectIds.length > 0) {
      onAdd(selectedProjectIds);
      setSelectedProjectIds([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  const validProjects = availableProjects.filter((project): project is TProject & { id: string } => Boolean(project.id));

  return (
    <div className="add-projects-overlay" onClick={onClose}>
      <div className="add-projects-content" onClick={e => e.stopPropagation()}>
        <div className="add-projects-header">
          <h2>{title}</h2>
          <button type="button" className="add-projects-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="add-projects-form-group">
            <div className="add-projects-list">
              {validProjects.length === 0 ? (
                <div className="add-projects-empty">No available projects</div>
              ) : (
                validProjects.map(project => (
                  <div 
                    key={project.id} 
                    className="add-projects-item"
                    onClick={() => handleProjectSelect(project.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProjectIds.includes(project.id)}
                      onChange={() => handleProjectSelect(project.id)}
                      onClick={e => e.stopPropagation()}
                    />
                    <label>
                      <span className="add-projects-item-name">
                        {project.name}
                      </span>
                      <span className="add-projects-item-info">
                        {project.description || 'No description'}
                      </span>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="add-projects-footer">
            <button 
              type="submit" 
              className="add-projects-submit" 
              disabled={selectedProjectIds.length === 0}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 