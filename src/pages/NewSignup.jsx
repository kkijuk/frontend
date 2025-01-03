import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AgreementModal1 from '../components/User/AgreementModal1'; // 이용약관 모달
import AgreementModal2 from '../components/User/AgreementModal2'; // 개인정보 모달
import AgreementModal3 from '../components/User/AgreementModal3'; // 마케팅 모달
import SignupStepOne from '../components/User/SignupStepOne'; // 수정된 SignupStepOne
import SignupStepTwo from '../components/User/SignupStepTwo'; // 수정된 SignupStepOne

const NewSignup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [agreements1, setAgreements1] = useState(false);
  const [agreements2, setAgreements2] = useState(false);
  const [agreements3, setAgreements3] = useState(false);
  const [modalType, setModalType] = useState(null); // 어떤 모달을 열지 결정

  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      handleSignup();
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
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
    <>
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
        />
      )}
      {modalType === 1 && <AgreementModal1 show={true} handleModal={closeModal} />}
      {modalType === 2 && <AgreementModal2 show={true} handleModal={closeModal} />}
      {modalType === 3 && <AgreementModal3 show={true} handleModal={closeModal} />}
    </>
  );
};

export default NewSignup;
