import "./index.scss";
import { ClosePopupIco } from "../../../../utils/constants/images";
import { DateRangePicker } from "./components/DateRangePicker";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import dayjs from "dayjs";
import { TPopupData } from "../../../../types";
import { ParameterBlock } from "./components/ParameterBlock";
import { useStore } from "../../../../store/store.tsx";
import { PdfLayout } from "../PdfLayout";
import { handleDownloadPDF } from "./utils.ts";

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Popup: FC<TProps> = ({ isOpen, setIsOpen }) => {
  const [{ selectedDevice }] = useStore();
  const ref = useRef(null!);

  const [data, setData] = useState<TPopupData>({
    date: dayjs(),
    parameters: [
      {
        parameter: 'Temperature',
        isActive: true,
        checkmarks: [
          {
            label: '°C',
            isChecked: true
          },
          {
            label: '°F',
            isChecked: false
          },
        ]
      },
      {
        parameter: 'Humidity',
        isActive: true,
        checkmarks: []
      },
      {
        parameter: 'Air pollution',
        isActive: true,
        checkmarks: []
      },
      {
        parameter: 'Gases contain in the air',
        isActive: true,
        checkmarks: [
          {
            label: 'PM',
            sub: "10",
            isChecked: true
          }, {
            label: 'PM',
            sub: "2.5",
            isChecked: true
          }, {
            label: 'NO',
            sub: "2",
            isChecked: true
          }, {
            label: 'O',
            sub: "3",
            isChecked: true
          }, {
            label: 'CO',
            isChecked: true
          }, {
            label: 'SO',
            sub: "2",
            isChecked: true
          }, {
            label: 'NH',
            sub: "3",
            isChecked: true
          }, {
            label: 'Pb',
            isChecked: true
          },
        ]
      },
    ],
  });

  return (
    <div className='popup__container' style={isOpen ? { display: "flex" } : { display: 'none' }} onClick={() => {
      setIsOpen(false)
    }}>
      <div className='popup' onClick={(e) => e.stopPropagation()}>
        <div className='popup__wrap'>
          <div className='popup__heading'>
            <p>Download data</p>
            <button onClick={(event) => {
              event.preventDefault()
              setIsOpen(false)
            }}
            >
              {ClosePopupIco}
            </button>
          </div>
          <div className='popup__data-wrap'>
            <p>Name</p>
            <div>{selectedDevice?.deviceId}</div>
          </div>
          <div className="popup__datepicker">
            <DateRangePicker data={data} setData={setData}/>
          </div>
          <div className='popup__parameters'>
            <h4 className="parameters-title">Parameters to include</h4>

            <div className="parameters-list">
              {data.parameters.map((item, index) => (
                <ParameterBlock key={index} item={item} data={data} setData={setData}/>
              ))}
            </div>
          </div>
          <button onClick={() => handleDownloadPDF(ref, selectedDevice?.deviceId || "")}>Download</button>
        </div>
      </div>

      <div style={
        {
          position: "absolute", top: "-999999999px"
        }
      }>
        <PdfLayout ref={ref} data={data}/>
      </div>
    </div>
  )
}