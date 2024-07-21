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

  input, button {
    width: 300px;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  button {
    background-color: #3AAF85;
    color: white;
    cursor: pointer;
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
`;

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleSignup = () => {
    console.log('회원가입 시도:', email, name, contact, verificationCode, birthdate, password, agreements);
  };

  return (
    <SignupScreen>
    
      <h2>회원가입</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="실명을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="000-0000-0000"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <input
        type="text"
        placeholder="인증번호를 입력하세요"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button>인증완료</button>
      <input
        type="date"
        placeholder="0000-00-00"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <input
        type="password"
        placeholder="특수문자 포함, 8자리 이상 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호를 한 번 더 입력하세요"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={agreements.terms}
            onChange={(e) => setAgreements({ ...agreements, terms: e.target.checked })}
          />
          이용약관 동의(필수)
        </label>
        <label>
          <input
            type="checkbox"
            checked={agreements.privacy}
            onChange={(e) => setAgreements({ ...agreements, privacy: e.target.checked })}
          />
          개인정보 수집 및 이용동의(필수)
        </label>
        <label>
          <input
            type="checkbox"
            checked={agreements.marketing}
            onChange={(e) => setAgreements({ ...agreements, marketing: e.target.checked })}
          />
          마케팅 활용동의(선택)
        </label>
      </div>
      <button onClick={handleSignup}>가입</button>
    </SignupScreen>
  );
};

export default SignupPage;
