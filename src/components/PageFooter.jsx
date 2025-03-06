import React from "react";
import styled from "styled-components";
import FooterLogo from '../assets/logo.png';

const FooterContainer = styled.footer`
    display: flex;
    width: 1280px;
    height: 160px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--gray-05, #F1F1F1);
`;

const FooterLogoImage = styled.img`
    width: auto;
    height: 50px; /* 로고 크기 조정 */
    margin-bottom: 10px; /* 로고 아래 여백 */
`;

const FooterText = styled.p`
    font-size: 14px;
    color: #707070;
    font-family: Pretendard, sans-serif;
`;

export default function PageFooter() {
    return (
        <FooterContainer>
            <FooterLogoImage src={FooterLogo} alt="끼적 로고" />
            <FooterText>COPYRIGHT © 끼적. All rights reserved.</FooterText>
        </FooterContainer>
    );
}
