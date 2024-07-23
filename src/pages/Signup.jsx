import React, { useState } from 'react';
import styled from 'styled-components';

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
  }

  button {
    background-color: #3AAF85;
    color: white;
    cursor: pointer;
    margin: 10px 0;
  }

  button:hover {
    background-color: #66A386;
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

  .phone-verification {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .phone-input {
    flex: 2;
    margin-right: 5px;
  }

  .verify-button {
    flex: 1;
    width: auto;
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
    background-color: #e0e0e0; /* 체크박스가 체크되지 않았을 때 회색 */
    border: 1px solid #e0e0e0; /* 체크박스의 선 색상 */
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
    background-color: #000; /* 체크박스가 체크되었을 때 검정색 */
    border: 1px solid #000; /* 체크박스의 선 색상 */
  }

  .agreement label {
    flex-grow: 1;
    text-align: left;
    white-space: nowrap;
  }
`;

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

  const handleSignup = () => {
    console.log('회원가입 시도:', email, name, contact, verificationCode, birthdate, password, agreements1, agreements2, agreements3);
  };

  return (
    <SignupScreen>
      <h2>회원가입</h2>
      <div className="label">이메일</div>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="label">이름</div>
      <input
        type="text"
        placeholder="실명을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="label">연락처</div>
      <div className="phone-verification">
        <input
          className="phone-input"
          type="text"
          placeholder="000-0000-0000"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button className="verify-button">인증완료</button>
      </div>
      <div className="label">인증번호</div>
      <input
        type="text"
        placeholder="인증번호를 입력하세요"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <div className="label">생년월일</div>
      <input
        type="date"
        placeholder="0000-00-00"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <div className="label">비밀번호</div>
      <input
        type="password"
        placeholder="특수문자 포함, 8자리 이상 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="label">비밀번호 확인</div>
      <input
        type="password"
        placeholder="비밀번호를 한 번 더 입력하세요"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="agreement">
        <input
          type="checkbox"
          checked={agreements1}
          onChange={(e) => setAgreements1(e.target.checked)}
        />
        <label>이용약관 동의(필수)</label>
      </div>
      <div className="agreement">
        <input
          type="checkbox"
          checked={agreements2}
          onChange={(e) => setAgreements2(e.target.checked)}
        />
        <label>개인정보 수집 및 이용동의(필수)</label>
      </div>
      <div className="agreement">
        <input
          type="checkbox"
          checked={agreements3}
          onChange={(e) => setAgreements3(e.target.checked)}
        />
        <label>마케팅 활용동의(선택)</label>
      </div>
      <button onClick={handleSignup}>가입</button>
    </SignupScreen>
  );
};

export default SignupPage;






