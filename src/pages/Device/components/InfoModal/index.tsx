import "./index.scss";
import { Modal } from "../../../../components/Modal";
import { FC, RefObject } from "react";

type TProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  targetRef: RefObject<HTMLElement>;
}

export const InfoModal: FC<TProps> = ({ showModal, setShowModal, targetRef }) => {
  return (
    <Modal show={showModal}
           onClose={() => setShowModal(false)}
           targetRef={targetRef}
           fullScreen={true}
    >
      <h4 className="info-modal__title">AQI Category, Pollutants and Health Breakpoints </h4>
      <div className="info-modal__table table-info">
        <div className="table-info__row">
          <div className="table-info__cell head">AQI Category (range)</div>
          <div className="table-info__cell head">PM10</div>
          <div className="table-info__cell head">PM2,5</div>
          <div className="table-info__cell head">NO2</div>
          <div className="table-info__cell head">O3</div>
          <div className="table-info__cell head">CO</div>
          <div className="table-info__cell head">SO2</div>
          <div className="table-info__cell head">NH3</div>
          <div className="table-info__cell head">Pb</div>
        </div>
        <div className="table-info__row">
          <div className="table-info__cell none">None <span>0-50</span></div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-30</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-1.0</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-200</div>
          <div className="table-info__cell ">0-0.5</div>
        </div>
        <div className="table-info__row">
          <div className="table-info__cell maderate">Maderate <span>51-100</span></div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-30</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-1.0</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-200</div>
          <div className="table-info__cell ">0-0.5</div>
        </div>
        <div className="table-info__row">
          <div className="table-info__cell harmful">Harmful <span>101-250</span></div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-30</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-1.0</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-200</div>
          <div className="table-info__cell ">0-0.5</div>
        </div>
        <div className="table-info__row">
          <div className="table-info__cell very-harmful">Very harmful <span>251-350</span></div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-30</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-1.0</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-200</div>
          <div className="table-info__cell ">0-0.5</div>
        </div>
        <div className="table-info__row">
          <div className="table-info__cell dangerous">Dangerous <span>351-400</span></div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-30</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-1.0</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-200</div>
          <div className="table-info__cell ">0-0.5</div>
        </div>
        <div className="table-info__row">
          <div className="table-info__cell very-dangerous">Very dangerous <span>401-500</span></div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-30</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-50</div>
          <div className="table-info__cell ">0-1.0</div>
          <div className="table-info__cell ">0-40</div>
          <div className="table-info__cell ">0-200</div>
          <div className="table-info__cell ">0-0.5</div>
        </div>
      </div>
    </Modal>
  );
};
