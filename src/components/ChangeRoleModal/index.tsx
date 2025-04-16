import { FC } from "react";
import { UserRole } from "../../utils/enums/index";
import "./index.scss";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (role: UserRole) => void;
  currentRole: UserRole;
  userName: string;
};

export const ChangeRoleModal: FC<TProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentRole,
  userName,
}) => {
  if (!isOpen) return null;

  const roles = Object.values(UserRole);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="change-role-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Change Role</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <p className="user-name">User: {userName}</p>
          <p className="current-role">Current Role: {currentRole}</p>

          <div className="role-options">
            {roles.map((role) => (
              <button
                key={role}
                className={`role-option ${role === currentRole ? "selected" : ""}`}
                onClick={() => onConfirm(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 