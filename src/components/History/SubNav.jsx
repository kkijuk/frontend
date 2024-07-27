import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const SubNav =({category})=>{
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <Nav>
            <NavItems 
                onClick={()=>navigate('/history')} 
                active={location.pathname === '/history'}>이력서</NavItems>
            <NavItems 
                onClick={()=>navigate('/history/master')} 
                active={location.pathname === '/history/list'}>자기소개서</NavItems>
            <NavItems 
                onClick={()=>navigate('/history/portfolio')} 
                active={location.pathname === '/history/portfolio'}>포트폴리오</NavItems>
            <Linear/>
        </Nav>
    )
}

export default SubNav;

const Nav = styled.ul`
    list-style-type: none;
    padding-left:0;
`

const NavItems = styled.li`
    font-family: Black;
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

