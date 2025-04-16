import "./index.scss";
import {
  AvatarEmptyState,
  LiveAir,
  LogoutIco,
  MenuIcon,
} from "../../utils/constants/images";
import { useNavigate } from "react-router-dom";
import { AdminPaths, EAdminRoutes } from "../../routes/Routes";
import { useStore } from "../../store/store";
import { useRef, useState, useEffect } from "react";
import { doSignOut } from "../../store/actions/authActions";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [{ user }, setState] = useStore();
  const targetRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      path: AdminPaths[EAdminRoutes.DASHBOARD],
      active: window.location.pathname === AdminPaths[EAdminRoutes.DASHBOARD]
    },
    {
      label: "Projects",
      path: AdminPaths[EAdminRoutes.PROJECTS],
      active: window.location.pathname.includes(AdminPaths[EAdminRoutes.PROJECTS])
    },
    {
      label: "Map",
      path: AdminPaths[EAdminRoutes.MAP],
      active: window.location.pathname.includes(AdminPaths[EAdminRoutes.MAP])
    },
    {
      label: "Devices",
      path: AdminPaths[EAdminRoutes.DEVICES_LIST],
      active: window.location.pathname.includes(AdminPaths[EAdminRoutes.DEVICES_LIST])
    },
    {
      label: "Users",
      path: AdminPaths[EAdminRoutes.USERS],
      active: window.location.pathname.includes(AdminPaths[EAdminRoutes.USERS])
    }
  ];

  const handleLogout = async () => {
    try {
      await doSignOut();
      setState(prev => ({ ...prev, user: null }));
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <aside ref={targetRef} style={user ? { display: 'flex' } : { display: 'none' }}>
      <div className="sidebar-header">
        <div className="logo-container">
          {LiveAir}
          <h1>LiveAir</h1>
        </div>
        <button className="toggle-btn" onClick={toggleMenu}>
          {MenuIcon}
        </button>
      </div>

      <nav className={isOpen ? 'open' : ''}>
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={item.active ? 'active' : ''}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            >
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className='user__wrap' onClick={() => {
          navigate(AdminPaths[EAdminRoutes.SETTINGS]);
          setIsOpen(false);
        }}>
          <img alt='avatar' src={AvatarEmptyState} className="user__icon" />
          <div className="user__info">
            <p>{`${user?.firstName} ${user?.lastName}`}</p>
          </div>
        </div>
        <button className="logout__btn" onClick={handleLogout}>
          {LogoutIco}
        </button>
      </div>
    </aside>
  );
};