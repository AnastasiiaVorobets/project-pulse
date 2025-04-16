import { useCallback, useRef } from "react";
import { debounce } from "lodash";

import { SearchIco } from "../../../../utils/constants/images.tsx";
import { useStore } from "../../../../store/store.tsx";

import "./index.scss";
import { filterDevices, filterProjects } from "../../helpers/filters";
import { EUserProfileTabs } from "../../../../utils/enums";

type TProps = {
  activeTab: EUserProfileTabs;
}

export const Filters: React.FC<TProps> = ({ activeTab }) => {
  const [{ devices, projects }, setState] = useStore();
  const searchInputRef = useRef<any>(null);

  const getFilterFunction = () => {
    switch (activeTab) {
      case EUserProfileTabs.DEVICES:
        return (query: string) => filterDevices(devices.items, setState, query);
      case EUserProfileTabs.PROJECTS:
        return (query: string) => filterProjects(projects.items, setState, query);
      default:
        return () => {};
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filterFn = getFilterFunction();
      filterFn(query);
    }, 500),
    [activeTab, devices.items, projects.items, setState]
  );

  const handleChange = () => {
    debouncedSearch(searchInputRef.current.value);
  };

  return (
    <div className='filters-wrapper'>
      <div className='input-wrap'>
        {SearchIco}
        <input
          ref={searchInputRef}
          type='text'
          placeholder={'Search'}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};