import styled from 'styled-components';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SubNav from '../../components/Mypage/SubNav'
import InterestBox from '../../components/shared/InterestBox';

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 100px;
`;

const Top = styled.div`
    width: 464px;
    margin-top: 7px;
    margin-bottim: 32px;
    display: flex;
    justify-content: left;
    align-items: center;
`

const ContentArea = styled.div`
  margin: 0 auto;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  flex-direction: column;
  overflow-y: auto;
`;

const InterestArea = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(8, auto);
  box-sizing: border-box;
  gap: 10px;
  justify-content: center;

`;

const Title = styled.h2`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const EditButton = styled.button`
    width: 65px;
    height: 25px;
    flex-shrink: 0;
    border-radius: 10px;
    border: none;
    background: var(--gray-06, #F5F5F5);
    margin-left: 10px;
    cursor: pointer;

    color: var(--gray-02, #707070);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &:hover {
    background-color: #F1F1F1;
   }
`;


const Field = ({ }) => {
  const [interestingList, setSelectedInterest] = useState([]);
  const navigate = useNavigate();

  const handleInterestSelect = (interest) => {
    setSelectedInterest((prevSelectedInterests) =>
      prevSelectedInterests.includes(interest)
        ? prevSelectedInterests.filter((i) => i !== interest)
        : [...prevSelectedInterests, interest]
    );
  };

  const handleEdit = () => {
    navigate('/Mypage/FieldEdit');
  };

  return (
    <Box>
        <SubNav></SubNav>
        <Top>
            <Title>내 관심분야</Title>
            <EditButton onClick={handleEdit}>수정</EditButton>
        </Top>
        <ContentArea>
        <InterestArea>
            {["광고/마케팅", "디자인", "기획/아이디어", "영상/콘텐츠", "IT/SW", "무역/유통", "창업/스타트업", "금융/경제", "봉사활동", "뷰티/패션", "스포츠/레저", "해외탐방", "바이오/생명", "법률/법무", "교육", "데이터분석"].map((interest) => (
            <InterestBox 
                key={interest} 
                content={interest} 
                selected={true} 
            />
            ))}
        </InterestArea>
        </ContentArea>
    </Box>
  );
};

export default Field;



