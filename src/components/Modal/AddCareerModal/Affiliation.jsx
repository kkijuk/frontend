import React, { useState } from 'react'
import styled from 'styled-components'

// 첫 번째 버전: 교내, 교외만 
const Affiliation1 =({onAffiliationChange})=>{
    const [isOnCampus, setIsOnCampus] = useState("ON_CAMPUS");

    const toggleAffiliation =(value)=>{
        setIsOnCampus(value);
        onAffiliationChange(value) //parameter
    }

    return(
        <Container>
            <form>
                <SelectButton
                    state ={isOnCampus==="ON_CAMPUS"}
                    onClick = {()=>toggleAffiliation("ON_CAMPUS")}
                >교내</SelectButton>
                <SelectButton
                    state ={isOnCampus==="OFF_CAMPUS"} 
                    onClick = {()=>toggleAffiliation("OFF_CAMPUS")}
                >교외</SelectButton>
            </form>
        </Container>
    )
}

// 두 번째 버전: 교내, 교외, 기타
const Affiliation2 =({onAffiliationChange})=>{
    const [selectedAffiliation, setSelectedAffiliation] = useState("ON_CAMPUS");

    const toggleAffiliation =(value)=>{
        setSelectedAffiliation(value);
        onAffiliationChange(value)//parameter
    }

    return(
        <>
        <Container>
            <form>
                <SelectButton
                    state ={selectedAffiliation === "ON_CAMPUS"}
                    onClick = {()=>toggleAffiliation("ON_CAMPUS")}
                >교내</SelectButton>
                <SelectButton
                    state ={selectedAffiliation === "OFF_CAMPUS"} 
                    onClick = {()=>toggleAffiliation("OFF_CAMPUS")}
                >교외</SelectButton>
                <SelectButton
                    state ={selectedAffiliation === "OTHER"} 
                    onClick = {()=>toggleAffiliation("OTHER")}
                >기타</SelectButton>
            </form>
        </Container>
        </>

    )
}

export { Affiliation1, Affiliation2 };

const Container = styled.div`
    width: 500px;
    height: 60px;
    display: flex;
    flex-direction: row;   /* 버튼을 가로로 배치 */
    justify-content: space-between; 
    align-items: center;
    gap: 10px; 
`

const SelectButton = styled.div`
    width: 125px;
    height: 50px;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    border-radius: 10px;
    cursor:pointer;

    display:flex;
    justify-content: center; 
    align-items: center;
    
    background-color: ${(props)=>(props.state ? "#E1FAED" : "#F5F5F5")};
    color: ${(props)=>(props.state ? "#3AAF85" : "#707070")};
    border: ${(props)=>(props.state ? "2px solid #3AAF85" : "none")};
`