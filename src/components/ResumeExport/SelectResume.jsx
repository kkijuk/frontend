import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 820px;
	height: 505px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);

	display: flex;
	justify-content: center; /* 가로 중앙 정렬 */
	align-items: center; /* 세로 중앙 정렬 */
`;

const Box = styled.div`
	width: 650px;
	height: 457px;
	display: flex;
	justify-content: space-between;
	position: relative;
`;

const FormatBox = styled.div`
	width: 293px;
	height: 457px;

	display: flex; /* Flexbox 활성화 */
	flex-direction: column; /* 세로 방향으로 정렬 */
	gap: 24px;
	position: relative; /* 내부 요소 위치 조정 */
	cursor: pointer;
`;

const FormatText = styled.div`
	height: 19px;
	width: 293px;
	color: #000;
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	z-index: 2; /* 강조 표시보다 위에 표시 */
`;

const Resume = styled.div`
	width: 293px;
	height: 414px;
	background: var(--main-02, #88d1b6);
	z-index: 2; /* 강조 표시보다 위에 표시 */
`;

const SelectedOverlay = styled.div`
	width: 333px;
	height: 469px;
	border-radius: 10px;
	border: 2px solid var(--gray-03, #d9d9d9);
	background: var(--gray-04, #e0e0e0);
	position: absolute;
	top: 50%; /* 부모의 세로 중앙 */
	left: 50%; /* 부모의 가로 중앙 */
	transform: translate(-50%, -50%); /* 중심 기준으로 위치 조정 */
	z-index: 1; /* FormatBox 뒤에 배치 */
`;

export default function SelectResume({ onSelect, selected }) {
	const handleSelect = (boxId) => {
		onSelect(boxId); // 상위 컴포넌트로 선택된 값 전달
	};

	return (
		<Wrapper>
			<Box>
				<FormatBox onClick={() => handleSelect(1)}>
					{selected === 1 && <SelectedOverlay />} {/* 선택된 상태에서 강조 표시 */}
					<FormatText>양식 1</FormatText>
					<Resume></Resume>
				</FormatBox>

				<FormatBox onClick={() => handleSelect(2)}>
					{selected === 2 && <SelectedOverlay />} {/* 선택된 상태에서 강조 표시 */}
					<FormatText>양식 2</FormatText>
					<Resume></Resume>
				</FormatBox>
			</Box>
		</Wrapper>
	);
}
