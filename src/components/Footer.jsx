import React, { useState } from 'react';
import styled from 'styled-components';
import AgreementModal1 from '../components/User/AgreementModal1';
import AgreementModal2 from '../components/User/AgreementModal2';
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

export default function Footer() {
  const [isModal1Open, setModal1Open] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);

  const goInsta = () => {
    window.open('https://www.instagram.com/kki.juk/?utm_source=ig_web_button_share_sheet', '_blank');
  };

  const goEmail = () => {
    window.open('mailto:kkijuk30@gmail.com', '_blank');
  };

  return (
    <>
      <FooterStyle>
        <div className="left">
          <div className="links">
            <span onClick={() => setModal1Open(true)}>서비스 이용약관</span>
            <span onClick={() => setModal2Open(true)}>개인정보 처리방침</span>
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

      {/* 모달 상태와 prop 통일 */}
      <AgreementModal1 show={isModal1Open} handleModal={() => setModal1Open(false)} />
      <AgreementModal2 show={isModal2Open} handleModal={() => setModal2Open(false)} />
    </>
  );
}
