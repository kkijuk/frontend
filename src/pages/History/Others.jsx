import api from '../../Axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Convert from '../../components/History/Convert'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/AddButton'
import { ContentCopySharp } from '@mui/icons-material'

//Todo
//Number 주는 방법

const Others=()=> {

    const navigate = useNavigate();
    const {id} = useParams();

    // (Data) questions: 질문 목록, contents: 질문 외 정보
    const [questions, setQuestions] = useState([]);
    const [contents, setContents] = useState({
        id:0,
        recruitId:0,
        memberId:0,
        recruitTitle:"",
        deadline:"",
        link:"",
        tags:[],
        timeSinceUpdate:"",
        updatedAt:"",
    })
    const [isCompleted, setIsCompleted] = useState(0);//작성중or작성완료

    useEffect(()=>{
        api.get(`/history/intro/detail/${id}`)
            .then(response=>{
                console.log(response.data);
                const Data = response.data.data;
                setQuestions(Data.questionList);
                setContents({
                    id:Data.id,
                    recruitId:Data.recruitId,
                    memberId:Data.memberId,
                    recruitTitle:Data.recruitTitle,
                    deadline:Data.deadline,
                    link:Data.link,
                    tags:Data.tags,
                    timeSinceUpdate:Data.timeSinceUpdate,
                    updatedAt:Data.updatedAt,
                })
                setIsCompleted(Data.state);
            })
            .catch(error=>{
                console.log(error);
            })
    },[]);

    return (
        <BackgroundDiv>
            <BaseDiv>
                <ContentTitle>
                    <h1 style={{position:'relative',display:'inline-block', marginRight:'12px'}}>{contents.recruitTitle}</h1>
                    <Tag style={{color:'white'}}>{isCompleted ? "작성 완료" : "작성 중"}</Tag>
                    {contents.tags.map(tag=>(
                        <Tag style={{background: '#F5F5F5', color:'#3AAF85'}}>{tag}</Tag>
                    ))}

                    <div style={{display:'inline-block',position:'absolute',right:0}}>
                        <p className='lastUpdated' style={{color:'red', marginBottom:'8px'}}>공고 마감 일시 : {ContentCopySharp.deadline}</p>
                        <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: {contents.updatedAt}</p>                  
                    </div>
                </ContentTitle>
                <div>
                    {questions.map((question, index) =>(
                        <div style={{position:'relative'}}>
                            <h3>{index+1}. {question.title || '질문 제목을 작성하세요'}</h3>
                            <div style={{height:'100px'}}>
                                <p>{question.content || ''}</p>   
                            </div>
                        </div>
                    ))}
                </div>
                <EditButton onClick={()=>navigate(`/history/others/${id}/rewrite`)} style={{right:'100px'}}>
                    <svg width="60" height="60" viewBox="2-2 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M20 39.7509V46H26.2491L44.6799 27.5692L38.4308 21.3201L20 39.7509ZM49.5126 22.7366C50.1625 22.0867 50.1625 21.0368 49.5126 20.3869L45.6131 16.4874C44.9632 15.8375 43.9133 15.8375 43.2634 16.4874L40.2139 19.537L46.463 25.7861L49.5126 22.7366Z" fill="white"/>
                    </svg>
                </EditButton>
            </BaseDiv>
        </BackgroundDiv>
    )
}
export default Others

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

const Delete = styled.div`
    width: 30px;
    height: 20px;
    color: #707070;
    font-size:15px;
    font-family:Regular;
    cursor:pointer;
    position:absolute;
    top: 16px;
    right:10px;
`

