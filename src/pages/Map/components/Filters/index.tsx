import { useEffect, useState } from "react";
import { SearchIco } from "../../../../utils/constants/images.tsx";

import "./index.scss";

export const Filters = ({ setCenter }: { setCenter: (center: [number, number]) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 600);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedQuery) return;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const firstResult = data[0];
          setCenter([parseFloat(firstResult.lat), parseFloat(firstResult.lon)]);
        }
      } catch (error) {
        console.error("Error searching location:", error);
      }
    };

    handleSearch();
  }, [debouncedQuery]);

  return (
    <div className='filters-wrapper'>
      <div className='input-wrap'>
        {SearchIco}
        <input
          type='text'
          placeholder='Search location'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
