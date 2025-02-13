import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  height: auto;
  flex: 1;
  background-color: #fff;
  text-align: center;
  padding-top: 15vh; 
`;

const Title = styled.h1`
color: #000;
font-family: Pretendard;
font-size: 32px;
font-weight: 600;
line-height: 140%; /* 44.8px */
`;

const Description = styled.p`
color: #707070;
text-align: center;
font-family: Pretendard;
font-size: 15px;
font-weight: 400;
margin-top: -1px;
line-height: 140%; 
`;

const Button = styled.button`
border-radius: 12px;
border: none;
background: var(--gray-04, #E0E0E0);
display: flex;
width: 160px;
padding: 16px;
justify-content: center;
align-items: center;
text-align: center;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
margin-top: 20px;

  &:hover {
    background-color: #d6d6d6;
  }
`;

const Browser = () => {
  return (
    <Container>
      <Title>지원하지 않는 브라우저입니다.</Title>
      <Description>
        원활한 서비스 이용을 위해 다른 브라우저를 사용해 주세요.<br />
        Chrome, Safari, Whale 등을 권장합니다.
      </Description>
      <Button onClick={() => window.history.back()}>이전 화면으로</Button>
    </Container>
  );
};

export default Browser;
