import React from 'react';
import styled from 'styled-components';
import CareerNameTag from '../shared/CareerNameTag';
import ApexChart from '../Mycareer/ApexChart'; // 추가

const TimelineBox = styled.div`
  flex-shrink: 0;
  width: 820px;
  border-radius: 10px;
  border: 1px solid var(--gray-03, #D9D9D9);
  background-color: white;
  padding: 15px;
  margin-bottom: 50px;
  margin-left: 18px;
  overflow-x: auto; /* Add horizontal scroll */
  white-space: nowrap; /* Prevent line breaks */
`;

const CareerNameT = styled.div`
  margin-left: 23px;
`;

const TimelineDate = styled.div`
  color: var(--gray-02, #707070);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CareerTimeline = ({ data }) => {
  const careerNames = data.map(item => item.careerName);
  const categories = data.map(item => item.category);
  return (
    <TimelineBox>
      
      <ApexChart data={data} /> {/* 차트 추가 */}
    </TimelineBox>
  );
}

export default CareerTimeline;
