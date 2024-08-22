import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CareerCategoryCircle from '../shared/CareerCategoryCircle';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';

const BackgroundSection = styled.div`
  width: 100vw;
  height: 600px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f0f0f0;
  position: relative;
  box-sizing: border-box;
  overflow-y: auto; /* 스크롤 가능하게 설정 */
  display: flex;
  justify-content: center; /* CategoryBox를 가운데로 정렬 */
  align-items: flex-start; /* CategoryBox를 세로 축에서 상단에 정렬 */
`;

const Contianer = styled.div`
  width: 820px;
  height: 600px;
  box-sizing: border-box;  /* padding과 border를 포함한 전체 크기를 계산 */
`;

const YearBox = styled.div`
  width: 820px;
  gap: 12px;
  margin-bottom: 20px;
`;

const Year = styled.div`
  color: var(--black, #000);

  font-family: regular;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 22px;
  margin-bottom: 10px;
`;

const ListBox = styled.div`
  width: 820px;
  height: auto;
  padding: 15px;
  padding-left: 20px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

`;

const Category = styled.div`
  height: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 9px;
`;

const CategoryTextBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 4px;
  font-style: regular;
`;

const Name = styled.div``;

const CareerName = styled.div`
  color: var(--black, #000);
  font-family: bold;
  font-size: 18px;
  font-style: regular;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 9px;
  margin-top: 5px;
`;

const AliasName = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: regular;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 9px;
  margin-top: 5px;
`;

const CareerContainer = styled.div`
  display: flex; /* Flexbox로 가로 정렬 */
  align-items: center; /* 세로 가운데 정렬 (선택 사항) */
`;

const Date = styled.div`
  font-style: light;
  font-size: 14px;
  color: #555;
`;

const formatDate = (dateString) => {
  return dateString.replace(/-/g, '.');
};

const CareerViewYear = ({data}) => {
  console.log('CareerViewYear rendered');

  const navigate = useNavigate();
  const handleListBoxClick = async (careerId) => {
    try {
      const responseData = await ViewCareerDetail(careerId);
      console.log('Received careerId:', careerId);
      if (responseData) {
        navigate(`/mycareer/${careerId}`, { details: responseData });
  
      }
      // 여기서 tagList를 이용해 추가 작업을 할 수 있습니다.
    } catch (error) {
      console.error('Error fetching careerId:', error);
    }
  };

  if (!Array.isArray(data.data)) {
    console.log("data값:", data);
    return null;
  }

  return (
    <BackgroundSection>
      <Contianer>
        {data.data.map((item, index) => {
          console.log('Item:', item);
          console.log('Item year:', item.year);

          return (
            <YearBox key={index}>
              <Year>{item.year}</Year>
              {item.careers.map((career, careerIndex) => (
                <ListBox 
                key={careerIndex}
                onClick={() => handleListBoxClick(career.id)}  // 클릭 시 career.id 전송
                >
                  <Category>
                    <CareerCategoryCircle category={career.categoryId} />
                    <CategoryTextBox>{career.categoryName}</CategoryTextBox>
                  </Category>
                  <Name>
                  <CareerContainer>
                    <CareerName>{career.careerName}</CareerName>
                    <AliasName>&nbsp;/ {career.alias}</AliasName>
                  </CareerContainer>  
                  </Name>
                  <Date>{career.startDate} ~ {career.endDate}</Date>
                </ListBox>
              ))}
            </YearBox>
          );
        })}
      </Contianer>
    </BackgroundSection>
  );
};

export default CareerViewYear;