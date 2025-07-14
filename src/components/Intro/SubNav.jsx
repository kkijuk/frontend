// SubNav.jsx
import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Convert from './Convert';
import Title from '../Apply/Title';
import Layout from '../Layout';
import { trackEvent } from '../../utils/ga4';
import { theme } from '../../constants/theme'; 
import { Color } from '../../constants/color';

const SubNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isResumeActive = location.pathname === '/history';
    const isPortfolioActive = location.pathname.startsWith('/history/portfolio');
    const shouldHideConvert = location.pathname.startsWith('/history/list');

    return (
        <Layout title="서류준비" >
            <BaseDiv>
                {isResumeActive && (
                    <ExportButton
                        onClick={() => {
                            alert('이 페이지는 준비중입니다.');
                            trackEvent('btn_click', {
                                category: 'resume',
                                detail: 'export',
                                action_type: 'click',
                                label: '이력서 내보내기',
                            });
                            // navigate('/history/resumeExport');
                        }}
                    >
                        문서로 내보내기
                    </ExportButton>
                )}
                <Nav>
                    <ItemsWrapper>
                        <NavItems onClick={() => navigate('/history')} active={isResumeActive}>
                            이력서
                        </NavItems>
                        <NavItems onClick={() => navigate('/history/master')} active={!isResumeActive && !isPortfolioActive}>
                            자기소개서
                        </NavItems>
                        <NavItems onClick={() => navigate('/history/portfolio')} active={isPortfolioActive}>
                            포트폴리오
                        </NavItems>
                    </ItemsWrapper>
                    <Linear />
                    <Section>
                        <Outlet />
                    </Section>
                </Nav>
            </BaseDiv>
        </Layout>
    );
};

export default SubNav;

const BaseDiv = styled.div`
    width: 100%;
    margin-top: 32px;
    position: relative;
`;

const Nav = styled.ul`
    list-style-type: none;
    padding-inline-start: 0;

    @media (max-width: ${theme.breakpoints.md}) {
        padding : 0 20px;
    }
`;

const ItemsWrapper = styled.div`
    @media (max-width: ${theme.breakpoints.md}) {
        display: flex;
        align-items: center;
    }
`;

const NavItems = styled.li`
    font-family: Bold;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.64px;
    display: inline-block;
    margin-right: 32px;
    cursor: pointer;
    color: ${({ active }) => (active ? Color.black : Color.gray05)};

    @media (max-width: ${theme.breakpoints.md}) {
        font-size: 22px;
    }
`;

const Linear = styled.div`
    height: 4px;
    background-color: ${Color.gray05};
    margin-top: 12px;
    
    @media (max-width: ${theme.breakpoints.md}) {
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
    }
`;

const Section = styled.div`
    height: 100%;
    width: 100%;
    
    @media (max-width: ${theme.breakpoints.md}) {
        padding: 0;
    }
`;

const ExportButton = styled.button`
    width: 150px;
    height: 35px;
    flex-shrink: 0;
    border-radius: 10px;
    border: none;
    background: ${theme.colors.primary};
    position: absolute;
    right: 15px;
    top: -50px;
    color: ${Color.white};
    text-align: center;
    font-family: Regular;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    
    @media (max-width: ${theme.breakpoints.md}) {
        width: 150px;
        height: 33px;
        padding: 4px 18px;
        font-size: 18px;
        top: -65px;
        right: 15px;
    }
`;