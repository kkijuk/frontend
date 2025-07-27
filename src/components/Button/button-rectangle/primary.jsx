import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';

const Container = styled.button`
	display: flex;
	width: ${(props) => props.width || '160px'};
	height: ${(props) => props.height || '50px'};
	padding: 14px 58px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border: none;
	border-radius: 10px;

	background: ${(props) => (props.disabled ? Color.gray04 : Color.main01)};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

	&:hover {
		background: ${(props) => (props.disabled ? Color.gray04 : Color.main_hover)};
	}
`;

const Text = styled.div`
	color: ${Color.white};
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function ButtonRectanglePrimary({ text, width, height, disabled }) {
	return (
		<Container width={width} height={height} disabled={disabled}>
			<Text>{text}</Text>
		</Container>
	);
}
