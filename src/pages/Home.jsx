import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ProfileBox from '../components/Home/Profile';
import LoginProfileBox from '../components/Home/LoginProfileBox';
import LogoutProfileBox from '../components/Home/LogoutProfileBox';
import BannerComponent from '../components/Home/Banner';
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
	gap: 32px;
	flex-direction: column;

	border: 1px solid black;
	box-sizing: border-box;
`;

const Top = styled.div`
	width: 820px;
	height: 160px;
	display: flex;
	gap: 20px;

	border: 1px solid black;
	box-sizing: border-box;
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
	height: 160px;

	border: 1px solid black;
	box-sizing: border-box;
`;

const Bottom = styled.div`
	width: 820px;
	height: 160px;
	display: flex;
	gap: 16px;

	border: 1px solid black;
	box-sizing: border-box;
`;

export default function Home() {
	return (
		<Container>
			<Top>
				<TopBox1>
					<ProfileBox></ProfileBox>
				</TopBox1>
				<TopBox2></TopBox2>
			</Top>
			<Middle>타임라인이 아니라 배너</Middle>
			<Bottom>대시보드</Bottom>
		</Container>
	);
}
