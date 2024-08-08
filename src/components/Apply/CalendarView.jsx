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
    height: 40px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 5px 0; /* 요일 구분 영역 높이 조정 */
    border-bottom: 1px solid #dcdcdc; /* 요일 구분 가로 회색선 */
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none; /* 요일 밑줄 제거 */
  }

  .react-calendar__month-view__days__day {
    box-shadow: inset 0 -0.25px 0 0 rgba(0, 0, 0, 0.3), inset -0.25px 0 0 0 rgba(0, 0, 0, 0.3); /* 날짜 구분 회색선, 더 진하게 */
  }

  .react-calendar__tile {
    border-radius: 0; /* 둥근 모서리를 제거하여 직선으로 만듭니다 */
    height: 50px; /* 날짜 타일 높이 조정 */
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    color: inherit;
    box-shadow: inset 0 -0.25px 0 0 rgba(0, 0, 0, 0.3), inset -0.25px 0 0 0 rgba(0, 0, 0, 0.3); /* 날짜 타일 구분 회색선, 더 진하게 */
    &:hover {
      background: none;
    }
  }

  .react-calendar__tile--now {
    background: none !important;
    color: #3AAF85 !important; /* 오늘 날짜 글자색을 설정합니다 */
    font-weight: bold !important; /* 오늘 날짜 글자를 볼드체로 설정합니다 */
    box-shadow: inset 0 -0.25px 0 0 rgba(0, 0, 0, 0.5), inset -0.25px 0 0 0 rgba(0, 0, 0, 0.5); /* 오늘 날짜 타일 구분 회색선, 더 진하게 */
  }

  .react-calendar__tile--active {
    background: none !important;
    color: inherit !important;
  }

  .react-calendar__tile--now.react-calendar__tile--active {
    color: #3AAF85 !important; /* 오늘 날짜가 활성화된 경우에도 초록색을 유지합니다 */
    font-weight: bold !important;
  }

  .react-calendar__tile--range {
    background: none !important;
    color: inherit !important;
  }

  .react-calendar__tile--hover {
    background: none !important;
    color: inherit !important;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-family: ExtraLight; /* 원하는 글씨체를 적용 */
`;

const NavigationButtonleft = styled.button`
  font-size: 16px;
  margin-left: 330px; /* 버튼과 텍스트 사이의 간격을 줄입니다 */
  background: none;
  border: none;
  cursor: pointer;
  font-family: REgular; /* 원하는 글씨체를 적용 */
`;

const NavigationButtonright = styled.button`
  font-size: 16px;
  margin-right: 330px; /* 버튼과 텍스트 사이의 간격을 줄입니다 */
  background: none;
  border: none;
  cursor: pointer;
  font-family: Regular; /* 원하는 글씨체를 적용 */
`;

const NavigationText = styled.span`
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
  font-family: ExtraLight; /* 원하는 글씨체를 적용 */
`;

const CustomCalendar = ({ onChange, value }) => {
  const renderDay = (date) => {
    return <div>{date.getDate()}</div>;
  };

  return (
    <StyledCalendar
      onChange={onChange}
      value={value}
      formatDay={(locale, date) => renderDay(date)}
    />
  );
};

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
  return (
    <AdCalendarStyled>
      <div>
        <CustomNavigation date={date} setDate={setDate} />
        <CustomCalendar
          onChange={setDate}
          value={date}
        />
      </div>
    </AdCalendarStyled>
  );
};

export default CalendarView;














