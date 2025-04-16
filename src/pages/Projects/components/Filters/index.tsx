import { useCallback, useRef } from "react";
import { debounce } from "lodash";
import { useStore } from "../../../../store/store.tsx";
import { search } from "../../helpers";
import { SearchIco } from "../../../../utils/constants/images.tsx";

export const Filters = () => {
  const [{ projects }, setState] = useStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useCallback(
    debounce((query) => {
      search(projects.items, setState, query);
    }, 500),
    [projects.items, setState]
  );

  const handleChange = () => {
    if (searchInputRef.current) {
      debouncedSearch(searchInputRef.current.value);
    }
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