import { useCallback, useRef, useState } from "react";
import { debounce } from "lodash";
import { SearchIco } from "../../../../utils/constants/images.tsx";
import { useStore } from "../../../../store/store.tsx";
import "./index.scss";
import { search } from "../../helpers";

export const Filters = () => {
  const [{ users }, setState] = useStore();
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);


  const debouncedSearch = useCallback(
    debounce((query: string) => {
      search(
        users.items,
        setState,
        query,
      );
    }, 500),
    [users.items, setState]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <div className='filters-wrapper'>
      <div className='input-wrap'>
        {SearchIco}
        <input
          ref={searchInputRef}
          type='text'
          placeholder='Search'
          value={searchValue}
          onChange={handleChange}
        />
      </div>

    </div>
  );
};