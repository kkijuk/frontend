//MyCareerDetail의 DetailAdd, DetailAddEdit 컴포넌트에서 사용

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

const CalendarWrapper = styled.div`
  .react-calendar {
    width: 281px;
    height: 263px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--gray-03, #D9D9D9);
    background: var(--white, #FFF);
    position: absolute;
    z-index: 10;
  }

  .react-calendar__navigation {
    justify-content: center;
    gap: 15px;
    height: 20px;
    margin-top: 15px;
  }

  .react-calendar__navigation__button {
    width: 20px;
    height: 20px;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
  }

  .react-calendar__navigation button .prev-icon {
    transform: rotate(180deg);
  }

  .react-calendar__navigation button .next-icon {
  }

  .react-calendar__month-view__weekdays__weekday:nth-child(1) {
    color: var(--sub-rd, #FA7C79);
  }

  .react-calendar__month-view__weekdays__weekday:nth-child(7) {
    color: var(--sub-bu, #77AFF2);
  }

  .react-calendar__tile {
    background: #fff;
    color: #000;
    margin-top: 3px;
    margin-bottom: 3px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-calendar__tile--now {
    background: none;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    width: 35px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: var(--main-01, #3AAF85) !important;
    color: var(--white, #FFF) !important;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: var(--main-03, #E1FAED); 
  }

  .react-calendar__tile--active {
    width: 35px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: var(--main-01, #3AAF85) !important;
    color: var(--white, #FFF) !important;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(66, 66, 66, 0.30);
    font-size: 14px;
    font-weight: 400;
  }
`;

const ChevronDownIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path d="M8 15L13 10L8 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ReactCalendar({ onChange }) {
  const [value, setValue] = useState([new Date(), new Date()]);
  const [isOpen, setIsOpen] = useState(true); //캘린더 외부 클릭시 닫히게 하기 위해 추가
  const calendarRef = useRef(); //얘도 위와 동일

  const handleDateChange = (date) => {
    if (Array.isArray(date)) {
      if (date.length === 1) {
        setValue([date[0], date[0]]);
      } else {
        setValue(date);
      }
    } else {
      setValue([date, date]);
    }
    onChange(date);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    isOpen && (
      <CalendarWrapper ref={calendarRef}>
        <Calendar
          onChange={handleDateChange}
          selectRange={true}
          value={value}
          formatDay={(locale, date) => moment(date).format('D')}
          calendarType="gregory"
          next2Label={null}
          prev2Label={null}
          nextLabel={<ChevronDownIcon className="next-icon" />}
          prevLabel={<ChevronDownIcon className="prev-icon" />}
          navigationLabel={({ date }) => moment(date).format('YYYY M월')}
          tileClassName={({ date, view }) => {
            if (moment(date).isSame(new Date(), 'day')) {
              return 'react-calendar__tile--now';
            }
            return '';
          }}
          showFixedNumberOfWeeks={true}
        />
      </CalendarWrapper>
    )
  );
}
