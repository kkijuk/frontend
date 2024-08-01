import React from 'react'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'

const History=()=>{
    return(
        <BackgroundDiv>
            <BaseDiv>
            <Linear></Linear>
            {/*AddButton 개수 제한 이벤트(onClick)*/}
            <AddButton >+</AddButton>
            <Linear></Linear>
            <AddButton >+</AddButton>
            <Linear></Linear>
            <AddButton >+</AddButton>
            </BaseDiv>
        </BackgroundDiv>
    )
}
export default History

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
    z-index:999;
    // & > * {
    //     positon:relative;
    //     z-index: 990; 
    // }
`

const Linear = styled.div`
    width:820px;
    height:2px;
    background: #F1F1F1;
    margin: 30px 0px;
`

const AddButton = styled.button`
    width: 820px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--gray-03, #D9D9D9);
    text-align:center;
    background: #FFF;
    color:#D9D9D9;
    font-size: 30px;
    cursor:pointer; 
`

const Item = styled.div`

`