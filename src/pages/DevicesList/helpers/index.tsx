import { TState, SetState, TDevice } from "../../../types";
import { normalizeStringValue } from "../../../utils/helpers";

export const search = (items: TDevice[], setState: SetState, searchValue: string) => {
  let filteredData: TDevice[] = items;

  if (searchValue) {
    const normalizedSearch = normalizeStringValue(searchValue);
    filteredData = filteredData.filter((device) => {
      return normalizeStringValue(device.deviceId).includes(normalizedSearch) ||
             normalizeStringValue(device.type).includes(normalizedSearch);
    });
  }


  setState((prevState: TState) => ({
    ...prevState,
    devices: {
      ...prevState.devices,
      filteredItems: filteredData
    }
  }));
};