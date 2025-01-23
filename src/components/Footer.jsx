import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import instagramLogo from '../assets/instagramLogo.png';
import paperplaneicon from '../assets/paperplaneicon.png';

const FooterStyle = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 50px; /* 상단과 하단 여백 추가 */
  box-sizing: border-box;
  font-family: Pretendard;
  color: #707070;

  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .links {
      font-size: 12px;
      margin-bottom: 25px; /* 아래 간격 조정 */
      cursor: pointer;
    }

    .logo {
      margin-bottom: 15px; /* 로고와 아래 요소 간 간격 조정 */

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
      margin-bottom: 15px; /* "contact us"와 아이콘 사이 간격 */
      color: #424242;
    }

    .icons {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 15px; /* 아이콘과 연락처 정보 사이 간격 */
      img {
        width: 18px;
        height: 18px;
        margin-left: 12px; /* 아이콘 사이 간격 */
        cursor: pointer;
      }
    }

    .contact-info {
      font-size: 12px;

      .email {
        margin-bottom: 10px; /* 이메일과 주소 간격 */
        cursor: pointer;
        color: #707070;
      }

      div {
        margin-bottom: 5px; /* 각 줄 간격 */
      }
    }
  }
`;

export default function Footer() {
  const goInsta = () => {
    window.open('https://www.instagram.com/kki.juk/?utm_source=ig_web_button_share_sheet', '_blank');
  };

  const goEmail = () => {
    window.open('mailto:kkijuk30@gmail.com', '_blank');
  };

  return (
    <FooterStyle>
      {/* 왼쪽 섹션 */}
      <div className="left">
        <div className="links">서비스 이용약관 | 개인정보 처리방침</div>
        <div className="logo">
          <img src={logo} alt="끼적 로고" />
        </div>
        <div className="copyright">COPYRIGHT © 끼적. All rights reserved.</div>
      </div>

      {/* 오른쪽 섹션 */}
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
  );
}
