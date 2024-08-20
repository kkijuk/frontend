import React, { useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InterestBox from '../components/shared/InterestBox';
import InterestSkipModal from '../components/User/InterestSkipModal';
import { saveInterests } from '../api/Signup/signupInterest';

const ContentArea = styled.div`

  margin: 0 auto;
  padding: 20px;
  background-color: white;
  width: 400px;
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

const CloseButton = styled.button`
    color: #707070;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;

  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;

  margin-top: 34px;
  margin-bottom: 18px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 32px;

  color: var(--main-01, #3AAF85);
  text-align: center;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Label = styled.label`
    color: #707070;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

  display: inline-block;
  margin-bottom: 32px;
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

const SignupInterest = ({ onSave }) => {
  const [interestingList, setSelectedInterest] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  const handleInterestSelect = (interest) => {
    setSelectedInterest((prevSelectedInterests) =>
      prevSelectedInterests.includes(interest)
        ? prevSelectedInterests.filter((i) => i !== interest)
        : [...prevSelectedInterests, interest]
    );
  };

  const handleSave = async () => {
    if (interestingList.length === 0) {
      alert("관심분야를 선택해 주세요!");
      return;
    }

    try {
      const result = await saveInterests(interestingList);
      console.log('Response:', result);
      console.log('Interest list being sent:', interestingList);

      onSave(result); // API 응답 데이터를 처리할 필요가 있으면 사용
      navigate('/');
    } catch (error) {
      alert('서버에 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleClose = () => {
    navigate('/'); // 홈 페이지로 이동
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // 모달의 "확인" 버튼을 눌렀을 때 호출될 함수
  const handleModalConfirm = () => {
    handleClose(); // 홈 페이지로 이동
  };

  return (
    <ContentArea>
      <Title>관심분야 등록</Title>
      <Label>관심 있는 정보를 알려드려요</Label>
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
      <CloseButton onClick={() => setShowModal(true)}>건너뛰기</CloseButton>
      <SaveButton onClick={handleSave}>완료</SaveButton>
      {showModal && (
        <InterestSkipModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}
    </ContentArea>
  );
};

export default SignupInterest;



