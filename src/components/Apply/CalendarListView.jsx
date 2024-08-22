import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails'; // API 호출을 위해 import

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
    margin-left: 0; 
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
  font-family: Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 5px;
  margin-left: 27px;
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
  font-size: 13px;
  color: #707070;
  font-family: Light;
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
  const navigate = useNavigate();

  if (count === 0) {
    return (
      <CalendarBackgroundSection>
        <CalendarContentSection background="#f0f0f0">
          {/* 날짜에 공고가 없을 때의 처리 */}
        </CalendarContentSection>
      </CalendarBackgroundSection>
    );
  }

  const handleJobClick = async (ad) => {
    console.log('Selected ad:', ad); // ad 객체를 로그로 출력하여 확인
    try {
      // API를 호출하여 전체 데이터를 가져옵니다.
      const fullAdDetails = await getRecruitDetails(ad.recruitId);
      console.log('Full ad details:', fullAdDetails); // 가져온 데이터 로그 출력
      window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤

      // 상세 페이지로 이동하면서, 가져온 전체 데이터를 전달합니다.
      navigate(`/apply-detail/${ad.recruitId}`, { state: { job: fullAdDetails } });
    } catch (error) {
      console.error("Failed to fetch recruit details:", error);
    }
  };

  // 날짜를 하루 뒤로 조정하여 표시
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + 1);

  return (
    <CalendarBackgroundSection>
      <CalendarContentSection background="#f0f0f0">
        {/* 조정된 날짜를 화면에 표시 */}
        <CalendarAdDate>{adjustedDate.toISOString().split('T')[0]}</CalendarAdDate> 
        <CalendarAdListStyled>
          {data.map((ad, idx) => (
            <CalendarAdItem 
              key={idx} 
              onClick={() => handleJobClick(ad)} // 클릭 시 상세 페이지로 이동
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

