import React from 'react';
import styled from 'styled-components';

const ViewToggleStyled = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 5px;
`;

const ToggleContainer = styled.div`
	background-color: #f5f5f5;
	border-radius: 10px;
	margin-right: -5px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 150px;
	height: 35px;
`;

const ToggleButton = styled.button`
	padding: 5px 8px;
	border-radius: 10px;
	background-color: ${(props) => (props.active ? 'white' : '#F5F5F5')};
	cursor: pointer;
	border: 2px solid ${(props) => (props.active ? 'white' : '#F5F5F5')};
	width: 65px;
	height: 25px;
	display: flex;
	white-space: nowrap;
	align-items: center;
	justify-content: center;
	color: ${(props) => (props.active ? '#000' : '#666')};
	text-align: center;
	font-family: 'Regular';
	font-size: 14px;
	font-style: normal;
	transition: all 0.2s ease;
`;

const ViewToggle = ({ view, onToggle }) => {
	const handleToggle = (newView) => {
		window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
		onToggle(newView);
	};

	return (
		<ViewToggleStyled>
			<ToggleContainer>
				<ToggleButton active={view === 'calendar'} onClick={() => handleToggle('calendar')}>
					달력보기
				</ToggleButton>
				<ToggleButton active={view === 'list'} onClick={() => handleToggle('list')}>
					목록보기
				</ToggleButton>
			</ToggleContainer>
		</ViewToggleStyled>
	);
};

export default ViewToggle;
