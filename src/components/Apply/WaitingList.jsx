import React from 'react';
import styled from 'styled-components';

const StatusItem = styled.div`
   background-color: #F5F5F5;
  border-radius: 12px;
  padding: 9px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 20px;
`;

const StatusText = styled.span`
  color: var(--black, #000);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  align-items: center;
  justify-content: center;
`;

const WaitingList = () => {
  return (
    <StatusItem>
      <StatusText>기다리는 공고</StatusText>
    </StatusItem>
  );
};

export default WaitingList;
