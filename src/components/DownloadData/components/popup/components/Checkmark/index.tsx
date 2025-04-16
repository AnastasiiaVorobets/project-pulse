import "./index.scss";
import { Dispatch, FC, SetStateAction } from "react";
import { TCheckmark, TParameter, TPopupData } from "../../../../../../types";

type TProps = {
  item: TParameter,
  checkmark: TCheckmark,
  data: TPopupData,
  setData: Dispatch<SetStateAction<TPopupData>>
}

export const Checkmark: FC<TProps> = ({ item: { parameter }, checkmark: { isChecked, label, sub }, setData, data }) => {
  const handleCheckboxChange = () => {
    const newParameters = data.parameters.map((item) => {
      if (item.parameter === parameter) {
        return {
          ...item,
          checkmarks: item.checkmarks.map((checkmark) => {
            if (checkmark.label === label && checkmark?.sub === sub) {
              return {
                ...checkmark,
                isChecked: !checkmark.isChecked
              }
            }
            return checkmark
          })
        }
      }
      return item
    })

    setData({
      ...data,
      parameters: newParameters
    })
  }

  return (
    <div className="checkmark">
      <input
        type="checkbox"
        id={`checkbox-${label + sub}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={`checkbox-${label + sub}`}>{label}{sub && <sub>{sub}</sub>}</label>
    </div>
  )
}