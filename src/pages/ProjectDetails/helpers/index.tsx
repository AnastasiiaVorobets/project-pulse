import {
  AssignCompanyIco,
  AssignProjectIco,
  DeactivateIco, DeleteIco,
  EditIco,
  UsersIco
} from "../../../utils/constants/images.tsx";
import { ActionButtonType } from "../../../utils/enums";
import { useStore } from "../../../store/store";
import { TUser } from "../../../types";
import { AdminPaths, EAdminRoutes } from "../../../routes/Routes.tsx";
import { useNavigate } from "react-router-dom";
import { ReactElement, useState } from "react";
import { DropdownMenu } from "../../../components/DropdownMenu";

export const COLUMN_HEADERS = [
  { title: "Device/Location", className: "table__col-166" },
  { title: "Company", className: "table__col-166" },
  { title: "Project", className: "table__col-166" },
  { title: "State", className: "table__col-100" },
  { title: "Connection", className: "table__col-100" },
  { title: "", className: "table__col-menu" },
];

export const TABLE_HEADERS = ["Name", "Email", "Company", "Project", "Devices", ""];

export const ACTION_BUTTONS = [
  { icon: EditIco, action: ActionButtonType.Edit },
  { icon: AssignCompanyIco, action: ActionButtonType.AssignToCompany },
  { icon: AssignProjectIco, action: ActionButtonType.AssignToProject },
  { icon: DeactivateIco, action: ActionButtonType.Deactivate },
  { icon: DeleteIco, action: ActionButtonType.Delete },
];

type TableRowProps = {
  user: TUser;
  actionButtons: Array<{ icon: ReactElement; action: ActionButtonType }>;
};

export const TableRow = ({ user, actionButtons }: TableRowProps) => {
  const [{ projects }] = useStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = (userId: string) => {
    navigate(AdminPaths[EAdminRoutes.USER_PROFILE].replace(':id', userId));
  };

  const getProjectNames = (projectIds: string[]) => {
    if (!projectIds.length) return "-";
    return projectIds
      .map(id => projects.items.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="table-row" onClick={() => user.id && handleUserClick(user.id)}>
      <div className="cell">
        <span className="user-icon">{UsersIco}</span>
        {`${user.firstName} ${user.lastName}`}
      </div>
      <div className="cell">{user.email}</div>
      <div className="cell">{user.phone || 'N/A'}</div>
      <div className="cell">{user.projectIds ? getProjectNames(user.projectIds) : 'N/A'}</div>
      <div className="cell">{user.deviceIds?.length || 0}</div>
      <div className="cell">{user.role}</div>
      <div className="cell actions">
        <DropdownMenu
          isOpen={isDropdownOpen}
          onToggle={handleDropdownToggle}
        >
          {actionButtons.map((button, index) => (
            <button key={index}>
              {button.icon} {button.action}
            </button>
          ))}
        </DropdownMenu>
      </div>
    </div>
  );
};