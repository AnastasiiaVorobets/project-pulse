import { Dispatch, JSX, SetStateAction } from "react";
import dayjs from "dayjs";
// @ts-ignore
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {TCompanyStatus} from "../utils/enums";

export type TState = {
  user: TUser | null,
  users: {
    items: TUser[],
    filteredItems: TUser[],
    isLoading: boolean,
  },
  breadcrumbs: TBreadcrumb[],
  devices: {
    items: TDevice[] | [],
    filteredItems: TDevice[] | [],
    isLoading: boolean,
  },
  projects: {
    items: TProject[],
    filteredItems: TProject[],
    isLoading: boolean,
  },
  notifications: {
    items: TNotification[],
    filteredItems: TNotification[],
    isLoading: boolean,
  },
  selectedDevice: TDevice | null,
  isLoading: boolean,
  error: string | null,
}

export type SetState = Dispatch<SetStateAction<TState>>

export type TCompany = {
  id: string;
  name: string;
  relatedProjects: TRelatesProject[];
  status: TCompanyStatus;
  userIds: string[];
}

export type TRelatesProject = {
  id: string;
  name: string;
  type: string;
}

export type TProject = {
  id: string;
  name: string;
  type: string;
  description: string;
  devices: string[];
  userIds: string[];
};

export type TBreadcrumb = {
  path: string,
  name: string
}

export type TCheckboxOptions = {
  deviceType: {
    items: TCheckboxOption[] | [],
    filteredItems: TCheckboxOption[] | [],
    selected: number[] | [],
  },
  connection: {
    items: TCheckboxOption[] | [],
    filteredItems: TCheckboxOption[] | [],
    selected: number[] | [],
  },
  company: {
    items: string[],
    filteredItems: string[],
    selected: string[],
  }
}

export type TCheckboxOption = {
  id: number,
  name: string
}

export type TOldDevice = {
  name: string,
  type: string,
  location: string,
  city: string,
  place: string,
  address: string,
  deviceType: TCheckboxOption,
  project: TCheckboxOption,
  state: string,
  connection: number,
  latLng: [number, number]
}

export type TDevice = {
  id: string;
  status: string;
  lastPingAt: Timestamp;
  type: string;
  fw_version: string;
  deviceId: string;
  latLng: [number, number];
  projectId: string;
  environmentData: {
    temperature: { min: string; mid: string; max: string, values: number[] };
    humidity: { min: string; mid: string; max: string, values: number[] };
    airPollution: { min: string; mid: string; max: string, values: number[] };
    gases: {
      PM10: { min: string; mid: string; max: string, values: number[]};
      PM2_5: { min: string; mid: string; max: string, values: number[] };
      NO2: { min: string; mid: string; max: string, values: number[] };
      O3: { min: string; mid: string; max: string, values: number[] };
      CO: { min: string; mid: string; max: string, values: number[] };
      SO2: { min: string; mid: string; max: string, values: number[] };
      NH3: { min: string; mid: string; max: string, values: number[] };
      Pb: { min: string; mid: string; max: string, values: number[] };
    };
  };
  modes: {
    mode1: {
      red: number;
      green: number;
      blue: number;
      brightness: number;
      default: false;
    };
    mode2: {
      default: false;
    };
    mode3: {
      red: number;
      green: number;
      blue: number;
      maxBrightness: number;
      waveSpeed: number;
      default: false;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};

export type TConnection = {
  [key: number]: { ico: JSX.Element; name: string }
}

export type TPopupData = {
  date: dayjs.Dayjs,
  parameters: TParameter[]
}

export type TParameter = {
  parameter: string,
  isActive: boolean,
  checkmarks: TCheckmark[]
}

export type TCheckmark = {
  label: string,
  sub?: string,
  isChecked: boolean
}

export type TUser = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  projectIds?: string[];
  deviceIds?: string[];
  password?: string;
};

export type TSignupForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export type TLoginForm = {
  email: TInputValue,
  password: TInputValue
}

export type TChangePasswordForm = {
  email: TInputValue,
}

export type TNewPasswordForm = {
  password: TInputValue,
  confirmPassword: TInputValue,
}

export type TInputValue = {
  value: string,
  touched: boolean,
  error: string | null,
}

export type TNotification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'error';
}
