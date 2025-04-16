export enum EDeviceInfoBlocks {
  INTEL_CONDITIONS = 'Intel Conditions',
  DISCHARGE_CONDITIONS = 'Discharge Conditions',
  PROCESS_CONDITIONS = 'Process Conditions',
  CHEMICAL_DOSING_RATES = 'Chemical Dosing Rates',
  CHEMICAL_LEVELS = 'Chemical Levels',
  CHEMICALS = 'Chemicals',
}

export enum EDeviceCards {
  DEVICE_NAME = 'Device Name',
  DEVICE_TYPE = 'Device Type',
  STATUS = 'Status',
  CONNECTION = 'Connection',
}

export enum EPasswordInputTypes {
  TEXT = 'text',
  PASSWORD = 'password',
}

export enum ECheckboxType {
  deviceType = 1,
  connection = 2,
  company = 3,
}

export enum TCompanyStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export enum Tabs {
  MAIN_PROFILE = "Main",
  ALLERT_PROFILE = "Allert",
  PROJECT_DEVICES = "Devices",
  PROJECT_USERS = "Users",
  PROJECT_MAP = "Map",
  COMPANY_PROJECTS = "Projects",
}

export enum AlertTypes {
  NEW_USER = 'newUser',
  DEVICE_OFFLINE = 'deviceOffline',
  THRESHOLD_EXCEEDED = 'thresholdExceeded'
}

export const AlertTitles = {
  [AlertTypes.NEW_USER]: 'Alert when a new user registers',
  [AlertTypes.DEVICE_OFFLINE]: 'Alert when device goes offline',
  [AlertTypes.THRESHOLD_EXCEEDED]: 'Alert when threshold is exceeded',
};

export const AlertDescriptions = {
  [AlertTypes.NEW_USER]: 'Lorem ipsum dolor sit amet consectetur. Sed adipiscing diam ullamcorper blandit pharetra volutpat enim mattis elementum dis eget amet consectetur. Sed adipiscing dia.',
  [AlertTypes.DEVICE_OFFLINE]: 'Lorem ipsum dolor sit amet consectetur. Sed adipiscing diam ullamcorper blandit pharetra volutpat enim mattis elementum dis eget amet consectetur. Sed adipiscing dia.',
  [AlertTypes.THRESHOLD_EXCEEDED]: 'Lorem ipsum dolor sit amet consectetur. Sed adipiscing diam ullamcorper blandit pharetra volutpat enim mattis elementum dis eget amet consectetur. Sed adipiscing dia.',
};

export enum ActionButtonType {
  Edit = "Edit",
  AssignToCompany = "Assign to company",
  AssignToProject = "Assign to project",
  Deactivate = "Deactivate",
  Delete = "Delete",
}

export enum EUserProfileTabs {
  COMPANIES = 'Companies',
  PROJECTS = 'Projects',
  DEVICES = 'Devices'
}

export enum TimePeriod {
  DAY = 'Day',
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year'
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer'
}
