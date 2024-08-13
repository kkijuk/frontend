import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  flex-shrink: 0;
  width: 240px;
  height: 160px;
  border-radius: 10px;
  border: 1px solid var(--gray-03, #D9D9D9);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 0;

  color: var(--black, #000);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const BoldText = styled.h5`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: ${props => props.fontSize || '14px'};
    font-style: normal;
    font-weight: 700;
    margin: 0;
`;

const GreenSpan = styled.span`
    color: #3AAF85;
`;

const BoxContainer= styled.div`
    flex-shrink: 0;
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 9px;
    margin-bottom: 10px;
    gap: 10px;
    align-items: center;
    justify-content: center;
    align-items: center;
`;

const CountBox = styled.div`
    width: 105px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);
    align-items: center;

    display: flex;
    width: 105px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--black, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
`;

const OKButton = styled.button`
    width: 220px;
    height: 30px;
    flex-shrink: 0;
    border: none;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    margin-bottom: 8px;

    color: var(--white, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
    background-color: #35a576;
  }
`;

export default function LoginProfileBox() {
    const navigate = useNavigate();

    const goCareer = () => {
        navigate('/mycareer');
    };

    const goCareerAdd = () => {
        navigate('/mycareer', { state: { showModal: true } });
    };

    const goApply = () =>{
        navigate('/apply-status');
    };

    return (
        <Container>
            <TextContainer>
                안녕하세요 user-name 님,
                <BoldText><GreenSpan>끼적</GreenSpan>한 지 duration개월이 지났어요!</BoldText>
            </TextContainer>
            <BoxContainer>
                <CountBox onClick={() => goCareer()} >
                    내 활동
                    <BoldText fontSize='12px'>0</BoldText>
                </CountBox>

                <CountBox onClick={() => goApply()}>
                    지원현황
                    <BoldText fontSize='12px'>0</BoldText>
                </CountBox>
            </BoxContainer>
            
            <OKButton onClick={() => goCareerAdd()}>활동 추가하기</OKButton>

        </Container>
    )
}