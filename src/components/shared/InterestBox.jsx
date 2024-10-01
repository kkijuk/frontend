// src/components/shared/InterestBox.jsx
//관심분야 설정 박스
import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 193px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border: 2px solid ${({ selected }) => (selected ? '#3AAF85' : '#F5F5F5')};
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? '#E1FAED' : '#F5F5F5')};
  color: ${({ selected }) => (selected ? '#3AAF85' : '#707070')};
  cursor: pointer;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  transition: all 0.3s ease;

    /*
    &:hover {
    background-color: #3AAF85;
    color: white;
    border-color: #3AAF85;
  }*/
`;

const InterestBox = ({ content, selected, onClick }) => {
  return (
    <Box selected={selected} onClick={onClick}>
      {content}
    </Box>
  );
};

export default InterestBox;
