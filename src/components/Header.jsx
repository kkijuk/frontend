import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const HeaderStyle = styled.div`
  width: 1002px;
  background-color: #ffffff;
  display: flex;
  align-items: center; 
  font-size: 15px;
  img {
    margin-left: 200px;
    margin-right: 15px;
    cursor: pointer;
  }
`;

export const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    padding: 0;
  }
  li {
    margin-left: 30px;
    margin-right: 30px;
    cursor: pointer;
    color:#333333;
  }
  li:hover {
    color: #707070;
  }
`;

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
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
            <li onClick={() => navigate('/mycareer')}>내커리어</li>
            <li onClick={() => navigate('/resume')}>이력관리</li>
            <li onClick={() => navigate('/apply')}>지원관리</li>
            <li onClick={() => navigate('/community')}>커뮤니티</li>
            <li onClick={() => navigate('/login')}>로그인</li>
            <li onClick={() => navigate('/signup')}>회원가입</li>
          </ul>
        </Nav>
      </HeaderStyle>
    </header>
  );
}
