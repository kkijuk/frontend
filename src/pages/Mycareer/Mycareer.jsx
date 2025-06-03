import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { trackEvent } from '@utils/ga4';
import useAuthRedirect from '@stores/useAuthRedirect';

import Title from '@components/Apply/Title';
import CareerView from '@components/Mycareer/CareerView';
import CareerViewYear from '@components/Mycareer/CareerViewYear';
import CareerViewCategory from '@components/Mycareer/CareerViewCategory';
import AddCareerModal from '@components/Modal/AddCareerModal/AddCareerModal';
import SearchBar from '@components/Mycareer/shareSearchBar';
import CareerTimeline from '@components/Mycareer/CareerTimeline';
import AddActivityButton from '@components/Mycareer/AddActivityButton';
import { useFetchMycareerActivity } from '@hooks/Mycareer/useFetchMycareerActivity';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import { Container, BackgroundSection, SearchBox } from './Mycareer.styles';

// 메모이제이션 컴포넌트 생성
const MemoizedCareerViewYear = React.memo(CareerViewYear);
const MemoizedCareerViewCategory = React.memo(CareerViewCategory);
const MemoizedCareerView = React.memo(CareerView);
const MemoizedCareerTimeline = React.memo(CareerTimeline);
const MemoizedAddActivityButton = React.memo(AddActivityButton);

export default function Mycareer() {
	useAuthRedirect();

	const [view, setView] = useState('year');
	const [showModal, setShowModal] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0); // fetch 트리거 키
	const navigate = useNavigate();

	const { data: careers, isLoading, error } = useFetchMycareerActivity(view, refreshKey);

	// Mock data
	// const isLoading = false;
	// const careers = mycareerMock;

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
				
				{/* 활동 추가/삭제 성공 시 refreshKey를 증가시켜서 서버 fetch를 트리거 */}
				{showModal && <AddCareerModal onClose={handleCloseModal} onRefresh={()=>setRefreshKey(prev => prev+1)}/>}
			</Container>

			<BackgroundSection>
				{isLoading ? <LoadingSpinner message="로딩 중입니다..." /> : careerViewComponent}
			</BackgroundSection>
		</>
	);
}
