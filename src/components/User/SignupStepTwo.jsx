import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { createRecord } from '../../api/Record/record';
import { createIntro } from '../../api/Intro/intro';

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

const SignupStepTwo = ({ agreements, handleSignup }) => {
  const [selectedStatuses, setSelectedStatuses] = useState([]); // 복수 선택 상태로 수정
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const statuses = [
    { label: '중/고등학생', value: 'MIDDLE_OR_HIGH_SCHOOL' },
    { label: '취준생', value: 'JOB_SEEKER' },
    { label: '대학 재/휴학생', value: 'COLLEGE_STUDENT' },
    { label: '직장인', value: 'EMPLOYEE' },
    { label: '대학 졸업(유예)생', value: 'COLLEGE_GRADUATE' },
    { label: '프리랜서', value: 'FREELANCER' },
    { label: '창업/사업 중', value: 'ENTREPRENEUR' },
    { label: '기타', value: 'OTHER' },
  ];
  
// 나중에 2개로 수정하기 에러 메세지도 
  const handleStatusClick = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status)); // 선택 해제
    } else if (selectedStatuses.length < 1) {
      setSelectedStatuses([...selectedStatuses, status]); // 상태 추가
    } else {
      setShowErrorMessage(true); // 에러 메시지 표시
      setTimeout(() => setShowErrorMessage(false), 2000);
    }
  };

  const handleSubmit = async () => {
    if (selectedStatuses.length === 0) {
      alert('직업을 선택해주세요.');
      return;
    }
  
    try {
      const payload = {
        isTermsAgreed: agreements.isTermsAgreed,
        isPrivacyAgreed: agreements.isPrivacyAgreed,
        isMarketingAgreed: agreements.isMarketingAgreed ? 'BOTH' : 'NONE',
        memberJob: selectedStatuses[0], // 단일 선택
      };
  
      console.log('요청 데이터:', payload);
  
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/member/profile`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('회원가입 성공:', response.data);

      // 이력서 생성
      const createRecordResponse = await createRecord({
        "address": "string",
        "profileImageUrl": "string"
      })
      console.log('이력서 생성 성공:', createRecordResponse.data);

      // 자기소개서 생성
      const createIntroResponse = await createIntro({
        "questionList": [
          {
            "title": "string",
            "content": "string",
            "number": 0
          },
          {
            "title": "string",
            "content": "string",
            "number": 1
          }
          ,
          {
            "title": "string",
            "content": "string",
            "number": 2
          }
        ],
        "state": 0
      })
      console.log('소개 생성 성공:', createIntroResponse.data);

      handleSignup();
    } catch (error) {
      console.error('회원가입 실패:', error.message);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <StepTwoContainer>
      <Title>마지막 단계예요! 당신은 지금 어떤 상태인가요?</Title>
      <div className="status-container">
        {statuses.map((status) => (
          <button
            key={status.value}
            className={`status-button ${
              selectedStatuses.includes(status.value) ? 'active' : ''
            }`}
            onClick={() => handleStatusClick(status.value)}
          >
            {status.label}
          </button>
        ))}
      </div>
      {showErrorMessage && <ErrorMessage>최대 1개까지 선택 가능해요</ErrorMessage>}
      <ButtonContainer>
        <CompleteButton onClick={handleSubmit}>완료</CompleteButton>
      </ButtonContainer>
    </StepTwoContainer>
  );
};

export default SignupStepTwo;