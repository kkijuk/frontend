import React from 'react';
import styled from 'styled-components';

const TitleStyled = styled.h1`
  color: var(--black, #000);
  font-family: 'Bold';
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-left: 18px;
`;

const Title = ({ children }) => {
  return <TitleStyled>{children}</TitleStyled>;
};

export default Title;


 