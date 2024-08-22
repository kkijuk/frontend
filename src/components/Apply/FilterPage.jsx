import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
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
  border: 1px solid #D9D9D9;
  background-color: #FFF;
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
`;

const FilterOptions = styled.div`
  margin-right: 580px;
  margin-bottom: 9px;
  display: flex;
  gap: 20px;
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

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--black, #000);
  font-family: 'Bold';
  font-size: 26px;
  font-weight: 700;
  color: ${props => (props.active ? 'black' : '#E0E0E0')};
`;

const FilterPage = () => {
  const navigate = useNavigate();
  const [activeOptions, setActiveOptions] = useState(['공고명']); 
  const [recruits, setRecruits] = useState([]); // 공고 리스트 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [sortOrder, setSortOrder] = useState('latest'); // 정렬 순서 상태 (latest: 최신순, oldest: 오래된순)

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
      let filteredRecruits = data.outputs.flatMap(output => output.recruits || []);

      // 공고명 필터링
      if (activeOptions.includes('공고명') && searchTerm) {
        filteredRecruits = filteredRecruits.filter(recruit =>
          recruit.title && recruit.title.includes(searchTerm)
        );
      }

      // 태그 필터링
      if (activeOptions.includes('태그') && searchTerm) {
        filteredRecruits = filteredRecruits.filter(recruit =>
          recruit.tag && recruit.tag.some(tag => tag.includes(searchTerm))
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

  return (
    <Container>
      <Title>지원관리</Title>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontFamily: 'Bold',
            fontSize: '26px',
            fontWeight: '700',
          }}
          onClick={() => handleOptionClick('schedule')}
        >
          지원일정
        </button>
        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontFamily: 'Bold',
            fontSize: '26px',
            fontWeight: '700',
           
          }}
          onClick={() => handleOptionClick('status')}
        >
          지원현황
        </button>
        <SearchBarContainer>
          <SearchInput
            placeholder="공고 이름이나 태그를 검색하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon onClick={handleSearchClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18.0682 19.6871L11.7045 13.3144C11.1364 13.7696 10.483 14.1299 9.74432 14.3954C9.00568 14.661 8.2197 14.7937 7.38636 14.7937C5.32197 14.7937 3.575 14.078 2.14545 12.6464C0.715152 11.214 0 9.4642 0 7.39687C0 5.32954 0.715152 3.57971 2.14545 2.14737C3.575 0.715789 5.32197 0 7.38636 0C9.45076 0 11.1981 0.715789 12.6284 2.14737C14.058 3.57971 14.7727 5.32954 14.7727 7.39687C14.7727 8.23139 14.6402 9.01849 14.375 9.75818C14.1098 10.4979 13.75 11.1522 13.2955 11.7212L19.6875 18.1223C19.8958 18.331 20 18.587 20 18.8905C20 19.1939 19.8864 19.4595 19.6591 19.6871C19.4508 19.8957 19.1856 20 18.8636 20C18.5417 20 18.2765 19.8957 18.0682 19.6871ZM7.38636 12.5178C8.80682 12.5178 10.0144 12.0201 11.0091 11.0248C12.003 10.0286 12.5 8.81935 12.5 7.39687C12.5 5.9744 12.003 4.7651 11.0091 3.76899C10.0144 2.77364 8.80682 2.27596 7.38636 2.27596C5.96591 2.27596 4.75833 2.77364 3.76364 3.76899C2.7697 4.7651 2.27273 5.9744 2.27273 7.39687C2.27273 8.81935 2.7697 10.0286 3.76364 11.0248C4.75833 12.0201 5.96591 12.5178 7.38636 12.5178Z" fill="#707070"/>
            </svg>
          </SearchIcon>
        </SearchBarContainer>
      </div>
      <FilterSection>
        <FilterRow>
          <FilterTitle>대상</FilterTitle>
          <FilterOptions>
            <OptionButton
              active={activeOptions.includes('공고명')}
              onClick={() => handleOptionClick('공고명')}
            >
              공고명
            </OptionButton>
            <OptionButton
              active={activeOptions.includes('태그')}
              onClick={() => handleOptionClick('태그')}
            >
              태그
            </OptionButton>
          </FilterOptions>
        </FilterRow>
        <SortSection>
          <FilterTitle>정렬</FilterTitle>
          <SortOptionButton
  active={sortOrder === 'latest'}
  onClick={() => handleSortOrderClick('latest')}
  style={{ marginLeft: '30px' }}  // 최신순 버튼에 적용
>
  최신순
</SortOptionButton>
<SortOptionButton
  active={sortOrder === 'oldest'}
  onClick={() => handleSortOrderClick('oldest')}
  style={{ marginLeft: '5px' }}  // 오래된순 버튼에 적용
>
  오래된순
</SortOptionButton>

        </SortSection>
      </FilterSection>

      <ResultsContainer>
        <SearchList data={recruits} />
      </ResultsContainer>
    </Container>
  );
};

export default FilterPage;






