import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchRecruitList } from '../../api/Apply/RecruitSearch';
import SearchList from './SearchList';
import SearchIcon from '../../assets/search.svg';  
import { Link } from 'react-router-dom';
import SvgIconBefore from '../../assets/before.svg';

const Container = styled.div`
	padding: 24px 40px;
	background-color: white;
	border-radius: 15px;
	max-width: 850px;
	margin: 0 auto;
`;

const SortOptionButton = styled.button`
	padding: 5px 10px;
	background: none;
	border: none;
	color: ${(props) => (props.active ? 'black' : '#E0E0E0')};
	cursor: pointer;
	font-family: medium;
	margin-bottom: 9px;
`;

const TabMenuStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0px;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: #F1F1F1;
	}

	div {
		margin-top: 60px;
	}
`;

const TabButton = styled.button`
	padding: 10px 20px;
	border: none;
	background: none;
	cursor: pointer;
	justify-content: flex-start;
	color: ${(props) => (props.active ? 'black' : '#E0E0E0')};
	font-family: 'Bold';
	font-size: 18px;
	font-weight: 700;
	padding-left: 10px;  
`;

const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	padding: 10px 20px;
	border-radius: 12px;
	margin-bottom: 10px;
	margin-left: 150px;
`;

const SearchInput = styled.input`
	width: 525px;
	border: none;
	background: none;
	outline: none;
	font-size: 16px;
	color: #707070;
	margin-left: 10px;
`;

const BackLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	color: black;
	font-size: 16px;
	font-weight: 500;
	margin-bottom: 20px;
	text-decoration: none;
	margin-left: 20px;
`;

const SortButtonsContainer = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`;

const ResultsContainer = styled.div`
	margin-top: 0px;
`;

const Title = styled.h1`
	color: var(--black, #000);
	font-family: 'Bold';
	font-size: 30px;
	font-weight: 700;
	margin-top: 11px;
	width: 820px;
	margin-left: 18px;
`;

const SearchButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0; 
`;

const SearchResultsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-left: 10px; 
	margin-top: 10px; 
	top: 15px;
`;

const SearchResultsTitle = styled.h2`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 24px;
	font-weight: 700;
	line-height: normal;
	position: relative;
	top: -50px; 
`;

const FilterPage = () => {
	const [recruits, setRecruits] = useState([]); 
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('latest');
	const [activeTab, setActiveTab] = useState('전체'); 
	const [isSearchClicked, setIsSearchClicked] = useState(false);

	const fetchSearchResults = async () => {
		try {
			const { recruitResult, reviewResult } = await fetchRecruitList(searchTerm); 
			console.log('API Response:', { recruitResult, reviewResult });
	
			let filteredRecruits = recruitResult || [];
			let filteredReviews = reviewResult || [];
	
			if (activeTab === '공고') {
				filteredRecruits = filteredRecruits.filter((recruit) => 
					recruit.recruitTitle.includes(searchTerm)
				);
				setRecruits(filteredRecruits);
			} else if (activeTab === '공고후기') {
				filteredReviews = filteredReviews.filter((review) => 
					review.recruitTitle.includes(searchTerm)
				);
				setRecruits(filteredReviews);
			} else if (activeTab === '전체') {
				filteredRecruits = filteredRecruits.filter((recruit) => 
					recruit.recruitTitle.includes(searchTerm)
				);
				filteredReviews = filteredReviews.filter((review) => 
					review.recruitTitle.includes(searchTerm)
				);
				setRecruits([...filteredRecruits, ...filteredReviews]);
			}
	
			if (sortOrder === 'latest') {
				filteredRecruits.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
				filteredReviews.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
			} else if (sortOrder === 'oldest') {
				filteredRecruits.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
				filteredReviews.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
			}
		} catch (error) {
			console.error('Error fetching recruit list:', error);
		}
	};
	
	const handleSearchClick = () => {
		setIsSearchClicked(true);  
		fetchSearchResults(); 
	};
	
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<Container>
			<Title>지원관리</Title>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<BackLink to="/apply-status">
					<img src={SvgIconBefore} alt="Back" width={20} height={13} />
					지원현황
				</BackLink>
				<SearchBarContainer>
					<SearchInput
						placeholder="공고 이름이나 태그를 검색하세요."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<SearchButton onClick={handleSearchClick}>
						<img src={SearchIcon} alt="Search" width={20} height={20} />
					</SearchButton>
				</SearchBarContainer>
			</div>

			<TabMenuStyled>
				{isSearchClicked &&  (
					<SearchResultsContainer>
						<SearchResultsTitle>
							‘{searchTerm}’ 검색 결과
						</SearchResultsTitle>
					</SearchResultsContainer>
				)}
				<div>
					<TabButton active={activeTab === '전체'} onClick={() => handleTabClick('전체')}>
						전체
					</TabButton>
					<TabButton active={activeTab === '공고'} onClick={() => handleTabClick('공고')}>
						공고
					</TabButton>
					<TabButton active={activeTab === '공고후기'} onClick={() => handleTabClick('공고후기')}>
						공고후기
					</TabButton>
				</div>
				<SortButtonsContainer>
					<SortOptionButton active={sortOrder === 'latest'} onClick={() => setSortOrder('latest')}>
						최신순
					</SortOptionButton>
					<SortOptionButton active={sortOrder === 'oldest'} onClick={() => setSortOrder('oldest')}>
						오래된순
					</SortOptionButton>
				</SortButtonsContainer>
			</TabMenuStyled>

			<ResultsContainer>
				<SearchList recruits={recruits} />
			</ResultsContainer>
		</Container>
	);
};

export default FilterPage;
