import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailVerificationForm from '../components/User/EmailVerificationForm';
import PersonalInfoForm from '../components/User/PersonalInfoForm';
import AgreementModal1 from '../components/User/AgreementModal1'; // 이용약관 모달
import AgreementModal2 from '../components/User/AgreementModal2'; // 개인정보 모달
import AgreementModal3 from '../components/User/AgreementModal3'; // 마케팅 모달
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
  const [modalType, setModalType] = useState(null); // 어떤 모달을 열지 결정

  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSignup = () => {
    console.log('회원가입 시도:', email, name, contact, verificationCode, birthdate, password, agreements1, agreements2, agreements3);
    navigate('/signupsuccess');
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
          email={email}  
          password={password}
          confirmPassword={confirmPassword}
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
      {modalType === 1 && <AgreementModal1 show={true} handleModal={closeModal} />}
      {modalType === 2 && <AgreementModal2 show={true} handleModal={closeModal} />}
      {modalType === 3 && <AgreementModal3 show={true} handleModal={closeModal} />}
    </>
  );
};

export default SignupPage;
