import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/Login/Login'; 
import { useAuth } from '../components/AuthContext';

const LoginScreen = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;

  p {
    color: #707070;
    font-family: light;
    margin-bottom: 50px;
    text-align: center; 
      }

  .textInput {
    width: 350px;
    height: 30px;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #F5F5F5;
    transition: border 0.3s ease;
    font-family: Regular;
    font-size: 16px;

    &:focus {
      border: 2px solid #3AAF85;
      outline: none;
    }
  }

  .button {
    width: 350px;
    height: 50px;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #3AAF85; 
    color: white;
    font-family: Regular;
    font-size: 19px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    margin-top: 20px; 
     margin-bottom: 20px;
  }

  a {
    color: #3AAF85; 
    text-decoration: none;
    font-family: Regular;
  }

  a:hover {
    text-decoration: underline;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    margin-top: 0px;
    margin-left: 20px; 
  }

  .checkbox {
    margin-right: 5px;
    padding-right: 0px; 
  }

  .label {
    color: #707070;
     font-family: Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
  }

  .links {
    color: #3AAF85; 
     font-family: Regular;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const ErrorMessage = styled.div`
  color: #FC5555;
  margin-top: 50px; 
  margin-bottom: 0px; 
  font-family: Regular;
  font-size: 16px;
`;


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); 
  const { login: setLoginState } = useAuth(); 

  const handleLogin = async () => {
    try {
      const result = await login({ email, password });
      console.log('로그인 성공:', result);

      if (result.message === "login success") {
        setLoginState(true); // 로그인 상태 업데이트
        navigate('/'); 
      } else {
        setErrorMessage(result.message || "로그인 실패");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <LoginScreen>
      <img src={logo} width='100px' alt="Logo" />
      <p>당신의 끼를 적어두세요</p>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="textInput"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="textInput"
      />
{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
<button className="button" onClick={handleLogin}>로그인</button>

      <div className="links">
        <a href="/signup">회원가입</a> | <a href="/passwordresetemailconfirm">비밀번호 찾기</a>
      </div>
    </LoginScreen>
  );
};

export default LoginPage;
