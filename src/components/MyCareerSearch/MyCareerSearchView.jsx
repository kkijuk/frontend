import React from 'react';
import styled from 'styled-components';

const ViewToggleStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
	box-sizing: border-box;
	width: 100%;

	@media (max-width: 600px) {
		padding: 0 5px;
		gap: 10px; /* 버튼 그룹 사이 간격 */
	}
`;

const ToggleButtonsContainer = styled.div`
	display: flex;
	gap: 5px; /* 버튼 사이 간격 */

	@media (max-width: 600px) {
		gap: 3px; /* 작은 화면에서 버튼 간격 축소 */
	}
`;

const ToggleButton = styled.button`
	padding: 8px 10px;
	border-radius: 10px 10px 0px 0px;
	background-color: white;
	cursor: pointer;
	border: 2px solid white;
	min-width: 85px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;

	white-space: nowrap; /* 줄 바꿈 방지 */
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 600;
	color: ${(props) => (props.active ? 'black' : '#D9D9D9')};
	transition: all 0.2s ease; /* 버튼 클릭 시 부드러운 전환 효과 */

	@media (max-width: 600px) {
		min-width: auto; /* 최소 너비 제거 */
		width: auto; /* 내용에 맞게 너비 조정 */
		padding: 6px 8px;
		font-size: 13px;
		height: 28px;
	}

	@media (max-width: 400px) {
		font-size: 12px;
		padding: 4px 6px;
		height: 26px;
	}
`;

export default function MyCareerSearchView({ view, onViewToggle, sortOrder, onSortToggle }) {
	return (
		<ViewToggleStyled>
			<ToggleButtonsContainer>
				<ToggleButton active={view === '1'} onClick={() => onViewToggle('1')}>
					전체
				</ToggleButton>
				<ToggleButton active={view === '2'} onClick={() => onViewToggle('2')}>
					활동기록
				</ToggleButton>
				<ToggleButton active={view === '3'} onClick={() => onViewToggle('3')}>
					태그
				</ToggleButton>
			</ToggleButtonsContainer>
			<ToggleButtonsContainer>
				<ToggleButton active={sortOrder === 'new'} onClick={() => onSortToggle('new')}>
					최신순
				</ToggleButton>
				<ToggleButton active={sortOrder === 'old'} onClick={() => onSortToggle('old')}>
					오래된순
				</ToggleButton>
			</ToggleButtonsContainer>
		</ViewToggleStyled>
	);
}
