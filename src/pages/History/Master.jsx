import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Convert from '../../components/History/Convert'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/ButtonOptions'

export default function Master() {
    const [isChecked, setIsChecked] = useState(true);
    const navigate = useNavigate();

    const handleToggleClick=()=>{
        setIsChecked(!isChecked);
        navigate('/history/list')
    }

    const handleSButtonClick=(id)=>{
        navigate(`/history/${id}`)
    }

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
            "question1":{
                "subTitle": "소제목",
                "content": "아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요."
            },
            "question2":{
                "subTitle": "소제목",
                "content": "아직 지원동기 및 포부를 작성하지 않았어요."
            },
            "question3":{
                "subTitle": "소제목",
                "content": "아직 지원동기 및 포부를 작성하지 않았어요."
            },
            "created_at": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47"
        }
    ]
    const content = dummyData2[0];

    return (
        <BackgroundDiv>
            <BaseDiv>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <h1 style={{marginBottom:'36px', display:'inline-block'}}>이력관리</h1>
                    <Convert></Convert>
                </div>
                <SubNav></SubNav>
                <div style={{width:'820px', position:'relative', display:'inline-block'}}>
                    <SButton type="button">Master</SButton> 
                    {dummyData.map(resume=>(
                        <SButton type = "button" key={resume.id} onClick={()=>handleSButtonClick(resume.id)}>
                            {resume.title}
                        </SButton>
                    ))}
                    <div style={{position:'absolute', right:0, display:'inline-block'}}>
                        <Toggle
                            checked={isChecked}
                            onChange={handleToggleClick}
                        />
                    </div>
                </div>
                <ContentTitle>
                    <h1 style={{display:'inline-block'}}>{content.oneLiner}</h1>
                    <p className='lastUpdated' style={{display:'inline-block', position:'absolute', top:'10px', right:0}}>마지막 수정일시: {content.updated_at}</p>
                </ContentTitle>
                <h3>1. 지원동기 및 포부 [{content.question1.subTitle}]</h3>
                <ContentBox>{content.question1.content}</ContentBox>
                <h3>2. 장단점 [{content.question2.subTitle}]</h3>
                <ContentBox>{content.question2.content}</ContentBox>
                <h3>3. 직무적합성 [{content.question3.subTitle}]</h3>
                <ContentBox>{content.question3.content}</ContentBox>
                <ButtonOptions></ButtonOptions>
            </BaseDiv>
        </BackgroundDiv>
    )
}

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
    margin-bottom:40px;
`



