import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubNav from '../../components/History/SubNav'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from "../../components/History/AddButton";

const ListHeader =()=>{
    const dummyData=[
        {
            "id":"0",//마스터 아이디?
            "title":"Master",
            "deadline": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47",
            "state":1
        },
        {
            "id":"99",
            "title":"공고1",
            "deadline": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47",
            "state":0
        },
        {
            "id":"100",
            "title":"UMC 7기 지원",
            "deadline": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47",
            "state":1
        },
        {
            "id":"110",
            "title":"공고2",
            "deadline": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47",
            "state":2
        },
    ]
    const list = dummyData[0];

    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const handleToggleClick=()=>{
        setIsChecked(!isChecked);
        navigate('/history/master')
    }

    const handleSButtonClick =(state)=>{
        navigate(`/history/list/${state}`);
    }


    return(
        <BackgroundDiv>
            <BaseDiv>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <h1 style={{marginBottom:'36px', display:'inline-block'}}>이력관리</h1>
                </div>
                <SubNav></SubNav>
                <div style={{width:'820px', position:'relative', display:'inline-block'}}>
                    <SButton type="button" onClick={()=>handleSButtonClick(3)}>전체</SButton> 
                    <SButton type="button" onClick={()=>handleSButtonClick(0)}>작성중</SButton> 
                    <SButton type="button" onClick={()=>handleSButtonClick(1)}>작성완료</SButton> 
                    <SButton type="button" onClick={()=>handleSButtonClick(2)}>보관</SButton> 
                    <div style={{position:'absolute', right:0, display:'inline-block'}}>
                        <Toggle
                            checked={isChecked}
                            onChange={handleToggleClick}
                        />
                    </div>
                </div>
                <ButtonOptions></ButtonOptions>
                
            </BaseDiv>
        </BackgroundDiv>
    )
}
export default ListHeader

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

const SButton = styled.button`
    width: 76px;
    height: 35px;
    margin-right: 12px;
    font-family: 'Regular';
    border:none;
    border-radius: 10px;
    border-color: #FFFFFF;
    padding: 6px 16px 6px 16px;
    gap: 10px;
    background-color:#F5F5F5;
    color:#707070;
    cursor:pointer;

    &: first-child{
        background-color:#E1FAED;
        color:#000000;
    }
`