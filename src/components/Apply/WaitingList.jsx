import React from 'react';
import styled from 'styled-components';

const StatusItem = styled.div`
	background-color: #f5f5f5;
	border-radius: 12px;
	padding: 9px;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 120px;
	height: 15px;
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

const WaitingList = ({ count }) => {
	return (
		<StatusItem>
			<StatusText>기다리는 공고 {count}</StatusText>
		</StatusItem>
	);
};

export default WaitingList;
