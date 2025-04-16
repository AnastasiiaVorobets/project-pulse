import { FC, useState } from 'react';
import { useStore } from '../../store/store.tsx';
import { TState } from '../../types';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
};

export const InviteUserModal: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {
  const [, setState] = useStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setError('All fields are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // Generate a unique ID for the new user
      const newUserId = `user-${Date.now()}`;
      
      // Create new user object
      const newUser = {
        id: newUserId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        role: 'User',
        projectIds: [],
        deviceIds: [],
        status: 'Active',
        lastActive: new Date().toISOString(),
      };

      // Update the store with the new user
      setState((prevState: TState) => ({
        ...prevState,
        users: {
          ...prevState.users,
          items: [...prevState.users.items, newUser],
          filteredItems: [...prevState.users.filteredItems, newUser],
        },
      }));

      // Reset form and close modal
      setFormData({ firstName: '', lastName: '', email: '' });
      onSubmit?.();
      onClose();
    } catch (error) {
      setError('Failed to add user. Please try again.');
      console.error('Error adding user:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New User</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="John.Doe@email.com"
              required
            />
          </div>
          {error && <div className="validation-error">{error}</div>}
          <div className="modal-footer">
            <button
              type="submit"
              className="submit-button"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 