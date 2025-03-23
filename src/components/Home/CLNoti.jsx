//ver2
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	gap: 12px;
	width: 400px;
	height: 154px;
	padding: 20px 25px;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	flex-shrink: 0;

	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);
`;

const Title = styled.div`
	align-self: stretch;
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Box = styled.div`
	width: 350px;
	height: 88px;
`;

export default function CLNoti() {
	return (
		<Container>
			<Title>자기소개서 작성 완료를 기다려요</Title>
			<Box></Box>
		</Container>
	);
}
