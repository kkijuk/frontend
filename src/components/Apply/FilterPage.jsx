import React, { useState } from 'react'; 
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TabMenu from '../../components/Apply/TabMenu';
import { getRecruitListAfterDate } from '../../api/Apply/RecruitAfter';
import SearchList from './SearchList';
import SvgIconBefore from '../../assets/before.svg';
import { Link } from 'react-router-dom';

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
	gap: 10px;
`;

const DateInput = styled.input`
	padding: 5px;
	border: 1px solid #d9d9d9;
	border-radius: 12px;
	background: #fff;
	margin-top: -5px;
	width: 120px;
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
	margin-left: 20px;
`;

const SearchInput = styled.input`
	width: 300px;
	border: none;
	background: none;
	outline: none;
	font-size: 16px;
	color: #707070;
	margin-left: 10px;
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

const FilterPage = () => {
	const [activeOptions, setActiveOptions] = useState(['공고명']);
	const [recruits, setRecruits] = useState([]); 
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('latest');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

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
			const data = await getRecruitListAfterDate(currentDateTime);
			let filteredRecruits = data.outputs.flatMap((output) => output.recruits || []);

			if (activeOptions.includes('공고명') && searchTerm) {
				filteredRecruits = filteredRecruits.filter((recruit) => recruit.title && recruit.title.includes(searchTerm));
			}

			if (activeOptions.includes('태그') && searchTerm) {
				filteredRecruits = filteredRecruits.filter(
					(recruit) => recruit.tag && recruit.tag.some((tag) => tag.includes(searchTerm)),
				);
			}

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
			setActiveOptions(activeOptions.filter((item) => item !== option));
		} else {
			setActiveOptions([...activeOptions, option]);
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
                    <SearchIcon onClick={handleSearchClick}>
                       
                    </SearchIcon>
                </SearchBarContainer>
            </div>
			<TabMenuStyled>
			</TabMenuStyled>
			<SortSection>
				<SortOptionButton active={sortOrder === 'latest'} onClick={() => handleSortOrderClick('latest')}>
					최신순
				</SortOptionButton>
				<SortOptionButton active={sortOrder === 'oldest'} onClick={() => handleSortOrderClick('oldest')}>
					오래된순
				</SortOptionButton>
			</SortSection>
			<ResultsContainer>
				<SearchList recruits={recruits} />
			</ResultsContainer>
		</Container>
	);
};

export default FilterPage;
