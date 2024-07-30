import React from 'react';
import styled from 'styled-components';

const getBackgroundColor = (category, selected) => {
  let color;
  switch (category) {
    case '동아리':
      color = '#FCC400';
      break;
    case '대외활동':
      color = '#77AFF2';
      break;
    case '공모전/대회':
      color = '#BB7AEF';
      break;
    case '프로젝트':
      color = '#78D333';
      break;
    case '아르바이트/인턴':
      color = '#FA7C79';
      break;
    case '교육':
      color = '#F99538';
      break;
    case '기타 활동':
      color = '#707070';
      break;
    default:
      color = '#707070';
  }
  return selected ? color = color : '#F5F5F5';
};

const CareerBox = styled.div`
  display: flex;
  height: 35px;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 70px;
  border-radius: 10px;
  background-color: ${(props) => getBackgroundColor(props.category, props.selected)};
  border: 2px solid ${(props) => getBackgroundColor(props.category, props.selected)};
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
`;



export default function CategoryGroup({category, selected, onClick }) {
  return (
    <CareerBox category={category} selected={selected} onClick={onClick}>
      <Nickname selected={selected}>{category}</Nickname>
    </CareerBox>
  );
}
