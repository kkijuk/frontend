import React from 'react';
import styled from 'styled-components';

const ViewToggleStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;

const ToggleButton = styled.button`
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${props => (props.active ? 'white' : '#F5F5F5')};
  cursor: pointer;
  border: 2px solid ${props => (props.active ? 'white' : '#F5F5F5')};
  margin-right: 5px;
  width: 100px;
  height: 40px;
`;

const ViewToggle = ({ view, onToggle }) => {
  return (
    <ViewToggleStyled>
      <ToggleButton active={view === 'calendar'} onClick={() => onToggle('calendar')}>
        달력보기
      </ToggleButton>
      <ToggleButton active={view === 'list'} onClick={() => onToggle('list')}>
        목록보기
      </ToggleButton>
    </ViewToggleStyled>
  );
};

export default ViewToggle;

