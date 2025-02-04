import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupStepOne from '../components/User/SignupStepOne';
import SignupStepTwo from '../components/User/SignupStepTwo';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
  margin-top: 120px;
`;

const TitleContainer = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 23px;
  font-family: bold;
  color: #3a3a3a;
  margin-bottom: 20px;
  text-align: center;
`;

const StepBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -45px;
`;

const StepBar = styled.div`
  position: relative; 
  width: 163px;
  height: 6px;
  border-radius: 6px;
  background-color: ${(props) => (props.active ? '#88D1B6' : '#e0e0e0')};
  margin: 0 5px;
  transition: background-color 0.7s;
  cursor: pointer;

  /* 클릭 범위 확장을 위한 pseudo-element */
  &::before {
    content: '';
    position: absolute;
    top: -10px; /* 위로 확장 */
    left: 0;
    width: 100%;
    height: 26px; /* 6px의 기존 높이 + 10px 위 + 10px 아래 */
    background-color: transparent; /* 시각적으로는 보이지 않음 */
    cursor: pointer; /* 터치 가능하도록 설정 */
  }
`;


const NewSignup = () => {
  const [step, setStep] = useState(1);

  const [agreements, setAgreements] = useState({
    isTermsAgreed: false,
    isPrivacyAgreed: false,
    isMarketingAgreed: false,
  });

  const navigate = useNavigate();

  const handleAgreementChange = (key, value) => {
    setAgreements((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignup = () => {
    console.log('회원가입 완료');
    navigate('/signupsuccess');
  };

  return (
    <Container>
      <TitleContainer>
        <Title>회원가입</Title>
      </TitleContainer>
      <StepBarContainer>
        <StepBar active={step === 1} onClick={() => setStep(1)} />
        <StepBar active={step === 2} onClick={() => setStep(2)} />
      </StepBarContainer>
      {step === 1 && (
        <SignupStepOne
          agreements={agreements}
          setAgreements={handleAgreementChange}
          handleNextStep={() => setStep(2)} // 다음 단계로 넘어가는 버튼
        />
      )}
      {step === 2 && (
        <SignupStepTwo handleSignup={handleSignup} agreements={agreements} />
      )}
    </Container>
  );
};

export default NewSignup;
