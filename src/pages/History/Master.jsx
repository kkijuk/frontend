import React, { useState } from 'react'
import styled from 'styled-components'
import './history.css'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/ButtonOptions'
import SubNav from '../../components/History/SubNav'
// import ContentTitle from '../../components/History/ContentTitle'
import Convert from '../../components/History/Convert'

export default function Master() {
    const [isChecked, setIsChecked] = useState(true);
    const handleToggleClick=()=>{
        setIsChecked(!isChecked);
    }

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
                    <SButton type="button">UMC</SButton>
                    <SButton type="button">새로</SButton>
                    <div style={{position:'absolute', right:0, display:'inline-block'}}>
                        <Toggle
                            checked={isChecked}
                            onChange={handleToggleClick}
                        />
                    </div>
                </div>
                <ContentTitle>
                    <h1 style={{display:'inline-block'}}>Master</h1>
                    <p className='lastUpdated' style={{display:'inline-block', position:'absolute', top:'10px', right:0}}>마지막 수정일시: 2022-02-02 00:00</p>
                </ContentTitle>
                <form>
                    <InputTitle placeholder='한줄소개' style={{height:'50px', marginBottom:'12px'}}></InputTitle>
                    <InputTitle placeholder='자기소개를 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>
                    <h3>지원동기</h3>
                    <InputTitle placeholder='지원동기를 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>
                    <h3>장단점</h3>
                    <InputTitle placeholder='장단점을 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>

                </form>
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

