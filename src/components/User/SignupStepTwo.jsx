import React, { useState } from 'react';
import styled from 'styled-components';

const StepTwoContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  margin-top: 40px;

  .status-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 40px;
  }

  .status-button {
    width: 193px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background: #f5f5f5;
    font-size: 16px;
    font-weight: 500;
    color: #707070;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;

    &.active {
      background: var(--main-01, #E1FAED);
      color: #3AAF85;
      border: 2px solid var(--main-01, #3AAF85);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px; 
  margin-top: 20px;
`;


const CompleteButton = styled.button`
  width: 400px;
  height: 50px;
  background: var(--main-01, #3AAF85);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2a9f72;
  }
`;

const Title = styled.div`
color: #333;
text-align: center;
font-family: normal;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-bottom: 30px;
`;

const ErrorMessage = styled.div`
  margin-top: -15px; 
  margin-bottom: 10px;
  display: flex;
  justify-content: center; 
  align-items: center;
  z-index: 1000;
  color: var(--error, #FF7979);
  text-align: center;
  font-family: normal;
  width: 100%; 
  font-size: 15px;
`;

const SignupStepTwo = ({ handleSignup, handlePrevStep }) => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const statuses = [
    '중/고등학생',
    '취준생',
    '대학 재/휴학생',
    '직장인',
    '대학 졸업(유예)생',
    '프리랜서',
    '창업/사업 중',
    '기타',
  ];

  const handleStatusClick = (status) => {
    if (selectedStatuses.includes(status)) {
      // 이미 선택된 상태라면 해제
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else if (selectedStatuses.length < 2) {
      // 아직 2개 미만 선택 시 추가
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      // 2개 초과 시 토스트 메시지 표시
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 2000); // 2초 후 토스트 메시지 숨김
    }
  };

  return (
    <StepTwoContainer>
      <Title>마지막 단계예요! 당신은 지금 어떤 상태인가요?</Title>
      <div className="status-container">
        {statuses.map((status) => (
          <button
            key={status}
            className={`status-button ${selectedStatuses.includes(status) ? 'active' : ''}`}
            onClick={() => handleStatusClick(status)}
          >
            {status}
          </button>
        ))}
      </div>
      {showErrorMessage && <ErrorMessage>최대 2개까지 선택 가능해요</ErrorMessage>}
      <ButtonContainer>
        <CompleteButton onClick={handleSignup}>다음</CompleteButton>
      </ButtonContainer>
    </StepTwoContainer>
  );
};

export default SignupStepTwo;
