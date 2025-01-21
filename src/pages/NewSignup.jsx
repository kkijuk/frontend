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
  const [agreements, setAgreements] = useState({
    isTermsAgreed: false,
    isPrivacyAgreed: false,
    isMarketingAgreed: false,
  });

  const navigate = useNavigate();

  const handleNextStep = () => setStep(2);
  const handleSignup = () => {
    console.log('회원가입 완료');
    navigate('/signupsuccess'); // 회원가입 완료 시 signupsuccess 페이지로 이동
  };

  return (
    <div>
      {step === 1 && (
        <SignupStepOne
          agreements1={agreements.isTermsAgreed}
          setAgreements1={(value) => setAgreements({ ...agreements, isTermsAgreed: value })}
          agreements2={agreements.isPrivacyAgreed}
          setAgreements2={(value) => setAgreements({ ...agreements, isPrivacyAgreed: value })}
          agreements3={agreements.isMarketingAgreed}
          setAgreements3={(value) => setAgreements({ ...agreements, isMarketingAgreed: value })}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && <SignupStepTwo handleSignup={handleSignup} agreements={agreements} />}
    </div>
  );
};

export default NewSignup;
