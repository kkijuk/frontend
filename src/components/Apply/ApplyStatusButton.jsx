import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  display: flex;
  width: 850px;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0px;
  gap: 30px; 
  padding-right: 90px; 
`;

const StatusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => props.borderColor};
  border-radius: 13px;
  padding: 9px 18px;
  color: ${props => (props.active ? '#fff' : 'black')};
  cursor: pointer;
  background: ${props => (props.active ? props.borderColor : 'transparent')};
  margin-bottom: -12px;
  text-align: center;
  font-family: 'Medium';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
  width: 130px;
  height: 40px;
`;

const StatusText = styled.span`
  margin-left: 5px;
`;

const ApplyStatusButton = ({ activeStatus, onStatusClick, statusCounts }) => {

  const handleClick = (status) => {
    window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
    onStatusClick(status); // 기존의 onStatusClick 핸들러 호출
  };

  return (
    <StatusContainer>
      <StatusButton 
        active={activeStatus === 'all'} 
        onClick={() => handleClick('all')} 
        borderColor="#3AAF85"
      >
        전체보기 <StatusText>({statusCounts.all})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'notApply'} 
        onClick={() => handleClick('notApply')} 
        borderColor="#D9D9D9"
      >
        미지원 <StatusText>({statusCounts.notApply})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'apply'} 
        onClick={() => handleClick('apply')} 
        borderColor="#B0B0B0"
      >
        지원 예정 <StatusText>({statusCounts.apply})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'applying'} 
        onClick={() => handleClick('applying')} 
        borderColor="#707070"
      >
        진행 중 <StatusText>({statusCounts.applying})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'accepted'} 
        onClick={() => handleClick('accepted')} 
        borderColor="#78D333"
      >
        합격 <StatusText>({statusCounts.accepted})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'rejected'} 
        onClick={() => handleClick('rejected')} 
        borderColor="#FA7C79"
      >
        불합격 <StatusText>({statusCounts.rejected})</StatusText>
      </StatusButton>
    </StatusContainer>
  );
};

export default ApplyStatusButton;
