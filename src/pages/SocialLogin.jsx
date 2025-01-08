import React, { useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import round from '../assets/main/round.svg';
import star1 from '../assets/main/star1.svg';
import star2 from '../assets/main/star2.svg';
import text1 from '../assets/main/text1.svg';
import text2 from '../assets/main/text2.svg';

const PageContainer = styled.div`
  background: var(--background, linear-gradient(180deg, #FFF 33%, #E1F4ED 100%));
  height: auto;
  flex: 1;
  position: relative;
`;

const SvgContainer = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  z-index: 900;

  img {
    position: absolute;

    &.round {
      top: 320px;
      left: 0px;
      width: 600px;
      height: 600px;
    }

    &.star1 {
      top: 400px;
      right: 250px;
      width: 280px;
      height: 280px;
    }

    &.star2 {
      top: 310px;
      left: 100px;
      width: 130px;
      height: 130px;
    }

    &.text2 {
      top: 590px;
      right: 20px;
      width: 400px;
      height: 400px;
    }

    &.text1 {
      top: 390px;
      left: 20px;
       width: 400px;
      height: 400px;
    }
  }
`;

const LoginScreen = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin: 150px auto 0;
  height: auto;
  overflow: hidden;

  p {
    color: #707070;
    font-family: light;
    margin-bottom: 50px;
    margin-top: 10px;
    text-align: center;
    color: var(--gray-02, #707070);
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  * {
    box-sizing: border-box;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  color: #000; 
  font-size: 17px; 
  z-index: 1100;

  &.text1 {
    top: 576px; 
    left: 91px;
  }

  &.text2 {
    top: 776px; 
    right: 91px;
  }
`;

const TopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  border-radius: 10px;
  border: 1px solid var(--main-02, #88D1B6);
  background: #fff;
  color: var(--main-02, #88D1B6);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const TopButtonWrapper = styled.div`
  margin: 10px 0 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-right: 20px;
`;

const Title = styled.div`
  color: var(--main-01, #3AAF85);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: -95px;
  z-index: 1000;
  margin-top: 50px;
`;

const SocialButton = styled.button`
  width: 350px;
  height: 56px;
  border: none;
  z-index: 1000;
  border-radius: 4px;
  margin: 8px 0;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &.kakao {
    background-color: #ffe812;
    color: #000;

    svg {
      width: 28px;
      height: 28px;
      position: absolute;
      left: 20px;
    }
  }

  &.naver {
    background-color: #03c75a;
    color: #fff;

    svg {
      width: 49px;
      height: 49px;
      position: absolute;
      left: 3px;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: -27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const KakaoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="black"
    width="30px"
    height="30px"
  >
    <path d="M12,2C6.48,2,2,5.58,2,10.14c0,2.58,1.78,4.87,4.45,6.24C6.15,17.85,5.4,19.81,5.27,19.81c0,0,0,0,0,0c0.26,0.02,3.35-1.24,4.92-2.09c0.61,0.11,1.25,0.18,1.91,0.18c5.52,0,10-3.58,10-8.14S17.52,2,12,2z" />
  </svg>
);

const NaverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#03C75A" />
    <path
      d="M9 16V8h2.5l3.5 4.666V8H18v8h-2.5L12 11.334V16H9Z"
      fill="#fff"
    />
  </svg>
);

const SocialLogin = () => {
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden'; // 스크롤바 숨기기
    $body.addEventListener('wheel', preventScroll, { passive: false });
    $body.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      $body.removeEventListener('wheel', preventScroll);
      $body.removeEventListener('touchmove', preventScroll);
      $body.style.overflow = '';
    };
  }, []);

  return (
    <PageContainer>
      <SvgContainer>
        <img src={round} alt="Round Icon" className="round" />
        <img src={star1} alt="Star 1 Icon" className="star1" />
        <img src={star2} alt="Star 2 Icon" className="star2" />
        <img src={text1} alt="Text 1 Icon" className="text1" />
        <img src={text2} alt="Text 2 Icon" className="text2" />
        <TextOverlay className="text1">여기저기 흩어져 있던 내 활동을 차곡차곡!</TextOverlay>
        <TextOverlay className="text2">막막한 이력서와 자기소개서까지 한번에!</TextOverlay>
      </SvgContainer>
      <TopButtonWrapper>
        <TopButton>Instagram</TopButton>
        <TopButton>문의</TopButton>
      </TopButtonWrapper>
      <Title>쉽고 빠르게 쌓아가는 나만의 커리어 아카이브</Title>
      <LoginScreen>
        <img src={logo} width="164px" height="80px" alt="Logo" />
        <p>당신의 끼를 적어두세요</p>
        <ButtonContainer>
          <SocialButton className="kakao">
            <KakaoIcon />
            카카오 로그인
          </SocialButton>
          <SocialButton className="naver">
            <NaverIcon />
            네이버 로그인
          </SocialButton>
        </ButtonContainer>
      </LoginScreen>
    </PageContainer>
  );
};

export default SocialLogin;
