import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
	border-radius: 10px;
	background: #f5f5f5;
	flex-shrink: 0;
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || 'auto'};
	border: none;
	font-family: Pretendard;
	font-size: 16px;
	color: var(--black, #000);
	padding: 15px 20px;
	box-sizing: border-box;
	z-index: 1;
	position: relative;
`;

export default function InputBox({ height, width, value, onChange }) {
	return <Input height={height} width={width} value={value} onChange={onChange} />;
}
