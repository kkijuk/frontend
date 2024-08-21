import React from 'react';
import styled from 'styled-components';

const LoginRequiredPage = styled.div`
  max-width: flex;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 90px;
  position: relative;
  top: 180px; 

  p {
    margin-bottom: 10px;
    color: var(--main-01, #3AAF85);
    text-align: center;
    font-family: REgular;
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .button {
    width: 255px;
    height: 57px;
    flex-shrink: 0;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #3AAF85; 
    color: white;
    font-family: 'Light';
    font-size: 19px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 15px; 
  }

  .Interests-text1 {
    color: #707070;
    text-align: center;
    font-family: Light;
    font-size: 19px;
    font-weight: 400;
    line-height: normal;
    margin-top: 60px;
  }

  .Interests-text2 {
  margin-top: -5px; 
  color: #707070;
    text-align: center;
    font-family: Light;
    font-size: 19px;
    font-weight: 400;
    line-height: normal;
  }
`;

const LoginRequired = () => {
  return (
    <LoginRequiredPage>
      <p className="Interests-text1">지금 로그인하고 끼적의 모든 기능을 이용하세요!💚</p>
      <button className="button" onClick={() => window.location.href='/login'}>로그인 하러 가기</button>
    </LoginRequiredPage>
  );
};

export default LoginRequired;
