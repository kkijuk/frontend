import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SubNav from '../../components/History/SubNav'
import Toggle from '../../components/History/Toggle'
import ListItem from "../../components/History/ListItem";

const List =()=>{
    let { state } = useParams();//state 0(작성중), 1(작성완료), 2(보관중), 3(전체) 중 하나

    const masterData=[
        {
            "updated_at":" 2024-07-10",
            "state":1
        }
    ]
    const master=masterData[0];
    const dummyData=[
        {
            "id":"200",
            "title":"카카오",
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
    
    const navigate = useNavigate();
    const filterdData = state ==="3"
    ? dummyData
    : dummyData.filter(item=>item.state.toString() === state);

    return(
        <BaseDiv>
            <ListItem
                title="MASTER"
                updated_at={master.updated_at}
                state={master.state}
                onClick={()=>navigate('/history/master')}
            />
            {filterdData.map(item => (
                <ListItem     
                    key={item.id}
                    title={item.title}
                    updated_at={item.updated_at}
                    deadline={item.deadline}
                    state={item.state}
                    onClick={()=>navigate(`/history/others/${item.id}`)}
                />
            ))}
        </BaseDiv>
    )
}

export default List

const BaseDiv = styled.div`
    width: 820px;
    // display:flex;
    // margin-left:400px;
    max-width: 820px;
    // background-color:#D9D9D9
    position:relative
`