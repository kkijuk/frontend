import api from '../../Axios'
import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'

const History=()=>{

    //(Data)
    const [picture, setPicture] = useState('') //프로필
    const [address, setAddress] = useState('') //주소
    const [updatedAt, setUpdatedAt] = useState('')//마지막 업데이트
    const [education, setEducation] = useState([]);
    const [career, setCareer] = useState([]);
    const [activity, setActivity] = useState([]);

    //1. 이력서 조회

    //2. 이력서 수정

    return(
        <BackgroundDiv>
            <BaseDiv>
                {/* 유저 정보 */}
                <div style={{width:'150px', height:'200px'}}>

                </div>
                <Linear></Linear>

                {/* 학력 */}
                {/*AddButton 개수 제한 이벤트(onClick)*/}
                <AddButton >+</AddButton>
                <Linear></Linear>

                {/* 경력 */}
                <AddButton >+</AddButton>
                <Linear></Linear>

                {/* 활동 및 경험 */}
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