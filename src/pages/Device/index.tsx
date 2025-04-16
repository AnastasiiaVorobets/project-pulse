import "./index.scss";
import { useStore } from "../../store/store";
import { Card } from "./components/Card/Card";
import Map from "./components/Map/Map";
import { useEffect, useRef, useState } from "react";
import { TState } from "../../types";
import { AdminPaths, EAdminRoutes } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import { Datepicker } from "../../components/Datepicker";
import { BlueSwitch } from "./components/Switch";
import { TemperatureChart } from "./components/DeviceChart/TemperatureChart";
import { HumidityChart } from "./components/DeviceChart/HumidityChart";
import { AirPollutionChart } from "./components/DeviceChart/AirPollutionChart";
import { GasesChart } from "./components/DeviceChart/GasesChart";
import { InfoModal } from "./components/InfoModal";
import { TimePeriod } from "../../utils/enums";
import { TIME_PERIODS } from "../../utils/constants";
import { InfoIco } from "../../utils/constants/images.tsx";

export const Device = () => {
  const { id } = useParams();
  const [{ selectedDevice, devices, projects }, setState] = useStore();
  const [showModal, setShowModal] = useState(false);
  const targetRef = useRef(null!);
  const [isActive, setIsActive] = useState<boolean>(null!);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(TimePeriod.DAY);

  useEffect(() => {
    setState((prevState: TState) => ({
      ...prevState,
      breadcrumbs: [
        { path: AdminPaths[EAdminRoutes.DEVICES_LIST], name: 'Devices' },
        {
          path: AdminPaths[EAdminRoutes.DEVICE].replace(/:id/g, selectedDevice?.id ?? ''),
          name: selectedDevice?.type ?? ''
        },
      ],
      selectedDevice: devices.filteredItems.find(el => el.id === id?.toString()) || null
    }));

    setIsActive(selectedDevice?.status === "Connected");
  }, [selectedDevice, devices.filteredItems, id, setState]);

  const temperature = selectedDevice?.environmentData?.temperature;
  const humidity = selectedDevice?.environmentData?.humidity;
  const airPollution = selectedDevice?.environmentData?.airPollution;
  const gases = selectedDevice?.environmentData?.gases;

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <div className='device' ref={targetRef}>

      <div className='device__main-header'>

        <div className='device__cards'>
          <h3 className="device__cards-title">{selectedDevice?.deviceId || ''}</h3>
          <Card
            label="Device"
            value="Device is turned on"
            switchToggle={
              <BlueSwitch
                isActive={isActive}
                onClick={async () => {
                  setIsActive((prev) => !prev);
                }}
              />
            }
          />
          <Card
            label="Project"
            value={selectedDevice?.projectId ? projects.items.find(p => p.id === selectedDevice.projectId)?.name || 'Not assigned' : 'Not assigned'}
          />
          <Card
            label="Connection"
            value={`Network: STR1_Network`}
            status={'Connected'}
          />

          <div className="device__info-footer">
            <Datepicker/>

            <div className="main-info__header">
              <div className="main-info__date-block">
                <ul className="main-info__period-list">
                  {TIME_PERIODS.map((period) => (
                    <li
                      key={period}
                      className={`main-info__period-item ${selectedPeriod === period ? '_active' : ''}`}
                      onClick={() => handlePeriodChange(period)}
                    >
                      {period}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {selectedDevice?.latLng &&
          <div className="device__location location-device">
            <div className="location-device__content">
              <p className="location-device__subtitle">Map</p>
              <Map/>
            </div>
          </div>
        }
      </div>


      <div
        className="device__info-modal"
        onClick={() => {setShowModal(true)}}
      >
        <h3>
          Main information
        </h3>
        <span
          className="tip"
          title={"Information"}
        >
        </span>
        {InfoIco}
      </div>
      <div className="device__main-info main-info">
        <div className="main-info__charts">
          <TemperatureChart data={temperature} period={selectedPeriod}/>
          <HumidityChart data={humidity} period={selectedPeriod}/>
          <AirPollutionChart data={airPollution} period={selectedPeriod}/>
        </div>
      </div>

      <div className="device__gases gases-device">
        <h3 className="gases-device__title device-info-title">
          Gases content in the air
        </h3>

        <div className="gases-device__charts">
          <GasesChart title={"CO2"} subtitle={""} values={gases?.CO.values} aggregateData={{ min: gases?.CO?.min ?? "", mid: gases?.CO?.mid ?? "", max: gases?.CO?.max ?? "" }} period={selectedPeriod}/>
          <GasesChart title={"NO2"} subtitle={""} values={gases?.NO2.values} aggregateData={{ min: gases?.NO2?.min ?? "", mid: gases?.NO2?.mid ?? "", max: gases?.NO2?.max ?? "" }} period={selectedPeriod}/>
          <GasesChart title={"SO2"} subtitle={""} values={gases?.SO2.values} aggregateData={{ min: gases?.SO2?.min ?? "", mid: gases?.SO2?.mid ?? "", max: gases?.SO2?.max ?? "" }} period={selectedPeriod}/>
          <GasesChart title={"PM10"} subtitle={""} values={gases?.PM10.values} aggregateData={{ min: gases?.PM10?.min ?? "", mid: gases?.PM10?.mid ?? "", max: gases?.PM10?.max ?? "" }} period={selectedPeriod}/>

          <GasesChart title={"CO"} subtitle={""} values={gases?.CO.values} aggregateData={{ min: gases?.CO?.min ?? "", mid: gases?.CO?.mid ?? "", max: gases?.CO?.max ?? "" }} period={selectedPeriod}/>
          <GasesChart title={"SO"} subtitle={"2"} values={gases?.SO2.values} aggregateData={{ min: gases?.SO2?.min ?? "", mid: gases?.SO2?.mid ?? "", max: gases?.CO?.max ?? "" }} period={selectedPeriod}/>
          <GasesChart title={"NH"} subtitle={"3"} values={gases?.NH3.values} aggregateData={{ min: gases?.NH3?.min ?? "", mid: gases?.NH3?.mid ?? "", max: gases?.NH3?.max ?? "" }} period={selectedPeriod}/>
          <GasesChart title={"Pb"} subtitle={""} values={gases?.Pb.values} aggregateData={{ min: gases?.Pb?.min ?? "", mid: gases?.Pb?.mid ?? "", max: gases?.Pb?.max ?? "" }} period={selectedPeriod}/>
        </div>
      </div>


      <InfoModal showModal={showModal} setShowModal={setShowModal} targetRef={targetRef}/>
    </div>
  )
}
