import { useCallback, useRef } from "react";
import { debounce } from "lodash";
import { SearchIco } from "../../../../utils/constants/images.tsx";

import { search } from "../../helpers";
import { useStore } from "../../../../store/store.tsx";

import "./index.scss";

export const Filters = () => {
  const [{ devices }, setState] = useStore();
  const searchInputRef = useRef<any>(null);

  const debouncedSearch = useCallback(
    debounce((query) => {
      search(
        devices.items,
        setState,
        query
      );
    }, 500),
    [devices.items, setState]
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
          placeholder='Search'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};