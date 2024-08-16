import React from 'react';
import styled from 'styled-components';

const CalendarBackgroundSection = styled.div`
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f0f0f0;
  margin-top: 20px;
  position: relative;
  padding: 20px 0;
  box-sizing: border-box;
`;

const CalendarContentSection = styled.div`
  max-width: 820px;  // 너비 내커리어,이력관리와 통일 820으로
  margin: 0 auto;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 15px;
  position: relative;
  margin-left: 505px;
   @media (max-width: 1024px) {
    margin-left: 0; /* 화면이 작아질 때는 margin-left 제거 */
  }
`;

const CalendarAdListStyled = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-top: -10px;
`;

const CalendarAdDateSection = styled.div`
  margin-bottom: 50px;
`;

const CalendarAdDate = styled.div`
  font-size: 14px;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 5px;
  margin-left: 20px;
`;

const CalendarAdItem = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
  cursor: pointer; 
`;

const CalendarAdDetails = styled.div`
  color: #555;
`;

const CalendarAdTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const CalendarAdTitle = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 5px;
`;

const CalendarTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  margin-left: 15px;
  margin-bottom: 5px; 
`;

const CalendarTag = styled.span`
  background: #F5F5F5;
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 12px;
  color: #707070;
`;

const CalendarStatusCircle = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    if (status === 'UNAPPLIED') return '#D9D9D9';
    if (status === 'PLANNED') return '#B0B0B0';
    if (status === 'APPLYING') return '#707070';
    if (status === 'ACCEPTED') return '#78D333';
    if (status === 'REJECTED') return '#FA7C79';
    return '#707070';
  }};
  margin-right: 10px;
  margin-top: 5px;
`;

const CalendarListView = ({ date, data, count, onJobClick }) => {
    console.log('CalendarListView data:', data); // 디버깅용 로그 추가
    console.log('CalendarListView count:', count); // 디버깅용 로그 추가
  
    if (count === 0) {
      return (
        <CalendarBackgroundSection>
          <CalendarContentSection background="#f0f0f0">
            
          </CalendarContentSection>
        </CalendarBackgroundSection>
      );
    }
  
    return (
      <CalendarBackgroundSection>
        <CalendarContentSection background="#f0f0f0">
          <CalendarAdDate>{date}</CalendarAdDate> 
          <CalendarAdListStyled>
            {data.map((ad, idx) => (
              <CalendarAdItem 
                key={idx} 
                onClick={() => onJobClick(ad)}
              >
                <CalendarTagContainer>
                  {(ad.tag || ad.tags || []).map((tag, tagIdx) => (
                    <CalendarTag key={tagIdx}>{tag}</CalendarTag>
                  ))}
                </CalendarTagContainer>
                <CalendarAdDetails>
                  <CalendarAdTitleContainer>
                    <CalendarStatusCircle status={ad.status} />
                    <CalendarAdTitle>{ad.title}</CalendarAdTitle>
                  </CalendarAdTitleContainer>
                </CalendarAdDetails>
              </CalendarAdItem>
            ))}
          </CalendarAdListStyled>
        </CalendarContentSection>
      </CalendarBackgroundSection>
    );
  };
  
  export default CalendarListView;