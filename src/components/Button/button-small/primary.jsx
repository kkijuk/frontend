import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';

const Container = styled.button`
	display: flex;
	// width: 65px;    // ← 텍스트 + padding 기준으로 유동 크기 원할 경우 주석 유지
	// height: 25px;
	padding: 4px 20px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	background: ${Color.main01};
	border: none;
	cursor: pointer;

	&:hover {
		background: ${Color.main_hover};
	}
`;

const Text = styled.div`
	color: ${Color.white};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function ButtonSmallPrimary({ text, width, height }) {
	return (
		<Container width={width} height={height}>
			<Text>{text}</Text>
		</Container>
	);
}
