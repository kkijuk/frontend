import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubNav from '../../components/History/SubNav'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/ButtonOptions'

const MasterRewrite =()=>{

    const dummyData = [
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
    const content = dummyData[0];

    const navigate = useNavigate();

    const handleSubmit = (event)=>{
        event.preventDefault();
        navigate(-1);
        //수정 요청
    }

    return(
        <BackgroundDiv>
            <BaseDiv>
                <h1 style={{display:'inline-block'}}>Master</h1>
                <Linear style={{width:'820px'}}/>
                <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: {content.updated_at}</p>           
                <InputTitle
                    placeholder="한줄소개를 작성하세요"
                    style={{height:'50px', marginBottom:'12px'}}
                    value={content.oneLiner||''}
                    //onChange
                />
                <InputTitle
                    placeholder="자기소개를 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={content.introduce||''}
                    //onChange
                />
                <h2>지원동기</h2>
                <InputTitle
                    placeholder="지원동기를 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={content.reason_for_applying||''}
                    //onChange
                />
                <h2>장단점</h2>
                <InputTitle
                    placeholder="장단점을 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={content.strengths_and_weaknesses||''}
                    //onChange
                />
                <h2>직무적합성</h2>
                <InputTitle
                    placeholder="직무적합성을 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={content.job_fit||''}
                    //onChange
                />
                <div style={{height:'70px'}}></div>
                <Button 
                        onClick={handleSubmit}
                        style={{width:'820px',borderRadius:'10px', background:'#3AAF85', color:'#FFF'}}>
                    저장하고 나가기</Button>


            </BaseDiv>
        </BackgroundDiv>
    )
}
export default MasterRewrite

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

const InputTitle = styled.input`
    width: 820px;
    flex-shrink: 0;
    border:none;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);    
    padding-left: 20px;
    color: var(--gray-02, #707070);
    font-family:Regular;
    font-size:16px;
    font-weight:400;
    line-height:normal;
`

const Linear = styled.div`
    height: 4px;
    background-color: #F1F1F1;
    margin-top: 12px;
    margin-bottom: 20px;
`
const Button = styled.button`
    height: 50px;
    border:none;
    border-radius: 10px; 
    cursor:pointer;
    font-family:Regular;
    font-size:18px;
`
