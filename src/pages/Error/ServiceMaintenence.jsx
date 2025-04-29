import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	/*가운데 배치*/
	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 40px;
	margin-top: 120px;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Title = styled.div`
	color: #000;
	text-align: center;
	font-feature-settings:
		'liga' off,
		'clig' off;
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 44.8px */
`;

const Text = styled.div`
	color: #707070;
	text-align: center;
	font-feature-settings:
		'liga' off,
		'clig' off;
	font-family: 'Pretendard Variable';
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 24px */
`;

const DateRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
`;

const Date = styled.div`
	color: var(--main-01, #3aaf85);
	font-feature-settings:
		'liga' off,
		'clig' off;
	font-family: 'Pretendard Variable';
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%; /* 24px */
`;

const Button = styled.button`
	display: flex;
	width: 160px;
	padding: 16px;
	justify-content: center;
	align-items: center;
	gap: 4px;
	border-radius: 12px;
	background: var(--gray-04, #e0e0e0);
	border: none;

	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: 100%; /* 18px */
`;

const CheckIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path
			d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM6.4 12L2.4 8L3.528 6.872L6.4 9.736L12.472 3.664L13.6 4.8L6.4 12Z"
			fill="var(--main-01, #3AAF85)"
		/>
	</svg>
);

export default function ServiceMaintenence() {
	return (
		<Container>
			<Box>
				<Title>서비스 점검 안내</Title>
				<Text>
					더 나은 끼적을 위해 현재 점검 중입니다. <br />
					불편을 드려 죄송합니다.
				</Text>
				<Text>점검 완료 시점</Text>
				<DateRow>
					<CheckIcon />
					<Date>2025.04.30.(수) 18:00</Date>
				</DateRow>
				<Text>곧 다시 만나요!</Text>
			</Box>
		</Container>
	);
}
