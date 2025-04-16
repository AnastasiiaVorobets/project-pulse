import { FC, useState, useEffect } from 'react';
import { TProject } from '../../types';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (projectId: string, name: string, type: string, description: string) => void;
  project: TProject | null;
}

export const UpdateProjectModal: FC<TProps> = ({ isOpen, onClose, onUpdate, project }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        type: project.type || '',
        description: project.description || ''
      });
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      onUpdate(
        project.id,
        formData.name.trim(),
        formData.type.trim(),
        formData.description.trim()
      );
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit project</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Project name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Type project name..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Project type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type project type..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type project description..."
              rows={4}
            />
          </div>

          <div className="modal-footer">
            <button
              type="submit"
              className="submit-button"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 