import React, { useState } from 'react';
import styled from 'styled-components';

const ParticipantType = ({ isTeam, setIsTeam, teamSize, setTeamSize, contribution, setContribution }) => {
	const handleSelection = (value, event) => {
		event.preventDefault(); // 새로고침 방지
		setIsTeam(value === '팀');
	};

	return (
		<Container>
			<LabelGroup>
				<Label>
					인원 <span style={{ color: '#FC5555' }}>*</span>
				</Label>
				<Label style={{ left: '310px' }}>팀 인원</Label>
				<Label style={{ left: '560px' }}>기여도</Label>
			</LabelGroup>
			<ContentGroup>
				<ButtonGroup>
					<SelectButton selected={!isTeam} onClick={(e) => handleSelection('개인', e)}>
						개인
					</SelectButton>
					<SelectButton selected={isTeam} onClick={(e) => handleSelection('팀', e)}>
						팀
					</SelectButton>
				</ButtonGroup>
				<InputGroup>
					<Input type="number" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} disabled={!isTeam} />
					<span>명</span>
					<Input
						type="number"
						value={contribution}
						onChange={(e) => setContribution(e.target.value)}
						disabled={!isTeam}
					/>
					<span>%</span>
				</InputGroup>
			</ContentGroup>
		</Container>
	);
};

export default ParticipantType;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	// gap: 5px;
	width: 100%;
`;

const LabelGroup = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 30px;
	width: 100%;
	position: relative;
`;

const Label = styled.label`
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	width: 125px;
	text-align: left;
	margin-bottom: 5px;
`;

const ContentGroup = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	gap: 20px;
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 10px;
`;

const SelectButton = styled.div`
	width: 125px;
	height: 50px;
	font-size: 16px;
	font-weight: 400;
	line-height: 50px;
	border-radius: 10px;
	cursor: pointer;
	display: inline-block;
	margin-right: 10px;

	background-color: ${(props) => (props.selected ? '#E1FAED' : '#f5f5f5')};
	color: ${(props) => (props.selected ? '#3AAF85' : '#707070')};
	border: ${(props) => (props.selected ? '2px solid #3AAF85' : 'none')};
	text-align: center;
`;

const InputGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	span {
		font-size: 14px;
	}
`;

const Input = styled.input`
	width: 100px;
	height: 50px;
	padding: 5px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: ${(props) => (props.disabled ? '#f5f5f5' : '#fff')};
	color: ${(props) => (props.disabled ? '#a9a9a9' : '#000')};
	text-align: center;

	&:focus {
		border-color: #3aaf85;
		outline: none;
	}
`;
