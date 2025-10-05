import React, {useState} from "react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; 
import './DatePickerMultiCalendar.css'
import { format } from 'date-fns';
import { ko } from "date-fns/locale";

export default function DatePickerMultiCalendar(){
const [selected, setSelected] = useState(undefined); // or useState<DateRange | undefined>(undefined)

const handleDateSelect = (range) => {
  if (!range) return setSelected(undefined);

  // 같은 날짜(from === to)도 DateRange 형태로 유지
  if (range.from && range.to && range.from.getTime() === range.to.getTime()) {
    setSelected({ from: range.from, to: range.to }); // ← 여기!
  } else {
    setSelected(range);
  }
};


    return (
        <div>
            <DayPicker
            mode="range"
            navLayout="around"
            locale={ko} 
            selected={selected}
            onSelect={handleDateSelect}
            showOutsideDays
            fixedWeeks
            formatters={{
                formatCaption: (date, options) => {
                return format(date, 'yyyy\u00a0\u00a0\u00a0 M월', { locale: ko });
                },
            }}
            />
        </div>
    );
}