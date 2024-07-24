import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';

const DatePickerWrapper = styled.div`
  z-index: 1000;  /* 다른 요소보다 앞에 나오게 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .react-datepicker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 281px;
    height: 239px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--gray-03, #D9D9D9);
    background: var(--white, #FFF);
  }

  .react-datepicker__header {
    background-color: #fff;
    border: none;
  }

  .react-datepicker__month {
  }

  .react-datepicker__day {
  }

  .react-datepicker__day:nth-child(1) {
    color: var(--sub-rd, #FA7C79);
  }

  .react-datepicker__day:nth-child(7) {
    color: var(--sub-bu, #77AFF2);
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: var(--main-01, #3AAF85);
    color: white;
    border-radius: 50%;
  }

  .react-datepicker__day--outside-month {
    color: #a8a8a8 !important;
    pointer-events: none;
  } /* 보여지는 달력 해당 월 아닌 다른 월 날짜는 회색 컬러로 글자 처리 */

  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    width: 139px;
    margin: 0 auto; /* 헤더를 가운데 정렬 */
  }

  .custom-header button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }

  .custom-header .current-month {
    font-weight: bold;
  }
`;

const formatDate = (date) => {
  if (!date) return null;
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
};

const parseDate = (date) => {
  if (!date) return null;
  return new Date(date.year, date.month - 1, date.day);
};

const Calendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (date) => {
    if (!startDate) {
      setStartDate(formatDate(date));
      setEndDate(null);
    } else if (!endDate) {
      const start = parseDate(startDate);
      if (date > start) {
        setEndDate(formatDate(date));
      } else {
        setStartDate(formatDate(date));
        setEndDate(null);
      }
    } else {
      setStartDate(formatDate(date));
      setEndDate(null);
    }
  };

  return (
    <DatePickerWrapper>
      <DatePicker
        selected={parseDate(startDate)}
        onSelect={onChange}
        startDate={parseDate(startDate)}
        endDate={parseDate(endDate)}
        inline
        calendarStartDay={0} // 일요일 시작
        locale={ko} // 한국어 로케일 설정
        highlightDates={[parseDate(startDate), parseDate(endDate)]}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-header">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M13 5L8 10L13 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="current-month">
              {date.getFullYear()}년 {date.toLocaleString('ko-KR', { month: 'long' })}
            </span>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M8 15L13 10L8 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      />
    </DatePickerWrapper>
  );
};

export default Calendar;
