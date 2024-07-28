import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SubNav from '../../components/History/SubNav'
import Toggle from '../../components/History/Toggle'
import ListItem from "../../components/History/ListItem";

const List =()=>{
    let { state } = useParams();//state 0(작성중), 1(작성완료), 2(보관중), 3(전체) 중 하나

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
    
    const filterdData = state ==="3"
    ? dummyData
    : dummyData.filter(item=>item.state.toString() === state);

    return(
        <BaseDiv>
            {filterdData.map(item => (
                <ListItem
                    title={item.title}
                    updated_at={item.updated_at}
                    deadline={item.deadline}
                    state={item.state}
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