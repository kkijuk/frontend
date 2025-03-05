//pages/Apply/ApplySchedule, /pages/Mycareer, components/Intro/AddButton
// 화면 오른쪽 아래 +버튼
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	position: fixed;
	bottom: 20px;
	right: 20px;
	background-color: #3aaf85;
	color: white;
	border: none;
	border-radius: 50%;
	width: 56px;
	height: 56px;
	font-size: 36px;
	cursor: pointer;
	z-index: 10;

	&:hover {
		background-color: #3aaf85;
	}
`;

const BtnTooltip = styled.div`
	position: fixed;
	bottom: 30px;
	right: 100px;
	padding: 10px 20px;
	background-color: #3aaf85;
	color: white;
	border-radius: 100px;
	font-size: 18px;
	font-weight: 700;
	z-index: 9;

	/* 화살표 추가 */
	&::after {
		content: '';
		position: absolute;
		top: 50%;
		right: -18px; /* 버튼 방향 */
		transform: translateY(-50%);
		border-width: 12px;
		border-style: solid;
		border-color: transparent transparent transparent #3aaf85;
	}
`;

const AddActivityButton = ({ onClick, data }) => {
	const isEmpty = !data || (typeof data === 'object' && Object.keys(data).length === 0);

	return (
		<>
			{isEmpty && <BtnTooltip>지금 활동을 추가하세요!</BtnTooltip>}
			<Button onClick={onClick}>+</Button>
		</>
	);
};

export default AddActivityButton;
