import React from 'react';

const EmailVerification = ({ email, setEmail }) => (
  <div className="email-verification">
    <input
      className="email-input"
      type="email"
      placeholder="이메일을 입력하세요"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button className="check-button">중복확인</button>
  </div>
);

export default EmailVerification;
