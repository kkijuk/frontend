import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TabMenu from '../../components/Apply/TabMenu';
import { getRecruitListAfterDate } from '../../api/Apply/RecruitAfter';
import SearchList from './SearchList';

const Container = styled.div`
	padding: 24px 40px;
	background-color: white;
	border-radius: 15px;
	max-width: 850px;
	margin: 0 auto;
`;

const FilterSection = styled.div`
	padding: 20px;
	border-radius: 10px;
	border: 1px solid #d9d9d9;
	background-color: #fff;
	margin-top: 10px;
`;

const FilterRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
`;

const FilterTitle = styled.div`
	font-size: 18px;
	font-family: bold;
	color: #333;
	margin-bottom: 10px;
	white-space: nowrap;
`;

const FilterOptions = styled.div`
	margin-bottom: 9px;
	display: flex;
	gap: 0px;
	padding-right: 500px;
`;

const OptionButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px 10px;
	border: 1px solid ${({ active }) => (active ? '#3AAF85' : '#F5F5F5')};
	background-color: ${({ active }) => (active ? '#E1FAED' : '#F5F5F5')};
	color: ${({ active }) => (active ? '#3AAF85' : '#424242')};
	border-radius: 10px;
	cursor: pointer;
	height: 25px;
	margin-left: 25px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const SortSection = styled.div`
	display: flex;
	align-items: center;
	margin-top: 20px;
`;

const SortOptionButton = styled.button`
	padding: 5px 10px;
	background: none;
	border: none;
	color: ${({ active }) => (active ? '#3AAF85' : 'black')};
	cursor: pointer;
	font-family: medium;
	margin-bottom: 9px;
`;

const DateRangeTitle = styled.div`
	font-size: 18px;
	font-family: bold;
	color: #333;
	margin-bottom: 10px;
	white-space: nowrap;
`;

const DateRangeInput = styled.div`
	display: flex;
	align-items: center;
	margin-top: 20px;
	gap: 10px; /* 두 입력란 사이의 간격 설정 */
`;

const DateInput = styled.input`
	padding: 5px;
	border: 1px solid #d9d9d9;
	border-radius: 12px;
	background: #fff;
	margin-top: -5px;
	width: 120px; /* 적절한 너비 설정 */
	margin-left: 25px;
`;

const DateSeparator = styled.span`
	font-size: 18px;
	color: #333;
	font-family: Regular;
	position: absolute;
	left: 765px;
	top: 415px;
`;

const ResultsContainer = styled.div`
	margin-top: 20px;
`;

const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	padding: 10px 20px;
	border-radius: 12px;
	margin-bottom: 10px;
`;

const SearchInput = styled.input`
	width: 500px;
	border: none;
	background: none;
	outline: none;
	flex-grow: 1;
	font-size: 16px;
	color: #707070;
`;

const SearchIcon = styled.div`
	width: 20px;
	height: 20px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		width: 20px;
		height: 20px;
	}
`;

const ResetContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	margin-left: 700px;
`;

const ResetButton = styled.button`
	display: flex;
	align-items: center;
	background-color: transparent;
	border: none;
	font-size: 16px;
	font-family: Regular;
	color: #707070;
	margin-left: 5px;
	margin-top: -1px;
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

const TabMenuStyled = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 4px solid #ddd;
	margin-bottom: 20px;
`;

const TabButton = styled.button`
	padding: 10px 20px;
	border: none;
	background: none;
	cursor: pointer;
	color: var(--black, #000);
	font-family: 'Bold';
	font-size: 25px;
	white-space: nowrap;
	font-weight: 700;
	color: ${(props) => (props.active ? 'black' : '#E0E0E0')};
`;

const FilterIcon = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	justify-content: center;
	margin-right: -5px;
	svg {
		width: 20px;
		height: 20px;
	}
`;

const FilterPage = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('schedule');
	const [activeOptions, setActiveOptions] = useState(['공고명']);
	const [recruits, setRecruits] = useState([]); // 공고 리스트 상태
	const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
	const [sortOrder, setSortOrder] = useState('latest'); // 정렬 순서 상태 (latest: 최신순, oldest: 오래된순)
	const [startDate, setStartDate] = useState(''); // 시작일 상태 추가
	const [endDate, setEndDate] = useState(''); // 종료일 상태 추가

	const getCurrentDateTime = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}`;
	};

	const fetchRecruitList = async () => {
		const currentDateTime = getCurrentDateTime();
		try {
			const data = await getRecruitListAfterDate(currentDateTime); // 오늘 날짜와 시간 이후의 공고를 불러옴
			let filteredRecruits = data.outputs.flatMap((output) => output.recruits || []);

			// 공고명 필터링
			if (activeOptions.includes('공고명') && searchTerm) {
				filteredRecruits = filteredRecruits.filter((recruit) => recruit.title && recruit.title.includes(searchTerm));
			}

			// 태그 필터링
			if (activeOptions.includes('태그') && searchTerm) {
				filteredRecruits = filteredRecruits.filter(
					(recruit) => recruit.tag && recruit.tag.some((tag) => tag.includes(searchTerm)),
				);
			}

			// 정렬
			if (sortOrder === 'latest') {
				filteredRecruits.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
			} else if (sortOrder === 'oldest') {
				filteredRecruits.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
			}

			setRecruits(filteredRecruits);
		} catch (error) {
			console.error('Error fetching recruit list:', error);
		}
	};

	const handleOptionClick = (option) => {
		if (activeOptions.includes(option)) {
			setActiveOptions(activeOptions.filter((item) => item !== option)); // 이미 활성화된 옵션이면 비활성화
		} else {
			setActiveOptions([...activeOptions, option]); // 비활성화된 옵션이면 활성화
		}
	};

	const handleSortOrderClick = (order) => {
		setSortOrder(order);
	};

	const handleSearchClick = () => {
		fetchRecruitList();
	};

	const handleResetClick = () => {
		setSearchTerm('');
		setActiveOptions(['공고명']);
		setSortOrder('latest');
		setStartDate('');
		setEndDate('');
	};

	const handleTabClick = (tab) => {
		if (tab === 'schedule') {
			navigate('/apply-status');
			setActiveTab('status');
		} else {
			navigate('/apply-schedule');
			setActiveTab('schedule');
		}
	};

	return (
		<Container>
			<Title>지원관리</Title>
			<TabMenuStyled>
				<TabButton active={activeTab === 'schedule'} onClick={() => handleTabClick('status')}>
					지원일정
				</TabButton>
				<TabButton active={activeTab === 'status'} onClick={() => handleTabClick('schedule')}>
					지원현황
				</TabButton>
			</TabMenuStyled>

			<SearchBarContainer>
				<SearchInput
					placeholder="공고 이름이나 태그를 검색하세요."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<SearchIcon onClick={handleSearchClick}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M18.0682 19.6871L11.7045 13.3144C11.1364 13.7696 10.483 14.1299 9.74432 14.3954C9.00568 14.661 8.2197 14.7937 7.38636 14.7937C5.32197 14.7937 3.575 14.078 2.14545 12.6464C0.715152 11.214 0 9.4642 0 7.39687C0 5.32954 0.715152 3.57971 2.14545 2.14737C3.575 0.715789 5.32197 0 7.38636 0C9.45076 0 11.1981 0.715789 12.6284 2.14737C14.058 3.57971 14.7727 5.32954 14.7727 7.39687C14.7727 8.23139 14.6402 9.01849 14.375 9.75818C14.1098 10.4979 13.75 11.1522 13.2955 11.7212L19.6875 18.1223C19.8958 18.331 20 18.587 20 18.8905C20 19.1939 19.8864 19.4595 19.6591 19.6871C19.4508 19.8957 19.1856 20 18.8636 20C18.5417 20 18.2765 19.8957 18.0682 19.6871ZM7.38636 12.5178C8.80682 12.5178 10.0144 12.0201 11.0091 11.0248C12.003 10.0286 12.5 8.81935 12.5 7.39687C12.5 5.9744 12.003 4.7651 11.0091 3.76899C10.0144 2.77364 8.80682 2.27596 7.38636 2.27596C5.96591 2.27596 4.75833 2.77364 3.76364 3.76899C2.7697 4.7651 2.27273 5.9744 2.27273 7.39687C2.27273 8.81935 2.7697 10.0286 3.76364 11.0248C4.75833 12.0201 5.96591 12.5178 7.38636 12.5178Z"
							fill="#707070"
						/>
					</svg>
				</SearchIcon>
			</SearchBarContainer>

			<FilterSection>
				<FilterRow>
					<FilterTitle>대상</FilterTitle>
					<FilterOptions>
						<OptionButton active={activeOptions.includes('공고명')} onClick={() => handleOptionClick('공고명')}>
							공고명
						</OptionButton>
						<OptionButton active={activeOptions.includes('공고후기')} onClick={() => handleOptionClick('공고후기')}>
							공고후기
						</OptionButton>
						<OptionButton active={activeOptions.includes('태그')} onClick={() => handleOptionClick('태그')}>
							태그
						</OptionButton>
					</FilterOptions>
				</FilterRow>
				<SortSection>
					<FilterTitle>정렬</FilterTitle>
					<SortOptionButton
						active={sortOrder === 'latest'} // 최신순이 기본으로  적용되어 있음
						onClick={() => handleSortOrderClick('latest')}
						style={{ marginLeft: '30px' }}
					>
						최신순
					</SortOptionButton>
					<SortOptionButton
						active={sortOrder === 'oldest'}
						onClick={() => handleSortOrderClick('oldest')}
						style={{ marginLeft: '5px' }}
					>
						오래된순
					</SortOptionButton>
				</SortSection>
				<DateRangeInput>
					<DateRangeTitle>기간</DateRangeTitle>
					<DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
					<DateSeparator>~</DateSeparator>
					<DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
				</DateRangeInput>
			</FilterSection>

			<ResetContainer>
				<FilterIcon onClick={handleResetClick}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M11.9985 7.00049H16.8569V2.14209"
							stroke="#707070"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M16.8301 11.8301C16.4273 13.3337 15.5395 14.6623 14.3046 15.6099C13.0697 16.5574 11.5566 17.0711 10 17.0711C8.44342 17.0711 6.93033 16.5574 5.69541 15.6099C4.46049 14.6623 3.57275 13.3337 3.16987 11.8301C2.767 10.3266 2.87151 8.73212 3.46719 7.29402C4.06286 5.85592 5.11642 4.65457 6.46447 3.87628C7.81251 3.09798 9.37969 2.78625 10.923 2.98943C12.4662 3.1926 13.8993 3.89933 15 5"
							stroke="#707070"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				</FilterIcon>
				<ResetButton>필터 초기화</ResetButton>
			</ResetContainer>

			<ResultsContainer>
				<SearchList data={recruits} />
			</ResultsContainer>
		</Container>
	);
};

export default FilterPage;
