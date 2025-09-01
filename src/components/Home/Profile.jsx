import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../../utils/ga4';
import AddCareerModal from '../Modal/AddCareerModal/AddCareerModal';
import { useUserInfo } from '../../hooks/Home/useUserInfo'; // react-query 사용 코드로 변경
//v2

import {
	Container,
	Top,
	Text,
	BoldText,
	Bottom,
	ActivityBoxContainer,
	ActivityBox,
	ActivityTextBox,
	CenteredTextRow,
	ActivityTitle,
	ActivityNum,
	Button,
} from './Profile.styles';

export default function ProfileBox() {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	//react-query 사용 코드 추가
	const { data: userInfo, isLoading, isError } = useUserInfo();

	if (isLoading) return <div>로딩 중...</div>;
	if (isError || !userInfo) return <div>사용자 정보를 불러오지 못했습니다.</div>;

	const { userName, monthDuration, careerCount, recruitCount } = userInfo;


	/*
	const [userInfo, setUserInfo] = useState({
		userName: '',
		monthDuration: 0,
		careerCount: 0,
		recruitCount: 0,
	});


	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo();
				if (data) {
					setUserInfo({
						userName: data.userName,
						monthDuration: data.monthDuration,
						careerCount: data.careerCount,
						recruitCount: data.recruitCount,
					});
				} else {
					console.error('Failed to fetch user data');
				}
			} catch (err) {
				console.error('Error fetching user info:', err);
			}
		};

		fetchUserInfo();
	}, []);

	const { userName, monthDuration, careerCount, recruitCount } = userInfo;

	*/
	const goCareer = () => {
		window.scrollTo(0, 0);
		navigate('/mycareer');
	};

	const goApply = () => {
		window.scrollTo(0, 0);
		navigate('/apply-status');
	};

	const handleOpenModal = () => {
		setIsModalOpen(true); // 모달 열기
	};

	const handleCloseModal = () => {
		setIsModalOpen(false); // 모달 닫기
	};

	return (
		<>
			<Container>
				<Top>
					<Text>안녕하세요 {userName}님,</Text>
					<CenteredTextRow>
						<BoldText color="#3aaf85">끼적</BoldText>
						<BoldText>한 지 {monthDuration}개월이 지났어요!</BoldText>
					</CenteredTextRow>
				</Top>
				<Bottom>
					<ActivityBoxContainer>
						<ActivityBox>
							<ActivityTextBox onClick={goCareer}>
								<ActivityTitle>내 활동</ActivityTitle>
								<ActivityNum>{careerCount}</ActivityNum>
							</ActivityTextBox>
						</ActivityBox>
						<ActivityBox>
							<ActivityTextBox onClick={goApply}>
								<ActivityTitle>지원현황</ActivityTitle>
								<ActivityNum>{recruitCount}</ActivityNum>
							</ActivityTextBox>
						</ActivityBox>
					</ActivityBoxContainer>
					<Button
						data-coach = "add-activity"
						onClick={() => {
							trackEvent('add_click', {
								category: 'home',
								detail: 'add_career',
								action_type: 'add',
								label: '활동 추가하기',
							});
							handleOpenModal();
						}}>
						활동 추가하기
					</Button>
				</Bottom>
			</Container>
			{/* 모달이 열렸을 때만 렌더링 */}
			{isModalOpen && <AddCareerModal onClose={handleCloseModal} />}
		</>
	);
}