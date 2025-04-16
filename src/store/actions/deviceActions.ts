import { mockDevices } from "../../utils/mockData";

export const deleteDevice = async (deviceId: string): Promise<void> => {
  const deviceIndex = mockDevices.findIndex(d => d.id === deviceId);
  if (deviceIndex !== -1) {
    mockDevices.splice(deviceIndex, 1);
  }
}; 