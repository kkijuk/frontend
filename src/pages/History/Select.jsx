import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import './history.css'
import styled from "styled-components";

const Select =()=>{
    const {id} = useParams();
    const navigate = useNavigate();

    const dummyData=[
        {
            "id":100,
            "start_date":"2024-07-01 00:00",
            "deadline":"2024-07-17 18:00",
            "career_tag":["동아리","서비스기획"]
        }
    ]
    const data = dummyData[0];

    const handleNextClick =()=>{
        navigate(`/history/others/:${id}/rewrite`);
    }

    return(
        <BackgroundDiv>
            <BaseDiv>
                <InfoDiv>
                    <Item style={{top:'10px'}}>
                        <p style={{fontWeight:800}}>접수시작</p>
                        <p >{data.start_date}</p>
                    </Item>
                    <Item style={{top:'10px',right:'150px'}}>
                        <p style={{fontWeight:800}}>접수마감</p>
                        <p style={{color:'#FC5555'}}>{data.deadline}</p>
                    </Item>
                    <Item style={{top:'50px'}}>
                        <p style={{fontWeight:800}}>태그</p>
                        {data.career_tag.map(tag=>(
                            <Tag style={{background: '#FFF', color:'#3AAF85'}}>{tag}</Tag>
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

