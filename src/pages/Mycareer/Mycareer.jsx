import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Title from '../../components/Apply/Title';
import CareerView from '../../components/Mycareer/CareerView';
import CareerViewYear from '../../components/Mycareer/CareerViewYear';
import CareerViewCategory from '../../components/Mycareer/CareerViewCategory';
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';
import SearchBar from '../../components/Mycareer/shareSearchBar';
import CareerTimeline from '../../components/Mycareer/CareerTimeline';
import useAuthRedirect from '../../stores/useAuthRedirect';
import AddActivityButton from '../../components/Mycareer/AddActivityButton';
import { trackEvent } from '../../utils/ga4';
import { useFetchMycareerActivity } from '../../hooks/Mycareer/useFetchMycareerActivity';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	margin: 0 auto;
	background-color: white;
	border-radius: 15px;
	box-sizing: border-box;
`;

const BackgroundSection = styled.div`
	width: 100vw;
	min-height: 100vh;
	background-color: #f0f0f0;
	position: relative;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 20px 0;
`;

const SearchBox = styled.div`
	width: 100%;
	max-width: 820px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	margin-top: 35px;
	box-sizing: border-box;

	@media (max-width: 600px) {
		flex-direction: column; /* 작은 화면에서는 세로로 정렬 */
		align-items: flex-start; /* 왼쪽 정렬 */
		height: auto; /* 높이 자동 조정 */
		margin-top: 20px; /* 위쪽 여백 조정 */
	}
`;

export default function Mycareer() {
	useAuthRedirect();

	const [view, setView] = useState('year');
	const [showModal, setShowModal] = useState(false);
	// const [_, setTriggerEffect] = useState(false);
	const navigate = useNavigate();

	const { data: careers, isLoading, error } = useFetchMycareerActivity(view);

	const handleAddCareer = () => {
		// fetchData();
		// setTriggerEffect((prev) => !prev);
	};

	const handleSearchClick = () => {
		navigate('/Mycareer_search'); // 원하는 경로로 페이지 이동
	};

	const handleAddActivityClick = () => {
		trackEvent('add_click', {
			category: 'mycareer',
			detail: 'add_career',
			action_type: 'add',
			label: '활동 추가',
		});

		setShowModal(true);
	};

	return (
		<>
			<Container>
				<SearchBox>
					<Title>내커리어</Title>
					<SearchBar onClick={handleSearchClick} />
				</SearchBox>

				<CareerTimeline />
				<CareerView view={view} onToggle={setView} />
				<AddActivityButton onClick={() => setShowModal(true)} data={careers} />

				{showModal && <AddCareerModal onClose={() => setShowModal(false)} onSave={handleAddCareer} />}
			</Container>
			<BackgroundSection>
				{isLoading ? (
					<LoadingSpinner message="로딩 중입니다..." />
				) : view === 'year' ? (
					<CareerViewYear data={careers?.data.data} />
				) : (
					<CareerViewCategory data={careers?.data.data} />
				)}
			</BackgroundSection>
		</>
	);
}
