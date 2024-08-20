import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarListView from './CalendarListView';
import { getRecruitCalendar } from '../../api/Apply/RecruitCalendar';
import { getRecruitListEndDate } from '../../api/Apply/RecruitEndDate'; 
import { useNavigate } from 'react-router-dom';

const AdCalendarStyled = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;  
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
  font-size: 17px;
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
    font-family: black;
    color: #707070;
    background-color: #f5f5f5;
    height: 40px;
    padding: 5px 0;
    font-size: 15px;
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.15);
    margin-top: -15px;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    border-bottom: none; 
    outline: none; 
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
  position: relative;
  background: none !important;
  color: #fff !important; 
  
}

.react-calendar__tile--active::before {
  content: '';
  position: absolute;
  width: 26px; 
  height: 26px;
  background-color: #3AAF85;
  border-radius: 50%;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.react-calendar__tile--active > * {
  position: relative;
  z-index: 1; 
  color: white; 
}

  .react-calendar__tile--now.react-calendar__tile--active {
    color: #3AAF85 !important;
  
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
    background-color: transparent !important;
    color: inherit !important;
    box-shadow: none !important;
  }

`;

const DayIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
  gap: 8px;
`;

const DayIndicator = styled.div`
  width: 9px;
  height: 9px;
  background-color: ${({ color }) => color || 'transparent'};
  border-radius: 50%;
  margin-left: 0px;
  margin-top: 0px;
`;

const CustomCalendar = ({ onChange, value, marks }) => {
  const renderDay = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const dayMarks = marks.filter(mark => mark.date === dateString).slice(0, 3);

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
  const [jobsForSelectedDate, setJobsForSelectedDate] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
  
        const calendarData = await getRecruitCalendar(year, month);
        const fetchedMarks = calendarData.dates.map(day => {
          const marksForDay = [];
  
          let remainingSpots = 3;
          const addMarks = (count, color) => {
            for (let i = 0; i < count && remainingSpots > 0; i++) {
              marksForDay.push({
                date: `${year}-${String(month).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`,
                color
              });
              remainingSpots--;
            }
          };
  
          addMarks(day.unapplied, '#D9D9D9');
          addMarks(day.planned, '#B0B0B0');
          addMarks(day.applying, '#707070');
          addMarks(day.accepted, '#78D333');
          addMarks(day.rejected, '#FA7C79');
  
          return marksForDay;
        }).flat();
  
        setMarks(fetchedMarks);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };
  
    fetchCalendarData();
  }, [date]);

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);

    const selectedDateStr = selectedDate.toISOString().split('T')[0];

    try {
        
        const jobs = await getRecruitListEndDate(selectedDateStr);

        setJobsForSelectedDate(jobs);
    } catch (error) {
        console.error('Error fetching job details:', error);
        setJobsForSelectedDate([]);
    }
  };

  const handleJobClick = (job) => {
    navigate(`/apply-detail/${job.recruitId}`, { state: { job } });
  };

  return (
    <AdCalendarStyled>
      <div>
        <CustomNavigation date={date} setDate={setDate} />
        <CustomCalendar
          onChange={handleDateChange}
          value={date}
          marks={marks}
        />
      </div>
      <CalendarListView 
      date={date.toISOString().split('T')[0]} 
      data={jobsForSelectedDate} 
      count={jobsForSelectedDate.length}  
      onJobClick={handleJobClick} 
    />
  </AdCalendarStyled>
  );
};

export default CalendarView;

