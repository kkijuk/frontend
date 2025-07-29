import React from 'react';
import styled from 'styled-components';
import { Color } from '../../constants/color';

const ViewToggleStyled = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 5px;
`;

const ToggleContainer = styled.div`
	background-color: ${Color.gray06};
	border-radius: 10px;
	margin-right: -5px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 150px;
	height: 35px;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 320px;
}
`;

const ToggleButton = styled.button`
	padding: 5px 8px;
	border-radius: 10px;
	background-color: ${(props) => (props.active ? Color.white : Color.gray06)};
	cursor: pointer;
	border: 2px solid ${(props) => (props.active ? Color.white : Color.gray06)};
	width: 65px;
	height: 25px;
	display: flex;
	white-space: nowrap;
	align-items: center;
	justify-content: center;
	color: ${(props) => (props.active ? Color.black : Color.gray02)};
	text-align: center;
	font-family: 'Regular';
	font-size: 14px;
	font-style: normal;
	transition: all 0.2s ease;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 155px;
}
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
