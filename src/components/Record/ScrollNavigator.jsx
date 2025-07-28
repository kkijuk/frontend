import React from "react";
import styled from "styled-components";
import { Color } from "@/constants/color";
import SvgIcon from "../shared/SvgIcon";
// import {
//     Container,
//     List,
//     Button
// } from './Components.styles';

// sections = 
// [{id: 'user', name: '인적사항'}, (count 없음)
// {id: 'educations', name: '학력'}, (count 없음)
// {id: 'employments', name: '경력', count: 2}, 
// {id: 'activitiesAndExperiences', name: '활동 및 경험', count: 4}, 
// {id: 'projects', name: '프로젝트', count: 1}, 
// {id: 'eduCareers', name: '교육', count: 2}, 
// {id: 'awards', name: '수상', count: 1}, 
// {id: 'licenses', name: '자격증 · 외국어', count: 2}, 
// {id: 'skills', name: '스킬', count: 5}, 
// {id: 'etc', name: '추가자료', count: 3}]

const ScrollNavigator =({ sections, activeSection, onClick})=>{

    return(
        <NavigatorContainer>
                <Header>항목 찾기</Header>
                <Linear />
                <List>
                    {sections.map((section)=>(
                            <Button key={section.id}
                                isActive = {activeSection === section.id}
                                onClick={()=>onClick(section.id)}
                            >
                                {section.name}
                                <ButtonCount>
                                    {section.count 
                                    ? section.count
                                    : <SvgIcon name="check" width={16} height={16} color={Color.gray01}/>}
                                </ButtonCount>
                            </Button>
                    ))}
                </List>
        </NavigatorContainer>
    )
}

export default ScrollNavigator;

const NavigatorContainer = styled.nav`
    width: 140px;
    height: auto;
    padding: 20px 12px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    position: fixed;
    top: 180px;
    left: 130px;
    
    border: 1px solid ${Color.gray05};
    border-radius: 12px;
    background: ${Color.white};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const Header = styled.p`
    margin: 0;
    padding: 0px 5px;
    font-size: 20px;
    font-family: 'Regular';
    font-weight: 700;
`

const Linear = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 1px;
    padding: 0px 8px;
    background: ${Color.gray03};
`

const Button = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 8px 12px;

    display: flex;
    align-items: center;
    align-self: stretch;
    flex-direction: row;
    gap: 4px;

    background: ${({ isActive }) => (isActive ? Color.gray06 : Color.white)};

    color: black;
    border:none;
    border-radius: 8px;
    cursor: pointer;
    // text-align: left;
    font-size: 16px;
    font-family: 'SemiBold';
    font-weight: 500;
    transition: background 0.3s ease;

    &:hover {
        background: ${Color.gray06};
    }
`

const ButtonCount = styled.span`
    font-size: 12px;
    color: ${Color.gray02};
    font-family: 'Regular';
    font-weight: 500;
`


