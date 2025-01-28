import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  width: 300px;
  height: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
  border: 4px solid #ccc; /* 회색 테두리 */
  border-top-color: #3AAF85; /* 파란색 강조 */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  display:flex;
  justify-content:center;
  align-items:center;
  
`;

const Message = styled.p`
  font-size: 16px;
  color: #555;
  font-family:'Regular';
`;

function LoadingSpinner({ message }) {
  return (
    <SpinnerContainer>
      <Spinner />
      {message && <Message>{message}</Message>}
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
