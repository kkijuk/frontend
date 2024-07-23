import React from 'react';
import styled from 'styled-components';

const ViewToggleStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;

const ToggleContainer = styled.div`
  background-color: #F5F5F5;
  border-radius: 15px;
  padding: 9px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleButton = styled.button`
  padding: 8px 10px;
  border-radius: 12px;
  background-color: ${props => (props.active ? 'white' : '#F5F5F5')};
  cursor: pointer;
  border: 2px solid ${props => (props.active ? 'white' : '#F5F5F5')};
  width: 85px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
  color: ${props => (props.active ? '#000' : '#666')}; /* 활성화 상태에 따라 글자 색 변경 */
  font-weight: ${props => (props.active ? 'bold' : 'normal')}; /* 활성화 상태에 따라 글자 두께 변경 */
`;

const ViewToggle = ({ view, onToggle }) => {
  return (
    <ViewToggleStyled>
      <ToggleContainer>
        <ToggleButton active={view === 'calendar'} onClick={() => onToggle('calendar')}>
          달력보기
        </ToggleButton>
        <ToggleButton active={view === 'list'} onClick={() => onToggle('list')}>
          목록보기
        </ToggleButton>
      </ToggleContainer>
    </ViewToggleStyled>
  );
};

export default ViewToggle;


