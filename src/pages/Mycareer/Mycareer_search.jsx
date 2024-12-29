import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../../components/Apply/Title';
import SearchBar from '../../components/Mycareer/shareSearchBar';
import { useSearchParams } from 'react-router-dom';
import MyCareerSearchView from '../../components/MyCareerSearch/MyCareerSearchView';
import { useFetchActivity } from '../../hooks/MyCareerSearch/useFetchActivity';
import MyCareerSearchTotal from '../../components/MyCareerSearch/MyCareerSearchTotal';

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
		align-items: flex-start; /* 왼쪽 정렬 */
		height: auto; /* 높이 자동 조정 */
		margin-top: 20px; /* 위쪽 여백 조정 */
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
	margin-bottom: 20px;
	margin-top: 35px;
	box-sizing: border-box;
`;

const SearchQueryResult = styled.h1`
	color: var(--black, #000);
	font-family: Inter;
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

export default function MyCareerSearch() {
	const [searchParams] = useSearchParams();
	const [view, setView] = useState('1');
	const [sortOrder, setSortOrder] = useState('new');

	const searchQuery = searchParams.get('query') || '';

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
			<BackgroundSection>
				{view === '1' && (
					<MyCareerSearchTotal	
						sortOrder={sortOrder}
						searchQuery={searchQuery}
						onViewToggle={setView}></MyCareerSearchTotal>
				)}
				{view === '2' && <MyCareerSearchTotal></MyCareerSearchTotal>}
				{view === '3' && <MyCareerSearchTotal></MyCareerSearchTotal>}
			</BackgroundSection>
		</>
	);
}
