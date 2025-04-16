import { TState, SetState, TUser } from "../../../types";
import { normalizeStringValue } from "../../../utils/helpers";

export const search = (
  items: TUser[],
  setState: SetState,
  searchValue: string,
) => {
  let filteredData: TUser[] = items;

  if (searchValue) {
    filteredData = filteredData.filter((object) => {
      return normalizeStringValue(object.firstName).includes(normalizeStringValue(searchValue)) ||
             normalizeStringValue(object.lastName).includes(normalizeStringValue(searchValue));
    });
  }


  return setState((prevState: TState) => ({
    ...prevState,
    users: {
      ...prevState.users,
      filteredItems: filteredData
    }
  }));
} 