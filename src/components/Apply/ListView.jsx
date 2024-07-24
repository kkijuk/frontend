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
  border-radius: 11px;
  background: #F5F5F5;
  color: var(--gray-02, #707070);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 4px 16px;
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px; 
`;

const groupByDate = (data) => {
  return data.reduce((acc, current) => {
    const date = current.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(current);
    return acc;
  }, {});
};

const ListView = ({ data }) => {
  const groupedData = groupByDate(data);
  return (
    <BackgroundSection>
      <ContentSection background="#f0f0f0">
        <AdListStyled>
          {Object.keys(groupedData).map((date, index) => (
            <AdDateSection key={index}>
              <AdDate>{date}</AdDate>
              {groupedData[date].map((ad, idx) => (
                <AdItem key={idx}>
                  <AdDetails>
                    <Label>{ad.label}</Label>
                    <AdTitle>{ad.details}</AdTitle>
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








