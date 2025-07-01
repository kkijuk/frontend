import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import instagramLogo from '../assets/instagramLogo.png';
import paperplaneicon from '../assets/paperplaneicon.png';
import useAuthStore from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import bottomSvg from '../assets/main/bottom.svg';
import leftSvg from '../assets/main/left.svg';
import leftStarSvg from '../assets/main/leftstar.svg';
import postSvg from '../assets/main/post1.svg';
import rightSvg from '../assets/main/right.svg';
import rightStarSvg from '../assets/main/rightstar.svg';
import useAuthRedirect from '../stores/useAuthRedirect';
import { trackEvent } from '../utils/ga4';
import { theme } from '../constants/theme';
import { ROUTES } from '../constants/routes'; 

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: flex-end;
`;

const SvgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
`;

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
  display: block;

  @media (max-width: ${theme.breakpoints.md}) {
    image:not([href*="${postSvg}"]) {
      display: none;
    }
  }
`;

const CustomFooter = styled.div`
  width: 100%;
  height: ${({ footerHeight }) => footerHeight}px; 
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #333;
  z-index: 10; s
  position: relative;
`;

const FooterStyle = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 50px;
  box-sizing: border-box;
  font-family: Pretendard;
  color: #707070;

  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .links {
      font-size: 12px;
      margin-bottom: 25px;
      cursor: pointer;

      span {
        margin-right: 10px;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .logo {
      margin-bottom: 15px;

      img {
        width: 80px;
        height: auto;
      }
    }

    .copyright {
      font-size: 11px;
      color: #424242;
    }
  }

  .right {
    text-align: right;

    .contact-title {
      font-size: 12px;
      margin-bottom: 15px;
      color: #424242;
    }

    .icons {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 15px;

      img {
        width: 18px;
        height: 18px;
        margin-left: 12px;
        cursor: pointer;
      }
    }

    .contact-info {
      font-size: 12px;

      .email {
        margin-bottom: 10px;
        cursor: pointer;
        color: #707070;
      }

      div {
        margin-bottom: 5px;
      }
    }
  }
`;

const SocialButton = styled.button`
	width: 350px;
	height: 56px;
	border: none;
	z-index: 1000;
	border-radius: 4px;
	margin: 8px 0;
	  font-family: Regular;
	font-size: 18px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

   @media (max-width: ${theme.breakpoints.md}) {
    width: 320px;
   color: rgba(0, 0, 0, 0.85);
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
  }
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
  position: absolute;
  top: 40%; 
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 10; 
`;

const TopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  border-radius: 10px;
  border: 1px solid var(--main-02, #88d1b6);
  background: #fff;
  color: var(--main-02, #88d1b6);
  font-family: Regular;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const TopButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  z-index: 10;
`;

const TextContainer = styled.div`
  position: absolute;
  top: calc(40% - 160px); 
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: 10px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: 1px;
  }
`;


const Title = styled.div`
  color: var(--main-01, #3aaf85);
  font-size: 19px;
  font-style: normal;
  font-weight: 800;
  font-family: Light;
  white-space: nowrap; 
  line-height: normal;
  margin-bottom: 20px;
    font-family: Regular;

   
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 18px;
    margin-bottom: 10px; /* 태블릿에서 간격 줄이기 */
    margin-top: 20px;  
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 16px;
    margin-bottom: 8px; /* 모바일에서 더 줄이기 */
  }
`;

const Logo = styled.img`
  width: 164px;
  height: 80px;
  margin-bottom: 0px;

   @media (max-width: ${theme.breakpoints.md}) {
    width: 145px;
    height: 75px;
    
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 134px;
    height: 70px;
  }
`;

const Description = styled.p`
  color: #424242;
  font-family: Light;
  font-size: 21px;
  font-weight: 800;
  margin-bottom: 30px;
    font-family: Regular;
   @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
    margin-bottom: -15px; /* 태블릿에서 간격 줄이기 */
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 14px;
    margin-bottom:-20px; /* 모바일에서 더 줄이기 */
  }

  .highlight {
    color: var(--main-01, #3aaf85);
  }
`;

const KakaoIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="30px" height="30px">
		<path d="M12,2C6.48,2,2,5.58,2,10.14c0,2.58,1.78,4.87,4.45,6.24C6.15,17.85,5.4,19.81,5.27,19.81c0,0,0,0,0,0c0.26,0.02,3.35-1.24,4.92-2.09c0.61,0.11,1.25,0.18,1.91,0.18c5.52,0,10-3.58,10-8.14S17.52,2,12,2z" />
	</svg>
);
const NaverIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
		<circle cx="12" cy="12" r="12" fill="#03C75A" />
		<path d="M9 16V8h2.5l3.5 4.666V8H18v8h-2.5L12 11.334V16H9Z" fill="#fff" />
	</svg>
);

const SocialLogin = () => {
	useAuthRedirect();
	const { login } = useAuthStore();
	const navigate = useNavigate();
	const [isModal1Open, setModal1Open] = useState(false);
	const [isModal2Open, setModal2Open] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const svgElement = document.getElementById('main-svg');
      const svgHeight = svgElement ? svgElement.clientHeight : 0;
      const windowHeight = window.innerHeight;

      // 푸터 높이 = 남는 공백 (최소값 0 보장)
      const newFooterHeight = Math.max(0, windowHeight - svgHeight);
      setFooterHeight(newFooterHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로드 시 실행

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goInsta = () => {
    window.open('https://www.instagram.com/kki.juk/?utm_source=ig_web_button_share_sheet', '_blank');
  };

  const goEmail = () => {
    window.open('mailto:kkijuk30@gmail.com', '_blank');
  };

  const handleKakaoLogin = () => {
	const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
	trackEvent('btn_click', {
		category: 'login',
		detail: 'kakao',
		action_type: 'click',
		label: '카카오 로그인',
	});
	window.location.href = kakaoLoginUrl;
};
const handleNaverLogin = () => {
	const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
	const redirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI;
	const state = process.env.REACT_APP_NAVER_STATE;
	const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;
	trackEvent('btn_click', {
		category: 'login',
		detail: 'naver',
		action_type: 'click',
		label: '네이버 로그인',
	});
	window.location.href = naverLoginUrl;
};
 const handleServiceAgreeClick = () => {
        navigate(ROUTES.SERVICE_AGREE); 
    };

    const handlePrivacyPolicyClick = () => {
        navigate(ROUTES.PRIVACY_POLICY); 
    };
  return (
    <PageContainer>
		
      <SvgContainer>
        <StyledSVG
          id="main-svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <image href={leftStarSvg} x="310" y="250" width="140" />
          <image href={rightStarSvg} x="1400" y="130" width="180" />
          <image href={bottomSvg} x="1" y="536" width="1920" />
          <image href={postSvg} x="18%" y="531" width="1200" />
          <image href={leftSvg} x="315" y="772" width="350" />
          <image href={rightSvg} x="1200" y="670" width="350" />
        </StyledSVG>
      </SvgContainer>

	  <TopButtonWrapper>
        <TopButton onClick={() => window.open('https://www.instagram.com/kki.juk/', '_blank')}>
          Instagram
        </TopButton>
        <TopButton onClick={() => window.open('mailto:kkijuk30@gmail.com', '_blank')}>
          문의
        </TopButton>
      </TopButtonWrapper>

	  <TextContainer>
        <Title>쉽고 빠르게 쌓아가는 나만의 커리어 아카이브</Title>
        <Logo src={logo} alt="Logo" />
        <Description>
          당신의 <span className="highlight">끼</span>를 <span className="highlight">적</span>어두세요
        </Description>
		</TextContainer>
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


      <CustomFooter footerHeight={footerHeight}>
        <FooterStyle>
          <div className="left">
            <div className="links">
              <span onClick={handleServiceAgreeClick}>서비스 이용약관</span>
             <span onClick={handlePrivacyPolicyClick}>개인정보 처리방침</span>
            </div>
            <div className="logo">
              <img src={logo} alt="끼적 로고" />
            </div>
            <div className="copyright">COPYRIGHT © 끼적. All rights reserved.</div>
          </div>

          <div className="right">
            <div className="contact-title">contact us</div>
            <div className="icons">
              <img src={instagramLogo} alt="Instagram" onClick={goInsta} />
              <img src={paperplaneicon} alt="Paperplane" onClick={goEmail} />
            </div>
            <div className="contact-info">
              <div className="email" onClick={goEmail}>
                kkijuk30@gmail.com
              </div>
              <div>서울특별시 광진구 면목로15길 16</div>
              <div>사업자등록번호 798-06-02922</div>
            </div>
          </div>
        </FooterStyle>
      </CustomFooter>

      
    </PageContainer>
  );
};

export default SocialLogin;