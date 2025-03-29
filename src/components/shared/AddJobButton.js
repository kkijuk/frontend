import React from 'react';
import styled from 'styled-components';
import { trackEvent } from '../../utils/ga4'; 

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
		@media (max-width: 768px) {
		width: 48px;
		height: 48px;
		font-size: 32px;
	}
`;

const AddJobButton = ({ onClick }) => {
	const handleClick = () => {
		//  GA 트래킹 추가 (공고 추가 버튼 클릭)
		trackEvent('add_click', {
			category: 'apply',
			detail: 'add_recruit',
			action_type: 'add',
			label: '공고 추가',
		});

		//  props로 받은 onClick 함수 실행
		if (onClick) {
			onClick();
		}
	};

	return <Button onClick={handleClick}>+</Button>;
};

export default AddJobButton;
