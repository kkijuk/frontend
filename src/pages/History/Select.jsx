import api from "../../Axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './history.css'
import styled from "styled-components";

const Select =()=>{
    //(API) 미지원 공고 정보 불러오기
    const data = [
        {
            "recruitId":3,
            "title":"카카오",
            "startTime": "2024-09-01 10:11",
            "endTime": "2025-02-20 10:11",
            "tags": [
                "기업",
                "백엔드"
            ]
        },
        {
            "recruitId":4,
            "title":"네이버",
            "startTime": "2024-07-20 10:11",
            "endTime": "2024-08-20 10:11",
            "tags": [
                "기업",
                "풀스택"
            ]
        },
        {
            "recruitId":5,
            "title":"현대 오토에버",
            "startTime": "2024-07-20 10:11",
            "endTime": "2024-08-20 10:11",
            "tags": [
                "기업",
                "인공지능"
            ]
        },
        {
            "recruitId":2,
            "title":"UMC 7기",
            "startTime": "2024-07-20 10:11",
            "endTime": "2024-08-20 10:11",
            "tags": [
                "동아리",
                "서비스기획"
            ]
        },
        {
            "recruitId":6,
            "title":"구름톤",
            "startTime": "2024-07-20 10:11",
            "endTime": "2024-08-20 10:11",
            "tags": [
                "해커톤",
                "프론트엔드"
            ]
        },
    ]

    const {id} = useParams();
    const navigate = useNavigate();

    const [currentApply, setCurrentApply] = useState(data[0].recruitId);
    const [selectedData, setSelectedData] = useState(0);

    useEffect(()=>{
        console.log("currentApply: ",currentApply);
        const index = data.findIndex(i=>i.recruitId===currentApply);
        console.log("index값: ", index);
        if(index !== -1){
            setSelectedData(index);
        }else{
            setSelectedData(-1);
        }
        // console.log("selectedData: ",selectedData)
        
    },[currentApply])
    const isValidIndex = selectedData > -1;//index 예외 처리
    useEffect(() => {
        console.log("selectedData: ", selectedData);
    }, [selectedData]);

    const handleClickItem=(id)=>{
        setCurrentApply(id);
        //InfoDiv바꾸기
    }

    const handleNextClick =()=>{
        //(API) 자소서 생성
        const postData = {
            questionList:[
                {title:"string", content:"string", number:0},
                {title:"string", content:"string", number:0},
                {title:"string", content:"string", number:0}
            ],
            state: 0
        };

        api.post(`/history/intro/${currentApply}`,postData)
            .then(response=>{
                console.log(response.data);
            })
            .catch(error=>{
                console.error('Error:',error);
            })

        navigate(`/history/others/:${id}/rewrite`);
    }

    return( 
        <BackgroundDiv>
            <BaseDiv>
                <div style={{height:'140px'}}></div>
                <h1>자기소개서를 작성할 공고를 선택해주세요.</h1>
                <div style={{height:'50px'}}></div>
                <ListDiv>
                    <ItemsDiv>
                        {
                            data.map(recruit=>(
                                <ListItem 
                                    onClick={()=>{handleClickItem(recruit.recruitId)}}  
                                    style={{backgroundColor: currentApply===recruit.recruitId ? '#E1FAED' :'#F5F5F5',
                                            color: currentApply===recruit.recruitId ? 'black' :'#707070',
                                            border: currentApply===recruit.recruitId ? '2px solid var(--main-01, #3AAF85)' :'none'}}>
                                {recruit.title}
                                </ListItem>
                            ))
                        }
                    </ItemsDiv>
                    <AddButton>공고 추가</AddButton>
                </ListDiv>
                <div style={{height:'30px'}}></div>
                <InfoDiv>
                    <Item style={{top:'10px'}}>
                        <p style={{fontWeight:800}}>접수시작</p>
                        <p >{isValidIndex && data[selectedData].startTime}</p>
                    </Item>
                    <Item style={{top:'10px',right:'150px'}}>
                        <p style={{fontWeight:800}}>접수마감</p>
                        <p style={{color:'#FC5555'}}>{isValidIndex && data[selectedData].endTime}</p>
                    </Item>
                    <Item style={{top:'50px'}}>
                        <p style={{fontWeight:800}}>태그</p>
                        {data[selectedData].tags.map(tag=>(
                            <Tag style={{background: '#FFF', color:'#3AAF85'}}>{isValidIndex && tag}</Tag>
                        ))}
                    </Item>
                    {/* <button
                        style={{width:'140px',height:'28px',border:'1px solid #707070'}}>
                            공고 보러가기
                    </button> */}
                </InfoDiv>
                <Button onClick={handleNextClick}>다음</Button>
            </BaseDiv>
        </BackgroundDiv>
    )

}

export default Select

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
    display:flex;
    flex-direction: column;
    align-items:center;
    // margin-left:400px;
    max-width: 820px;
    // background-color:#D9D9D9
    position:relative
`
const ListDiv = styled.div`
    width: 720px;
    height: 84px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid var(--gray-02, #707070);
    display:flex;
    align-items:center;
    gap:10px;
    padding: 0px 10px;
`

const ItemsDiv=styled.div`
    display:flex;
    overflow-x:auto;
    gap:10px;
    flex: 1;
    white-space: nowrap; /* 항목들이 한 줄에 배치되도록 설정 */

    &::-webkit-scrollbar {
        height: 0px;
    }
`

const ListItem=styled.div`
    display: flex;
    max-width:100px;
    height: 60px;
    padding: 0px 36px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    text-align: center;
    font-family: Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor:pointer;
`

const InfoDiv = styled.div`
    width: 720px;
    height: 70px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--gray-06, #F5F5F5);
    padding: 15px 10px;
    position:relative;
`

const Button = styled.div`
    width: 620px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    color: #FFF;
    text-align: center;
    font-family: Regular;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    margin-top:97px;
`

const Item = styled.div`
    width:250px;
    display:flex;
    align-items:center;
    gap:20px;
    position:absolute;
`

const Tag=styled.div`
    display: inline-flex;
    height: 22px;
    padding: 0px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 20px;
    background: #3AAF85;    
    font-family:'Regular';
    font-size:12px;
    text-align: center;
    font-weight: 400;
    line-height: normal;
`
const AddButton = styled.div`
    width: 120px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: var(--gray-04, #707070);
    color: white;
    cursor: pointer;

    color: #FFF;
    text-align: center;
    font-family: Regular;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
