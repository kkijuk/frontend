import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginProfileBox from '../components/Home/LoginProfileBox';
import LogoutProfileBox from '../components/Home/LogoutProfileBox';
import Banner from '../components/Home/Banner';
import DeadlineNoti from '../components/Home/DeadlineNoti';
import WritingNoti from '../components/Home/WritingNoti';
import RecommendBox from '../components/Home/RecommendBox';
import Timeline from '../components/Mycareer/Timeline';

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

const dummyData = [
    { title: '서포터즈 3기', category: '대외활동', endDate: '2024.02.10', image: 'https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004' },
    { title: '활동2', category: '대외활동', endDate: '2024.02.10', image: '-' },
    { title: '아르바이트', category: '대외활동', endDate: '2024.02.10', image: '-' },
    { title: '동아리', category: '대외활동', endDate: '2024.02.10', image: '-' },
    { title: '채용1', category: '대외활동', endDate: '2024.02.10', image: '-' },
    { title: 'ㅇㅇ회사', category: '대외활동', endDate: '2024.02.10', image: '-' },
    { title: 'ㅁㅁ기업', category: '대외활동', endDate: '2024.02.10', image: '-' },
    { title: '채용공고', category: '대외활동', endDate: '2024.02.10', image: '-' },
];

const bannerDummy = [
    { image: 'https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004' },
    { image: 'https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13262118&filePath=L2Rpc2sxL25ld2RhdGEvMjAyMC8yMS9DTFMxMDAwNi82MmZhMWExMy03ZjRmLTQ1NWMtYTZlNy02ZTk2YjhjMjBkYTk=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006' },
    { image: '-' },
    { image: '-' },
    { image: '-' }
];


export default function Home() {

    return (
        <Body>
            <Container1>
                <LoginProfileBox></LoginProfileBox>
                <Timeline></Timeline>
            </Container1>
            <Banner banners={bannerDummy} />

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
                {dummyData.slice(0, 4).map((data, index) => (
            <RecommendBox key={index} data={data} />
          ))}
                </ContentBox>
            </Container3>

            <Container4>
                <Label>추천 채용 공고</Label>
                <ContentBox>
                {dummyData.slice(4, 8).map((data, index) => (
            <RecommendBox key={index} data={data} />
          ))}
                </ContentBox>
            </Container4>

        </Body>
    )
}