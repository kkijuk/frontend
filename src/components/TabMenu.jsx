import React from 'react';
import styled from 'styled-components';

const TabMenuStyled = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  color: ${props => (props.active ? 'black' : '#E0E0E0')};
`;

const TabMenu = ({ activeTab, onTabClick }) => {
  return (
    <TabMenuStyled>
      <TabButton active={activeTab === 'schedule'} onClick={() => onTabClick('schedule')}>
        지원일정
      </TabButton>
      <TabButton active={activeTab === 'status'} onClick={() => onTabClick('status')}>
        지원현황
      </TabButton>
    </TabMenuStyled>
  );
};

export default TabMenu;

