import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

const StatusItem = styled.div`
	background-color: #f5f5f5;
	border-radius: 12px;
	padding: 9px;
	margin-right: 369px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 120px;
	height: 15px;
	cursor: pointer; 
`;

const StatusText = styled.span`
	color: var(--black, #000);
	text-align: center;
	font-family: Light;
	font-size: 14px;
	font-weight: bold;
	line-height: normal;
	align-items: center;
	justify-content: center;
`;
const ApplyList = ({ count }) => {
	const navigate = useNavigate(); 

	const handleClick = () => {
		navigate('/apply-status'); 
	};

	return (
		<StatusItem onClick={handleClick}>
			<StatusText>지원한 공고 {count}</StatusText>
		</StatusItem>
	);
};

export default ApplyList;
