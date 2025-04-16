import "leaflet/dist/leaflet.css";
import "./index.scss";
import { FC, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { latLngBounds } from "leaflet";
import { TDevice } from "../../types";
import { useStore } from "../../store/store";
import { ConnectionTypes } from "../../utils/constants";
import { AdminPaths, EAdminRoutes } from "../../routes/Routes.tsx";
import { useNavigate } from "react-router-dom";

type TProps = {
  device: TDevice
}

const MarkerComponent: FC<TProps> = ({ device }) => {

  const navigate = useNavigate();

  const handleGoToDevice = (deviceId: string) => {
    navigate(AdminPaths[EAdminRoutes.DEVICE].replace(':id', deviceId));
  };

  return (
    <Marker position={[device?.latLng[0], device?.latLng[1]]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `<div/></div>`,
              iconSize: [54, 65],
              iconAnchor: [12, 65]
            })}
    >
      <Popup>
        <li className="devices-list__item device-item" onClick={() => handleGoToDevice(device.id)}>
          <div className="device-item__text-block">
            <p className="device-item__name">{device.deviceId}</p>
            <p className="device-item__address">{device.fw_version}</p>
          </div>
          <div className="device-item__status-block conn">
            <div className="conn__ico">
              {device.status === "Connected" ? ConnectionTypes[1].ico : ConnectionTypes[5].ico}
            </div>
            <div className={`conn__status ${device.status}`}>
              {device.status}
            </div>
          </div>
        </li>
      </Popup>
    </Marker>
  )
}

type TMapProps = {
  center: [number, number];
  setCenter: (center: [number, number]) => void;
}

const MapCenterUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);

  return null;
};

const Map: FC<TMapProps> = ({ center, setCenter }) => {
  const [{ devices: { filteredItems, items } }] = useStore()
  let zoom = 17

  const calculateMapCenter = (): [number, number] => {
    let latLngArray

    if (filteredItems.length === 0) {
      latLngArray = items
        .filter(item => item.latLng)
        .map(item => item.latLng)
    } else {
      latLngArray = filteredItems
        .filter(item => item.latLng)
        .map(item => item.latLng)
    }

    if (items.length === 0) {
      return [1, 1]
    }

    const latitudes = latLngArray.map(latLng => latLng[0])
    const longitudes = latLngArray.map(latLng => latLng[1])

    const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2
    const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2

    return [centerLat, centerLng]
  }

  const calculateMapZoom = (map: any) => {
    let latLngArray

    if (filteredItems.length === 0) {
      latLngArray = items
        .filter(item => item.latLng)
        .map(item => item.latLng)
    } else {
      latLngArray = filteredItems
        .filter(item => item.latLng)
        .map(item => item.latLng)
    }

    let markerBounds = latLngBounds([]);

    if (latLngArray.length) {
      latLngArray.forEach(marker => {
        const lat = isNaN(marker[0]) ? 1 : marker[0];
        const lng = isNaN(marker[1]) ? 1 : marker[1];

        markerBounds.extend([lat, lng])
      })

      map.fitBounds(markerBounds)
    }
  }

  useEffect(() => {
    const newCenter = calculateMapCenter()
    setCenter(newCenter)
  }, [setCenter])

  const ChangeView = () => {
    const map = useMap();

    calculateMapZoom(map)
    return null;
  }

  return (
    <div className='map'>
      <MapContainer 
        center={[center[0], center[1]]} 
        zoom={zoom} 
        zoomControl={true} 
        style={{ height: "600px" }}
      >
        <MapCenterUpdater center={center}/>
        <ChangeView/>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredItems.map((device: TDevice, index: number) =>
          <MarkerComponent device={device} key={`${index}-marker`}/>
        )}
      </MapContainer>
    </div>
  )
}

export default Map