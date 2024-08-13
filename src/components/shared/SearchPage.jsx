import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import TabMenu from './TabMenu';
import SearchBar from './SearchBar';

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
  margin-right: 503px;
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

const SortOptionR = styled.button`
  padding: 5px 10px;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-family: medium;
  margin-left: 0px;
  margin-bottom: 9px;
`;
const SortOptionL = styled.button`
  padding: 5px 10px;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-family: medium;
  margin-left: 22px;
  margin-bottom: 9px;
`;

const PeriodSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const DateInputStart = styled.input`
  padding: 3px;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  margin-left: 28px;
   margin-bottom: 9px;
  
`;

const DateInputEnd = styled.input`
  padding: 3px;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  margin-left: 16px;
   margin-bottom: 9px;
`;

const StyledSpan = styled.span`
  margin-left: 15px;
  margin-bottom: 9px;
`;

const SearchButton = styled.button`
 display: flex; 
  align-items: center; 
  justify-content: center; 
  width: 53px;
  padding: 5px 10px;
  background-color: #3AAF85;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 25px;
   margin-bottom: 9px;
  margin-left: 10px;
`;

const FilterPage = () => { // 컴포넌트 이름 수정
  const navigate = useNavigate();

  return (
    <Container>
      <Title>지원관리</Title>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TabMenu activeTab="status" onTabClick={(tab) => navigate(`/apply-${tab}`)} />
       
      </div>
      <FilterSection>
      <FilterRow>
          <FilterTitle>대상</FilterTitle>
          <FilterOptions>
            <OptionButton active>공고명</OptionButton>
            <OptionButton>공고후기</OptionButton>
            <OptionButton>태그</OptionButton>
          </FilterOptions>
        </FilterRow>
        <SortSection>
        <FilterTitle>정렬</FilterTitle>
        <SortOptionL>최신순</SortOptionL>
        <SortOptionR>오래된순</SortOptionR>
      </SortSection>
      <PeriodSection>
        <FilterTitle>기간</FilterTitle>
        <DateInputStart type="date" />
        <StyledSpan>~</StyledSpan> 
        <DateInputEnd type="date" />
        <SearchButton>검색</SearchButton>
      </PeriodSection>
      </FilterSection>
      
    </Container>
  );
};

export default FilterPage;
