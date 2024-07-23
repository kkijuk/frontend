import React from 'react';
import styled from 'styled-components';
import CareerCategoryCircle from '../components/shared/CareerCategoryCircle';

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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ background }) => background || 'white'};
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
`;

const AdDetails = styled.div`
  color: #555;
`;

const AdTitle = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
                      <AdDate>{category}</AdDate>
              </TagContainer>
              {groupedData[category].map((ad, idx) => (
                <AdItem key={idx}>
                  <AdDetails>
                    <AdTitle>{ad.careerName}</AdTitle>
                    <div>{ad.alias}</div>
                    <div>{ad.startDate} - {ad.endDate}</div>
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
export default CareerViewCategory;








