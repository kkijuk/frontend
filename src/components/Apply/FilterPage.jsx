import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fetchRecruitList } from '../../api/Apply/RecruitSearch';
import SearchList from './SearchList';
import SearchIcon from '../../assets/search.svg';  
import { Link } from 'react-router-dom';
import SvgIconBefore from '../../assets/before.svg';
import Layout from '../../components/Layout'; 

const Container = styled.div`
  padding: 24px 40px;
  background-color: white;
  border-radius: 15px;
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
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

const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	padding: 10px 20px;
	border-radius: 12px;
	margin-bottom: 10px;
	margin-left: 140px;
`;

const SearchInput = styled.input`
	width: 525px;
	border: none;
	background: none;
	outline: none;
	font-size: 16px;
	color: #707070;
	margin-left: 20px;
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

const Divider = styled.div`
  height: 4px;
  background-color: #F1F1F1;
  margin-top: 0px; 
  width: 820px;
  position: relative;
  align-items: center;
  right: 13px;
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

	const fetchSearchResults = async () => {
        if (!isSearchClicked || !displayedTerm.trim()) return; // 검색 버튼 클릭되지 않았거나 검색어가 비어있으면 종료
        try {
            const { recruitResult, reviewResult } = await fetchRecruitList(displayedTerm);

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
		  
			  // 정렬된 결과를 setRecruits로 설정
			  if (activeTab === '공고') {
				setRecruits(filteredRecruits);
			  } else if (activeTab === '공고후기') {
				setRecruits(filteredReviews);
			  } else if (activeTab === '전체') {
				setRecruits([...filteredRecruits, ...filteredReviews]);
			  }
			} catch (error) {
			  console.error('Error fetching recruit list:', error);
			}
		  };
	
		  const handleSearchClick = () => {
			setDisplayedTerm(searchTerm); // 검색 버튼 클릭 시에만 검색어를 갱신
			setIsSearchClicked(true);
			fetchSearchResults();
		};
	
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const handleSortChange = (order) => {
		setSortOrder(order);
		fetchSearchResults(); // 정렬 변경 시 즉시 검색 결과 갱신
	  };

	  useEffect(() => {
		fetchSearchResults();  // sortOrder가 변경될 때마다 재검색
	  }, [sortOrder, activeTab]);

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

	return (
		<Container>
			<Layout title="지원관리">
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
			<TabContainer>
			<Divider />
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
			<SearchList recruits={recruits} activeTab={activeTab} />
			</ResultsContainer>
			</Layout> 
		</Container>
	);
};

export default FilterPage;
                                              