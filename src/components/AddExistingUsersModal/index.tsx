import { FC, useState } from 'react';
import { TUser } from '../../types';
import './index.scss';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (selectedUserIds: string[]) => void;
  availableUsers: TUser[];
  title?: string;
  confirmText?: string;
};

export const AddExistingUsersModal: FC<TProps> = ({
  isOpen,
  onClose,
  onAdd,
  availableUsers,
  title,
  confirmText,
}) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserIds(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserIds.length > 0) {
      onAdd(selectedUserIds);
      setSelectedUserIds([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  const validUsers = availableUsers.filter((user): user is TUser & { id: string } => Boolean(user.id));

  return (
    <div className="add-users-overlay" onClick={onClose}>
      <div className="add-users-content" onClick={e => e.stopPropagation()}>
        <div className="add-users-header">
          <h2>{title}</h2>
          <button type="button" className="add-users-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="add-users-form-group">
            <div className="add-users-list">
              {validUsers.length === 0 ? (
                <div className="add-users-empty">No available users</div>
              ) : (
                validUsers.map(user => (
                  <div 
                    key={user.id} 
                    className="add-users-item"
                    onClick={() => handleUserSelect(user.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUserIds.includes(user.id)}
                      onChange={() => handleUserSelect(user.id)}
                      onClick={e => e.stopPropagation()}
                    />
                    <label>
                      <span className="add-users-item-name">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="add-users-item-email">
                        {user.email}
                      </span>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="add-users-footer">
            <button 
              type="submit" 
              className="add-users-submit" 
              disabled={selectedUserIds.length === 0}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 