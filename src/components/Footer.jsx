import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export default function Footer() {
  return (
    <FooterStyle>
      FOOTER
    </FooterStyle>
  );
}
