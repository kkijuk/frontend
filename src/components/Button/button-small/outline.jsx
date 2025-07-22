import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';

const Container = styled.button`
	display: flex;
	// width: 65px;    // 텍스트 + padding 기준 자동 크기 원할 경우 주석 유지
	// height: 25px;
	padding: 4px 20px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	background: ${Color.gray06};
	border: none;
	cursor: pointer;

	&:hover {
		background: ${Color.gray05};
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
