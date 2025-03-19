import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Title from '../../components/Apply/Title';
import SearchBar from '../../components/Mycareer/shareSearchBar';

import {
	Container,
	SearchBox,
	SearchQueryResultBox,
	SearchQueryResult,
	BackgroundSection,
} from './MycareerSearch.styles';

import MyCareerSearchTotal from '../../components/MyCareerSearch/MyCareerSearchTotal';
import MyCareerSearchView from '../../components/MyCareerSearch/MyCareerSearchView';
import MyCareerSearchActivity from '../../components/MyCareerSearch/MyCareerSearchActivity/MyCareerSearchActivity';
import MyCareerSearchTag from '../../components/MyCareerSearch/MyCareerSearchTag/MyCareerSearchTag';

// 상수 정의
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
