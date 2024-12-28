import React from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

const Box = styled.div`
	width: 762px;
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

	background-color: ${(props) => {
		switch (props.category) {
			case '동아리':
				return '#FCC400';
			case '대외활동':
				return '#77AFF2';
			case '공모전/대회':
				return '#C48DEF';
			case '프로젝트':
				return '#78D333';
			case '경력':
				return '#FA7C79';
			case '교육':
				return '#F99538';
			case '기타':
				return '#707070';
			default:
				return '#707070';
		}
	}};
`;

const CategoryWrapper = styled.div`
	display: flex; /* Flexbox로 설정 */
	align-items: center; /* 세로 중앙 정렬 */
`;

const StyledSVG = styled.svg`
	width: 10px;
	height: 16px;
	flex-shrink: 0;
	margin-right: 10px;
	fill: var(--gray-02, #707070); /* 기본 색상 */
`;

export function Education({ text }) {
	//학력 백엔드에서 data.educationList로 보내줌
	return (
		<div>
			<Box>
				<CategoryWrapper>
					<StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16">
						<path d="M4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6ZM8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12Z" />
					</StyledSVG>
					<Text>{text}</Text>
				</CategoryWrapper>
				<Toggle></Toggle>
			</Box>
			<Line></Line>
		</div>
	);
}

export function Career({ text }) {
	//경력 data.employments
	return (
		<div>
			<Box>
				<CategoryWrapper>
					<StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16">
						<path d="M4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6ZM8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12Z" />
					</StyledSVG>
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
	//활동 및 경험 data.activitiesAndExperiences
	return (
		<div>
			<Box>
				<CategoryWrapper>
					<StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16">
						<path d="M4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6ZM8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12Z" />
					</StyledSVG>
					<CategoryCircle />
					<Text>{text}</Text>
				</CategoryWrapper>
				<Toggle></Toggle>
			</Box>
			<Line></Line>
		</div>
	);
}

export function Project({ text }) {
	//프로젝트, 공모전대회 관련 정보 data.projects
}

export function Training({ text }) {
	//교육 정보 data.eduCareers,
}

export function Award({ text }) {}

export function Licence({ text }) {}

export function Skill({ text }) {}
