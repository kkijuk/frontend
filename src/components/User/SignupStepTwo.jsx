import React from 'react';
import styled from 'styled-components';

const StepTwoContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background: white;
  border-radius: 10px;
  text-align: center;

 h2 {
		color: black;
		text-align: center;
		font-size: 24px;
		font-family: bold;
		margin-top: -25px;
	}

  .progress-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .progress-step {
      flex: 1;
      height: 4px;
      background-color: #e0e0e0;

      &.active {
        background-color: var(--main-01, #3AAF85);
      }

      & + & {
        margin-left: 10px;
      }
    }
  }

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
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background: #f5f5f5;
    font-size: 16px;
    font-weight: 500;
    color: #707070;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;

    &:hover {
      background: var(--main-02, #88D1B6);
      color: white;
    }

    &.active {
      background: var(--main-01, #E1FAED);
      color: #3AAF85;
      border: 2px solid var(--main-01, #3AAF85);
    }
  }

  .complete-button {
    width: 100%;
    max-width: 300px;
    height: 50px;
    background: var(--main-01, #3AAF85);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #2a9f72;
    }
  }
`;

const SignupStepTwo = ({ handleSignup }) => {
  const [selectedStatus, setSelectedStatus] = React.useState(null);

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
    setSelectedStatus(status);
  };

  return (
    <StepTwoContainer>
      <h2>회원가입</h2>
      <div className="progress-bar">
        <div className="progress-step active"></div>
        <div className="progress-step active"></div>
      </div>
      <div className="status-container">
        {statuses.map((status) => (
          <button
            key={status}
            className={`status-button ${selectedStatus === status ? 'active' : ''}`}
            onClick={() => handleStatusClick(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <button className="complete-button" onClick={handleSignup}>
        완료
      </button>
    </StepTwoContainer>
  );
};

export default SignupStepTwo;
