import React, { useState } from 'react'
import styled from 'styled-components'
import './history.css'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/ButtonOptions'
import SubNav from '../../components/History/SubNav'
// import ContentTitle from '../../components/history(moni)/ContentTitle'
// import GeneralButton from '../../components/shared/buttons/GeneralButton'

export default function OthersRewrite() {
    const [isChecked, setIsChecked] = useState(true);
    const handleToggleClick=()=>{
        setIsChecked(!isChecked);
    }

    return (
        <BackgroundDiv>
            <BaseDiv>
                <ContentTitle>
                    <h1 style={{position:'relative',display:'inline-block', marginRight:'12px'}}>UMC 7기</h1>
                    {/* 여기에 태그 불러오기 */}
                    <Tag style={{color:'white'}}>작성중</Tag>
                    <Tag style={{background: '#F5F5F5', color:'#3AAF85'}}>동아리</Tag>
                    <Tag style={{background: '#F5F5F5', color:'#3AAF85'}}>서비스기획</Tag>
                    <p className='lastUpdated' style={{color:'red', marginBottom:'8px',textAlign:'left'}}>공고 마감 일시 : 2024-07-17 00:00 (D-7)</p>                                        
                </ContentTitle>
                <Linear style={{width:'820px'}}/>
                <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: 2022-02-02 00:00</p>                  
                <form>
                    <InputTitle placeholder='1 질문을 작성하세요' style={{height:'50px', marginBottom:'12px'}}></InputTitle>
                    <InputTitle placeholder='답변을 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>
                    <InputTitle placeholder='2 질문을 작성하세요' style={{height:'50px', marginBottom:'12px'}}></InputTitle>
                    <InputTitle placeholder='답변을 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>
                    <InputTitle placeholder='3 질문을 작성하세요' style={{height:'50px', marginBottom:'12px'}}></InputTitle>
                    <InputTitle placeholder='답변을 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>
                </form>
                <AddButton>+</AddButton>
                <div>
                    {/* <GeneralButton type="delete" text="삭제" width="160px"></GeneralButton> */}
                    <Button></Button>
                </div>
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
const Linear = styled.div`
    height: 4px;
    background-color: #F1F1F1;
    margin-top: 12px;
    margin-bottom: 20px;
`
const InputTitle = styled.input`
    width: 820px;
    flex-shrink: 0;
    border:none;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);    

    color: var(--gray-02, #707070);
    font-family:Regular;
    font-size:16px;
    font-weight:400;
    line-height:normal;
`
const AddButton = styled.button`
    width: 820px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--gray-03, #D9D9D9);
    text-align:center;
    background: #FFF;
    color:#D9D9D9;
    font-size: 30px;
    cursor:pointer;
    
`
const Button = styled.button`
    height: 50px;
    border:none;
    border-radius: 10px; 
    cursor:pointer;
`