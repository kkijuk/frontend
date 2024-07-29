import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Convert from '../../components/History/Convert'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/ButtonOptions'

export default function Others() {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(true);

    const handleToggleClick=()=>{
        setIsChecked(!isChecked);
        navigate('/history/list/3');
    }

    const handleMasterClick=()=>{
        navigate('/history/master')
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
            "id": 100,
            "oneLiner": "UMC 7기 지원",
            "questions":[
                {
                    "subTitle": "첫 번째 질문",
                    "content": "아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요.아직 지원동기 및 포부를 작성하지 않았어요."
                },
                {
                    "subTitle": "두 번째 질문",
                    "content": "아직 지원동기 및 포부를 작성하지 않았어요."
                },
                {
                    "subTitle": "세 번째 질문",
                    "content": "아직 지원동기 및 포부를 작성하지 않았어요."
                }
            ],
            "complete":0,
            "career_tag":["동아리","서비스 기획"],
            "deadline": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47"
        }
    ]
    const resume = dummyData2[0];

    return (
        <BackgroundDiv>
            <BaseDiv>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <h1 style={{marginBottom:'36px', display:'inline-block'}}>이력관리</h1>
                    <Convert></Convert>
                </div>
                <SubNav></SubNav>
                <div style={{width:'820px', position:'relative', display:'inline-block'}}>
                    <SButton onClick={handleMasterClick} type="button">Master</SButton> 
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
                    <h1 style={{position:'relative',display:'inline-block', marginRight:'12px'}}>{resume.oneLiner}</h1>
                    <Tag style={{color:'white'}}>{resume.complete ? "작성 완료" : "작성 중"}</Tag>
                    {resume.career_tag.map(tag=>(
                        <Tag style={{background: '#F5F5F5', color:'#3AAF85'}}>{tag}</Tag>
                    ))}

                    <div style={{display:'inline-block',position:'absolute',right:0}}>
                        <p className='lastUpdated' style={{color:'red', marginBottom:'8px'}}>공고 마감 일시 : {resume.deadline}</p>
                        <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: {resume.updated_at}</p>                  
                    </div>
                </ContentTitle>
                <div>
                    {resume.questions.map(question =>(
                        <div>
                        <h3>{question.subTitle}</h3>
                        <div style={{height:'100px'}}>
                            <p>{question.content}</p>   
                        </div>

                    </div>
                    ))}
                </div>
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

const Tag=styled.div`
    display: inline-flex;
    height: 22px;
    padding: 0px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    margin-right:12px;

    border-radius: 20px;
    background: #3AAF85;    
    font-family:'Regular';
    font-size:12px;
    text-align: center;
    font-weight: 400;
    line-height: normal;
`


