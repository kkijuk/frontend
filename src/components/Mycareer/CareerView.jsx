import React from 'react';
import styled from 'styled-components';

const ViewToggleStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap; /* 화면 크기가 작아지면 버튼과 제목이 줄 바꿈되도록 설정 */

	@media (max-width: 600px) {
		flex-direction: column; /* 작은 화면에서는 세로 배치 */
		align-items: flex-start; /* 정렬을 왼쪽으로 */
	}
`;

const ToggleButtonsContainer = styled.div`
	display: flex;
	flex-wrap: wrap; /* 버튼이 화면에 맞춰 줄 바꿈되도록 설정 */

	@media (max-width: 600px) {
		width: 100%; /* 버튼 컨테이너의 너비를 전체로 */
		margin-top: 10px; /* 제목과 버튼 사이 여백 추가 */
	}
`;

const ToggleButton = styled.button`
	padding: 8px 10px;
	border-radius: 10px 10px 0px 0px;
	background-color: ${(props) => (props.active ? '#F1F1F1' : 'white')};
	cursor: pointer;
	border: 2px solid ${(props) => (props.active ? '#F1F1F1' : 'white')};
	width: 85px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	color: ${(props) => (props.active ? '#3AAF85' : '#707070')};
	transition: all 0.3s ease; /* 버튼 클릭 시 부드러운 전환 효과 */

	@media (max-width: 600px) {
		width: 70px; /* 작은 화면에서는 버튼 너비 축소 */
		font-size: 12px; /* 폰트 크기 축소 */
		padding: 6px 8px; /* 패딩 축소 */
	}
`;

const ViewTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 0;

	@media (max-width: 600px) {
		font-size: 18px; /* 작은 화면에서는 제목 폰트 크기 축소 */
	}
`;

const CareerView = ({ view, onToggle }) => {
	return (
		<ViewToggleStyled>
			<ViewTitle>활동 목록</ViewTitle>
			<ToggleButtonsContainer>
				<ToggleButton active={view === 'year'} onClick={() => onToggle('year')}>
					시간순
				</ToggleButton>
				<ToggleButton active={view === 'category'} onClick={() => onToggle('category')}>
					분류별
				</ToggleButton>
			</ToggleButtonsContainer>
		</ViewToggleStyled>
	);
};

export default CareerView;
