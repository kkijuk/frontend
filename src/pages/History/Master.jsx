import api from '../../Axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Convert from '../../components/History/Convert'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/AddButton'

// Todo
// - 마스터 생성 요청 드리기
// - 소제목 받아오기

const Master=()=> {
    const navigate = useNavigate();
    
    //(Data) 한줄소개, 지원동기및포부 제목 및 내용, 장단점 제목 및 내용, 직무적합성 제목 및 내용
    const [questions, setQuestions]=useState({
        oneLiner:"",
        motive_title:"",
        motive:"",
        prosAndCons_title:"",
        prosAndCons:"",
        job_fit_title:"",
        job_fit:"",
        updated_at:""
    })

    //(API) 마스터 조회
    useEffect(()=>{
        api.get('/history/intro/master')
            .then(response=>{
                const Data = response.data.data[0];
                console.log("내용조회: ",Data);
                setQuestions({
                    oneLiner:Data.oneLiner,
                    motive_title:Data.motiveTitle,
                    motive:Data.motive,
                    prosAndCons_title:Data.prosAndConsTitle,
                    prosAndCons:Data.prosAndCons,
                    job_fit_title:Data.jobSuitabilityTitle,
                    job_fit:Data.jobSuitability,
                    updated_at:Data.updatedAt
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
                    <h1 style={{display:'inline-block'}}>{questions.oneLiner ? questions.oneLiner : "한줄소개를 작성해주세요!"}</h1>
                    <p className='lastUpdated' style={{display:'inline-block', position:'absolute', top:'10px', right:0}}>
                        {questions.updated_at ? `마지막 수정일시: ${questions.updated_at}` : "마지막 수정일시: unknown"}
                    </p>
                </ContentTitle>   

                <h3>{questions.motive_title ? questions.motive_title : "1. 지원동기 및 포부 [소제목]"}</h3>
                <ContentBox>{questions.motive ? questions.motive : "아직 지원동기를 작성하지 않았어요."}</ContentBox>  

                <h3>{questions.prosAndCons_title ? questions.prosAndCons_title : "2. 장단점 [소제목]"}</h3>
                <ContentBox>{questions.prosAndCons ? questions.prosAndCons : "아직 장단점을 작성하지 않았어요.."}</ContentBox>  

                <h3>{questions.job_fit_title ? questions.job_fit_title : "3. 직무적합성 [소제목]"}</h3>
                <ContentBox>{questions.job_fit ? questions.job_fit : "아직 직무적합성을 작성하지 않았어요."}</ContentBox>  

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
    z-index: 10;
`


