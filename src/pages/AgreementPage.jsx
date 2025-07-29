import React from 'react';
import styled from 'styled-components';
import AgreementImage from '../components/User/Agree1.svg';
import { theme } from '@constants/theme';
import { Color } from '../constants/color';

const StyledPage = styled.div`
    
    padding: 20px; 
    max-width: 800px; 
    margin: 0 auto; 

    .image-container {
        text-align: center;
        margin: 20px 0; 
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .page-content {
        background: ${Color.white};
        padding: 20px;
        border: 2px solid ${Color.white};
        width: 100%;
        min-height: 100vh; 
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
        overflow-y: auto; 

        @media (max-width: ${theme.breakpoints.md}) {
            padding: 15px; 
        }
    }


    h2 {
        color: ${Color.black};
        font-family: Pretendard;
        font-size: 22px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-bottom: 20px;
        @media (max-width: ${theme.breakpoints.md}) {
            font-size: 20px;
        }
    }

    p {
        color: ${Color.gray02};
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 0.6; 
        margin-bottom: 15px; 
        @media (max-width: ${theme.breakpoints.md}) {
            font-size: 12px;
        }
    }
`;

const AgreementPage = () => (
    <StyledPage>
            <h2>개인정보처리방침</h2> 
            <p>
                끼적 서비스 이용을 위해 아래와 같이 개인정보를 수집 및 이용합니다.  <br /><br /> 동의를 거부할 권리가 있으며, 동의 거부 시
                끼적 회원서비스 이용이 불가합니다.
                <br /><br /> 
            
            </p>
            <div className="image-container">
                <img src={AgreementImage} alt="Agreement" />
            </div>
            <p>
                
            </p>
    </StyledPage>
);
 
export default AgreementPage;