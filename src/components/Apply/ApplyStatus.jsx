import React, { useState } from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  display: flex;
  width: 1000px
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0px;
  gap: 30px; 
  padding-right: 90px; 
`;

const StatusAll = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #3AAF85;
  border-radius: 13px;
  padding: 9px 18px;
  color: ${props => (props.active ? '#fff' : 'black')};
  cursor: pointer;
  background: ${props => (props.active ? '#3AAF85' : 'transparent')};
  margin-bottom: -12px;
  text-align: center;
  font-family: 'Medium';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
  width: 130px;
  height: 40px;
`;

const StatusNotApply = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #D9D9D9;
  border-radius: 13px;
  padding: 9px 18px;
  color: ${props => (props.active ? '#fff' : 'black')};
  cursor: pointer;
  background: ${props => (props.active ? '#D9D9D9' : 'transparent')};
  margin-bottom: -12px;
  text-align: center;
  font-family: 'Medium';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
  width: 110px;
  height: 40px;
`;

const StatusApply = styled.button`
  justify-content: center;
  display: flex;
  align-items: center;
  border: 2px solid #B0B0B0;
  border-radius: 13px;
  padding: 9px 18px;
  color: ${props => (props.active ? '#fff' : 'black')};
  cursor: pointer;
  background: ${props => (props.active ? '#B0B0B0' : 'transparent')};
  margin-bottom: -12px;
  text-align: center;
  font-family: 'Medium';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
  width: 130px;
  height: 40px;
`;

const StatusApplying = styled.button`
  justify-content: center;
  display: flex;
  align-items: center;
  border: 2px solid #707070;
  border-radius: 13px;
  padding: 9px 18px;
  color: ${props => (props.active ? '#fff' : 'black')};
  cursor: pointer;
  background: ${props => (props.active ? '#707070' : 'transparent')};
  margin-bottom: -12px;
  text-align: center;
  font-family: 'Medium';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
  width: 115px;
  height: 40px;
`;

const StatusAccepted = styled.button`
  justify-content: center;
  display: flex;
  align-items: center;
  border: 2px solid #78D333;
  border-radius: 13px;
  padding: 9px 18px;
  color: ${props => (props.active ? '#fff' : 'black')};
  cursor: pointer;
  background: ${props => (props.active ? '#78D333' : 'transparent')};
  margin-bottom: -12px;
  text-align: center;
  font-family: 'Medium';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
  width: 100px;
  height: 40px;
`;

const StatusRejected = styled.button`
  justify-content: center;
  display: flex;
  align-items: center;
  border: 2px solid #FA7C79;
  border-radius: 13px;
  padding: 9px 18px;
  color: ${props => (props.active ? '#fff' : 'black')};
  cursor: pointer;
  background: ${props => (props.active ? '#FA7C79' : 'transparent')};
  margin-bottom: -12px;
  text-align: center;
  font-family: 'Medium';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
  width: 110px;
  height: 40px;
`;

const StatusText = styled.span`
  margin-left: 5px;
`;

const ApplyStatus = () => {
  const [activeStatus, setActiveStatus] = useState('');

  const handleStatusClick = (status) => {
    setActiveStatus(status);
  };

  return (
    <StatusContainer>
      <StatusAll active={activeStatus === 'all'} onClick={() => handleStatusClick('all')}>
        전체보기 <StatusText></StatusText>
      </StatusAll>
      <StatusNotApply active={activeStatus === 'notApply'} onClick={() => handleStatusClick('notApply')}>
        미지원 <StatusText></StatusText>
      </StatusNotApply>
      <StatusApply active={activeStatus === 'apply'} onClick={() => handleStatusClick('apply')}>
        지원 예정 <StatusText></StatusText>
      </StatusApply>
      <StatusApplying active={activeStatus === 'applying'} onClick={() => handleStatusClick('applying')}>
        진행 중 <StatusText></StatusText>
      </StatusApplying>
      <StatusAccepted active={activeStatus === 'accepted'} onClick={() => handleStatusClick('accepted')}>
        합격 <StatusText></StatusText>
      </StatusAccepted>
      <StatusRejected active={activeStatus === 'rejected'} onClick={() => handleStatusClick('rejected')}>
        불합격 <StatusText></StatusText>
      </StatusRejected>
    </StatusContainer>
  );
};

export default ApplyStatus;
