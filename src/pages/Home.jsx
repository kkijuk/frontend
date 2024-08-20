import React from 'react';
import styled from 'styled-components';
import LoginProfileBox from '../components/Home/LoginProfileBox';
import LogoutProfileBox from '../components/Home/LogoutProfileBox';
import Banner from '../components/Home/Banner';
import DeadlineNoti from '../components/Home/DeadlineNoti';
import WritingNoti from '../components/Home/WritingNoti';
import RecommendBox from '../components/Home/RecommendBox';
import TimelineHome from '../components/Home/TimelineHome';
import { useAuth } from '../components/AuthContext';  

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
    { title: 'IT 연합 사이드 프로젝트 동아리 UMC 7기 부원 모집', category: '동아리', endDate: '2024.09.15까지', image: 'https://i.ibb.co/R43nbpp/image.png', url: 'https://www.makeus.in/umc' },
    { title: '2024 NH투자증권 빅데이터 경진대회 (~10/11)', category: '공모전/대회', endDate: '2024.10.11까지', image: 'https://i.ibb.co/6FRvK0F/415409-2.png', url: 'https://link.mynamuhbegin.com/dgoe33' },
    { title: '[매일경제] 대학생 서포터즈 14기 모집', category: '대외활동', endDate: '2024.09.18까지', image: 'https://i.ibb.co/N9tkFXz/413647-2-1.png', url: 'https://www.mk.co.kr/'},
    { title: '게임프로그래머 실무자양성과정 직업훈련', category: '교육', endDate: '2024.09.30까지', image: 'https://i.ibb.co/pvvzFTs/image-2238.png', url: 'https://futureyou.modoo.at/?link=b99wuqf9' },
    { title: '[끼적] iOS개발 채용전환형 인턴 모집(이면 좋겠다)', category: '인턴', endDate: '2024.08.23까지', image: 'https://i.ibb.co/qgsgtdP/Frame-236.png', url: 'https://www.instagram.com/kki.juk/' },
    { title: '[캐시워크] 서비스기획 채용전환형 인턴', category: '인턴', endDate: '2024.09.02까지', image: 'https://i.ibb.co/h9BKzSR/Frame-236-1.png', url: 'https://cashwalk.com/' },
    { title: '[애플코리아] Data Analyst Internship - Korea Finance', category: '인턴', endDate: '채용 시 마감', image: 'https://i.ibb.co/K2L6HJ8/Frame-237.png', url: 'https://www.apple.com/kr/' },
    { title: '[펄어비스] QA Beginner 인턴 모집', category: '인턴', endDate: '2024.08.26까지', image: 'https://i.ibb.co/94ttcmT/Frame-238.png', url: 'https://www.pearlabyss.com/ko-KR/Company/Careers/NoticeDetail?_masterNo=32' },
];

const bannerDummy = [
    { image: 'https://i.ibb.co/hXPctnH/Frame-241.png', url: 'https://www.instagram.com/kki.juk/' },
    { image: 'https://i.ibb.co/BgYmmv7/Frame-242.png', url: 'https://forms.gle/y3VPjQaWBbVyegwk7' },
    { image: 'https://i.ibb.co/Y8HdHQH/Frame-243.png', url: '' },
];


export default function Home() {
    const { isLoggedIn } = useAuth();  

    return (
        <Body>
            <Container1>
                {isLoggedIn ? <LoginProfileBox /> : <LogoutProfileBox />}
                <TimelineHome></TimelineHome>
            </Container1>
            <Banner banners={bannerDummy} />

            <Container2>
                <Label>잠깐! 잊지 않으셨죠?</Label>
                <ContentBox>
                    <DeadlineNoti />
                    <WritingNoti />
                </ContentBox>
            </Container2>

            <Container3>
                <Label>추천 활동 공고</Label>
                <ContentBox>
                    {dummyData.slice(0, 4).map((data, index) => (
                        <RecommendBox key={index} data={data} url={data.url} />
                    ))}
                </ContentBox>
            </Container3>

            <Container4>
                <Label>추천 채용 공고</Label>
                <ContentBox>
                    {dummyData.slice(4, 8).map((data, index) => (
                        <RecommendBox key={index} data={data} url={data.url} />
                    ))}
                </ContentBox>
            </Container4>
        </Body>
    );
}
