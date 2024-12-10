import React from 'react';
import styled from 'styled-components';

const Chart = styled.div`
	width: 560px;
	height: 160px;
	margin-right: 10px;
	position: relative;
	margin-bottom: 60px;

	display: flex; /* 플렉스 박스 사용 */
	flex-direction: column; /* 세로 배치 */
	justify-content: center; /* 가로 가운데 정렬 */
	align-items: center; /* 세로 가운데 정렬 */
	text-align: center; /* 텍스트 중앙 정렬 */

	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 28px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;

	margin-bottom: 10px; /* 아래 텍스트와 간격 추가 */
`;

const TextContainer = styled.div`
	display: flex; /* 가로 배치 */
	justify-content: center; /* 컨테이너 내의 항목을 가운데 정렬 */
	align-items: center; /* 세로 정렬 */
`;

const Text = styled.div`
	color: black;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	margin-right: 5px; /* 날짜와 간격 추가 */
`;

const Date = styled.div`
	color: var(--main-01, #3aaf85);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function Box() {
	return (
		<Chart>
			<Title>현재 서비스 준비 중입니다</Title>
			<TextContainer>
				<Text>서비스 예정일:</Text>
				<Date>2월 말</Date>
			</TextContainer>
		</Chart>
	);
}
