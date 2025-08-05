import React from 'react';
import styled from 'styled-components';
import { Color } from '../../constants/color';

const BackgroundSection = styled.div`
  width: 100vw;
  background-color: ${Color.gray06};
  margin-top: 20px;
  min-height: 100vh; 
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
  background-color: ${Color.gray06};
  border-radius: 15px;
  position: relative;

   @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 350px;
    justify-content: center;
	  align-items: center;
  }
    @media (max-width: 350px) {
    width: 320px;
    justify-content: center;
	align-items: center;
  }
`;

const AdListStyled = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-top: -40px;  
`;

const AdDateSection = styled.div`
  margin-bottom: 30px;
`;

const AdDate = styled.div`
  font-size: 16px;
  color: ${Color.black}; 
  font-family: Regular;
  font-weight: 500;
  margin-bottom: 10px;
  margin-left: 5px;
@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0px;
  }
  
`;

const AdItem = styled.div`
  background-color: ${Color.white}; 
  border: 1px solid ${Color.gray04};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
  cursor: pointer;
`;

const AdDetails = styled.div`
   color: ${Color.gray01};
`;

const AdTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	margin-left: 10px;

	}
`;

const AdTitle = styled.div`
   color: ${Color.black};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  margin-top: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
   font-size: 16px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  margin-left: 15px;
  margin-bottom: 5px;
`;

const DefaultTag = styled.span`
 background: ${Color.gray05}; 
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 13px;
  color: ${Color.gray02}; 
  font-family: Light;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
   font-size: 12px;
  }
`;

const StatusCircle = styled.span`
  display: inline-block;
  aspect-ratio: 1;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ status }) => {
     if (status === 'UNAPPLIED') return Color.gray04;
    if (status === 'PLANNED') return Color.gray03;
    if (status === 'APPLYING') return Color.gray02;
    if (status === 'ACCEPTED') return Color.subGn;
    if (status === 'REJECTED') return Color.subRd;
    return Color.gray02;
  }};
  margin-right: 10px;
  margin-top: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 12px;
  height: 12px;
	}
`;

const ReviewTag = styled.span`
  background: ${({ status }) => {
    if (status === 'UNAPPLIED') return Color.gray04;
    if (status === 'PLANNED') return Color.gray03;
    if (status === 'APPLYING') return Color.gray02;
    if (status === 'ACCEPTED') return Color.subGn;
    if (status === 'REJECTED') return Color.subRd;
    return Color.gray04;
  }};
  border-radius: 10px;
  padding: 4px 8px;
   color: ${Color.white};
  text-align: center;
  font-family: Light;
  font-size: 12px;
  font-weight: 400;
  margin-right: 8px;
`;

const groupByDate = (data) => {
  return data.reduce((acc, current) => {
    if (current.endTime) {
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
  if (!data || data.length === 0) {
    return (
      <BackgroundSection>
        <ContentSection>
          <p style={{ textAlign: 'center', color: '#707070' }}></p>
        </ContentSection>
      </BackgroundSection>
    );
  }

  const groupedData = groupByDate(data);

  return (
    <BackgroundSection>
      <ContentSection>
        <AdListStyled>
          {Object.keys(groupedData).map((date, index) => (
            <AdDateSection key={index}>
              <AdDate>{date}</AdDate>
              {(groupedData[date] || []).map((ad, idx) => (
                <AdItem
                  key={idx}
                  onClick={() => {
                    window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
                    onJobClick(ad);
                  }}
                >
                  <TagContainer>
  {/* 리뷰 태그 추가 */}
  {ad.reviewTag && ad.reviewTag.trim() !== "" && (
    <ReviewTag status={ad.status}>{ad.reviewTag}</ReviewTag>
  )}

  {/* 기존 태그 유지 */}
  {(ad.tag || ad.tags || []).map((tag, tagIdx) => (
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
