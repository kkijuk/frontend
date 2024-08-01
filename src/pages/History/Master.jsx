import api from '../../Axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Convert from '../../components/History/Convert'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/AddButton'

const Master=()=> {
    const dummyData=[
        {
            "id": 100, "title":"UMC"
        },
        {
            "id": 101, "title":"현대"
        },
        {
            "id": 102, "title":"카카오"
        }
    ]

    const dummyData2 = [
        {
            "id": 1,
            "oneLiner": "한줄소개",
            "introduce": "자기소개입니다.",
            "reason_for_applying":"지원동기입니다.",
            "strengths_and_weaknesses":"장단점입니다.",
            "job_fit":"직무적합성입니다.",
            "created_at": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47"
        }
    ]
    const content = dummyData2[0];

    const navigate = useNavigate();
    
    const [questions, setQuestions]=useState({
        oneLiner:"",
        introduction:"",
        motive:"",
        prosAndCons:"",
        //job_fit 필요
    })

    //(API) 마스터 조회
    useEffect(()=>{
        api.get('/history/intro/master')
            .then(response=>{
                const Data = response.data.data[0];
                console.log(Data);
                setQuestions({
                    oneLiner:Data.oneLiner,
                    introduction:Data.introduction,
                    motive:Data.motive,
                    prosAndCons:Data.prosAndCons
                })
            })
            .catch(error=>{
                console.log("Error:", error);
            })
    },[])

    useEffect(()=>{
        console.log(questions)
    },[questions]);

    return (
        <BackgroundDiv>
            <BaseDiv>
                <ContentTitle>
                    <h1 style={{display:'inline-block'}}>Master</h1>
                    <p className='lastUpdated' style={{display:'inline-block', position:'absolute', top:'10px', right:0}}>마지막 수정일시: api수정필요</p>
                </ContentTitle>
                <ContentBox>{questions.oneLiner ? questions.oneLiner : "아직 한줄소개를 작성하지 않았어요."}</ContentBox>    
                <ContentBox>{questions.introduction ? questions.introduction : "아직 자기소개를 작성하지 않았어요."}</ContentBox>  
                <h2>지원동기</h2>
                <ContentBox>{questions.motive ? questions.motive : "아직 지원동기를 작성하지 않았어요."}</ContentBox>  
                <h2>장단점</h2>
                <ContentBox>{questions.prosAndCons ? questions.prosAndCons : "아직 장단점을 작성하지 않았어요."}</ContentBox>  
                <h2>직무적합성</h2>
                <ContentBox>api수정필요</ContentBox>  


                {/*초안*/}
                {/* <h3>1. 지원동기 및 포부 [{content.question1.subTitle}]</h3>
                <ContentBox>{content.question1.content}</ContentBox>
                <h3>2. 장단점 [{content.question2.subTitle}]</h3>
                <ContentBox>{content.question2.content}</ContentBox>
                <h3>3. 직무적합성 [{content.question3.subTitle}]</h3>
                <ContentBox>{content.question3.content}</ContentBox> */}
                <EditButton onClick={()=>navigate('/history/master/rewrite')} style={{right:'100px'}}>
                    <svg width="60" height="60" viewBox="2-2 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M20 39.7509V46H26.2491L44.6799 27.5692L38.4308 21.3201L20 39.7509ZM49.5126 22.7366C50.1625 22.0867 50.1625 21.0368 49.5126 20.3869L45.6131 16.4874C44.9632 15.8375 43.9133 15.8375 43.2634 16.4874L40.2139 19.537L46.463 25.7861L49.5126 22.7366Z" fill="white"/>
                    </svg>
                </EditButton>
            </BaseDiv>
        </BackgroundDiv>
    )
}
export default Master

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

const ContentTitle=styled.div`
    position:relative;
    margin-top:10px;
    margin-bottom:33px;
`

const ContentBox = styled.div`
    color: var(--gray-02, #707070);
    font-family: Regular;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom:60px;
`
const EditButton = styled.button`
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background-color: #B0B0B0;
    color: white;
    position: fixed;
    bottom: 20px;
    cursor: pointer;
`


