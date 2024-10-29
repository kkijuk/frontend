import React, { useState } from 'react';
import styled from 'styled-components';

const ParticipantType = () => {
	const [isTeam, setIsTeam] = useState(false); //개인 or 팀
	const [teamSize, setTeamSize] = useState(0); //인원
	const [contribution, setContribution] = useState(0); //기여도

	return (
		<>
			<FormItem>
				<SelectButton>개인</SelectButton>
				<SelectButton>팀</SelectButton>
			</FormItem>
			<FormItem>
				<input></input>
				<span>명</span>
				<input></input>
				<span>명</span>
			</FormItem>
		</>
	);
};

export default ParticipantType;

// 개별 폼 요소 스타일
const FormItem = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: ${(props) => (props.spanTwoColumns ? 'span 2' : 'span 1')}; /* 열을 조건부로 설정 */
	width: 100%;
	label {
		margin-bottom: 8px;
		font-size: 18px;
		font-weight: bold;
	}
	input {
		height: 40px;
		padding: 10px;
		font-size: 16px;
		border: none;
		border-radius: 10px;
		background: #f5f5f5;
		width: 100%;
	}
`;

const SelectButton = styled.div`
	width: 125px;
	height: 50px;
	font-size: 16px;
	font-weight: 400;
	line-height: normal;
	border-radius: 10px;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(props) => (props.state ? '#E1FAED' : '#F5F5F5')};
	color: ${(props) => (props.state ? '#3AAF85' : '#707070')};
	border: ${(props) => (props.state ? '2px solid #3AAF85' : 'none')};
`;

const Span = styled.p``;
