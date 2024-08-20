import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, setOptions } from '@mobiscroll/react';
import { useState, useEffect } from 'react';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const DateComponent = ({ place_holder, onChange, value }) => {
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value)); // value가 문자열일 경우 Date 객체로 변환
        }
    }, [value]);

    const handleDateChange = (event) => {
        const newDate = event.value;
        setSelectedDate(newDate);
        if (onChange) {
            const formattedDate = formatDateToYearMonth(newDate);
            onChange(formattedDate); // YYYY-MM 형식으로 변환하여 전달
        }
    };

    const formatDateToYearMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return `${year}-${month < 10 ? `0${month}` : month}`;
    };

    return (
        <div className="custom-wrapper mbsc-ios.mbsc-textfield mbsc-ios.mbsc-textfield-inner-box mbsc-ios.mbsc-textfield-inner-outline" style={{ width: '145px' }}>
            <Datepicker
                controls={['date']}
                dateFormat="YYYY-MM"
                dateWheels="|MM YYYY"  // 월을 숫자로 표시
                inputStyle="outline"
                placeholder={place_holder}
                value={selectedDate}
                onChange={handleDateChange}
            />
        </div>
    );
}

export default DateComponent;
