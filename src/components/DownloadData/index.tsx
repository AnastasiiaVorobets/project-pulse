import "./index.scss";
import { DownloadIco } from "../../utils/constants/images";
import { Popup } from "./components/popup";
import { useState } from "react";

export const DownloadData = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button className='download-data'
              onClick={(event) => {
                event.preventDefault()
                setIsOpen(true)
              }}
      >
        {DownloadIco} Download Data
      </button>
      <Popup isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}