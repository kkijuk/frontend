import styled from 'styled-components';
import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNav from '../../components/Mypage/SubNav'
import InterestBox from '../../components/shared/InterestBox';
import { mypageInterestEdit } from '../../api/Mypage/mypageInterestEdit';
import { mypageInterest } from '../../api/Mypage/mypageInterest';

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Top = styled.div`
    width: 464px;
    margin-top: 7px;
    margin-bottim: 31px;
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

const SaveButton = styled.button`
  width: 100%;
  height: 52px;
  flex-shrink: 0;
  background-color: #3AAF85;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;

  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

    text-align: center;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

  &:hover {
    background-color: #35a576;
  }
`;

const FieldEdit = ({ onSave }) => {
    const [interestingList, setSelectedInterest] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
          try {
              const fetchedInterests = await mypageInterest();
              setSelectedInterest(fetchedInterests);
          } catch (error) {
              console.error('관심 분야 데이터를 불러오는데 실패했습니다:', error);
          }
      };

      fetchData();
  }, []);

    const handleInterestSelect = (interest) => {
      setSelectedInterest((prevSelectedInterests) =>
        prevSelectedInterests.includes(interest)
          ? prevSelectedInterests.filter((i) => i !== interest)
          : [...prevSelectedInterests, interest]
      );
    };
  
    const handleSave = async () => {
      try {
        await mypageInterestEdit({ field: interestingList });
        navigate('/Mypage/Field');
      } catch (error) {
        console.error('저장 중 오류 발생:', error);
      }
    };
  
    return (
    <Box>
        <SubNav></SubNav>
        <Top>
            <Title>내 관심분야</Title>
        </Top>
        <ContentArea>
        <InterestArea>
            {["광고/마케팅", "디자인", "기획/아이디어", "영상/콘텐츠", "IT/SW", "무역/유통", "창업/스타트업", "금융/경제", "봉사활동", "뷰티/패션", "스포츠/레저", "해외탐방", "바이오/생명", "법률/법무", "교육", "데이터분석"].map((interest) => (
            <InterestBox 
                key={interest} 
                content={interest} 
                selected={interestingList.includes(interest)} 
                onClick={() => handleInterestSelect(interest)} 
            />
            ))}
        </InterestArea>
        <SaveButton onClick={handleSave}>저장</SaveButton>
        </ContentArea>
    </Box>
    );
  };

export default FieldEdit;

