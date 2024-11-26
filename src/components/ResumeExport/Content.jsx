import React from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

const Box = styled.div`
	width: 772px;
	height: 35px;
	flex-shrink: 0;
	margin-top: 10px;
	margin-bottom: 10px;

	display: flex; /* Flexbox 사용 */
	justify-content: space-between; /* 좌우 끝으로 배치 */
	align-items: center; /* 수직 중앙 정렬 */
`;

const Line = styled.div`
	width: 771px;
	height: 1px;
	background: #e0e0e0;
`;

const Text = styled.div`
	color: #000;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CategoryCircle = styled.div`
	width: 19px;
	height: 19px;
	margin-right: 10px;
	border-radius: 50%;

	background-color: ${(props) => props.color || '#ffffff'}; /* 기본값: 흰색 */
`;

const CategoryWrapper = styled.div`
	display: flex; /* Flexbox로 설정 */
	align-items: center; /* 세로 중앙 정렬 */
`;

export function Education({ text }) {
	return (
		<div>
			<Box>
				<Text>{text}</Text>
				<Toggle></Toggle>
			</Box>
			<Line></Line>
		</div>
	);
}

export function Career({ text }) {
	return (
		<div>
			<Box>
				<CategoryWrapper>
					<CategoryCircle color="#FA7C79" /> {/* 노란색 */}
					<Text>{text}</Text>
				</CategoryWrapper>
				<Toggle></Toggle>
			</Box>
			<Line></Line>
		</div>
	);
}

export function Experience({ text }) {
	return (
		<div>
			<Box>
				<CategoryWrapper>
					<CategoryCircle /> {/* 파란색 */}
					<Text>{text}</Text>
				</CategoryWrapper>
				<Toggle></Toggle>
			</Box>
			<Line></Line>
		</div>
	);
}
