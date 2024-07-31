import React from 'react';
import styled from 'styled-components';
import InputField from './InputField';

const EmailVerificationForm = ({ email, verificationCode, setVerificationCode, handleNextStep }) => (
  <FormContainer>
    <h2>회원가입</h2>
    <p>회원가입을 위해 아래 이메일로 인증번호를 발송했습니다. 인증번호를 입력해주세요.</p>
    <p>{email}</p>
    <InputField label="인증번호" type="text" placeholder="인증번호를 입력하세요" value={verificationCode} setValue={setVerificationCode} />
    <button onClick={handleNextStep}>확인</button>
  </FormContainer>
);

const FormContainer = styled.div`
  align-items: center;
  justify-content: center; 
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;

  h2 {
    color: #3AAF85;
    text-align: center;
    font-size: 28px;
  }

  p {
    color: #3AAF85;
    margin: 10px 0;
  }

  input[type="text"], button {
    width: 300px;
    padding: 10px;
    margin: 5px 0;
    border: none;
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  button {
    background-color: #3AAF85;
    color: white;
    cursor: pointer;
    margin: 10px 0;
    height: 45px;
  }
`;

export default EmailVerificationForm;

