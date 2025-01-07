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
    width: 180px;
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

  .complete-button {
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
  }
`;

const Title = styled.div`
  color: #707070;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 30px;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
`;

const SignupStepTwo = ({ handleSignup }) => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const statuses = [
    '중/고등학생',
    '대학 재/휴학생',
    '대학 졸업(유예)생',
    '창업/사업 중',
    '취준생',
    '직장인',
    '프리랜서',
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
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); // 2초 후 토스트 메시지 숨김
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
      <button className="complete-button" onClick={handleSignup}>
        완료
      </button>
      {showToast && <Toast>최대 2개까지 선택 가능해요.</Toast>}
    </StepTwoContainer>
  );
};

export default SignupStepTwo;
