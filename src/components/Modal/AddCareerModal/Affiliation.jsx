import React, { useState } from 'react'
import styled from 'styled-components'

// 첫 번째 버전: 교내, 교외만 
const Affiliation1 =({onAffiliationChange})=>{
    const [isOnCampus, setIsOnCampus] = useState(0);

    const toggleAffiliation =(value)=>{
        const isOnCampusSelected = value ==="교내";
        setIsOnCampus(isOnCampusSelected);
        onAffiliationChange(isOnCampusSelected) //parameter
    }

    return(
        <Container>
            <form>
                <SelectButton
                    state ={isOnCampus}
                    onClick = {()=>toggleAffiliation("교내")}
                >교내</SelectButton>
                <SelectButton
                    state ={!isOnCampus} 
                    onClick = {()=>toggleAffiliation("교외")}
                >교외</SelectButton>
            </form>
        </Container>
    )
}

// 두 번째 버전: 교내, 교외, 기타
const Affiliation2 =({onAffiliationChange})=>{
    const [selectedAffiliation, setSelectedAffiliation] = useState(0);

    const toggleAffiliation =(value)=>{
        setSelectedAffiliation(value);
        onAffiliationChange(value)//parameter
    }

    return(
        <>
        <Container>
            <form>
                <SelectButton
                    state ={selectedAffiliation === 0}
                    onClick = {()=>toggleAffiliation(0)}
                >교내</SelectButton>
                <SelectButton
                    state ={selectedAffiliation === 1} 
                    onClick = {()=>toggleAffiliation(1)}
                >교외</SelectButton>
                <SelectButton
                    state ={selectedAffiliation === 2} 
                    onClick = {()=>toggleAffiliation(2)}
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