// CareerBox.styles.js
import styled from 'styled-components';

export const getBackgroundColor = (category, selected) => {
  let color;
  switch (category) {
    case '동아리':
      color = '#FCC400';
      break;
    case '대외활동':
      color = '#77AFF2';
      break;
    case '공모전대회':
      color = '#BB7AEF';
      break;
    case '프로젝트':
      color = '#78D333';
      break;
    case '경력':
      color = '#FA7C79';
      break;
    case '교육':
      color = '#F99538';
      break;
    case '기타':
      color = '#707070';
      break;
    default:
      color = '#707070';
  }
  return selected ? color + '4D' : color; // 불투명도 30%
};

export const CareerBox = styled.div`
  width: 143px;
  height: 58px;
  padding: 6px;
  border-radius: 10px;
  background-color: ${(props) => getBackgroundColor(props.category, props.selected)};
  border: 2px solid ${(props) => getBackgroundColor(props.category)};
  box-sizing: border-box;
  position: relative;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Date = styled.div`
  display: flex;
  width: 143px;
  height: 22.895px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => (props.selected ? '#000' : '#FFF')};
  text-align: center;
  font-family: light;
  font-size: 11px;
  font-style: normal;
  line-height: normal;
  box-sizing: border-box;
`;

export const Nickname = styled.div`
  display: flex;
  width: 100%;
  max-width: calc(100% - 12px);
  height: auto;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => (props.selected ? '#000' : '#FFF')};
  text-align: center;
  font-family: semibold;
  font-size: 14px;
  font-style: bold;
  line-height: normal;
  box-sizing: border-box;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Triangle = styled.svg`
  width: 20px;
  height: 12px;
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
`;
