import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const HeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

const HeaderStyle = styled.div`
  max-width: 1420px;
  height: 70px;
  flex-shrink: 0;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center; 
  font-size: 15px;
  margin: 0 auto;
  padding: 0 20px;

   @media (max-width: 855px) {
    padding: 0 15px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center; 
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
  }
  li {
    margin-left: 30px;
    margin-right: 30px;
    cursor: pointer;
    color: #333;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    position: relative;
    font-family: Bold;

     @media (max-width: 855px) {
      margin: 0 15px;
      font-size: 18px;
    }
  }

  li:hover {
    color: #707070;
  }

  .login-signup {
    color: #707070;
    font-size: 16px;
    font-weight: 400;
    margin-top: 3px;
    margin-right: 7px;

      @media (max-width: 855px) {
      margin-top: 0;
      font-size: 16px;
    }
  }
  .active {
    color: #333;
  }
  .active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 5px;
    background-color: #3AAF85;
    bottom: -22px;
    left: 0;
    
     @media (max-width: 855px) {
     bottom: -24px;
  }
`;

const UserProfileButton = styled.button`
  width: 45px;
  height: 45px;
  flex-shrink: 0;
  border: none;
  border-radius: 10px;
  background-color: #88D1B6;
  cursor: pointer;
  margin-left: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 55px;  
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 135px;
  height: 140px;
  padding: 10px;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    text-decoration: none;
    color: #000;
    font-family: Regular;
    font-size: 16px;
    padding: 8px 0;
    width: 100%;
    text-align: center;
  }

  a:hover {
    background-color: #f5f5f5;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedin, setIsLoggedin] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserProfileButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <HeaderWrapper>
      <HeaderStyle>
        <NavContainer>
          <span className="logo" onClick={() => navigate('/')}>
            <img
              style={{ width: '80px', height: '40px' }}
              src={logo}
              alt="로고"
            />
          </span>
          <Nav>
            <ul>
              <li
                onClick={() => navigate('/mycareer')} 
                className={location.pathname === '/mycareer' ? 'active' : ''} 
              >
                내커리어
              </li>
              <li
                onClick={() => navigate('/history')}
                className={location.pathname === '/history' ? 'active' : ''}
              >
                이력관리
                </li>
              <li
                onClick={() => navigate('/apply-schedule')} 
                className={location.pathname === '/apply-schedule' ? 'active' : ''}
              >
                지원관리
              </li>
              <li
                onClick={() => navigate('/community')}
                className={location.pathname === '/community' ? 'active' : ''}
              >
                커뮤니티
              </li>
              {!isLoggedin ? (
                <>
                  <li
                    onClick={() => navigate('/login')}
                    className={`login-signup ${location.pathname === '/login' ? 'active' : ''}`}
                  >
                    로그인
                  </li>
                  <li
                    onClick={() => navigate('/signup')}
                    className={`login-signup ${location.pathname === '/signup' ? 'active' : ''}`}
                  >
                    회원가입
                  </li>
                </>
              ) : null}
            </ul>
            {isLoggedin && (
  <UserProfileButton onClick={handleUserProfileButtonClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      style={{ width: '30px', height: '30px', borderRadius: '10px' }}
    >
      <path d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M25.7377 27.5C25.7377 22.6625 20.9252 18.75 15.0002 18.75C9.07519 18.75 4.2627 22.6625 4.2627 27.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    {isDropdownOpen && (
      <DropdownMenu>
        <a onClick={() => navigate('/mypage/myinformation')}>내 정보</a>
        <a onClick={() => navigate('/mypage/field')}>관심분야 설정</a>
        <a onClick={() => navigate('/mypage/accountmanagement')}>계정 관리</a>
        <a onClick={() => {
          setIsLoggedin(false); 
          navigate('/logout');
        }}>로그아웃</a>
      </DropdownMenu>
    )}
  </UserProfileButton>
)}

          </Nav>
        </NavContainer>
      </HeaderStyle>
    </HeaderWrapper>
  );
}




