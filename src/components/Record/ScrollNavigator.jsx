import React from "react";
import {
    Container,
    List,
    Button
} from './Components.styles';

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



