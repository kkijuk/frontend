import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const LoginScreen = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;

  p {
    color: #707070;
    font-weight: bold;
    margin-bottom: 30px; /* Adjust this value to increase the space between text and input fields */
  }

  .textInput {
    width: 350px;
    height: 30px;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .button {
    width: 350px;
    height: 50px;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #3AAF85; /* Updated button color */
    color: white;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;

    cursor: pointer;
    margin-top: 50px; /* Adjust this value to move the button down */
  }

  .button:hover {
    background-color: #66A386;
  } 

  a {
    color: #3AAF85; /* Updated link color to match the new button color */
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    margin-top: 0px;
    margin-left: 20px; /* Adjust this value to move the checkbox to the left */
  }

  .checkbox {
    margin-right: 5px; /* Adjust this value to reduce space between the checkbox and the label */
    padding-right: 0px; 
  }

  .label {
    color: #707070;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleLogin = () => {
    console.log('로그인 시도:', email, password);
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
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={agreements.terms}
          onChange={(e) => setAgreements({ ...agreements, terms: e.target.checked })}
          className="checkbox"
        />
        <label className="label">자동 로그인</label>
      </div>
      <button className="button" onClick={handleLogin}>로그인</button>
      <div>
        <a href="/signup">회원가입</a> | <a href="/forgot">아이디/비밀번호 찾기</a>
      </div>
    </LoginScreen>
  );
};

export default LoginPage;
