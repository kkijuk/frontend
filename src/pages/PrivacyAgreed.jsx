import React, { useEffect } from 'react';
import styled from 'styled-components';
import AgreementImage from "../components/User/Agree.svg";

const PrivacyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;

  .content {
    border-radius: 10px;
    padding: 30px;
    width: 600px;
    text-align: center;
  }

  h2 {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 600;
    margin-top: -300px;
  }

  p {
    color: #707070;
    font-family: Pretendard;
    font-size: 15px;
    text-align: center;
    font-weight: 400;
    line-height: 1.5;
  }

  .image-container {
    text-align: center;
    margin-top: 30px;
  }

  img {
    max-width: 130%;
    height: auto;
  }
`;

const PrivacyAgreed = () => {


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
    <PrivacyContainer>
      <div className="content">
        <h2>개인정보처리방침</h2>
        <p>
  끼적 서비스 이용을 위해 아래와 같이 개인정보를 수집 및 이용합니다. <br />
  동의를 거부할 권리가 있으며, 동의 거부 시 끼적 회원서비스 이용이 불가합니다.
</p>

        <div className="image-container">
          <img src={AgreementImage} alt="Agreement" />
        </div>
      </div>
    </PrivacyContainer>
  );
};

export default PrivacyAgreed;
