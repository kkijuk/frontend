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

const CategoryBox = styled.div`
  width: 820px;
  gap: 12px;
  margin-bottom: 10px;
`;

const Category = styled.div`
  width: 820px;
  height: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 25px;
`;

const CategoryText = styled.div`
  color: var(--black, #000);
  font-family: regular;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 14px;
  margin-bottom: 20px;
  margin-left: 10px; /* 카테고리 아이콘과 텍스트 사이의 간격 추가 */
`;

const ListBox = styled.div`
  width: 820px;
  height: 74px;

  padding: 10px;
  padding-left: 20px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--white, #FFF);
  box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
  margin-bottom: 10px;
  box-sizing: border-box;
  cursor: pointer;
  
`;

const Name = styled.div``;


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

const CareerName = styled.div`
  color: var(--black, #000);
  font-family: bold;
  font-size: 18px;
  font-style: regular;
  line-height: normal;
  margin-bottom: 9px;
  margin-top: 5px;
`;

const Date = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
`;

const getColor = (categoryName) => {
  let category;
  switch (categoryName) {
    case '동아리':
      category = 1;
      break;
    case '대외활동':
      category = 2;
      break;
    case '공모전/대회':
      category = 3;
      break;
    case '프로젝트':
      category = 4;
      break;
    case '아르바이트/인턴':
      category = 5;
      break;
    case '교육':
      category = 6;
      break;
    default:
      category = 7;
  }
  return category;
};

const formatDate = (dateString) => {
  return dateString.replace(/-/g, '.');
};



const CareerViewCategory = ({ data }) => {
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

  return (
    <BackgroundSection>
      <CategoryBox>
        {data.data.map((item, index) => (
          <React.Fragment key={index}>
            <Category>
              <CareerCategoryCircle category={getColor(item.categoryName)} />
              <CategoryText>{item.categoryName}</CategoryText>
            </Category>

            {item.careers.map((career, careerIndex) => (
              <ListBox
                key={careerIndex}
                onClick={() => handleListBoxClick(career.id)}  // 클릭 시 career.id 전송
              >
                <Name>
                  <CareerContainer>
                    <CareerName>{career.careerName}</CareerName>
                    <AliasName>&nbsp;/ {career.alias}</AliasName>
                  </CareerContainer>                  
                  </Name>
                <Date>{formatDate(career.startDate)} ~ {formatDate(career.endDate)}</Date>
              </ListBox>
            ))}
          </React.Fragment>
        ))}
      </CategoryBox>
    </BackgroundSection>
  );
};

export default CareerViewCategory;


