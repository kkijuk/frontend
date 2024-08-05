import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmailVerificationForm from '../components/User/EmailVerificationForm';
import PersonalInfoForm from '../components/User/PersonalInfoForm';
import AgreementModal from '../components/User/AgreementModal';
import InitialSignupForm from '../components/User/InitialSignupForm';

const SignupPage = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [agreements1, setAgreements1] = useState(false);
  const [agreements2, setAgreements2] = useState(false);
  const [agreements3, setAgreements3] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSignup = () => {
    console.log('회원가입 시도:', email, name, contact, verificationCode, birthdate, password, agreements1, agreements2, agreements3);
    // 회원가입 로직을 추가하고 성공 시 다음 코드 실행
    navigate('/signup-success');
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {step === 1 && (
        <InitialSignupForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          agreements1={agreements1}
          setAgreements1={setAgreements1}
          agreements2={agreements2}
          setAgreements2={setAgreements2}
          agreements3={agreements3}
          setAgreements3={setAgreements3}
          handleNextStep={handleNextStep}
          handleModal={handleModal}
        />
      )}
      {step === 2 && (
        <EmailVerificationForm
          email={email}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleNextStep={handleNextStep}
          handleResendCode={() => { /* 재전송 로직 */ }}
          handlePrevStep={handlePrevStep}
        />
      )}
      {step === 3 && (
        <PersonalInfoForm
          name={name}
          setName={setName}
          contact={contact}
          setContact={setContact}
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          handleSignup={handleSignup}
          handlePrevStep={handlePrevStep}
        />
      )}
      <AgreementModal show={showModal} handleModal={handleModal} />
    </>
  );
};

export default SignupPage;





