import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar'; 

const TabMenuStyled = styled.div`
  display: flex;
  align-items: center; 
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--black, #000);
  font-family: Regular;
  font-size: 26px;
  font-weight: 700;
  color: ${props => (props.active ? 'black' : '#E0E0E0')};
`;

const TabMenu = ({ activeTab, onTabClick, searchValue, onSearchChange, onSearch }) => {
  return (
    <TabMenuStyled>
      <TabButton active={activeTab === 'schedule'} onClick={() => onTabClick('schedule')}>
        지원일정
      </TabButton>
      <TabButton active={activeTab === 'status'} onClick={() => onTabClick('status')}>
        지원현황
      </TabButton>
      <SearchBar 
        value={searchValue} 
        onChange={onSearchChange} 
        onSearch={onSearch} 
      />
    </TabMenuStyled>
  );
};

export default TabMenu;
