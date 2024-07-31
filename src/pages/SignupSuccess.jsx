import React from 'react';
import styled from 'styled-components';

const SignupSuccessScreen = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 90px;
  position: relative;
  top: 200px; /* 요소를 아래로 이동시키기 위해 top 속성 사용 */

  p {
    margin-bottom: 10px;
    color: var(--main-01, #3AAF85);
    text-align: center;
    font-family: Pretendard;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .button {
    width: 250px;
    height: 55px;
    flex-shrink: 0;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #3AAF85; 
    color: white;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px; 
  }

  .login-text {
    color: #707070;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 65px;
  }
`;

const SignupSuccess = () => {
  return (
    <SignupSuccessScreen>
      <p>회원가입이 완료되었습니다.</p>
      <p className="login-text">지금 바로 끼적을 시작하세요!</p>
      <button className="button" onClick={() => window.location.href='/login'}>로그인</button>
    </SignupSuccessScreen>
  );
};

export default SignupSuccess;


