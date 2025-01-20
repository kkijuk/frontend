import React from "react";
import styled from "styled-components";

const ScrollNavigator =({ sections, activeSection, onClick})=>{

    return(
        <Container>
            <List>
                <p 
                    style={{fontSize:'20px', fontFamily:'Regular', fontWeight:'700', margin:0}}
                >
                    항목 찾기
                </p>
                <div style={{width:'113px', height:'1px', background:'black'}}/>
                {sections.map((section)=>(
                    <li key = {section.id}>
                    <Button 
                        isActive = {activeSection === section.id}
                        onClick={()=>onClick(section.id)}
                    >
                        {section.name}
                    </Button>
                    </li>
                ))}
            </List>
        </Container>
    )
}

export default ScrollNavigator;

const Container = styled.nav`
    position: fixed;
    top: 100px;
    padding: 25px 15px;
    width: 121px;
    border: none;
    border-radius: 16px;
    background: var(--gray-05, #F1F1F1);
    height: 490px;
`

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Button = styled.button`
    width: 100%;
    height: 35px;
    background: ${({ isActive }) => (isActive ? "#fff" : "transparent")};
    color: black;
    border:none;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-size: 16px;
    font-family: 'SemiBold';
    font-weight: 500;
    transition: background 0.3s ease;

    &:hover {
        background: #e0e0e0;
    }
`

