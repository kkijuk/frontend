import React from 'react';
import styled from 'styled-components';

    const Communitycontainer = styled.div`
    max-width: flex;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 70px;
    position: relative;
    top: 100px; 
  
    p {
      margin-top: 10px;
      color: var(--main-01, #3AAF85);
      text-align: center;
      font-family: REgular;
      font-size: 27px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `;
  
  const  Community = () => {
    return (
      <Communitycontainer>
        <p>준비중입니다</p>
        <p>업데이트 될 끼적을 기대해주세요!</p>
      </Communitycontainer>
    );
  };
  
  export default Community