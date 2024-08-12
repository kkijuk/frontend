import React from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import Agreement from './Agreement';

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
    font-size: 24px;
    font-family: 'Light';
    margin-top: -25px;
  }

  .step-indicator {
    background: #F1F1F1;
    border-radius: 10px;
    color: #707070;
    margin: 10px auto; 
    font-size: 14px;
    display: inline-block;
    width: 52px;
    font-family: medium;
    height: 22px;
  
  }

  .input-group {
    margin-bottom: 20px;
    width: 100%;
    text-align: left;
  }

  .email-verification {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .email-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    margin-right: 10px;
    font-size: 14px;
    width: 280px;
    height: 50px;
    box-sizing: border-box;
    background: #F5F5F5;
    color: #707070;
  }

  .check-button {
    width: 110px;
    height: 50px;
    flex-shrink: 0;
    padding: 10px 20px;
    background-color: #3AAF85;
    color: #FFF;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    box-sizing: border-box;
  }

  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #e0e0e0;
    background-color: #F5F5F5;
    font-size: 14px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 14px;
    height: 50px;
    box-sizing: border-box;
  }

  label {
    color: #3AAF85;
  }

  button {
    width: 300px;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #3AAF85;
    color: white;
    cursor: pointer;
    height: 45px;
    width: 400px;
    height: 50px;
  }

  .agreement {
    display: flex;
    align-items: center;
    margin: 10px 0;
    justify-content: flex-start;
    width: 100%;
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
    color: black;
  }

  .agreement .arrow {
    cursor: pointer;
    margin-left: 5px;
  }
`;

const InitialSignupForm = ({
  email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
  agreements1, setAgreements1, agreements2, setAgreements2, agreements3, setAgreements3,
  handleNextStep, handleModal
}) => (
  <FormContainer>
    <h2>회원가입</h2>
    <div className="step-indicator">1/3</div>
    <div className="input-group">
      <label htmlFor="email">이메일</label>
      <div className="email-verification">
        <input
          id="email"
          className="email-input"
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="check-button">중복확인</button>
      </div>
    </div>
    <div className="input-group">
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="대문자, 특수문자를 포함하여 8자리 이상 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="input-group">
      <label htmlFor="confirmPassword">비밀번호 확인</label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="비밀번호를 한 번 더 입력하세요"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
    <Agreement checked={agreements1} setChecked={setAgreements1} label="이용약관 동의(필수)" handleModal={handleModal} />
    <Agreement checked={agreements2} setChecked={setAgreements2} label="개인정보 수집 및 이용동의(필수)" handleModal={handleModal} />
    <Agreement checked={agreements3} setChecked={setAgreements3} label="마케팅 활용동의(선택)" handleModal={handleModal} />
    <button onClick={handleNextStep}>다음</button>
  </FormContainer>
);

export default InitialSignupForm;




