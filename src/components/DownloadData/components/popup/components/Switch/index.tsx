import "./index.scss";
import { Dispatch, FC, SetStateAction } from "react";
import { TParameter, TPopupData } from "../../../../../../types";

type TProps = {
  item: TParameter,
  data: TPopupData,
  setData: Dispatch<SetStateAction<TPopupData>>
}

export const Switch: FC<TProps> = ({ data, setData, item: { parameter, isActive } }) => {
  const handleToggle = () => {
    const newParameters = data.parameters.map((item) => {
      if (item.parameter === parameter) {
        return {
          ...item,
          isActive: !item.isActive
        }
      }
      return item
    })

    setData({
      ...data,
      parameters: newParameters
    })
  };

  return (
    <div className={`switch ${isActive ? 'on' : 'off'}`} onClick={handleToggle}>
      <div className="slider"/>
    </div>
  )
}