import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Title from '../../components/Apply/Title';
import SearchBar from '../../components/Mycareer/shareSearchBar';

import MyCareerSearchTotal from '../../components/MyCareerSearch/MyCareerSearchTotal';
import MyCareerSearchView from '../../components/MyCareerSearch/MyCareerSearchView';
import MyCareerSearchActivity from '../../components/MyCareerSearch/MyCareerSearchActivity/MyCareerSearchActivity';
import MyCareerSearchTag from '../../components/MyCareerSearch/MyCareerSearchTag/MyCareerSearchTag';

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	margin: 0 auto;
	background-color: white;
	border-radius: 15px;
	box-sizing: border-box;
`;

const SearchBox = styled.div`
	width: 100%;
	max-width: 820px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	margin-top: 35px;
	box-sizing: border-box;

	@media (max-width: 600px) {
		flex-direction: column; /* 작은 화면에서는 세로로 정렬 */
		align-items: flex-start;
		height: auto;
		margin-top: 20px;
	}
`;

const SearchQueryResultBox = styled.div`
	width: 100%;
	max-width: 820px;
	padding: 0 18px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 32px 0;
	box-sizing: border-box;
`;

const SearchQueryResult = styled.h1`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 28px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const BackgroundSection = styled.div`
	width: 100vw;
	min-height: 80vh;
	background-color: #f0f0f0;
	position: relative;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 20px 0;
`;

// 상수 정의 추가
const VIEW_TYPES = {
	TOTAL: '1',
	ACTIVITY: '2',
	TAG: '3',
};

export default function MyCareerSearch() {
	const [searchParams] = useSearchParams();
	const [view, setView] = useState(VIEW_TYPES.TOTAL);
	const [sortOrder, setSortOrder] = useState('new');

	const searchQuery = searchParams.get('query') || '';

	// 공통 props 객체 생성
	const commonProps = {
		sortOrder,
		searchQuery,
		onViewToggle: setView,
	};

	// 현재 뷰에 따른 컴포넌트 선택 로직
	const renderCurrentView = () => {
		switch (view) {
			case VIEW_TYPES.TOTAL:
				return <MyCareerSearchTotal {...commonProps} />;
			case VIEW_TYPES.ACTIVITY:
				return <MyCareerSearchActivity {...commonProps} />;
			case VIEW_TYPES.TAG:
				return <MyCareerSearchTag {...commonProps} />;
			default:
				return <MyCareerSearchTotal {...commonProps} />;
		}
	};

	return (
		<>
			<Container>
				<SearchBox>
					<Title>내커리어</Title>
					<SearchBar initialSearchQuery={searchQuery} />
				</SearchBox>
				<SearchQueryResultBox>
					<SearchQueryResult>'{searchQuery}' 검색 결과</SearchQueryResult>
				</SearchQueryResultBox>
				<MyCareerSearchView view={view} onViewToggle={setView} sortOrder={sortOrder} onSortToggle={setSortOrder} />
			</Container>
			<BackgroundSection>{renderCurrentView()}</BackgroundSection>
		</>
	);
}
