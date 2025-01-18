import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const CustomDatePicker = ({ value, onChange, onClose }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const years = Array.from(
    { length: currentYear + 3 - 2000 },
    (_, index) => 2000 + index
  );

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const yearRef = useRef(null);
  const monthRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [year, month] = value.split("-");
      setSelectedYear(Number(year));
      setSelectedMonth(Number(month));
    }
  }, [value]);

  const handleConfirm = () => {
    const formattedValue = `${selectedYear}-${String(selectedMonth).padStart(
      2,
      "0"
    )}`;
    onChange(formattedValue);
    onClose();
  };

  const scrollToSelected = (ref, selectedValue, list) => {
    if (ref.current) {
      const index = list.indexOf(selectedValue);
      const itemHeight = 40; // 아이템 높이
      const offset = itemHeight * 1; // 2번째 위치로 이동하기 위한 오프셋 (1 = 두 번째 위치)
      ref.current.scrollTo({ top: index * itemHeight - offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToSelected(yearRef, selectedYear, years);
  }, [selectedYear]);

  useEffect(() => {
    scrollToSelected(monthRef, selectedMonth, months);
  }, [selectedMonth]);

  return (
      <PickerContainer>
        <ScrollWrapper>
          <ScrollContainer ref={yearRef}>
            {years.map((year) => (
              <YearItem
                key={year}
                isSelected={year === selectedYear}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </YearItem>
            ))}
          </ScrollContainer>
          <ScrollContainer ref={monthRef}>
            {months.map((month) => (
              <MonthItem
                key={month}
                isSelected={month === selectedMonth}
                onClick={() => setSelectedMonth(month)}
              >
                {month}월
              </MonthItem>
            ))}
          </ScrollContainer>
        </ScrollWrapper>
        <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
      </PickerContainer>
  );
};

export default CustomDatePicker;

// Styled Components
const PickerContainer = styled.div`
  width: 180px;
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const ScrollWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ScrollContainer = styled.div`
  width: 80px;
  height: 120px; /* 3개의 항목 표시 */
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const YearItem = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.isSelected ? "var(--gray-06, #f5f5f5)" : "white")};
  color: ${(props) => (props.isSelected ? "black" : "gray")};
  font-family: Regular;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: var(--gray-06, #f5f5f5);
  }
`;

const MonthItem = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.isSelected ? "var(--gray-06, #f5f5f5)" : "white")};
  color: ${(props) => (props.isSelected ? "black" : "gray")};
  font-family: Regular;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: var(--gray-06, #f5f5f5);
  }
`;

const ConfirmButton = styled.button`
  background: var(--green, #3AAF85);
  width:180px;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  font-family: Regular;
  cursor: pointer;
  &:hover {
    background: var(--dark-green, #3AAF85);
  }
`;
