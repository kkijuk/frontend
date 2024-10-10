import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchFilter from '../../components/Mycareer/SearchFilter'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Top = styled.div`
  width: 100%;
  height: 286px;
  border: 1px solid black;
  background-color: white;
  
  /* 추가된 부분: SearchFilter를 수직, 수평 중앙으로 배치 */
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Bottom = styled.div`
    width: 100%;
    height: 750px;
    border: 1px solid black;
    background-color: #F1F1F1;

`;

const SearchBox = styled.div`
  width: 820px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 35px;
  box-sizing: border-box;

`;



export default function MycareerSearch() {
  return (
    <Wrapper>
      <Top>
        <SearchFilter></SearchFilter>
      </Top>
      <Bottom>

      </Bottom>
    </Wrapper>
  )
}


