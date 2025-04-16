import {
  HidePasswordIco,
  HighConnectionIco,
  LowConnectionIco,
  MediumConnectionIco,
  OfflineConnectionIco, ShowPasswordIco,
  StrongConnectionIco
} from "./images";
import { TConnection, TState } from "../../types";
import { createTheme } from "@mui/material";
import { EPasswordInputTypes, TimePeriod } from "../enums";
import { mockDevices, mockProjects, mockUsers, mockNotifications } from "../mockData";

export const defaultStoreState: TState = {
  user: mockUsers[0],
  devices: {
    items: mockDevices,
    filteredItems: mockDevices,
    isLoading: false,
  },
  users: {
    items: mockUsers,
    filteredItems: mockUsers,
    isLoading: false,
  },
  projects: {
    items: mockProjects,
    filteredItems: mockProjects,
    isLoading: false,
  },
  notifications: {
    items: mockNotifications,
    filteredItems: mockNotifications,
    isLoading: false,
  },
  breadcrumbs: [],
  selectedDevice: null,
  isLoading: false,
  error: '',
};

export const ConnectionTypes: TConnection = {
  1: {
    ico: StrongConnectionIco,
    name: 'Strong',
  },
  2: {
    ico: HighConnectionIco,
    name: 'High',
  },
  3: {
    ico: MediumConnectionIco,
    name: 'Medium',
  },
  4: {
    ico: LowConnectionIco,
    name: 'Low',
  },
  5: {
    ico: OfflineConnectionIco,
    name: 'Offline',
  },
}

export const SolidLevels = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F'
}

export const DatepickerTheme = createTheme({
  palette: {
    primary: {
      main: '#4186F5',
      light: '#4186F5',
      dark: '#4186F5',
      contrastText: '#fff',
    }
  },
});

export const PasswordInputIcons: Record<EPasswordInputTypes, string> = {
  [EPasswordInputTypes.TEXT]: HidePasswordIco,
  [EPasswordInputTypes.PASSWORD]: ShowPasswordIco
}

export const TIME_PERIODS = Object.values(TimePeriod);

export const CHART_LABELS = {
  [TimePeriod.DAY]: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
  [TimePeriod.WEEK]: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  [TimePeriod.MONTH]: Array.from({length: 31}, (_, i) => (i + 1).toString()),
  [TimePeriod.YEAR]: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

export const CHART_COLORS = {
  primary: {
    backgroundColor: "rgba(69, 136, 236, 0.16)",
    borderColor: '#00BFC7',
    pointBackgroundColor: '#00BFC7'
  },
  bar: {
    backgroundColor: "#00BFC7",
    borderColor: '#4588EC',
    borderRadius: 5,
    barThickness: 16
  },
  monthBar: {
    backgroundColor: "#00BFC7",
    borderColor: '#4588EC',
    borderRadius: 3,
    barThickness: 4,
    barPercentage: 0.6,
    categoryPercentage: 0.7,
    maxBarThickness: 6
  }
};

export const CHART_GRID_COLORS = {
  danger: 'rgba(255, 94, 94, 1)',
  warning: 'rgba(247, 153, 159, 1)',
  caution: 'rgba(247, 204, 153, 1)',
  good: 'rgba(153, 199, 247, 1)',
  excellent: 'rgba(153, 230, 247, 1)',
  default: 'rgba(200, 200, 200, 0.3)'
};

export const CHART_SCALES = {
  temperature: {
    min: -20,
    max: 40,
    stepSize: 10,
    format: (value: number) => `${value}°`
  },
  humidity: {
    min: 0,
    max: 100,
    stepSize: 16.666,
    format: (value: number) => `${value}%`
  },
  airPollution: {
    min: 0,
    max: 600,
    stepSize: 100,
    format: (value: number) => value.toString()
  }
};