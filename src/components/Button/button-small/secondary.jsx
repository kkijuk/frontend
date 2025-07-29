import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';

const Container = styled.button`
	display: flex;
	//width: 65px;
	//height: 25px;
	padding: 4px 20px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);
	border: none;
	cursor: pointer;

	&:hover {
		background: var(--gray-05, #e1e1e1);
	}
`;

const Text = styled.div`
	color: var(--gray-02, #707070);
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
