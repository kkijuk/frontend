import React, {useState} from "react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; 
import './DatePickerMultiCalendar.css'
import { format } from 'date-fns';
import { ko } from "date-fns/locale";

export default function DatePickerMultiCalendar(){
const [selected, setSelected] = useState(null);


    return (
        <div>
            <DayPicker
            mode="range"
            navLayout="around"
            locale={ko} 
            selected={selected}
            onSelect={setSelected}
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