import React from 'react';
import styled from 'styled-components';

const ViewToggleStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;

const ToggleContainer = styled.div`
  background-color: #F5F5F5;
  border-radius: 10px;
 
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
   width: 150px;
  height: 35px;
`;

const ToggleButton = styled.button`
  padding: 5px 8px;
  border-radius: 10px;
  background-color: ${props => (props.active ? 'white' : '#F5F5F5')};
  cursor: pointer;
  border: 2px solid ${props => (props.active ? 'white' : '#F5F5F5')};
  width: 65px;
  height: 25px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  color: ${props => (props.active ? '#000' : '#666')};
  text-align: center;
  font-family:'Regular';
  font-size: 14px;
  font-style: normal;


  transition: all 0.2s ease; 
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




















