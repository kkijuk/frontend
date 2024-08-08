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
  return (
    <StatusContainer>
      <StatusButton 
        active={activeStatus === 'all'} 
        onClick={() => onStatusClick('all')} 
        borderColor="#3AAF85"
      >
        전체보기 <StatusText>({statusCounts.all})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'notApply'} 
        onClick={() => onStatusClick('notApply')} 
        borderColor="#D9D9D9"
      >
        미지원 <StatusText>({statusCounts.notApply})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'apply'} 
        onClick={() => onStatusClick('apply')} 
        borderColor="#B0B0B0"
      >
        지원 예정 <StatusText>({statusCounts.apply})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'applying'} 
        onClick={() => onStatusClick('applying')} 
        borderColor="#707070"
      >
        진행 중 <StatusText>({statusCounts.applying})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'accepted'} 
        onClick={() => onStatusClick('accepted')} 
        borderColor="#78D333"
      >
        합격 <StatusText>({statusCounts.accepted})</StatusText>
      </StatusButton>
      <StatusButton 
        active={activeStatus === 'rejected'} 
        onClick={() => onStatusClick('rejected')} 
        borderColor="#FA7C79"
      >
        불합격 <StatusText>({statusCounts.rejected})</StatusText>
      </StatusButton>
    </StatusContainer>
  );
};

export default ApplyStatusButton;
