import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fetchRecruitList } from '../../api/Apply/RecruitSearch';
import SearchList from './SearchList';
import SearchIcon from '../../assets/search.svg';  
import { Link } from 'react-router-dom';
import SvgIconBefore from '../../assets/before.svg';
import Layout from '../../components/Layout'; 
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../../utils/ga4';

const Container = styled.div`
  padding: 24px 40px;
  background-color: white;
  border-radius: 15px;
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		width: 350px;
		 margin: 0 auto;      
    position: static;     
    right: unset;  
	}
`;


const SortOptionButton = styled.button`
    padding: 5px 10px;
    background: none;
    border: none;
    color: ${(props) => (props.active ? 'black' : '#E0E0E0')};
    cursor: pointer;
    font-family: medium;
    margin-bottom: 9px;
    margin-left: auto; 
`;


const TabMenuStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;

  div.tab-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const SearchResultsContainer = styled.div`
  margin-left: 10px;
  margin-top: 50px;
  flex-grow: 1;
  max-height: 0px; 
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 700px;
  margin-left: -90px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {      
    position: static;     
    right: unset;  
	left: unset;
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
	padding-left: 0px;  
`;

const TopBar = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		flex-direction: column;
		width: 350px;
		 margin: 0 auto;       
    position: static;     
    right: unset;  
	}
`;


const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	padding: 10px 20px;
	border-radius: 12px;
	margin-bottom: 10px;
	margin-left: 140px;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-left: 0;
        width: 340px;
	}
`;

const SearchInput = styled.input`
	width: 525px;
	border: none;
	background: none;
	outline: none;
	font-size: 16px;
	color: #707070;
	margin-left: 20px;
@media (max-width: ${({ theme }) => theme.breakpoints.md}) {

		width: 300px;
		 margin: 0 auto;      
    position: static;     
    right: unset;  
	}
`;

const BackLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	color: black;
	font-size: 16px;
	font-weight: 500;
	margin-bottom: 5px;
	text-decoration: none;
	margin-left: 0px;
	white-space: nowrap;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		width: 350px;
		margin-left: -40px;
	}
`;

const SortButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end; 
    position: relative; 
	margin-right: -105px;
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
const DividerWrapper = styled.div`
 
  justify-content: center;
`;

const Divider = styled.div`
  height: 4px;
  background-color: #F1F1F1;
  margin-top: 0px; 
  width: 820px;
  position: relative;
  align-items: center;
  right: 13px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 375px;
	margin: 0 auto;
	right: 0;
    justify-content: center;
    right: -15px;
  }
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
    const [searchTerm, setSearchTerm] = useState(''); // 입력 중인 검색어
    const [displayedTerm, setDisplayedTerm] = useState(''); // 화면에 표시되는 검색어
    const [sortOrder, setSortOrder] = useState('latest');
    const [activeTab, setActiveTab] = useState('전체');
    const [isSearchClicked, setIsSearchClicked] = useState(false);

	const previousRecruits = useRef([]);
	const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tagFromURL = queryParams.get('tag');
	const searchQuery = queryParams.get('query');
	const [isTagSearch, setIsTagSearch] = useState(false);

	const fetchSearchResults = async (term) => {
		if (!term.trim()) return; // 빈 검색어일 경우 실행 안 함
	
		try { 
			const { recruitResult, reviewResult } = await fetchRecruitList(term);
	
			let filteredRecruits = recruitResult || [];
			let filteredReviews = reviewResult || [];
	
			//  검색어가 공고 제목 또는 태그에 포함될 경우 필터링
			filteredRecruits = filteredRecruits.filter((recruit) => 
				recruit.recruitTitle.includes(term) || 
				(recruit.tags && recruit.tags.some(tag => tag.includes(term))) // 태그에도 검색 적용
			);
	
			//  검색어가 공고후기 제목에 포함될 경우 필터링
			filteredReviews = filteredReviews.filter((review) => 
				review.recruitTitle.includes(term) || 
				(review.reviews && review.reviews.some(r => r.reviewTitle.includes(term))) // 후기 제목도 검색
			);
			let finalResults = [];
			if (activeTab === '전체') {
				finalResults = [...filteredRecruits, ...filteredReviews]; // 공고 + 후기
			} else if (activeTab === '공고') {
				finalResults = filteredRecruits; // 공고만
			} else if (activeTab === '공고후기') {
				finalResults = filteredReviews; // 후기만
			}
	
			setRecruits(finalResults);
	
		} catch (error) {
			console.error('Error fetching recruit list:', error);
		}
	};
	
	
	
	const handleSearchClick = () => {
		if (searchTerm.trim()) {
			// GA 트래킹 추가 (검색 버튼 클릭)
			trackEvent('search_performed', {
				category: 'apply',
				detail: 'search_recruit',
				action_type: 'search',
				label: '검색',
				search_query: searchTerm, // 검색어 전달
			});
	
			setIsSearchClicked(true); // 검색 버튼을 눌렀을 때만 true로 변경
			setDisplayedTerm(searchTerm);
			fetchSearchResults(searchTerm);
		}
	};
		
	
	const handleTabClick = (tab) => {
		setActiveTab(tab);
		fetchSearchResults(searchTerm); // 선택한 탭에 맞게 검색 결과를 다시 가져옴
	};
	

	const handleSortChange = (order) => {
		setSortOrder(order);
		setRecruits((prevRecruits) => {
			return [...prevRecruits].sort((a, b) => {
				return order === 'latest'
					? new Date(b.endTime) - new Date(a.endTime) // 최신순
					: new Date(a.endTime) - new Date(b.endTime); // 오래된순
			});
		});
	};

	useEffect(() => {
		if (isSearchClicked) {
			fetchSearchResults(searchTerm);
		}
	}, [activeTab]); // activeTab 변경될 때마다 실행
	

	  useEffect(() => {
		setRecruits((prevRecruits) => {
			return [...prevRecruits].sort((a, b) => {
				return sortOrder === 'latest'
					? new Date(b.endTime) - new Date(a.endTime) // 최신순
					: new Date(a.endTime) - new Date(b.endTime); // 오래된순
			});
		});
	}, [sortOrder]);
	
	  useEffect(() => {
        // 이전 검색 결과와 비교
        const changes = recruits.filter(
            (newRecruit) =>
                !previousRecruits.current.some(
                    (oldRecruit) => oldRecruit.id === newRecruit.id
                )
        );
        previousRecruits.current = recruits;

        // 변경된 항목만 처리
        if (changes.length > 0) {
            console.log('Updated results:', changes);
        }
    }, [recruits]);

	useEffect(() => {
		// 태그 검색인 경우
		if (tagFromURL) {
			setSearchTerm(tagFromURL);
			setIsSearchClicked(true);
			fetchSearchResults(tagFromURL);
		}
	
		// 일반 검색인 경우
		if (searchQuery) {
			setSearchTerm(searchQuery);
			setIsSearchClicked(true);
			fetchSearchResults(searchQuery);
		}
	}, [tagFromURL, searchQuery]); 
	
	useEffect(() => {
		if (isTagSearch && searchTerm) {
			handleSearchClick();
			setIsTagSearch(false); //  한 번 실행 후 다시 false로 설정 (중복 실행 방지)
		}
	}, [searchTerm]); //  searchTerm이 변경될 때 실행
	  

	return (
		<Container>
			<Layout >
			<div style={{ display: 'flex', alignItems: 'center' }}>
			<TopBar>
				<BackLink to="/apply-status">
					<img src={SvgIconBefore} alt="Back" width={20} height={13} />
					지원현황
				</BackLink>
				<SearchBarContainer>
				<SearchInput
    placeholder="공고 이름이나 태그를 검색하세요."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    }}
/>
<SearchButton onClick={handleSearchClick}>
    <img src={SearchIcon} alt="Search" width={20} height={20} />
</SearchButton>

				</SearchBarContainer>
				</TopBar>
			</div>
			<TabContainer>
			<DividerWrapper>
    <Divider />
  </DividerWrapper>
  <SearchResultsContainer>
  {isSearchClicked && displayedTerm && (
                            <SearchResultsTitle>
                                ‘{displayedTerm}’ 검색 결과
                            </SearchResultsTitle>
  )}
  </SearchResultsContainer>
  <TabMenuStyled>
    <div className="tab-buttons">
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
</TabContainer>

			<ResultsContainer>
			<SearchList recruits={recruits} activeTab={activeTab} searchTerm={displayedTerm} isSearchClicked={isSearchClicked} />
			</ResultsContainer>
			</Layout> 
		</Container>
	);
};

export default FilterPage;
                                              