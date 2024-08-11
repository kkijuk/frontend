import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginProfileBox from '../components/Home/LoginProfileBox';
import Banner from '../components/Home/Banner';
import DeadlineNoti from '../components/Home/DeadlineNoti';
import WritingNoti from '../components/Home/WritingNoti';
import RecommendBox from '../components/Home/RecommendBox';

const Body = styled.div`
  width: 820px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /*Top이랑 CareerBox를 세로 방향 정렬*/
  box-sizing: border-box; /* 추가 */
  padding-bottom: 100px;
  margin: 50px auto;
  gap: 40px;
`;

const Container1 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const Container2 = styled.div`
    width: 100%;

`;

const Container3 = styled.div`
    width: 100%;

`;

const Container4 = styled.div`
    width: 100%;

`;

const Label = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 10px;
`;

const ContentBox = styled.div`
    width: 100%;
    max-width: 820px;
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

export default function Home() {

    return (
        <Body>
            <Container1>
                <LoginProfileBox></LoginProfileBox>
                타임라인 삽입
            </Container1>

            <Banner></Banner>

            <Container2>
                <Label>잠깐! 잊지 않으셨죠?</Label>
                <ContentBox>
                    <DeadlineNoti></DeadlineNoti>
                    <WritingNoti></WritingNoti>
                </ContentBox>
            </Container2>

            <Container3>
                <Label>추천 활동 공고</Label>
                <ContentBox>
                    <RecommendBox></RecommendBox>
                    <RecommendBox></RecommendBox>
                    <RecommendBox></RecommendBox>
                    <RecommendBox></RecommendBox>
                </ContentBox>
            </Container3>

            <Container4>
                <Label>추천 채용 공고</Label>
                <ContentBox>
                    <RecommendBox></RecommendBox>
                    <RecommendBox></RecommendBox>
                    <RecommendBox></RecommendBox>
                    <RecommendBox></RecommendBox>
                </ContentBox>
            </Container4>

        </Body>
    )
}