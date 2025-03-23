import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from '../../api/Home/getUserInfo';
import { trackEvent } from '../../utils/ga4';
import AddCareerModal from '../Modal/AddCareerModal/AddCareerModal';
//v2
const Container = styled.div`
	width: 220px;
	height: 138px;
	display: flex;
	gap: 9px;
	flex-direction: column;
`;

const Top = styled.div`
	display: flex;
	flex-direction: column; /*세로배치 위해서 display 속성에 추가*/
`;

const Text = styled.div`
	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const BoldText = styled.div`
	color: ${(props) => props.color || 'var(--black, #000)'};
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	display: inline;
`;

const Bottom = styled.div`
	width: 220px;
	height: 92px;
	display: flex;
	gap: 12px;
	flex-direction: column; /*세로배치 위해서 display 속성에 추가*/
`;

const ActivityBoxContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ActivityBox = styled.div`
	display: flex;
	width: 105px;
	height: 50px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);
`;

const ActivityTextBox = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const ActivityTitle = styled.div`
	align-self: stretch;
	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const ActivityNum = styled.div`
	align-self: stretch;
	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Button = styled.button`
	display: inline-flex;
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	border: none;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);

	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export default function ProfileBox() {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

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
					<span>
						<BoldText color="#3aaf85">끼적</BoldText>
						<BoldText>한 지 {monthDuration}개월이 지났어요!</BoldText>
					</span>
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
