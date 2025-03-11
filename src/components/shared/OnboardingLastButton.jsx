import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	position: absolute;
	top: 477px;
	left: 306px;

	display: inline-flex;
	padding: 12px 24px;
	justify-content: center;
	align-items: center;
	gap: 10px;

	border-radius: 110px;
	background: var(--main-01, #3aaf85);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

	color: var(--white, #fff);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export default function LastButton() {
	return <Button>지금 끼적하기 ➔</Button>;
}
