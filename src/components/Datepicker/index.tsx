import "./index.scss";
import { ArrowLeftIco, ArrowRightIco, DatepickerIco } from "../../utils/constants/images";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material";
import { DatepickerTheme } from "../../utils/constants";
import { useState } from "react";

export const Datepicker = () => {
  const [date, setDate] = useState(dayjs())

  return (
    <div className='datepicker__wrap'>
      <button
        onClick={(event) => {
          event.preventDefault()
          setDate(date.subtract(1, 'day'))
        }}
      >
        {ArrowLeftIco}
      </button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={DatepickerTheme}>
          <DatePicker
            className='datepicker__editor'
            views={['year', 'month', 'day']}
            disableFuture
            format="DD.MM.YYYY"
            sx={{
              width: 160,
              backgroundColor: "#FFFFFF",
              padding: "8px 16px",
              borderRadius: "8px",
              '& .MuiInputBase-input': {
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400 !important',
                fontSize: '16px !important',
                padding: '0 !important',
                lineHeight: '24px !important',
              },
              '& .MuiInputBase-root': {
                paddingRight: '0px !important',
              },
              '& .MuiButtonBase-root': {
                padding: '0 !important',
                width: 24,
                height: 24
              },
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { display: 'none !important' },
            }}
            slotProps={{
              inputAdornment: {
                position: "start",
              }
            }}
            slots={{
              openPickerIcon: () => <img className="datepicker__ico" src={DatepickerIco} alt="ico"/>
            }}
            value={date}
            onChange={(value: any) => {
              setDate(dayjs(value))
            }}
          />
        </ThemeProvider>
      </LocalizationProvider>
      <button
        onClick={(event) => {
          event.preventDefault()
          setDate(date.add(1, 'day'))
        }}
      >
        {ArrowRightIco}
      </button>
    </div>
  )
}