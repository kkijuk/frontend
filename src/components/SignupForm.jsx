import React from 'react';
import styled from 'styled-components';
import EmailVerification from './EmailVerification';
import InputField from './InputField';
import VerificationCode from './VerificationCode';
import Agreement from './Agreement';

const SignupScreen = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;

  h2 {
    color: #3AAF85;
    text-align: center;
  }

  input[type="text"], input[type="email"], input[type="password"], input[type="date"], button {
    width: 300px;
    padding: 10px;
    margin: 5px 0;
    border: none;
    border-radius: 10px;
    background-color: #F5F5F5;
    height: 30px;
  }

  button {
    background-color: #3AAF85;
    color: white;
    cursor: pointer;
    margin: 10px 0;
    height: 45px;
  }

  a {
    color: #74BC9C;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .label {
    color: #3AAF85;
    margin-top: 10px;
    text-align: left;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .email-verification {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin-left: 40px;
    margin-right: auto;
    height: 55px;
  }

  .email-input {
    flex: 2;
    margin-right: 5px;
  }

  .check-button {
    flex: 1;
    width: 150px;
    margin-left: 25px; 
    height: 40px;
  }

  .phone-verification, .verification-code {
   display: flex;
    justify-content: space-between;
    width: 300px;
    margin-left: 40px;
    margin-right: auto;
    height: 55px;
  }

  .phone-input {
    width: 300px;
    height: 30px;
  }

  .code-input {
    flex: 2;
    margin-right: 5px;
    padding: 10px; /* 높이를 연락처 입력란과 맞추기 위해 추가 */
  }

  .verify-button {
    flex: 1;
    width: 150px;
    margin-left: 25px; 
    height: 40px; 
  }

  .agreement {
    display: flex;
    align-items: center;
    margin: 10px auto;
    justify-content: flex-start;
    width: 300px;
    flex-direction: row;
  }

  .agreement input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    background-color: #e0e0e0; 
    border: 1px solid #e0e0e0; 
    padding: 9px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  .agreement input[type="checkbox"]::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 15px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>') no-repeat center center / contain;
    transform: translate(-50%, -50%);
  }

  .agreement input[type="checkbox"]:checked {
    background-color: #000; 
    border: 1px solid #000; 
  }

  .agreement label {
    flex-grow: 1;
    text-align: left;
    white-space: nowrap;
  }

  .agreement .arrow {
    cursor: pointer;
    margin-left: 5px;
  }
`;

const SignupForm = ({
  email, setEmail, name, setName, contact, setContact, verificationCode, setVerificationCode,
  birthdate, setBirthdate, password, setPassword, confirmPassword, setConfirmPassword,
  agreements1, setAgreements1, agreements2, setAgreements2, agreements3, setAgreements3,
  handleSignup, handleModal
}) => (
  <SignupScreen>
    <h2>회원가입</h2>
    <EmailVerification email={email} setEmail={setEmail} />
    <InputField label="이름" type="text" placeholder="실명을 입력하세요" value={name} setValue={setName} />
    <InputField label="연락처" type="text" placeholder="000-0000-0000" value={contact} setValue={setContact} />
    <VerificationCode verificationCode={verificationCode} setVerificationCode={setVerificationCode} />
    <InputField label="생년월일" type="date" placeholder="0000-00-00" value={birthdate} setValue={setBirthdate} />
    <InputField label="비밀번호" type="password" placeholder="특수문자 포함, 8자리 이상 입력하세요" value={password} setValue={setPassword} />
    <InputField label="비밀번호 확인" type="password" placeholder="비밀번호를 한 번 더 입력하세요" value={confirmPassword} setValue={setConfirmPassword} />
    <Agreement checked={agreements1} setChecked={setAgreements1} label="이용약관 동의(필수)" handleModal={handleModal} />
    <Agreement checked={agreements2} setChecked={setAgreements2} label="개인정보 수집 및 이용동의(필수)" handleModal={handleModal} />
    <Agreement checked={agreements3} setChecked={setAgreements3} label="마케팅 활용동의(선택)" handleModal={handleModal} />
    <button onClick={handleSignup}>가입</button>
  </SignupScreen>
);

export default SignupForm;
