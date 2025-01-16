import React, { useState } from "react";
import styled from "styled-components";

const CustomCalendarPicker = ({ value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    onChange(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`);
  };

  const renderCalendar = () => {
    const calendarDays = [];
    const firstDayOfWeek = startOfMonth.getDay();
    const lastDayOfWeek = endOfMonth.getDay();
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    // 이전 월의 일자들
    for (let i = firstDayOfWeek; i > 0; i--) {
      calendarDays.push({
        date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), previousMonth.getDate() - i + 1),
        isCurrentMonth: false,
      });
    }

    // 현재 월의 일자들
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      calendarDays.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
        isCurrentMonth: true,
      });
    }

    // 다음 월의 일자들
    for (let i = 1; lastDayOfWeek + i < 7; i++) {
      calendarDays.push({
        date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i),
        isCurrentMonth: false,
      });
    }

    return calendarDays.map((day, index) => (
      <CalendarDay
        key={index}
        isCurrentMonth={day.isCurrentMonth}
        onClick={() => handleDateClick(day.date)}
      >
        {day.date.getDate()}
      </CalendarDay>
    ));
  };

  return (
    <Container>
      <Header>
        <Arrow onClick={handlePreviousMonth}>{"<"}</Arrow>
        <CurrentMonth>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </CurrentMonth>
        <Arrow onClick={handleNextMonth}>{">"}</Arrow>
      </Header>
      <DayLabels>
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
            <DayLabel key={index} day={day}>
                {day}
            </DayLabel>
        ))}
      </DayLabels>
      <CalendarGrid>{renderCalendar()}</CalendarGrid>
    </Container>
  );
};

export default CustomCalendarPicker;

// Styled Components
const Container = styled.div`
  width: 261px;
  height: 280px;
  border-radius: 10px;
  border: 1px solid var(--gray-03, #d9d9d9);
  background: var(--white, #fff);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: Regular;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Arrow = styled.div`
  cursor: pointer;
  font-size: 18px;
  user-select: none;
`;

const CurrentMonth = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const DayLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
`;

const DayLabel = styled.div`
  text-align: center;
  font-size: 14px;
  font-family: Bold;
  color: ${(props) =>
    props.day === "일" ? "#FA7C79" : props.day === "토" ? "#77AFF2" : "var(--gray-02, #707070)"};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const CalendarDay = styled.div`
  text-align: center;
  padding: 8px 0;
  border-radius: 5px;
  font-size: 14px;
  color: ${(props) => (props.isCurrentMonth ? "black" : "var(--gray-02, #707070)")};
  cursor: pointer;
  background: ${(props) => (props.isCurrentMonth ? "white" : "transparent")};

  &:hover {
    background: var(--gray-04, #eaeaea);
  }
`;


