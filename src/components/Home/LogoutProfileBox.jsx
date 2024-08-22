import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  flex-shrink: 0;
  width: 240px;
  height: 160px;
  border-radius: 10px;
  border: 1px solid var(--gray-03, #D9D9D9);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 0;

  color: var(--black, #000);
  text-align: center;
  font-family: Regular;
  font-size: 14px;
  font-style: normal;
`;

const LoginButton = styled.button`
    width: 220px;
    height: 30px;
    flex-shrink: 0;
    border: none;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    margin-bottom: 8px;
    margin-top: 20px;

    color: var(--white, #FFF);
    text-align: center;
    font-family: Bold;
    font-size: 12px;
    font-style: normal;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
    background-color: #35a576;
  }
`;

const SignupButton = styled.button`
    color: var(--gray-02, #707070);
    text-align: center;
    font-family: Regular;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    background: none;
    cursor: pointer;
`;

export default function LoginProfileBox() {
    const navigate = useNavigate();

    const goLogin = () =>{
        navigate('/login');
    };

    const goSignup = () =>{
        navigate('/signup');
    };

    return (
        <Container>
            <TextContainer>
                지금 로그인하고<br></br>
                당신의 끼를 적어두세요.
            </TextContainer>
            
            <LoginButton onClick={() => goLogin()}>로그인</LoginButton>
            <SignupButton onClick={() => goSignup()}>회원가입</SignupButton>

        </Container>
    )
}