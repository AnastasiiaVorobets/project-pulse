import React from 'react';
import { DevicesList } from "../pages/DevicesList";
import { Device } from "../pages/Device";
import { MapPage } from "../pages/Map";
import { Login } from "../pages/Login";
import { ChangePassword } from "../pages/ChangePassword";
import { NewPassword } from "../pages/NewPassword";
import { Signup } from "../pages/Signup";
import { ProjectsPage } from "../pages/Projects";
import {UsersList} from "../pages/UsersList";
import { ProjectDetails } from "../pages/ProjectDetails";
import { ProfilePage } from "../pages/Profile";
import {StyleGuide} from "../pages/StyleGuidePage";
import { UserProfile } from "../pages/UserProfile";
import Dashboard from "../pages/DashBoard";

export type TRoute = {
  path: string,
  component: React.ReactNode
}

export enum EGuestRoutes {
  SIGNUP = 'Signup',
  LOGIN = 'Login',
  CHANGE_PASSWORD = 'Change Password',
  NEW_PASSWORD = 'New Password'
}

export enum EAdminRoutes {
  DASHBOARD = 'Dashboard',
  DEVICES_LIST = 'Devices List',
  DEVICE = 'Device',
  MAP = 'Map',
  PROJECTS = 'Projects',
  USERS = 'Users',
  PROJECT_DETAILS = 'Project Details',
  SETTINGS = 'Settings',
  STYLE_GUIDE = 'Style Guide',
  USER_PROFILE = 'User Profile',
}

export const AdminPaths: Record<EAdminRoutes, string> = {
  [EAdminRoutes.DASHBOARD]: '/dashboard',
  [EAdminRoutes.DEVICES_LIST]: '/devices',
  [EAdminRoutes.DEVICE]: '/devices/:id',
  [EAdminRoutes.MAP]: '/map',
  [EAdminRoutes.PROJECTS]: '/projects',
  [EAdminRoutes.USERS]: '/users',
  [EAdminRoutes.PROJECT_DETAILS]: '/projects/:id',
  [EAdminRoutes.SETTINGS]: '/settings',
  [EAdminRoutes.STYLE_GUIDE]: '/styleguide',
  [EAdminRoutes.USER_PROFILE]: '/users/:id'
}

export const AdminRoutes: Record<EAdminRoutes, TRoute> = {
  [EAdminRoutes.DASHBOARD]: {
    path: AdminPaths[EAdminRoutes.DASHBOARD],
    component: <Dashboard />
  },
  [EAdminRoutes.DEVICES_LIST]: {
    path: AdminPaths[EAdminRoutes.DEVICES_LIST],
    component: <DevicesList />
  },
  [EAdminRoutes.DEVICE]: {
    path: AdminPaths[EAdminRoutes.DEVICE],
    component: <Device />
  },
  [EAdminRoutes.MAP]: {
    path: AdminPaths[EAdminRoutes.MAP],
    component: <MapPage />
  },
  [EAdminRoutes.PROJECTS]: {
    path: AdminPaths[EAdminRoutes.PROJECTS],
    component: <ProjectsPage />
  },
  [EAdminRoutes.USERS]: {
    path: AdminPaths[EAdminRoutes.USERS],
    component: <UsersList />
  },
  [EAdminRoutes.PROJECT_DETAILS]: {
    path: AdminPaths[EAdminRoutes.PROJECT_DETAILS],
    component: <ProjectDetails />
  },
  [EAdminRoutes.SETTINGS]: {
    path: AdminPaths[EAdminRoutes.SETTINGS],
    component: <ProfilePage />
  },
  [EAdminRoutes.STYLE_GUIDE]: {
    path: AdminPaths[EAdminRoutes.STYLE_GUIDE],
    component: <StyleGuide />
  },
  [EAdminRoutes.USER_PROFILE]: {
    path: AdminPaths[EAdminRoutes.USER_PROFILE],
    component: <UserProfile />
  }
}

export const GuestPaths: Record<EGuestRoutes, string> = {
  [EGuestRoutes.SIGNUP]: '/signup',
  [EGuestRoutes.LOGIN]: '/login',
  [EGuestRoutes.CHANGE_PASSWORD]: '/change-password',
  [EGuestRoutes.NEW_PASSWORD]: '/new-password'
}

export const GuestRoutes: Record<EGuestRoutes, TRoute> = {
  [EGuestRoutes.SIGNUP]: {
    path: GuestPaths[EGuestRoutes.SIGNUP],
    component: <Signup />
  },
  [EGuestRoutes.LOGIN]: {
    path: GuestPaths[EGuestRoutes.LOGIN],
    component: <Login />
  },
  [EGuestRoutes.CHANGE_PASSWORD]: {
    path: GuestPaths[EGuestRoutes.CHANGE_PASSWORD],
    component: <ChangePassword />
  },
  [EGuestRoutes.NEW_PASSWORD]: {
    path: GuestPaths[EGuestRoutes.NEW_PASSWORD],
    component: <NewPassword />
  }
}


