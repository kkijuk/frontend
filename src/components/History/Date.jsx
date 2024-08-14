import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Button, Datepicker, Page, setOptions } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import History from '../../pages/History/history.css';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const Date =({place_holder})=> {
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <div className="custom-wrapper mbsc-ios.mbsc-textfield mbsc-ios.mbsc-textfield-inner-box mbsc-ios.mbsc-textfield-inner-outline " style={{ width: '145px' }}>
      <Datepicker
        controls={['date']}
        dateFormat="YYYY/MM"
        dateWheels="YYYY MMMM"
        inputStyle="outline"
        placeholder={place_holder}
        // style={{margin:'0px'}}
      />
    </div>
  );
}

export default Date;