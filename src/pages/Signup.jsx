import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmailVerification from '../components/User/EmailVerification';
import InputField from '../components/User/InputField';
import VerificationCode from '../components/User/VerificationCode';
import Agreement from '../components/User/Agreement';
import Modal from '../components/User/AgreementModal';
import SignupForm from '../components/User/SignupForm';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [agreements1, setAgreements1] = useState(false);
  const [agreements2, setAgreements2] = useState(false);
  const [agreements3, setAgreements3] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

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
      <SignupForm
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        contact={contact}
        setContact={setContact}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        birthdate={birthdate}
        setBirthdate={setBirthdate}
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
        handleSignup={handleSignup}
        handleModal={handleModal}
      />
      <Modal show={showModal} handleModal={handleModal} />
    </>
  );
};

export default SignupPage;

