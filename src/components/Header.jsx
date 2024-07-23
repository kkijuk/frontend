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
  font-size: 15px;
  margin: 0 auto;
  padding: 0 20px; 
  img {
    margin-left: 200px;
    margin-right: 30px;
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  flex-grow: 1; /* Nav가 가능한 공간을 차지하게 함 */
  display: flex;
  justify-content: space-between;
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
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    position: relative; 
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
  }
  .active {
    color: #333; 
  }
  .active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #00A652; 
    bottom: -22px; /* Adjusted to align with the gray line */
    left: 0;
  }
`;

const UserProfileButton = styled.button`
  width: 45px; 
  height: 45px; 
  flex-shrink: 0; 
  border: none; 
  border-radius: 10px; 
  background-color: #F1F1F1; 
  cursor: pointer; 
  margin-left: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedin, setIsLoggedin] = useState(true); 

  return (
    <HeaderWrapper>
      <HeaderStyle>
        <span className="logo" onClick={() => navigate('/')}>
          <img
            style={{ width: '70px', height: '30px' }}
            src={logo}
            alt="로고"
          />
        </span>
        <Nav>
          <ul>
            <li
              onClick={() => navigate('/mycareerdetail')}
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
              onClick={() => navigate('/apply')}
              className={location.pathname === '/apply' ? 'active' : ''}
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
            <UserProfileButton onClick={() => navigate('/mypage')}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="30" 
                height="30" 
                viewBox="0 0 30 30" 
                fill="none"
                style={{ width: '30px', height: '30px', borderRadius: '10px' }}
              >
                <path d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25.7377 27.5C25.7377 22.6625 20.9252 18.75 15.0002 18.75C9.07519 18.75 4.2627 22.6625 4.2627 27.5" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </UserProfileButton>
          )}
        </Nav>
      </HeaderStyle>
    </HeaderWrapper>
  );
}


