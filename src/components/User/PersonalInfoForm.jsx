import React, { useState } from 'react';
import styled from 'styled-components';
import { registerUser } from '../../api/Signup/registerUser';
import { login } from '../../api/Login/Login'; // 로그인 API 임포트
import { useAuth } from '../AuthContext';

const FormContainer = styled.div`
  align-items: center;
  justify-content: center; 
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  position: relative;

  h2 {
    color: #3AAF85;
    text-align: center;
    font-size: 24px;
     font-family: Regular;
    margin-top: -25px;
  }

  .step-indicator {
    background: #D9D9D9;
    border-radius: 10px;
    color: white;
    margin: 10px auto; 
    font-size: 14px;
    width: 52px;
    height: 22px;
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }

  .prev-button {
    position: absolute;
    left: 10px;
    top: 15px;
    font-size: 24px;
    color: black;
    cursor: pointer;
     font-family: Regular;
  }

  .input-group {
    margin-bottom: 20px;
    width: 100%;
    text-align: left;
  }

  input[type="text"], input[type="date"], button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #F5F5F5;
    font-size: 16px;
    height: 50px;
    box-sizing: border-box;
     font-family: Regular;
  }

  input[type="text"]:focus, input[type="date"]:focus {
    border-color: #3AAF85;  
    outline: none;  
  }

  label {
    color: #3AAF85;
  }

  button {
    background-color: #3AAF85;
    color: white;
    cursor: pointer;
    margin: 10px 0;
    height: 50px;
    width: 100%;
    border: none;
    border-radius: 10px;
     font-family: Regular;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px; 
`;

const Instructions = styled.p`
  color: #333;
  margin: 9px 0;
  line-height: 1.2;
  font-family: Regular;
  font-size: 16px;
  text-align: center;
  white-space: nowrap; 
`;

const PersonalInfoForm = ({ name, setName, contact, setContact, birthdate, setBirthdate, handleSignup, handlePrevStep, email, password, confirmPassword }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { login: authLogin } = useAuth()

  const validateName = (name) => {
    const nameRegex = /^[가-힣]{1,20}$/;
    if (!nameRegex.test(name)) {
      setErrorMessage("올바른 이름을 입력하세요.");
      return false;
    }
    return true;
  };

  const handleContactChange = (e) => {
    const formattedContact = e.target.value
      .replace(/[^0-9]/g, '')  
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') 
      .slice(0, 13);

    setContact(formattedContact);
  };

  const handleSubmit = async () => {
    if (!validateName(name)) {
      return;
    }
   
    if (!name || !contact || !birthdate) {
      setErrorMessage("모든 필드를 채워주세요.");
      return;
    }
   
    try {
      setErrorMessage(''); // 오류 메시지 초기화
   
      const requestData = {
        email,
        name,
        phoneNumber: contact,
        birthDate: birthdate,
        password,
        passwordConfirm: confirmPassword,
      };
   
      console.log("Sending request data:", requestData);  
   
      await registerUser(requestData); // registerResult는 사용하지 않으므로 삭제
      
      // 회원가입 성공 후 로그인 시도
      try {
        const loginResult = await login({ email, password });
        console.log(loginResult);
        if (loginResult.message === "login success") {
          authLogin(); // 로그인 상태로 전환
          handleSignup(); // 회원가입 완료 후 처리
        }
      } catch (loginError) {
        console.error('로그인 실패:', loginError);
        setErrorMessage('회원가입은 성공했으나 로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setErrorMessage(error.message); 
    }
  };

  return (
    <FormContainer>
      <div className="prev-button" onClick={handlePrevStep}>{"<"}</div>
      <h2>회원가입</h2>
      <div className="step-indicator">3/3</div>
      <Instructions>
        기본 인적사항을 정확히 입력해주세요.<br />
        이 정보는 끼적의 이력서 등에 자동으로 기입됩니다.
      </Instructions>
      <div className="input-group">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          placeholder="실명을 입력하세요"
          value={name}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="contact">연락처</label>
        <input
          id="contact"
          type="text"
          placeholder="000-0000-0000"
          value={contact}
          maxLength={13}  
          onChange={handleContactChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="birthdate">생년월일</label>
        <input
          id="birthdate"
          type="date"
          placeholder="0000-00-00"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <button onClick={handleSubmit}>완료</button>
    </FormContainer>
  );
};

export default PersonalInfoForm;