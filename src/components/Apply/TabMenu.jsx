import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { Color } from '../../constants/color';

const TabMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  margin-top: 32px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	transform: none;
}

`;

const TabMenuStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우 정렬 */
  padding-bottom: 2px; /* 밑줄과의 간격 */
  max-width: 1000px; /* 컨테이너 최대 너비 설정 */
  margin: 0 auto;
  transform: translateX(-93px); /* 왼쪽으로 이동 */

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: flex-start;    
    transform: none;             
    gap: 0px;
    padding-left: 10px;          
  }
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    align-items: flex-start;  
    transform: none;             
    gap: 0px;      
  }
`;

const TabButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
`;


const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'SemiBold';
  font-size: 25px;
  font-weight: 700;
  white-space: nowrap;
  color: ${(props) => (props.active ? Color.black : Color.gray04)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 24px; 
  }
`;

const SearchContainer = styled.div`
  width: 250px; /* 서치바 크기 고정 */
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 170px; /* 서치바 왼쪽 간격 추가 */

   @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
  margin-left: 40px;
  }
`;

const InvisibleSearchBar = styled.div`
  width: 250px;
  height: 40px;
  visibility: hidden; /* 보이지 않지만 자리 차지 */
`;

const Underline = styled.div`
  height: 4px;
  width: 821px; /* 고정된 길이 */
   background: ${Color.gray05};
  margin: 0 auto; /* 중앙 정렬 */

   @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 350px;
  }

   @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 320px;
  }
`;


const TabMenu = ({ activeTab, onTabClick, searchValue, onSearchChange, onSearch }) => {
  const handleTabClick = (tab) => {
    window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
    onTabClick(tab);
  };

  const showSearchBar = activeTab !== 'schedule';

  return (
    <TabMenuContainer>
      <TabMenuStyled>
        <TabButtonContainer>
          <TabButton active={activeTab === 'schedule'} onClick={() => handleTabClick('schedule')}>
            지원일정
          </TabButton>
          <TabButton active={activeTab === 'status'} onClick={() => handleTabClick('status')}>
            지원현황
          </TabButton>
        </TabButtonContainer>

        <SearchContainer>
          {showSearchBar ? <SearchBar value={searchValue} onChange={onSearchChange} onSearch={onSearch} /> : <InvisibleSearchBar />}
        </SearchContainer>
      </TabMenuStyled>
      
      <Underline />
    </TabMenuContainer>
  );
};

export default TabMenu;
