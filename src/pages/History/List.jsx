import api from "../../Axios";
import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SubNav from '../../components/History/SubNav'
import Toggle from '../../components/History/Toggle'
import ListItem from "../../components/History/ListItem";

//Todo
//자기소개서 생성 잘 되는 지 확인하고
//자기소개서 목록 불러오기

const List =()=>{


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

    let { state } = useParams();//state 0(작성중), 1(작성완료), 2(보관중), 3(전체) 중 하나

    const navigate = useNavigate();

    //(Data) 지원 공고 목록
    const [recruits, setRecruits] = useState([]);

    //1. 자기소개서 목록 조회
    useEffect(()=>{
        api.get('/history/intro/list')
        .then(response=>{
            console.log(response.data);
            const Data = response.data.data;
            setRecruits(Data);
            console.log(Data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

    const filterdData = state ==="3"
    ? recruits
    : recruits.filter(item=>item.state.toString() === state);

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
                    title={item.recruitTitle}
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