import React from "react";
import styled from "styled-components";
import FooterLogo from '../assets/logo.png';

const FooterContainer = styled.footer`
    display: flex;
    width: 100%;
    height: 160px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--gray-05, #F1F1F1);
`;

const FooterLogoImage = styled.img`
    width: auto;
    height: 50px; 
    margin-bottom: 10px; 
`;

const FooterText = styled.p`
    color: #707070;
    font-family: normal;
    font-size: 18px;
    font-weight: 400;
    line-height: normal;
`;

export default function PageFooter() {
    return (
        <FooterContainer>
            <FooterLogoImage src={FooterLogo} alt="끼적 로고" />
            <FooterText>COPYRIGHT © 끼적. All rights reserved.</FooterText>
        </FooterContainer>
    );
}
