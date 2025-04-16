import { Dispatch, FC, SetStateAction } from "react";
import { TParameter, TPopupData } from "../../../../../../types";
import { Switch } from "../Switch";
import { Checkmark } from "../Checkmark";

type TProps = {
  item: TParameter,
  data: TPopupData,
  setData: Dispatch<SetStateAction<TPopupData>>
}

export const ParameterBlock: FC<TProps> = ({ item, item: { parameter, checkmarks, isActive }, setData, data }) => {
  return (
    <div className={`popup__parameter${isActive ? '-active' : ''}`}>
      <div className='popup__parameter-heading'>
        <p>{parameter}</p>
        <Switch data={data} setData={setData} item={item}/>
      </div>
      {checkmarks.map((checkmark, index) => (
        <Checkmark key={index} item={item} checkmark={checkmark} setData={setData} data={data}/>
      ))}
    </div>
  )
}