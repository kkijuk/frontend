import React from 'react';

const EmailVerification = ({ email, setEmail }) => (
  <div>
    <div className="label">이메일</div>
    <div className="email-verification">
      <input
        className="email-input"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="check-button">중복확인</button>
    </div>
  </div>
);

export default EmailVerification;
