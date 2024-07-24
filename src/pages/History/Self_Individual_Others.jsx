import React, { useState } from 'react'
import styled from 'styled-components'
import './history.css'
import Toggle from '../../components/history(moni)/Toggle'
import ButtonOptions from '../../components/history(moni)/ButtonOptions'
import SubNav from '../../components/history(moni)/SubNav'
// import ContentTitle from '../../components/history(moni)/ContentTitle'

export default function Self_Individual_Others() {
    const [isChecked, setIsChecked] = useState(true);
    const handleToggleClick=()=>{
        setIsChecked(!isChecked);
    }

    return (
        <BackgroundDiv>
            <BaseDiv>
                <h1 style={{marginBottom:'36px'}}>이력관리</h1>
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
                    <h1 style={{position:'relative',display:'inline-block', marginRight:'12px'}}>UMC 7기</h1>
                    {/* 여기에 태그 불러오기 */}
                    <Tag style={{color:'white'}}>작성중</Tag>
                    <Tag style={{background: '#F5F5F5', color:'#3AAF85'}}>동아리</Tag>
                    <Tag style={{background: '#F5F5F5', color:'#3AAF85'}}>서비스기획</Tag>
                    <div style={{display:'inline-block',position:'absolute',right:0}}>
                        <p className='lastUpdated' style={{color:'red', marginBottom:'8px'}}>공고 마감 일시 : 2024-07-17 00:00 (D-7)</p>
                        <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: 2022-02-02 00:00</p>                  
                    </div>
                    
                    
                </ContentTitle>
                
                <div>
                    {/* ListItem 컴포넌트 사용 예정 */}
                    <div>
                        <h3>1. 첫 번째질문</h3>
                        <div style={{height:'100px'}}>
                            <p>저는~입니다.</p>   
                        </div>

                    </div>
                    <div>
                        <h3>2. 두 번째질문</h3>
                        <div style={{height:'100px'}}>
                            <p>저는~입니다.</p>   
                        </div>

                    </div>
                    <div>
                        <h3>3. 세 번째 질문</h3>
                        <div style={{height:'100px'}}>
                            <p>저는~입니다.</p>   
                        </div>

                    </div>
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


