import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
	width: auto;
	height: auto;
	padding-top: 120px;
	margin: 0 auto; /* 가로 중앙 정렬 */
	display: flex;
	flex-direction: column;
	align-items: center; /* 내부 요소 가운데 정렬 */
	text-align: center; /* 텍스트 가운데 정렬 */
	margin-bottom: 200px;
`;

const ErrorNum = styled.div`
	align-self: stretch;
	color: var(--main-01, #3aaf85);
	text-align: center;
	font-feature-settings:
		'liga' off,
		'clig' off;
	font-family: Pretendard;
	font-size: 48px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 67.2px */

	margin-bottom: 24px;
`;

const Title = styled.div`
	color: #000;

	font-feature-settings:
		'liga' off,
		'clig' off;
	/* 디자인/heading/heading-07 */
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 44.8px */

	margin-bottom: 16px;
`;

const Content = styled.div`
	color: #707070;

	text-align: center;
	font-feature-settings:
		'liga' off,
		'clig' off;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 24px */

	margin-bottom: 40px;
`;

const ButtonBox = styled.div`
	height: auto;
	width: auto;
	gap: 16px;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const BackButton = styled.button`
	display: flex;
	width: 160px;
	padding: 16px;
	justify-content: center;
	align-items: center;
	gap: 4px;
	border-radius: 12px;
	background: var(--gray-04, #e0e0e0);

	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: 100%; /* 18px */
	border: none;
	cursor: pointer;
`;

const HomeButton = styled.button`
	display: flex;
	width: 160px;
	padding: 16px;
	justify-content: center;
	align-items: center;
	gap: 4px;
	border-radius: 12px;
	background: var(--main-01, #3aaf85);

	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: 100%; /* 18px */
	border: none;
	cursor: pointer;
`;

export default function Error({ title, content, showErrorNum = true, showHomeButton = true }) {
	const navigate = useNavigate();
	return (
		<Container>
			{showErrorNum && <ErrorNum>404 ERROR</ErrorNum>}
			<Title>{title}</Title>
			<Content>{content}</Content>
			<ButtonBox>
				<BackButton onClick={() => window.history.back()}>이전 화면으로</BackButton>
				{showHomeButton && <HomeButton onClick={() => navigate('/home')}>홈으로</HomeButton>}
			</ButtonBox>
		</Container>
	);
}
