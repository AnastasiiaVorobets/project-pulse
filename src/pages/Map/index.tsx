import "./index.scss";
import { useStore } from "../../store/store";
import React, { useState } from "react";
import Map from "../../components/Map/Map";
import { DeviceItem } from "./DeviceItem";
import { Filters } from "./components/Filters";

export const MapPage = () => {
  const [{ devices }, ] = useStore()
  const [center, setCenter] = useState<[number, number]>([49.8417, 24.0319])
  const [page, setPage] = useState(1);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className='devices map-page'>
      <div className="content">
        <div className='map-container'>
          <Filters setCenter={setCenter} />
          <Map center={center} setCenter={setCenter}/>
        </div>
        <div className="devices-block">
          <p className="devices-block__title">All devices</p>
          <ul className="devices-list" onScroll={handleScroll}>
            {[...devices.filteredItems,].slice(0, page * 10).map((device, index) => (
              <DeviceItem device={device} key={index} setCenter={setCenter}/>
            ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}