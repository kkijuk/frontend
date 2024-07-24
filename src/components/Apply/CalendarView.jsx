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
  border: 10px;
  border-radius: 15px;
`;

const CalendarView = ({ date, setDate }) => {
  return (
    <AdCalendarStyled>
      <StyledCalendar onChange={setDate} value={date} />
    </AdCalendarStyled>
  );
};

export default CalendarView;
