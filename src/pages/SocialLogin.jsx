import React, { useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import useAuthStore from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import bottomSvg from '../assets/main/bottom.svg';
import leftSvg from '../assets/main/left.svg';
import leftStarSvg from '../assets/main/leftstar.svg';
import postSvg from '../assets/main/post.svg';
import rightSvg from '../assets/main/right.svg';
import rightStarSvg from '../assets/main/rightstar.svg';
import useAuthRedirect from '../stores/useAuthRedirect';

const PageContainer = styled.div`
  background: var(--background, linear-gradient(180deg, #FFF 30%, #E1F4ED 100%));
  height: auto;
  flex: 1;
  position: relative;
  padding-bottom: 418px; 
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
  }
`;

const StarLeft = styled.img`
  position: absolute;
  top: 250px;
  left: 310px; 
  width: 140px;
  @media (max-width: 768px) {
   width: 100px;
   
  }
`;

const StarRight = styled.img`
  position: absolute;
  top: 130px;
  right: 375px;
  width: 180px;

   @media (max-width: 768px) {
   
  }
`;

const LeftSvg = styled.img`
  position: absolute;
  top: 772px;
  left: 315px;
   width: 350px;
  z-index: 1100;
  @media (max-width: 768px) {
   
  }
`;

const RightSvg = styled.img`
  position: absolute;
  top: 670px;
  right: 317px;
  width: 350px;
  z-index: 1100;
  @media (max-width: 768px) {
   
  }
`;

const BottomSvg = styled.img`
  position: absolute;
   top: 536px;
  left: 50%;
   transform: translateX(-50%);
  width: 1920px;
  @media (max-width: 768px) {
   
  }
`;

const PostSvg = styled.img`
  position: absolute;
  top: 531px;
  left: 50%;
   transform: translateX(-50%);
  width: 1200px;
  @media (max-width: 768px) {
   
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
    color: #424242;
    font-family: light;
    margin-bottom: 75px;
    margin-top: 10px;
    text-align: center;
    font-size: 21px;
    font-weight: 800;
    font-family: Light;

    span.highlight {
      color: var(--main-01, #3AAF85); 
    }
  }

  * {
    box-sizing: border-box;
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
  font-size: 19px;
  font-style: normal;
  font-weight: 800;
    font-family: Light;
  line-height: normal;
  margin-bottom: -150px;
  z-index: 1000;
  margin-top: 80px;
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

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #e0cb10; 
    transform: scale(0.98);   
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

    &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.98);   
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
  useAuthRedirect();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  /* useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden'; // 스크롤바 숨김 
    $body.addEventListener('wheel', preventScroll, { passive: false });
    $body.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      $body.removeEventListener('wheel', preventScroll);
      $body.removeEventListener('touchmove', preventScroll);
      $body.style.overflow = '';
    };
  }, []); */

  const goEmail = () => {
    window.open('mailto:kkijuk30@gmail.com', '_blank');
  };

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoLoginUrl;
  };

  const handleNaverLogin = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const state = process.env.REACT_APP_NAVER_STATE;
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;
    
    window.location.href = naverLoginUrl;
  };

  return (
    <PageContainer>
          <SvgContainer>
        <StarLeft src={leftStarSvg} alt="Left Star" />
        <StarRight src={rightStarSvg} alt="Right Star" />
        <LeftSvg src={leftSvg} alt="Left" />
        <RightSvg src={rightSvg} alt="Right" />
        <BottomSvg src={bottomSvg} alt="Bottom" />
        <PostSvg src={postSvg} alt="Post" />
      </SvgContainer>
      <TopButtonWrapper>
      <TopButton onClick={() => window.open('https://www.instagram.com/kki.juk/', '_blank')}>
    Instagram
  </TopButton>
  <TopButton onClick={goEmail}>문의</TopButton>
      </TopButtonWrapper>
      <Title>쉽고 빠르게 쌓아가는 나만의 커리어 아카이브</Title>
      <LoginScreen>
        <img src={logo} width="164px" height="80px" alt="Logo" />
        <p>
          당신의 <span className="highlight">끼</span>를 <span className="highlight">적</span>어두세요
        </p>
        <ButtonContainer>
        <SocialButton className="kakao" onClick={handleKakaoLogin}>
            <KakaoIcon />
            카카오 로그인
          </SocialButton>
          <SocialButton className="naver" onClick={handleNaverLogin}>
            <NaverIcon />
            네이버 로그인
          </SocialButton> 

        </ButtonContainer>
      </LoginScreen>
    </PageContainer>
  );
};

export default SocialLogin;
