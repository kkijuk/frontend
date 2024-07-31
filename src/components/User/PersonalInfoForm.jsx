import React from 'react';
import styled from 'styled-components';
import InputField from './InputField';

const PersonalInfoForm = ({ name, setName, contact, setContact, birthdate, setBirthdate, handleSignup }) => (
  <FormContainer>
    <h2>회원가입</h2>
    <InputField label="이름" type="text" placeholder="실명을 입력하세요" value={name} setValue={setName} />
    <InputField label="연락처" type="text" placeholder="000-0000-0000" value={contact} setValue={setContact} />
    <InputField label="생년월일" type="date" placeholder="0000-00-00" value={birthdate} setValue={setBirthdate} />
    <button onClick={handleSignup}>완료</button>
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

  input[type="text"], input[type="date"], button {
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

export default PersonalInfoForm;
