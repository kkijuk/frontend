import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import { Color } from '../../constants/color';

const StatusItem = styled.div`
	background-color: ${Color.gray06};
	border-radius: 12px;
	padding: 9px;
	margin-right: 369px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 120px;
	height: 15px;
	cursor: pointer; 
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-right: 0; 
	    width: 136px;
	}
`;

const StatusText = styled.span`
	color: ${Color.black};
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
