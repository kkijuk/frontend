import React from 'react';

const VerificationCode = ({ verificationCode, setVerificationCode }) => (
  <div className="verification-code">
    <input
      className="code-input"
      type="text"
      placeholder="인증번호를 입력하세요"
      value={verificationCode}
      onChange={(e) => setVerificationCode(e.target.value)}
    />
    <button className="verify-button">인증완료</button>
  </div>
);

export default VerificationCode;
