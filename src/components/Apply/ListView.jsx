import React from 'react';
import styled from 'styled-components';

const BackgroundSection = styled.div`
  width: 100vw;
  background-color: #f0f0f0;
  margin-top: 20px;
  position: relative;
  padding: 20px 0;
  box-sizing: border-box;
  justify-content: center; /* 중앙 정렬 */
`;

const ContentSection = styled.div`
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
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
  font-size: 16px;
  color: var(--black, #000);
  font-family: Regular;
  font-weight: 500;
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
  font-weight: 700;
  margin-top: 5px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  margin-left: 15px;
  margin-bottom: 5px;
`;

const DefaultTag = styled.span`
  background: #f5f5f5;
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 13px;
  color: #707070;
  font-family: Light;
`;

const ReviewTag = styled.span`
  background: ${({ status }) => {
    if (status === 'UNAPPLIED') return '#D9D9D9';
    if (status === 'PLANNED') return '#B0B0B0';
    if (status === 'APPLYING') return '#707070';
    if (status === 'ACCEPTED') return '#78D333';
    if (status === 'REJECTED') return '#FA7C79';
    return '#D9D9D9';
  }};
  border-radius: 10px;
  padding: 4px 8px;
  color: var(--white, #FFF);
  text-align: center;
  font-family: Light;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 8px;
`;

const StatusCircle = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    if (status === 'UNAPPLIED') return '#d9d9d9';
    if (status === 'PLANNED') return '#b0b0b0';
    if (status === 'APPLYING') return '#707070';
    if (status === 'ACCEPTED') return '#78d333';
    if (status === 'REJECTED') return '#fa7c79';
    return '#707070';
  }};
  margin-right: 10px;
  margin-top: 5px;
`;

const ListView = ({ data, onJobClick }) => {
  if (!data || data.length === 0) {
    return (
      <BackgroundSection>
        <ContentSection>
          <p style={{ textAlign: 'center', color: '#707070' }}>데이터가 없습니다.</p>
        </ContentSection>
      </BackgroundSection>
    );
  }

  return (
    <BackgroundSection>
      <ContentSection>
        <AdListStyled>
          {data.map((item, index) => (
            <AdDateSection key={index}>
              <AdDate>{item.endDate}</AdDate>
              {item.recruits.map((ad, idx) => (
                <AdItem
                  key={idx}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    onJobClick(ad);
                  }}
                >
                  <TagContainer>
                    {ad.reviewTag && <ReviewTag>{ad.reviewTag}</ReviewTag>}
                    {(ad.tag || []).map((tag, tagIdx) => (
                      <DefaultTag key={tagIdx}>{tag}</DefaultTag>
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
