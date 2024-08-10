import React from 'react';
import styled from 'styled-components';
import CareerCategoryCircle from '../shared/CareerCategoryCircle';

const BackgroundSection = styled.div`
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f0f0f0;
  position: relative;
  box-sizing: border-box;
`;

const ContentSection = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ background }) => background || 'white'};
  border-radius: 15px;
  position: relative;
`;

const AdListStyled = styled.div`
  padding: 20px;
  border-radius: 10px;
`;

const AdDateSection = styled.div`
  margin-bottom: 30px;
`;

const Year = styled.div`
  font-size: 14px;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
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
`;

const AdDate = styled.div`
  color: var(--gray-02, #707070);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 13px;
`;

const AdHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-left: 13px;
`;

const AdTitle = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const AdAlias = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 5px;
`;

const Label = styled.span`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  width: 193px;
  height: 15px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
`;


const TagContainer = styled.div`
    display: flex;
    align-items: center;
`;

const sortByDate = (data) => {
  return data.sort((a, b) => {
    const startDateComparison = new Date(b.startDate) - new Date(a.startDate);
    if (startDateComparison !== 0) return startDateComparison;
    return new Date(b.endDate) - new Date(a.endDate);
  });
};

const groupByCategory = (data) => {
  return data.reduce((acc, current) => {
    const category = current.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(current);
    return acc;
  }, {});
};

const CareerViewCategory = ({ data }) => {
  const groupedData = groupByCategory(data);
  for (const category in groupedData) {
    groupedData[category] = sortByDate(groupedData[category]);
  }

  const sortedCategories = Object.keys(groupedData);

  return (
    <BackgroundSection>
      <ContentSection background="#f0f0f0">
        <AdListStyled>
          {sortedCategories.map((category, index) => (
            <AdDateSection key={index}>
              <TagContainer>
                      <CareerCategoryCircle category={category} />
                      <Year>{category}</Year>
              </TagContainer>
              {groupedData[category].map((ad, idx) => (
                <AdItem key={idx}>
                  <AdHeader>
                    <AdTitle>{ad.careerName}</AdTitle>
                    <AdAlias>/ {ad.alias}</AdAlias>
                  </AdHeader>
                    <AdDate>{ad.startDate} - {ad.endDate}</AdDate>
                </AdItem>
              ))}
            </AdDateSection>
          ))}
        </AdListStyled>
      </ContentSection>
    </BackgroundSection>
  );
};
export default CareerViewCategory;








