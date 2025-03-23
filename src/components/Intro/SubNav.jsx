// SubNav.jsx
import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Convert from './Convert';
import Title from '../Apply/Title';
import Layout from '../Layout';
import { trackEvent } from '../../utils/ga4';
import { theme } from '../../constants/theme'; // theme.js에서 불러온 theme 객체

const SubNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isResumeActive = location.pathname === '/history';
    const isPortfolioActive = location.pathname.startsWith('/history/portfolio');
    const shouldHideConvert = location.pathname.startsWith('/history/list');

    return (
        <Layout title="서류준비">
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
                    <NavItems onClick={() => navigate('/history')} active={isResumeActive}>
                        이력서
                    </NavItems>
                    <NavItems onClick={() => navigate('/history/master')} active={!isResumeActive && !isPortfolioActive}>
                        자기소개서
                    </NavItems>
                    <NavItems onClick={() => navigate('/history/portfolio')} active={isPortfolioActive}>
                        포트폴리오
                    </NavItems>
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
    margin-top: 40px;
    position: relative;
    padding: 0 15px;

    @media (max-width: ${theme.breakpoints.md}) {
        margin-top: 30px;
        max-width: 720px;
        margin-left: auto;
        margin-right: auto;
    }

    @media (max-width: ${theme.breakpoints.sm}) {
        margin-top: 20px;
        padding: 0 10px;
        max-width: 100%;
    }
`;

const Nav = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 30px;
	// width: 100vw;

    @media (max-width: ${theme.breakpoints.md}) {
        margin-top: 20px;
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
        margin-top: 10px;
    }
`;

const NavItems = styled.li`
    font-family: Bold;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.64px;
    display: inline-block;
    margin-right: 50px;
    cursor: pointer;
    color: ${({ active }) => (active ? '#000000' : '#E0E0E0')};

    @media (max-width: ${theme.breakpoints.md}) {
        font-size: 20px;
        line-height: 24px;
        margin-right: 30px;
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
        font-size: 18px;
        line-height: 22px;
        margin-right: 20px;
    }
`;

const Linear = styled.div`
    height: 4px;
    background-color: #f1f1f1;
    margin-top: 12px;
    margin-bottom: 28px;
    
    @media (max-width: ${theme.breakpoints.md}) {
        margin-top: 10px;
        margin-bottom: 20px;
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
        margin-top: 8px;
        margin-bottom: 15px;
        height: 3px;
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
    color: #fff;
    text-align: center;
    font-family: Regular;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    
    @media (max-width: ${theme.breakpoints.md}) {
        width: 130px;
        height: 32px;
        font-size: 16px;
        top: -45px;
        right: 15px;
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
        width: 110px;
        height: 30px;
        font-size: 14px;
        top: -40px;
        right: 10px;
    }
`;