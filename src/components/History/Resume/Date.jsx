import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Button, Datepicker, Page, setOptions } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const Date =({place_holder, onChange, value})=> {
  const [selectedDate, setSelectedDate] = useState(value || null);

  const handleDateChange =(event) =>{
    const newDate = event.value;
    setSelectedDate(newDate);
    if(onChange){
      onChange(newDate);
    }
  }

  return (
    <div className="custom-wrapper mbsc-ios.mbsc-textfield mbsc-ios.mbsc-textfield-inner-box mbsc-ios.mbsc-textfield-inner-outline " style={{ width: '145px' }}>
      <Datepicker
        controls={['date']}
        dateFormat="YYYY/MM"
        dateWheels="YYYY MMMM"
        inputStyle="outline"
        placeholder={place_holder}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default Date;