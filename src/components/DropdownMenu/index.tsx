import { FC } from 'react';
import './index.scss';
import { MenuIcon } from "../../utils/constants/images.tsx";

type DropdownMenuProps = {
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

export const DropdownMenu: FC<DropdownMenuProps> = ({ isOpen, onToggle, children }) => {
  return (
    <div className="dropdown-container">
      <button 
        className="menu-button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(e);
        }}
      >
        {MenuIcon}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {children}
        </div>
      )}
    </div>
  );
};
