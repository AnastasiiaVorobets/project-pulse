import { TDevice, TNotification, TProject, TUser } from "../../types";


export const mockProjects: TProject[] = [
  {
    id: "proj_001",
    name: "Street Lighting",
    type: "Infrastructure",
    description: "Smart street lighting system for urban areas",
    devices: ["dev_001", "dev_002", "dev_003"],
    userIds: ["user_001", "user_003", "user_007", "user_011"]
  },
  {
    id: "proj_002",
    name: "Traffic Management",
    type: "Infrastructure",
    description: "Intelligent traffic control and monitoring system",
    devices: ["dev_004", "dev_005"],
    userIds: ["user_001", "user_007"]
  },
  {
    id: "proj_003",
    name: "Factory Automation",
    type: "Industrial",
    description: "Automated manufacturing process control",
    devices: ["dev_006", "dev_007", "dev_008"],
    userIds: ["user_002", "user_005", "user_009", "user_013"]
  },
  {
    id: "proj_004",
    name: "Energy Monitoring",
    type: "Utilities",
    description: "Real-time energy consumption tracking system",
    devices: ["dev_009", "dev_010"],
    userIds: ["user_004", "user_008", "user_012"]
  },
  {
    id: "proj_005",
    name: "Air Quality Monitoring",
    type: "Environmental",
    description: "Air quality measurement and analysis system",
    devices: ["dev_011", "dev_012"],
    userIds: ["user_004", "user_012"]
  },
  {
    id: "proj_006",
    name: "Waste Management",
    type: "Environmental",
    description: "Smart waste collection and monitoring system",
    devices: ["dev_004", "dev_005"],
    userIds: ["user_005", "user_009"]
  },
  {
    id: "proj_007",
    name: "Patient Monitoring",
    type: "Healthcare",
    description: "Remote patient health monitoring system",
    devices: ["dev_004", "dev_005"],
    userIds: ["user_004", "user_012"]
  },
  {
    id: "proj_008",
    name: "Asset Tracking",
    type: "Logistics",
    description: "Real-time asset location and status tracking",
    devices: ["dev_004", "dev_005"],
    userIds: ["user_004", "user_012"]
  },
  {
    id: "proj_009",
    name: "Crop Monitoring",
    type: "Agriculture",
    description: "Agricultural field monitoring and analysis",
    devices: ["dev_004", "dev_005"],
    userIds: ["user_004", "user_012"]
  },
  {
    id: "proj_010",
    name: "Irrigation Control",
    type: "Agriculture",
    description: "Automated irrigation system control",
    devices: ["dev_004", "dev_005"],
    userIds: ["user_004", "user_012"]
  },
];

export const mockUsers: TUser[] = [
  {
    id: "user_001",
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    projectIds: ["proj_001", "proj_002"],
    deviceIds: ["dev_001", "dev_002"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_002",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1234567891",
    email: "jane.smith@example.com",
    projectIds: ["proj_003"],
    deviceIds: ["dev_003"],
    password: "Password123!",
    role: "admin"
  },
  {
    id: "user_003",
    firstName: "Bob",
    lastName: "Johnson",
    phone: "+1234567892",
    email: "bob.johnson@example.com",
    projectIds: ["proj_001"],
    deviceIds: ["dev_004"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_004",
    firstName: "Alice",
    lastName: "Williams",
    phone: "+1234567893",
    email: "alice.williams@example.com",
    projectIds: ["proj_004", "proj_005"],
    deviceIds: ["dev_005", "dev_006"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_005",
    firstName: "Charlie",
    lastName: "Brown",
    phone: "+1234567894",
    email: "charlie.brown@example.com",
    projectIds: ["proj_003", "proj_006"],
    deviceIds: ["dev_007"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_006",
    firstName: "Diana",
    lastName: "Miller",
    phone: "+1234567895",
    email: "diana.miller@example.com",
    projectIds: ["proj_007"],
    deviceIds: ["dev_008", "dev_009"],
    password: "Password123!",
    role: "admin"
  },
  {
    id: "user_007",
    firstName: "Edward",
    lastName: "Davis",
    phone: "+1234567896",
    email: "edward.davis@example.com",
    projectIds: ["proj_001", "proj_002"],
    deviceIds: ["dev_010"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_008",
    firstName: "Fiona",
    lastName: "Garcia",
    phone: "+1234567897",
    email: "fiona.garcia@example.com",
    projectIds: ["proj_004"],
    deviceIds: ["dev_011", "dev_012"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_009",
    firstName: "George",
    lastName: "Wilson",
    phone: "+1234567898",
    email: "george.wilson@example.com",
    projectIds: ["proj_003", "project_006"],
    deviceIds: ["dev_013"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_010",
    firstName: "Hannah",
    lastName: "Martinez",
    phone: "+1234567899",
    email: "hannah.martinez@example.com",
    projectIds: ["proj_007"],
    deviceIds: ["dev_014", "dev_015"],
    password: "Password123!",
    role: "admin"
  },
  {
    id: "user_011",
    firstName: "Ian",
    lastName: "Anderson",
    phone: "+1234567900",
    email: "ian.anderson@example.com",
    projectIds: ["proj_001"],
    deviceIds: ["dev_016"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_012",
    firstName: "Julia",
    lastName: "Taylor",
    phone: "+1234567901",
    email: "julia.taylor@example.com",
    projectIds: ["proj_004", "proj_005"],
    deviceIds: ["dev_017", "dev_018"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_013",
    firstName: "Kevin",
    lastName: "Thomas",
    phone: "+1234567902",
    email: "kevin.thomas@example.com",
    projectIds: ["proj_003"],
    deviceIds: ["dev_019"],
    password: "Password123!",
    role: "user"
  },
  {
    id: "user_014",
    firstName: "Laura",
    lastName: "White",
    phone: "+1234567903",
    email: "laura.white@example.com",
    projectIds: ["proj_007"],
    deviceIds: ["dev_020"],
    password: "Password123!",
    role: "admin"
  }
];

export const mockDevices: TDevice[] = [
  {
    id: "dev_001",
    status: "Connected",
    lastPingAt: new Date(),
    type: "Smart Light",
    fw_version: "v2.1.0",
    deviceId: "SL-001",
    latLng: [40.7128, -74.0060],
    environmentData: {
      temperature: { min: "3°C", mid: "13°C", max: "19°C", values: [2.5, 5, 4, 7, 1, 2.5, 6], },
      humidity: { min: "53%", mid: "68%", max: "72%", values: [14, 22, 5, 8, 20, 10, 5], },
      airPollution: {
        min: "34",
        mid: "46",
        max: "88",
        values: [15, 10, 40, 120, 175, 100, 50],
      },
      gases: {
        PM10: { min: "54", mid: "69", max: "78" , values: [10, 40, 140, 122, 50, 35, 60]},
        PM2_5: { min: "42", mid: "48", max: "59", values: [50, 40, 140, 80, 50, 35, 40] },
        NO2: { min: "63", mid: "72", max: "89", values: [30, 40, 140, 122, 50, 35, 20] },
        O3: { min: "54", mid: "69", max: "78", values: [20, 40, 140, 122, 20, 35, 80] },
        CO: { min: "1.2", mid: "1.9", max: "2.4", values: [80, 40, 140, 122, 50, 35, 90] },
        SO2: { min: "65", mid: "69", max: "78", values: [50, 40, 140, 40, 50, 35, 55] },
        NH3: { min: "120", mid: "128", max: "139", values: [100, 40, 140, 122, 50, 35, 140] },
        Pb: { min: "0.3", mid: "0.8", max: "1.2", values: [700, 40, 140, 122, 50, 35, 140] },
      }
    },
    projectId: "proj_002",
    modes: {
      mode1: {
        red: 255,
        green: 255,
        blue: 255,
        brightness: 80,
        default: false,
      },
      mode2: {
        default: false,
      },
      mode3: {
        red: 255,
        green: 255,
        blue: 255,
        maxBrightness: 100,
        waveSpeed: 1,
        default: false,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dev_002",
    status: "Connected",
    lastPingAt: new Date(),
    type: "Traffic Sensor",
    fw_version: "v1.5.0",
    deviceId: "TS-001",
    latLng: [51.5074, -0.1278],
    environmentData: {
      temperature: { min: "5°C", mid: "15°C", max: "20°C", values: [1.5, 4, 0.5, 1, 2, 3, 4], },
      humidity: { min: "50%", mid: "65%", max: "75%", values: [15, 30, 22, 2, 80, 11, 44],},
      airPollution: {
        min: "19",
        mid: "24",
        max: "38",
        values: [225, 150, 40, 120, 375, 100, 50],
      },
      gases: {
        PM10: { min: "50", mid: "60", max: "70", values: [30, 40, 140, 20, 50, 35, 140] },
        PM2_5: { min: "40", mid: "50", max: "60", values: [10, 40, 140, 122, 50, 35, 140] },
        NO2: { min: "60", mid: "70", max: "80", values: [60, 40, 60, 122, 50, 35, 35] },
        O3: { min: "50", mid: "60", max: "70", values: [50, 40, 140, 70, 50, 35, 140] },
        CO: { min: "1.0", mid: "1.5", max: "2.0" , values: [80, 40, 20, 122, 50, 35, 140]},
        SO2: { min: "60", mid: "65", max: "70", values: [40, 40, 140, 122, 50, 35, 90] },
        NH3: { min: "110", mid: "120", max: "130", values: [80, 40, 40, 122, 50, 35, 50] },
        Pb: { min: "0.2", mid: "0.6", max: "1.0", values: [90, 40, 80, 122, 50, 35, 140] },
      }
    },
    projectId: "proj_001",
    modes: {
      mode1: {
        red: 0,
        green: 0,
        blue: 0,
        brightness: 0,
        default: false,
      },
      mode2: {
        default: false,
      },
      mode3: {
        red: 0,
        green: 0,
        blue: 0,
        maxBrightness: 0,
        waveSpeed: 0,
        default: false,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dev_003",
    status: "Disabled",
    lastPingAt: new Date(),
    type: "Air Quality Sensor",
    fw_version: "v2.0.0",
    deviceId: "AQS-001",
    latLng: [48.8566, 2.3522],
    environmentData: {
      temperature: { min: "5°C", mid: "15°C", max: "20°C", values: [1.5, 4, 2, 2.5, 0, 1, 3], },
      humidity: { min: "50%", mid: "65%", max: "75%", values: [15, 45, 22, 2, 8, 11, 23], },
      airPollution: {
        min: "34",
        mid: "46",
        max: "68",
        values: [50, 75, 100, 120, 175, 100, 50],
      },
      gases: {
        PM10: { min: "50", mid: "60", max: "70" , values: [160, 140, 90, 48, 50, 175, 70] },
        PM2_5: { min: "40", mid: "50", max: "60", values: [60, 110, 190, 148, 70, 75, 170] },
        NO2: { min: "60", mid: "70", max: "80", values: [16, 40, 190, 28, 150, 75, 70] },
        O3: { min: "50", mid: "60", max: "70" , values: [80, 65, 35, 180, 125, 65, 150]},
        CO: { min: "1.0", mid: "1.5", max: "2.0", values: [10, 40, 140, 122, 80, 35, 60] },
        SO2: { min: "60", mid: "65", max: "70",  values: [30, 40, 140, 122, 50, 35, 140] },
        NH3: { min: "110", mid: "120", max: "130",  values: [10, 40, 140, 100, 80, 35, 60] },
        Pb: { min: "0.2", mid: "0.6", max: "1.0",  values: [20, 40, 40, 122, 80, 60, 60] },
      }
    },
    projectId: "proj_001",
    modes: {
      mode1: {
        red: 0,
        green: 0,
        blue: 0,
        brightness: 0,
        default: false,
      },
      mode2: {
        default: false,
      },
      mode3: {
        red: 0,
        green: 0,
        blue: 0,
        maxBrightness: 0,
        waveSpeed: 0,
        default: false,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dev_004",
    status: "Connected",
    lastPingAt: new Date(),
    type: "Smart Irrigation",
    fw_version: "v1.8.0",
    deviceId: "SI-001",
    latLng: [35.6762, 139.6503],
    environmentData: {
      temperature: { min: "8°C", mid: "18°C", max: "25°C", values: [7, 9, 12, 15, 18, 20, 22], },
      humidity: { min: "45%", mid: "60%", max: "80%", values: [40, 45, 50, 55, 60, 65, 70], },
      airPollution: {
        min: "20",
        mid: "35",
        max: "50",
        values: [15, 20, 25, 30, 35, 40, 45],
      },
      gases: {
        PM10: { min: "30", mid: "45", max: "60", values: [25, 30, 35, 40, 45, 50, 55] },
        PM2_5: { min: "20", mid: "35", max: "50", values: [15, 20, 25, 30, 35, 40, 45] },
        NO2: { min: "40", mid: "55", max: "70", values: [35, 40, 45, 50, 55, 60, 65] },
        O3: { min: "30", mid: "45", max: "60", values: [25, 30, 35, 40, 45, 50, 55] },
        CO: { min: "0.5", mid: "1.0", max: "1.5", values: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] },
        SO2: { min: "40", mid: "55", max: "70", values: [35, 40, 45, 50, 55, 60, 65] },
        NH3: { min: "80", mid: "100", max: "120", values: [70, 80, 90, 100, 110, 120, 130] },
        Pb: { min: "0.1", mid: "0.3", max: "0.5", values: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] },
      }
    },
    projectId: "proj_002",
    modes: {
      mode1: {
        red: 0,
        green: 255,
        blue: 0,
        brightness: 80,
        default: false,
      },
      mode2: {
        default: false,
      },
      mode3: {
        red: 0,
        green: 255,
        blue: 0,
        maxBrightness: 100,
        waveSpeed: 1,
        default: false,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dev_005",
    status: "Connected",
    lastPingAt: new Date(),
    type: "Smart Parking",
    fw_version: "v2.2.0",
    deviceId: "SP-001",
    latLng: [52.5200, 13.4050],
    environmentData: {
      temperature: { min: "10°C", mid: "20°C", max: "30°C", values: [8, 12, 15, 18, 22, 25, 28], },
      humidity: { min: "40%", mid: "55%", max: "70%", values: [35, 40, 45, 50, 55, 60, 65], },
      airPollution: {
        min: "25",
        mid: "40",
        max: "55",
        values: [20, 25, 30, 35, 40, 45, 50],
      },
      gases: {
        PM10: { min: "35", mid: "50", max: "65", values: [30, 35, 40, 45, 50, 55, 60] },
        PM2_5: { min: "25", mid: "40", max: "55", values: [20, 25, 30, 35, 40, 45, 50] },
        NO2: { min: "45", mid: "60", max: "75", values: [40, 45, 50, 55, 60, 65, 70] },
        O3: { min: "35", mid: "50", max: "65", values: [30, 35, 40, 45, 50, 55, 60] },
        CO: { min: "0.8", mid: "1.3", max: "1.8", values: [0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3] },
        SO2: { min: "45", mid: "60", max: "75", values: [40, 45, 50, 55, 60, 65, 70] },
        NH3: { min: "90", mid: "110", max: "130", values: [80, 90, 100, 110, 120, 130, 140] },
        Pb: { min: "0.2", mid: "0.4", max: "0.6", values: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] },
      }
    },
    projectId: "proj_002",
    modes: {
      mode1: {
        red: 255,
        green: 0,
        blue: 0,
        brightness: 80,
        default: false,
      },
      mode2: {
        default: false,
      },
      mode3: {
        red: 255,
        green: 0,
        blue: 0,
        maxBrightness: 100,
        waveSpeed: 1,
        default: false,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dev_006",
    status: "Connected",
    lastPingAt: new Date(),
    type: "Smart Waste Bin",
    fw_version: "v1.5.0",
    deviceId: "SWB-001",
    latLng: [41.9028, 12.4964],
    environmentData: {
      temperature: { min: "12°C", mid: "22°C", max: "32°C", values: [10, 14, 18, 22, 26, 30, 34], },
      humidity: { min: "35%", mid: "50%", max: "65%", values: [30, 35, 40, 45, 50, 55, 60], },
      airPollution: {
        min: "30",
        mid: "45",
        max: "60",
        values: [25, 30, 35, 40, 45, 50, 55],
      },
      gases: {
        PM10: { min: "40", mid: "55", max: "70", values: [35, 40, 45, 50, 55, 60, 65] },
        PM2_5: { min: "30", mid: "45", max: "60", values: [25, 30, 35, 40, 45, 50, 55] },
        NO2: { min: "50", mid: "65", max: "80", values: [45, 50, 55, 60, 65, 70, 75] },
        O3: { min: "40", mid: "55", max: "70", values: [35, 40, 45, 50, 55, 60, 65] },
        CO: { min: "1.0", mid: "1.5", max: "2.0", values: [0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5] },
        SO2: { min: "50", mid: "65", max: "80", values: [45, 50, 55, 60, 65, 70, 75] },
        NH3: { min: "100", mid: "120", max: "140", values: [90, 100, 110, 120, 130, 140, 150] },
        Pb: { min: "0.3", mid: "0.5", max: "0.7", values: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8] },
      }
    },
    projectId: "proj_003",
    modes: {
      mode1: {
        red: 0,
        green: 0,
        blue: 255,
        brightness: 80,
        default: false,
      },
      mode2: {
        default: false,
      },
      mode3: {
        red: 0,
        green: 0,
        blue: 255,
        maxBrightness: 100,
        waveSpeed: 1,
        default: false,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

export const mockNotifications: TNotification[] = [
  {
    id: '1',
    title: 'Device Offline',
    message: 'Device ID: DEV001 has gone offline',
    timestamp: new Date().toISOString(),
    isRead: false,
    type: 'warning'
  },
  {
    id: '2',
    title: 'High Temperature Alert',
    message: 'Device ID: DEV002 reported temperature above threshold',
    timestamp: new Date().toISOString(),
    isRead: false,
    type: 'error'
  },
  {
    id: '3',
    title: 'New Device Connected',
    message: 'Device ID: DEV003 has been successfully connected',
    timestamp: new Date().toISOString(),
    isRead: false,
    type: 'info'
  },
  {
    id: '4',
    title: 'System Update Available',
    message: 'A new system update v2.1.5 is available for your devices',
    timestamp: new Date().toISOString(),
    isRead: false,
    type: 'info'
  },
  {
    id: '5',
    title: 'Critical Battery Level',
    message: 'Device ID: DEV004 battery level is below 10%',
    timestamp: new Date().toISOString(),
    isRead: false,
    type: 'error'
  }
]; 