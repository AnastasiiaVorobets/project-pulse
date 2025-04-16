import { TState, SetState, TProject } from "../../../types";
import { normalizeStringValue } from "../../../utils/helpers";

export const search = (
  items: TProject[], 
  setState: SetState,
  searchValue: string,
) => {
  let filteredData: TProject[] = items;

  if (searchValue) {
    const normalizedSearch = normalizeStringValue(searchValue);
    filteredData = filteredData.filter((project) => {
      return normalizeStringValue(project.name).includes(normalizedSearch);
    });
  }

  setState((prevState: TState) => ({
    ...prevState,
    projects: {
      ...prevState.projects,
      filteredItems: filteredData
    }
  }));
};