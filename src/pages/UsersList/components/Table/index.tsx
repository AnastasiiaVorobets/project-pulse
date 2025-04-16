import { FC, useState } from "react";
import { TUser } from "../../../../types";
import { DeleteIco } from "../../../../utils/constants/images.tsx";
import { useNavigate } from "react-router-dom";
import { AdminPaths, EAdminRoutes } from "../../../../routes/Routes.tsx";
import { deleteUser } from "../../../../store/actions/userActions.ts";
import { useStore } from "../../../../store/store.tsx";
import { ConfirmationModal } from "../../../../components/ConfirmationModal";
import { ChangeRoleModal } from "../../../../components/ChangeRoleModal";
import { UserRole } from "../../../../utils/enums";
import "./index.scss";

type TProps = {
  users: TUser[];
  currentPage: number;
  pageSize: number;
}

export const UserTable: FC<TProps> = ({ users, currentPage, pageSize }) => {
  const navigate = useNavigate();
  const [{ }, setState] = useStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [userToChangeRole, setUserToChangeRole] = useState<TUser | null>(null);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageItems = users.slice(startIndex, endIndex);

  const handleUserClick = (userId: string) => {
    navigate(AdminPaths[EAdminRoutes.USER_PROFILE].replace(':id', userId));
  };

  const handleDeleteClick = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleRoleClick = (e: React.MouseEvent, user: TUser) => {
    e.stopPropagation();
    setUserToChangeRole(user);
    setShowRoleModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteUser(userToDelete);
      setState(prev => ({
        ...prev,
        users: {
          ...prev.users,
          items: prev.users.items.filter(user => user.id !== userToDelete),
          filteredItems: prev.users.filteredItems.filter(user => user.id !== userToDelete)
        }
      }));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleRoleChange = async (newRole: UserRole) => {
    if (!userToChangeRole?.id) return;

    try {
      // Here you would typically call your API to update the user's role
      setState(prev => ({
        ...prev,
        users: {
          ...prev.users,
          items: prev.users.items.map(user => 
            user.id === userToChangeRole.id ? { ...user, role: newRole } : user
          ),
          filteredItems: prev.users.filteredItems.map(user => 
            user.id === userToChangeRole.id ? { ...user, role: newRole } : user
          )
        }
      }));
      setShowRoleModal(false);
      setUserToChangeRole(null);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <>
      <div className="users-list">
        <div className="header-row">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Last Active</span>
          <span>Action</span>
        </div>

        {currentPageItems.map((user) => (
          <div 
            key={user.id} 
            className="user-row"
            onClick={() => user.id && handleUserClick(user.id)}
          >
            <div className="user-info">
              <div className="user-avatar">
                {user.firstName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="user-details">
                <h3>{user.firstName} {user.lastName}</h3>
              </div>
            </div>

            <div className="user-email">
              {user.email}
            </div>

            <div className="user-role">
              <span 
                className={`role-badge ${user.role.toLowerCase()}`}
                onClick={(e) => handleRoleClick(e, user)}
              >
                {user.role}
              </span>
            </div>

            <div className="user-status">
              <span className="status-badge">
                Active
              </span>
            </div>

            <div className="user-time">
              3 hours ago
            </div>

            <div className="user-actions">
              <button 
                className="action-btn delete"
                onClick={(e) => {
                  e.stopPropagation();
                  if (user.id) handleDeleteClick(e, user.id);
                }}
              >
                {DeleteIco}
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <ChangeRoleModal
        isOpen={showRoleModal}
        onClose={() => {
          setShowRoleModal(false);
          setUserToChangeRole(null);
        }}
        onConfirm={handleRoleChange}
        currentRole={userToChangeRole?.role as UserRole || UserRole.USER}
        userName={`${userToChangeRole?.firstName} ${userToChangeRole?.lastName}`}
      />
    </>
  );
};
