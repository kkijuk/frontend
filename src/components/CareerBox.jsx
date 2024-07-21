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
  return selected ? color + '4D' : color; // '4D'는 불투명도 30%를 의미
};

const CareerBox = styled.div`
  width: 139px;
  height: 54px;
  border-radius: 10px;
  background-color: ${(props) => getBackgroundColor(props.category, props.selected)};
  border: 2px solid ${(props) => getBackgroundColor(props.category)};
  position: relative;
  cursor: pointer;
`;

const Date = styled.div`
  display: flex;
  width: 143px;
  height: 22.895px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => (props.selected ? '#000' : '#FFF')};
  text-align: center;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 6px;
`;

const Nickname = styled.div`
  display: flex;
  width: 143px;
  height: 22.895px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => (props.selected ? '#000' : '#FFF')};
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
`;

const Triangle = styled.div`
  position: absolute;
  bottom: -16px; /* 수정된 부분 */
  left: 50%;
  transform: translateX(-50%);
  width: 21px;
  height: 21px;
  display: ${(props) => (props.selected ? 'block' : 'none')};
  
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 10.5px solid transparent;
    border-right: 10.5px solid transparent;
    border-top: 10.5px solid ${(props) => getBackgroundColor(props.category)};
  }
`;

export default function Careerbox({ startDate, endDate, careerName, category, selected, onClick }) {
  return (
    <CareerBox category={category} selected={selected} onClick={onClick}>
      <Date selected={selected}>{startDate} ~ {endDate}</Date>
      <Nickname selected={selected}>{careerName}</Nickname>
      {selected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="16"
          viewBox="0 0 19 16"
          fill="none"
          style={{
            position: 'absolute',
            bottom: '-16px', // 수정된 부분
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <path
            d="M9.5 16L0.406736 0.249998L18.5933 0.25L9.5 16Z"
            fill={getBackgroundColor(category)}
          />
        </svg>
      )}
    </CareerBox>
  );
}
