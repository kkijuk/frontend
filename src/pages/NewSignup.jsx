import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupStepOne from '../components/User/SignupStepOne';
import SignupStepTwo from '../components/User/SignupStepTwo';
import styled from 'styled-components';
import { ReactComponent as BackButtonSVG } from '../assets/main/backbutton.svg';

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
  width: 163px;
  height: 6px;
  border-radius: 6px;
  background-color: ${(props) => (props.active ? '#88D1B6' : '#e0e0e0')};
  margin: 0 5px;
  transition: background-color 0.7s;
`;

const BackButton = styled(BackButtonSVG)`
  position: absolute;
  left: -126px;
  top: 48%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const NewSignup = () => {
  const [step, setStep] = useState(1);

  // 약관 동의 상태를 하나의 객체로 관리
  const [agreements, setAgreements] = useState({
    isTermsAgreed: false,
    isPrivacyAgreed: false,
    isMarketingAgreed: false,
  });

  const navigate = useNavigate();

  const handleNextStep = () => setStep(2);
  const handlePrevStep = () => setStep(1);

  const handleAgreementChange = (key, value) => {
    setAgreements((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignup = () => {
    console.log('회원가입 완료');
    navigate('/signupsuccess');
  };

  /* useEffect(() => {
    const preventScroll = (e) => e.preventDefault();
    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden';
    $body.addEventListener('wheel', preventScroll, { passive: false });
    $body.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      $body.removeEventListener('wheel', preventScroll);
      $body.removeEventListener('touchmove', preventScroll);
      $body.style.overflow = '';
    };
  }, []); */

  return (
    <Container>
      <TitleContainer>
        {step === 2 && <BackButton onClick={handlePrevStep} />}
        <Title>회원가입</Title>
      </TitleContainer>
      <StepBarContainer>
        <StepBar active={step === 1} />
        <StepBar active={step === 2} />
      </StepBarContainer>
      {step === 1 && (
        <SignupStepOne
          agreements={agreements} // 전체 동의 상태 전달
          setAgreements={handleAgreementChange} // 동의 상태 변경 함수 전달
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <SignupStepTwo handleSignup={handleSignup} agreements={agreements} />
      )}
    </Container>
  );
};

export default NewSignup;
