import React from 'react';
import styled from 'styled-components';

const BackgroundSection = styled.div`
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f0f0f0;
  margin-top: 20px;
  position: relative;
  padding: 20px 0;
  box-sizing: border-box;
`;

const ContentSection = styled.div`
  max-width: 820px;  // 너비 내커리어,이력관리와 통일 820으로
  margin: 0 auto;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 15px;
  position: relative;
`;

const AdListStyled = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
`;

const AdDateSection = styled.div`
  margin-bottom: 30px;
`;

const AdDate = styled.div`
  font-size: 14px;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const AdItem = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
  cursor: pointer; 
`;

const AdDetails = styled.div`
  color: #555;
`;

const AdTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const AdTitle = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 5px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  margin-left: 15px;
  margin-bottom: 5px; 
`;

const Tag = styled.span`
  background: #F5F5F5;
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 12px;
  color: #707070;
`;

const StatusCircle = styled.span`
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

const groupByDate = (data) => {
  return data.reduce((acc, current) => {
    if (current.endTime) {  // endTime이 정의되어 있는지 확인
      const date = current.endTime.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(current);
    }
    return acc;
  }, {});
};

const ListView = ({ data, onJobClick }) => {
  console.log('ListView data:', data); // 디버깅용 로그 추가

  if (!data || data.length === 0) {
    return (
      <BackgroundSection>
        <ContentSection background="#f0f0f0">
         
        </ContentSection>
      </BackgroundSection>
    );
  }

  const groupedData = groupByDate(data);

  return (
    <BackgroundSection>
      <ContentSection background="#f0f0f0">
        <AdListStyled>
          {Object.keys(groupedData).map((date, index) => (
            <AdDateSection key={index}>
              <AdDate>{date}</AdDate>
              {(groupedData[date] || []).map((ad, idx) => (
                <AdItem 
                  key={idx} 
                  onClick={() => onJobClick(ad)}
                >
                  <TagContainer>
                  {(ad.tag || ad.tags || []).map((tag, tagIdx) => (
                      <Tag key={tagIdx}>{tag}</Tag>
                    ))}
                  </TagContainer>
                  <AdDetails>
                    <AdTitleContainer>
                      <StatusCircle status={ad.status} />
                      <AdTitle>{ad.title}</AdTitle>
                    </AdTitleContainer>
                  </AdDetails>
                </AdItem>
              ))}
            </AdDateSection>
          ))}
        </AdListStyled>
      </ContentSection>
    </BackgroundSection>
  );
};

export default ListView;
