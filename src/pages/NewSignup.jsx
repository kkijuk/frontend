import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupStepTwo from '../components/User/SignupStepTwo';
import styled from 'styled-components';
import signupLogo from '../assets/signuplogo.svg';
import useAuthStore from '../stores/useAuthStore';
import { theme } from '../constants/theme';
import { Color } from '../constants/color';

const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
  margin-top: 120px;
`;

const Logo = styled.img`
  width: 80px; 
  height: auto;
  margin-top: -70px; 
  margin-bottom: 70px;
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 70px; 
  }
`;

const TitleContainer = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 23px;
  font-family: Regular;
  color: ${Color.gray01};
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
line-height: normal;

 @media (max-width: ${theme.breakpoints.md}) {
   margin-top: 0px;
  }
`;

const StepBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -45px;
`;

const StepBar = styled.div`
  position: relative; 
  width: 163px;
  height: 6px;
  border-radius: 6px;
  background-color: ${(props) => (props.active ? Color.main02 : Color.gray05)};
  margin: 0 5px;
  transition: background-color 0.7s;
  cursor: pointer;

  /* 클릭 범위 확장을 위한 pseudo-element */
  &::before {
    content: '';
    position: absolute;
    top: -10px; /* 위로 확장 */
    left: 0;
    width: 100%;
    height: 26px; /* 6px의 기존 높이 + 10px 위 + 10px 아래 */
    background-color: transparent; /* 시각적으로는 보이지 않음 */
    cursor: pointer; /* 터치 가능하도록 설정 */
  }
`;


const NewSignup = () => {
  const navigate = useNavigate();
  const { isLoggedIn,isProfileComplete } = useAuthStore(); // Zustand에서 프로필 완료 여부 가져오기

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    if (isProfileComplete) {
      navigate('/home'); // 프로필이 완료된 경우 홈으로 리다이렉트
    }
  }, [isLoggedIn, isProfileComplete, navigate]);

  const handleSignup = () => {
    console.log('회원가입 완료');
    navigate('/signupsuccess');
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  return (
    <Container>
      <TitleContainer>
   
        <Title>회원가입</Title>
      </TitleContainer>
     
        <SignupStepTwo handleSignup={handleSignup} />
    </Container>
  );
};

export default NewSignup;
