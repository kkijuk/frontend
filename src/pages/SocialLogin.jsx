import styled from 'styled-components';
import logo from '../assets/logo.png';

const LoginScreen = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  margin: 90px auto 0;
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
  padding-right: 20px; /* 오른쪽 정렬 */
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
  margin-top: 40px;
`;

const SocialButton = styled.button`
  width: 350px; 
  height: 56px; 
  border: none;
  border-radius: 4px;
  margin: 8px 0;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  &.kakao {
    background-color: #ffe812;
    color: #000;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  &.naver {
    background-color: #03c75a;
    color: #fff;
    

    svg {
      width: 55px;
      height: 55px;
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
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='black'
    width='30px'
    height='30px'
>
    <path d='M12,2C6.48,2,2,5.58,2,10.14c0,2.58,1.78,4.87,4.45,6.24C6.15,17.85,5.4,19.81,5.27,19.81c0,0,0,0,0,0c0.26,0.02,3.35-1.24,4.92-2.09c0.61,0.11,1.25,0.18,1.91,0.18c5.52,0,10-3.58,10-8.14S17.52,2,12,2z' />
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
  return (
    <>
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
    </>
  );
};

export default SocialLogin;
