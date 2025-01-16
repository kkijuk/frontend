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
  left: -126px; /* 제목 기준 왼쪽으로 50px 떨어지도록 설정 */
  top: 48%; 
  transform: translateY(-50%); 
  cursor: pointer;
`;

const NewSignup = () => {
  const [step, setStep] = useState(1);
  const [agreements1, setAgreements1] = useState(false);
  const [agreements2, setAgreements2] = useState(false);
  const [agreements3, setAgreements3] = useState(false);
  const [modalType, setModalType] = useState(null);

  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      handleSignup();
    }
  };

  const handlePrevStep = () => {
    setStep(1); // Step 1로 돌아가기
  };

  const handleSignup = () => {
    navigate('/signupsuccess'); // 회원가입 성공 페이지로 이동
  };

  const handleModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden'; // 스크롤바 숨기기
    $body.addEventListener('wheel', preventScroll, { passive: false });
    $body.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      $body.removeEventListener('wheel', preventScroll);
      $body.removeEventListener('touchmove', preventScroll);
      $body.style.overflow = '';
    };
  }, []);

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
          agreements1={agreements1}
          setAgreements1={setAgreements1}
          agreements2={agreements2}
          setAgreements2={setAgreements2}
          agreements3={agreements3}
          setAgreements3={setAgreements3}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <SignupStepTwo 
          handleSignup={handleSignup} 
          handlePrevStep={handlePrevStep} // 이전 단계로 이동
        />
      )}
    </Container>
  );
};

export default NewSignup;
