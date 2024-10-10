import React from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Convert from './Convert'
import Title from '../Apply/Title'

const SubNav =()=>{
    const navigate = useNavigate();
    const location = useLocation();

    const isResumeActive = location.pathname === '/history';
    const isPortfolioActive = location.pathname.startsWith('/history/portfolio');
    const shouldHideConvert = location.pathname.startsWith('/history/list')

    return(
        <BackgroundDiv>
            <BaseDiv>
                <div 
                    style={{width:'820px', 
                            height:'36px',
                            display:'flex', 
                            alignItems:'center',
                            justifyContent:'space-between',
                            margin:'-5px 0px 30px 0px' }}>
                    <Title>이력관리</Title>
                    {!shouldHideConvert&&<Convert></Convert>}
                </div>

                <Nav>
                    <NavItems 
                        onClick={()=>navigate('/history')} 
                        active={isResumeActive}>이력서</NavItems>
                    <NavItems 
                        onClick={()=>navigate('/history/master')} 
                        active={!isResumeActive && !isPortfolioActive}>자기소개서</NavItems>
                    <NavItems 
                        onClick={()=>navigate('/history/portfolio')} 
                        active={isPortfolioActive}>포트폴리오</NavItems>
                    <Linear/>
                    <Outlet/>
                </Nav>
            </BaseDiv>
        </BackgroundDiv>
    )
}

export default SubNav;

const BackgroundDiv = styled.div`
    width: 100%;
    height: 100%;
    margin-top:40px;
    display:flex;
    // align-items:center;
    justify-content:center;
`

const BaseDiv = styled.div`
    width: 820px;
    // display:flex;
    // margin-left:400px;
    max-width: 820px;
    // background-color:#D9D9D9
    position:relative
`
const Nav = styled.ul`
    list-style-type: none;
    padding-left:0;
`

const NavItems = styled.li`
    font-family: Bold;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.64px;
    display:inline-block;
    margin-right: 50px;
    cursor:pointer;

    color:${({active}) => (active ? '#000000' : '#E0E0E0')};
`

const Linear = styled.div`
    height: 4px;
    background-color: #F1F1F1;
    margin-top: 12px;
    margin-bottom: 28px;
`

