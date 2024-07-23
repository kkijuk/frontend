import React from 'react';
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
  ul {
    list-style: none;
    display: flex;
    padding: 0;
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
    bottom: -22px; 
    left: 0;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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
          </ul>
        </Nav>
      </HeaderStyle>
    </HeaderWrapper>
  );
}

