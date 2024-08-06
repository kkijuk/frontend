import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdCalendarStyled = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 800px;
  background: white;
  border: none;
  border-radius: 15px;
  color: #000;
text-align: center;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 140%; 


  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -30px;
    
  }

  .react-calendar__navigation button {
    display: none; 
    
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    color: #707070;
    background-color: #f5f5f5;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px 0;
  }

  .react-calendar__tile {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-calendar__tile--now {
    background: gray;
    color: white;
  }

  .react-calendar__tile--active {
    background: #007bff;
    color: white;
  }

  .react-calendar__tile--range {
    background: gray;
    color: white;
  }
`;

const CustomNavigation = ({ date, setDate }) => {
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const handlePrevMonth = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1);
    setDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
    setDate(nextMonth);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
      <button onClick={handlePrevMonth} style={{ fontSize: '16px', marginRight: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>{'<'}</button>
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{`${date.getFullYear()} ${monthNames[date.getMonth()]}`}</span>
      <button onClick={handleNextMonth} style={{ fontSize: '16px', marginLeft: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>{'>'}</button>
    </div>
  );
};

const CalendarView = ({ date, setDate }) => {
  return (
    <AdCalendarStyled>
      <div>
        <CustomNavigation date={date} setDate={setDate} />
        <StyledCalendar
          onChange={setDate}
          value={date}
        />
      </div>
    </AdCalendarStyled>
  );
};

export default CalendarView;


