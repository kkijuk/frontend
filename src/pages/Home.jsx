import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '@/Axios';

import { AddDetail } from '@/api/Mycareer/AddDetail';
import getColorByCategory from '@/utils/getColorByCategory';
import ProfileBox from '../components/Home/Profile';
import { getRecentCareerDetails } from '@/api/Home/getRecentCareerDetails';
import BannerComponent from '../components/Home/Banner';
import Noti from '../components/Home/Noti';
import CLNoti from '../components/Home/CLNoti';

import { useNavigate } from 'react-router-dom';

import CareerTimeline from '../components/Mycareer/CareerTimeline';
import OnboardingModal from '../components/Modal/OnboardingModal';
import AddQuickCareerDetailModal from '@/components/Modal/AddQuickCareerDetailModal/AddQuickCareerDetailModal';
import SvgIcon from '@/components/shared/SvgIcon';
import { theme } from '../constants/theme';
import { Color } from '@/constants/color';

import {
	Container,
	Top,
	TopBox1,
	TopBox2,
	Middle,
	Bottom,
	BottomText,
	CareerDeatailWrapper,
	CareerDetailContentBox,
	AddCareerDetailBox,
	CareerDetailBox,
	ActivityBox,
	AddButton,
} from './Home.styles';


const bannerDummy = [
	{
		image: require('../assets/banner/banner1.png'),
	},
	{
		image: require('../assets/banner/banner2.png'),
		url: 'https://docs.google.com/forms/d/e/1FAIpQLSfCNlO7_QQR7J3BYHV4tGhkpCyJp4VggIKX1bmBBhs7DYEzWQ/viewform?usp=sharing',
	},
];

export default function Home() {
	const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

	const [showOnboarding, setShowOnboarding] = useState(false); // 온보딩 모달 상태
	const [showAddQuickCareerDetailModal, setShowAddQuickCareerDetailModal] = useState(false); // 빠른 활동 기록 추가 모달 상태

	const [recentCareerDetails, setRecentCareerDetails] = useState([]);

	// [useQuery]] 최근 활동 기록 가져오기
	// [useQuery] 빠른 활동 기록 추가 후 최근 활동 기록 업데이트

	// 빠른 활동 기록 추가
	const handleSaveQuickCareerDetail = async (careerId, data) => {
		try {
			const response = await AddDetail(careerId, data);
			console.log('활동 기록 추가 성공:', response.data);
			setShowAddQuickCareerDetailModal(false);
			fetchRecentCareerDetails();
		} catch (error) {
			console.error('활동 기록 추가 실패:', error);
		}
	};

	//localStorage를 확인해서 오늘은 온보딩 모달을 보이지 않도록 처리
	useEffect(() => {
		const lastClosedDate = localStorage.getItem('hideOnboardingModal');
		const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)

		if (lastClosedDate !== today) {
			setShowOnboarding(true); // 오늘 처음 방문하면 모달 표시
		}
	}, []);

	// 온보딩 모달 닫기 함수
	const handleCloseOnboarding = () => {
		setShowOnboarding(false);
	};

	// 빠른 활동 기록 추가 모달 닫기 함수
	const handleCloseAddQuickCareerDetailModal = () => {
		setShowAddQuickCareerDetailModal(false);
	};

	const fetchRecentCareerDetails = async () => {

		try {
			const data = await getRecentCareerDetails();
			setRecentCareerDetails(data);
			console.log(data);
		} catch (error) {
			console.error('최근 활동 기록 가져오기 실패:', error);
		}
	};

	useEffect(() => {
		fetchRecentCareerDetails();

		const lastClosedDate = localStorage.getItem('hideOnboardingModal');
		const today = new Date().toISOString().split('T')[0];
		if (lastClosedDate !== today) {
			setShowOnboarding(true);
		}
	}, []);

	const startTour = () => {
		const tour = getCoachmark("home");
		tour?.drive();
	}

	return (
		<>
			{showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}
			{showAddQuickCareerDetailModal && (
				<AddQuickCareerDetailModal
					onClose={handleCloseAddQuickCareerDetailModal}
					onSave={(careerId, data) => handleSaveQuickCareerDetail(careerId, data)}
				/>
			)}
			<Container>
				<Middle>
					<BannerComponent banners={bannerDummy} />
				</Middle>
				{/* Middle 컴포넌트 위치 바꿈*/}
				<Top>
					<TopBox1>
						<ProfileBox />
					</TopBox1>
					<TopBox2>
						<CareerTimeline />
					</TopBox2>
				</Top>

				<Bottom>
					<BottomText>최근 이런 활동을 기록했어요</BottomText>
					<CareerDeatailWrapper>
						<AddCareerDetailBox 
							data-coach = "add-careerDetail"
							onClick={() => setShowAddQuickCareerDetailModal(true)}
						>
							<AddButton>
								<SvgIcon name="addButton" size={18} color={Color.white} />
							</AddButton>
						</AddCareerDetailBox>

						{recentCareerDetails.map((activity, index) => (
						<CareerDetailBox key={index}>
							{/* 카테고리 */}
							<CategoryRow>
							<CategoryLeft>
								<CategoryDot color={getColorByCategory(activity.category?.categoryKoName)} />

								<CategoryName>{activity.category?.categoryKoName || '카테고리 없음'}</CategoryName>
							</CategoryLeft>
							</CategoryRow>

							{/* 제목 + 날짜 */}
							<TitleRow>
							<DetailTitle>{activity.detailTitle}</DetailTitle>
							<DetailDate>
								{activity.detailStartDate} ~ {activity.detailEndDate}
							</DetailDate>
							</TitleRow>

							{/* 본문 */}
							<DetailContent>{activity.detailContent}</DetailContent>

							{/* 태그 */}
							<TagList>
							{activity.tags.map((tag, idx) => (
								<Tag key={idx}>{tag.tagName}</Tag>
							))}
							</TagList>
						</CareerDetailBox>
						))}
					</CareerDeatailWrapper>
				</Bottom>

				<Bottom>
					<BottomText>잠깐! 잊지 않으셨죠?</BottomText>
					<ActivityBox data-coach="noti-at-home">
						<Noti />
						<CLNoti />
					</ActivityBox>
				</Bottom>

				{/* <TourBtn onClick={startTour}>투어 시작하기</TourBtn> */}
			</Container>
		</>
	);
}
