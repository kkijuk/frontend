import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

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

const TabMenu = ({ activeTab, onTabClick, searchValue, onSearchChange, onSearch, showSearchBar = true }) => {
	const handleTabClick = (tab) => {
		window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
		onTabClick(tab);
	};

	return (
		<TabMenuStyled>
			<TabButton active={activeTab === 'schedule'} onClick={() => handleTabClick('schedule')}>
				지원일정
			</TabButton>
			<TabButton active={activeTab === 'status'} onClick={() => handleTabClick('status')}>
				지원현황
			</TabButton>
			{showSearchBar && <SearchBar value={searchValue} onChange={onSearchChange} onSearch={onSearch} />}
		</TabMenuStyled>
	);
};

export default TabMenu;
