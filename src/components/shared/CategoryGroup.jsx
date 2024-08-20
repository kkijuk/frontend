import React from 'react';
import styled from 'styled-components';

const getBackgroundColor = (selected, categoryValue) => {
if (selected) {
    switch (categoryValue) {
      case 1:
        return '#FCC400';
      case 2:
        return '#77AFF2';
      case 3:
        return '#BB7AEF';
      case 4:
        return '#78D333';
      case 5:
        return '#FA7C79';
      case 6:
        return '#F99538';
      case 7:
        return '#707070';
      default:
        return '#707070';
    }
  }
  return '#F5F5F5';
};

const CareerBox = styled.div`
  display: flex;
  height: 28px;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 70px;
  border-radius: 10px;
  background-color: ${(props) => getBackgroundColor(props.selected, props.categoryValue)};
  border: 2px solid ${(props) => getBackgroundColor(props.category, props.categoryValue)};
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 5px;
`;


const Nickname = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;

  display: flex;
  width: 143px;
  height: 22.895px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => (props.selected ? '#FFF' : '#707070')};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  line-height: normal;
  margin: 0px;
`;



export default function CategoryGroup({category, selected, onClick, categoryValue }) {
  return (
    <CareerBox categoryValue={categoryValue} selected={selected} onClick={onClick}>
      <Nickname selected={selected}>{category}</Nickname>
    </CareerBox>
  );
}
