import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ProfileBox from '../components/Home/Profile';

import BannerComponent from '../components/Home/Banner';
import Noti from '../components/Home/Noti';
import CLNoti from '../components/Home/CLNoti';

import LoginProfileBox from '../components/Home/LoginProfileBox';
import LogoutProfileBox from '../components/Home/LogoutProfileBox';
import DeadlineNoti from '../components/Home/DeadlineNoti';
import WritingNoti from '../components/Home/WritingNoti';
import RecommendBox from '../components/Home/RecommendBox';
import TimelineHome from '../components/Home/TimelineHome';
import { useNavigate } from 'react-router-dom';

import CareerTimeline from '../components/Mycareer/CareerTimeline';
import useAuthRedirect from '../stores/useAuthRedirect';
import OnboardingModal from '../components/Modal/OnboardingModal';

const Container = styled.div`
	display: flex;
	height: auto;
	gap: 32px;
	flex-direction: column;
	margin: 48px auto 48px;

	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const Top = styled.div`
	width: 820px;
	height: 160px;
	display: flex;
	gap: 20px;

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
`;

const TopBox2 = styled.div`
	width: 560px;
	height: 160px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: var(--white, #fff);
`;

const Middle = styled.div`
	width: 820px;
	height: 188px;

	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const Bottom = styled.div`
	width: 820px;
	height: 194px;
	display: flex;
	flex-direction: column;
	gap: 16px;

	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const BottomText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const ActivityBox = styled.div`
	width: 810px;
	height: 154px;
	display: flex;
	justify-content: space-between;
`;

const bannerDummy = [
	{
		image: require('../assets/banner/serviceBanner1.png'),
		url: 'https://docs.google.com/forms/d/e/1FAIpQLSfCNlO7_QQR7J3BYHV4tGhkpCyJp4VggIKX1bmBBhs7DYEzWQ/viewform?usp=sharing',
	},
	{ image: require('../assets/banner/main.png'), url: 'https://forms.gle/RuuoXu6DzMz9vpyk6' },
];

export default function Home() {
	return (
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
	);
}
