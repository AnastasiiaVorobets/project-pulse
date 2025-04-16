import { FC } from 'react';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; project: string }) => void;
};

export const AddDeviceModal: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      name: formData.get('name') as string,
      project: formData.get('project') as string
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Device</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Water System"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="project">Project</label>
            <input
              type="text"
              id="project"
              name="project"
              placeholder="Select Project"
              required
            />
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="submit-button"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 