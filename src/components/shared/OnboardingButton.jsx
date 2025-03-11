import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	position: absolute;
	top: 427px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	padding: 12px 32px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 110px;
	background: var(--main-01, #3aaf85);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
	color: white;
	font-size: 18px;
	font-weight: bold;
	cursor: pointer;
	border: none;
	margin-bottom: 51px; /* 버튼 위치 조정 */

	color: var(--white, #fff);
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	white-space: nowrap;
`;

export default function OnboardingButton({ onClick }) {
	return <Button onClick={onClick}>200% 활용 가이드 →</Button>;
}
