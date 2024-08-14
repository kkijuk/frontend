import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getIntroduce } from '../../api/Home/getIntroduce';

const Container = styled.div`
  flex-shrink: 0;
  width: 400px;
  height: 154px;
  border-radius: 10px;
  border: none;
  background: var(--gray-06, #F5F5F5);
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 20px 25px 20px 25px;
  box-sizing: border-box;
`;

const Label = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 3px;
`;

const Box = styled.div`
    width: 350px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid var(--gray-03, #D9D9D9);
    background: var(--white, #FFF);
    padding: 7px 20px 7px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 6px;
    align-items: center;

    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const DDayBox = styled.div`
    width: 60px;
    height: 25px;
    border-radius: 12px;
    background: var(--gray-06, #F5F5F5);
    margin-left: auto;
    display: flex;
    justify-content: center;
      align-items: center;
`;

const DDayText = styled.div`
    flex-shrink: 0;
    color: ${props => props.fontColor || '#707070'};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`;

export default function WritingNoti() {
    return (
        <Container>
            <Label>자기소개서 작성 완료를 기다려요</Label>
            <Box>
                00식품 2024 하반기 인턴
                <DDayBox>
                    <DDayText fontColor='#FA7C79'>D-</DDayText>
                    <DDayText fontColor='#FA7C79'>4</DDayText>
                </DDayBox>
            </Box>

            <Box>
                00서포터즈 3기
                <DDayBox>
                    <DDayText>D-</DDayText>
                    <DDayText>10</DDayText>
                </DDayBox>
            </Box>
        </Container>
    )
}