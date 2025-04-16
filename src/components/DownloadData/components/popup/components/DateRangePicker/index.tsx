import "./index.scss";
import { ArrowLeftIco, ArrowRightIco, DatepickerIco } from "../../../../../../utils/constants/images";
import { Dispatch, FC, SetStateAction } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import { DatepickerTheme } from "../../../../../../utils/constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TPopupData } from "../../../../../../types";

type TProps = {
  data: TPopupData,
  setData: Dispatch<SetStateAction<TPopupData>>
};

export const DateRangePicker: FC<TProps> = ({ data, setData }) => {
  return (
    <div className='date-range-picker'>
      <button
        onClick={(event) => {
          event.preventDefault()
          setData({
            ...data,
            date: data.date.subtract(7, 'day')
          })
        }}
      >
        {ArrowLeftIco}
      </button>
      <div className='date-range-picker__wrap'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={DatepickerTheme}>
            <DatePicker
              className='datepicker__editor'
              views={['year', 'month', 'day']}
              disableFuture
              format="MMM DD, YYYY"
              sx={{
                width: 150,
                height: 40,
                backgroundColor: "#F2F4F8",
                padding: "8px 4px 8px 16px",
                '& .MuiInputBase-input': {
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400 !important',
                  fontSize: '16px !important',
                  padding: '0 !important',
                  lineHeight: '24px !important',
                  color: '#000213 !important',
                },
                '& .MuiButtonBase-root': {
                  padding: '0 !important',
                  width: 24,
                  height: 24
                },
                '& .MuiInputBase-root': {
                  paddingLeft: '10px !important',
                  paddingRight: '0px !important',
                },
                '& .MuiInputAdornment-root': {
                  width: 8
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { display: 'none !important' },
              }}
              slotProps={{
                inputAdornment: {
                  position: "start",
                }
              }}
              slots={{
                openPickerIcon: () => <img className="date-range-picker__ico" src={DatepickerIco} alt="ico"/>
              }}
              value={data.date}
              onChange={(value: any) => {
                setData({
                  ...data,
                  date: dayjs(value)
                })
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
        <p>-</p>
        <p>{data.date.add(7, 'day').format('MMM DD, YYYY')}</p>
      </div>
      <button
        onClick={(event) => {
          event.preventDefault()
          setData({
            ...data,
            date: data.date.add(7, 'day')
          })
        }}
      >
        {ArrowRightIco}
      </button>
    </div>
  )
}