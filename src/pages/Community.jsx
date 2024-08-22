import React from 'react';
import styled from 'styled-components';

    const Communitycontainer = styled.div`
    max-width: flex;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 90px;
    position: relative;
    top: 220px; 
  
    p {
      margin-top: 10px;
      color: black;
      text-align: center;
      font-family: Light;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `;
  
  const  Community = () => {
    return (
      <Communitycontainer>
        <p>이 페이지는 준비중입니다</p>
        <p>업데이트 될 끼적을 기대해주세요!</p>
      </Communitycontainer>
    );
  };
  
  export default Community