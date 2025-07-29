//ver2
import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
	width: 350px;
	height: 88px;
	display: flex;
	flex-direction: column; /*세로배치 위해서 display 속성에 추가*/

	gap: 10px;
	justify-content: center; /* 세로 정렬 */
	align-items: center; /* 가로 정렬 */
`;

const Text = styled.div`
	align-self: stretch;
	color: ${Color.gray02};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Button = styled.div`
	display: flex;
	width: 180px;
	padding: 8px 0px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background: ${Color.main01};
	border: none;
	cursor: pointer;

	color: ${Color.white};
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export default function DashboardNothing({ text, buttonText, path }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(path);
	};

	return (
		<Container>
			<Text>{text}</Text>
			<Button onClick={handleClick}>{buttonText}</Button>
		</Container>
	);
}
