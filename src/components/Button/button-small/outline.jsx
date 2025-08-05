import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';

const Container = styled.button`
	width: fit-content;
	
	display: flex;
	//width: 65px;
	//height: 25px;
	padding: 4px 20px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border: 1px solid var(--gray-04, #d0d0d0);
	background: var(--white, #fff);

	&:hover {
		border: 1px solid var(--gray-04, #d0d0d0);
		background: var(--gray-06, #f5f5f5);
	}
`;

const Text = styled.div`
	color: ${Color.gray02};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function ButtonSmallSecondary({ text, width, height }) {
	return (
		<Container width={width} height={height}>
			<Text>{text}</Text>
		</Container>
	);
}
