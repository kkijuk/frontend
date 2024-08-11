import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails';

const AdCalendarStyled = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 800px;
  background: white;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  overflow: hidden;

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
    height: 40px;
    padding: 5px 0;
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.15);
    margin-top: -15px;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .react-calendar__month-view__days__day {
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset 0 0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset -0.5px 0 0 0 rgba(0, 0, 0, 0.15), 
                inset 0.5px 0 0 0 rgba(0, 0, 0, 0.15);
    border: none;
  }

  .react-calendar__tile {
    border-radius: 0;
    height: 50px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    color: inherit;
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset 0 0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset -0.5px 0 0 0 rgba(0, 0, 0, 0.15), 
                inset 0.5px 0 0 0 rgba(0, 0, 0, 0.15);
  }

  .react-calendar__tile--now {
    background: none !important;
    color: #3AAF85 !important;
    font-weight: bold !important;
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset 0 0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset -0.5px 0 0 0 rgba(0, 0, 0, 0.15), 
                inset 0.5px 0 0 0 rgba(0, 0, 0, 0.15) !important;
  }

  .react-calendar__tile--active {
    background: none !important;
    color: inherit !important;
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset 0 0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset -0.5px 0 0 0 rgba(0, 0, 0, 0.15), 
                inset 0.5px 0 0 0 rgba(0, 0, 0, 0.15) !important;
  }

  .react-calendar__tile--now.react-calendar__tile--active {
    color: #3AAF85 !important;
    font-weight: bold !important;
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.25), 
                inset 0 0.5px 0 0 rgba(0, 0, 0, 0.25), 
                inset -0.5px 0 0 0 rgba(0, 0, 0, 0.25), 
                inset 0.5px 0 0 0 rgba(0, 0, 0, 0.25) !important;
  }

  .react-calendar__tile--range {
    background: none !important;
    color: inherit !important;
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset 0 0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset -0.5px 0 0 0 rgba(0, 0, 0, 0.15), 
                inset 0.5px 0 0 0 rgba(0, 0, 0, 0.15);
  }

  .react-calendar__tile--hover {
    background: none !important;
    color: inherit !important;
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset 0 0.5px 0 0 rgba(0, 0, 0, 0.15), 
                inset -0.5px 0 0 0 rgba(0, 0, 0, 0.15), 
                inset 0.5px 0 0 0 rgba(0, 0, 0, 0.15);
  }
`;

const DayIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayIndicator = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${({ color }) => color || 'transparent'};
  border-radius: 50%;
  margin-left: 2px; /* 가로로 정렬 시 간격을 설정 */
`;

const CustomCalendar = ({ onChange, value, marks }) => {
  const renderDay = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const dayMarks = marks.filter(mark => mark.date === dateString).slice(0, 3); // 최대 3개의 동그라미만 표시

    return (
      <div>
        {date.getDate()}
        <DayIndicatorContainer>
          {dayMarks.map((mark, index) => (
            <DayIndicator key={index} color={mark.color} />
          ))}
        </DayIndicatorContainer>
      </div>
    );
  };

  return (
    <StyledCalendar
      onChange={onChange}
      value={value}
      formatDay={(locale, date) => renderDay(date)}
    />
  );
};

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-family: ExtraLight;
`;

const NavigationButtonleft = styled.button`
  font-size: 16px;
  margin-left: 330px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: Regular;
`;

const NavigationButtonright = styled.button`
  font-size: 16px;
  margin-right: 330px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: Regular;
`;

const NavigationText = styled.span`
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
  font-family: ExtraLight;
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
    <NavigationContainer>
      <NavigationButtonleft onClick={handlePrevMonth}>{'<'}</NavigationButtonleft>
      <NavigationText>{`${date.getFullYear()} ${monthNames[date.getMonth()]}`}</NavigationText>
      <NavigationButtonright onClick={handleNextMonth}>{'>'}</NavigationButtonright>
    </NavigationContainer>
  );
};

const CalendarView = ({ date, setDate }) => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      let fetchedMarks = [];
      
      for (let i = 1; i <= 100; i++) {
        try {
          const jobDetails = await getRecruitDetails(i);
          if (jobDetails && jobDetails.endTime) {
            const endTimeDate = new Date(jobDetails.endTime);
            const dateStr = endTimeDate.toISOString().split('T')[0];
            let color = 'blue';

            // 공고 상태에 따른 색상 지정
            if (jobDetails.status === 'ACCEPTED') color = '#78D333';
            else if (jobDetails.status === 'REJECTED') color = '#FA7C79';
            else if (jobDetails.status === 'APPLYING') color = '#707070';
            else if (jobDetails.status === 'UNAPPLIED') color = '#D9D9D9';
            else if (jobDetails.status === 'PLANNED') color = '#B0B0B0';


            fetchedMarks.push({ date: dateStr, color });
          }
        } catch (error) {
          console.error('Error fetching recruit details for ID:', i, error);
        }
      }

      setMarks(fetchedMarks);
    };

    fetchCalendarData();
  }, [date]);

  return (
    <AdCalendarStyled>
      <div>
        <CustomNavigation date={date} setDate={setDate} />
        <CustomCalendar
          onChange={setDate}
          value={date}
          marks={marks}
        />
      </div>
    </AdCalendarStyled>
  );
};

export default CalendarView;
