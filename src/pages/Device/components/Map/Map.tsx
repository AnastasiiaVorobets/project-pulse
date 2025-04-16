//@ts-nocheck
import "leaflet/dist/leaflet.css";
import "./index.scss";
import React, { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useStore } from "../../../../store/store";


const Map: FC = () => {
  const [{ selectedDevice }] = useStore()

  const center = [selectedDevice?.latLng[0], selectedDevice?.latLng[1]];
  const zoom = 20;

  return (
    <div className='map'>
      <MapContainer center={center} zoom={zoom} zoomControl={true} style={{ height: "400px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[selectedDevice?.latLng[0], selectedDevice?.latLng[1]]}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div/></div>`,
                  iconSize: [54, 65],
                  iconAnchor: [12, 65]
                })}
        >

        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map