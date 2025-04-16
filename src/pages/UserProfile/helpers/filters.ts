import { TState, SetState, TDevice, TProject } from "../../../types";
import { normalizeStringValue } from "../../../utils/helpers";


export const filterDevices = (items: TDevice[], setState: SetState, searchValue: string) => {
  let filteredData: TDevice[] = items;

  if (searchValue) {
    filteredData = filteredData.filter((device) => {
      return normalizeStringValue(device.deviceId).includes(normalizeStringValue(searchValue)) ||
        normalizeStringValue(device.type).includes(normalizeStringValue(searchValue)) ||
        normalizeStringValue(device.status).includes(normalizeStringValue(searchValue));
    });
  }

  return setState((prevState: TState) => ({
    ...prevState,
    devices: {
      ...prevState.devices,
      filteredItems: filteredData
    }
  }));
};

export const filterProjects = (items: TProject[], setState: SetState, searchValue: string) => {
  let filteredData: TProject[] = items;

  if (searchValue) {
    filteredData = filteredData.filter((project) => {
      return normalizeStringValue(project.name).includes(normalizeStringValue(searchValue));
    });
  }

  return setState((prevState: TState) => ({
    ...prevState,
    projects: {
      ...prevState.projects,
      filteredItems: filteredData
    }
  }));
}; 