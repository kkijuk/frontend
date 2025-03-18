import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
		padding-left: 10px
		margin-top: 20px; /* 위쪽 여백 조정 */
	}
`;

// 메모이제이션된 컴포넌트 생성
const MemoizedCareerViewYear = React.memo(CareerViewYear);
const MemoizedCareerViewCategory = React.memo(CareerViewCategory);
const MemoizedCareerView = React.memo(CareerView);
const MemoizedCareerTimeline = React.memo(CareerTimeline);
const MemoizedAddActivityButton = React.memo(AddActivityButton);

export default function Mycareer() {
	useAuthRedirect();

	const [view, setView] = useState('year');
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const { data: careers, isLoading, error } = useFetchMycareerActivity(view);

	console.log(careers);

	const handleSearchClick = useCallback(() => {
		navigate('/Mycareer_search');
	}, [navigate]);

	const handleAddActivityClick = useCallback(() => {
		trackEvent('add_click', {
			category: 'mycareer',
			detail: 'add_career',
			action_type: 'add',
			label: '활동 추가',
		});

		setShowModal(true);
	}, []);

	const handleToggleView = useCallback((newView) => {
		setView(newView);
	}, []);

	const handleCloseModal = useCallback(() => {
		setShowModal(false);
	}, []);

	// 조건부 렌더링을 위한 컴포넌트 메모이제이션
	const careerViewComponent = useMemo(() => {
		return view === 'year' ? (
			<MemoizedCareerViewYear data={careers?.data.data} />
		) : (
			<MemoizedCareerViewCategory data={careers?.data.data} />
		);
	}, [view, careers?.data.data]);

	return (
		<>
			<Container>
				<SearchBox>
					<Title>내커리어</Title>
					<SearchBar onClick={handleSearchClick} />
				</SearchBox>

				<MemoizedCareerTimeline />
				<MemoizedCareerView view={view} onToggle={handleToggleView} />
				<MemoizedAddActivityButton onClick={() => setShowModal(true)} data={careers?.data.data} />

				{showModal && <AddCareerModal onClose={handleCloseModal} />}
			</Container>
			<BackgroundSection>
				{isLoading ? <LoadingSpinner message="로딩 중입니다..." /> : careerViewComponent}
			</BackgroundSection>
		</>
	);
}
