import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Button, Datepicker, Page, setOptions } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const Date =({place_holder})=> {
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <div style={{width:'200px'}}>
      <Datepicker
        controls={['date']}
        dateFormat="YYYY/MM"
        dateWheels="YYYY MMMM"
        inputStyle="outline"
        placeholder={place_holder}
      />
    </div>
  );
}

export default Date;