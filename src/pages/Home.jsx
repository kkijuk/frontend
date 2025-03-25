import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ProfileBox from '../components/Home/Profile';

import BannerComponent from '../components/Home/Banner';
import Noti from '../components/Home/Noti';
import CLNoti from '../components/Home/CLNoti';

import RecommendBox from '../components/Home/RecommendBox';
import { useNavigate } from 'react-router-dom';

import CareerTimeline from '../components/Mycareer/CareerTimeline';
import useAuthRedirect from '../stores/useAuthRedirect';
import OnboardingModal from '../components/Modal/OnboardingModal';
import { theme } from '../constants/theme';

const Container = styled.div`
	display: flex;
	height: auto;
	gap: 32px;
	flex-direction: column;
	margin: 48px auto 48px;
	width: 100%; /*얘랑 아랫줄 추가*/
	max-width: 820px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		margin: 24px auto 24px;
	}
	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const Top = styled.div`
	width: 100%;
	max-width: 820px;
	height: auto; /*160*/
	display: flex;
	gap: 20px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;

		flex-direction: column;
		align-items: center;
	}

	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const TopBox1 = styled.div`
	display: flex;
	width: 240px;
	height: 160px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 368px;
		padding: 20px 0px;
	}
`;

const TopBox2 = styled.div`
	width: 560px;
	height: 160px;
	flex-shrink: 0;
	border-radius: 10px;
	/*border: 1px solid var(--gray-03, #d9d9d9); 수정*/
	background: var(--white, #fff);
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		/*width: 368px;*/ // ✅ TopBox1과 맞춰주기
		width: 100%;
		max-width: 560px;
		min-width: 368px;
	}
`;

const Middle = styled.div`
	width: 820px;
	height: 188px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}

	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const Bottom = styled.div`
	width: 820px;
	height: auto; /*194*/
	display: flex;
	flex-direction: column;
	gap: 16px;

	/*border: 1px solid black;
	box-sizing: border-box;*/
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		align-items: center; /*가운데 정렬 */
	}
`;

const BottomText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	/*align-self: flex-start;무조건 왼쪽 붙이려면 필요함*/
`;

const ActivityBox = styled.div`
	width: 820px;
	height: auto; /*194*/
	display: flex;
	justify-content: space-between;
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		display: flex;
		gap: 16px;
		flex-direction: column;
		align-items: center; /* 가운데 정렬 */
	}

	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const bannerDummy = [
	{
		image: require('../assets/banner/serviceBanner1.png'),
		url: 'https://docs.google.com/forms/d/e/1FAIpQLSfCNlO7_QQR7J3BYHV4tGhkpCyJp4VggIKX1bmBBhs7DYEzWQ/viewform?usp=sharing',
	},
	{ image: require('../assets/banner/main.png'), url: 'https://forms.gle/RuuoXu6DzMz9vpyk6' },
];

export default function Home() {
	const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
	const [showOnboarding, setShowOnboarding] = useState(false);

	//localStorage를 확인해서 오늘은 모달을 보이지 않도록 처리
	useEffect(() => {
		const lastClosedDate = localStorage.getItem('hideOnboardingModal');
		const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)

		if (lastClosedDate !== today) {
			setShowOnboarding(true); // 오늘 처음 방문하면 모달 표시
		}
	}, []);

	//모달 닫기 함수
	const handleCloseOnboarding = () => {
		setShowOnboarding(false);
	};

	return (
		<>
			{showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}

			<Container>
				<Top>
					<TopBox1>
						<ProfileBox></ProfileBox>
					</TopBox1>
					<TopBox2>
						<CareerTimeline />
					</TopBox2>
				</Top>
				<Middle>
					<BannerComponent banners={bannerDummy} />
				</Middle>
				<Bottom>
					<BottomText>잠깐! 잊지 않으셨죠?</BottomText>
					<ActivityBox>
						<Noti></Noti>
						<CLNoti></CLNoti>
					</ActivityBox>
				</Bottom>
			</Container>
		</>
	);
}
