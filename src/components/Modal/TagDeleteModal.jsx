import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
	width: 230px;
	height: 167px;
	flex-shrink: 0;
	border-radius: 10px;
	background: #fff;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	border: 1px solid black;
`;

const TextNormal = styled.div`
	margin-top: 10px;

	color: #333;
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const TextBold = styled.div`
	color: #333;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const ButtonContainer = styled.div`
	width: auto;
	height: auto;
	gap: 20px;

	display: flex;
	justify-content: center;
`;
const DeleteButton = styled.button`
	width: 75px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--sub-rd, #fa7c79);
	color: var(--sub-rd, #fa7c79);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const CancelButton = styled.button`
	width: 75px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--sub-bu, #77aff2);

	color: var(--sub-bu, #77aff2);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function TagDeleteModal({ onCancel, onConfirm }) {
	return (
		<Box>
			<TextNormal>
				태그를 삭제하시면 <TextBold>모든 활동 기록</TextBold>에서
				<br />
				해당 태그가 지워집니다. <br />
				이 작업은 복구할 수 없습니다.
				<br />
				그래도 삭제하시겠습니까?
			</TextNormal>
			<ButtonContainer>
				<CancelButton onClick={onCancel}>취소</CancelButton>
				<DeleteButton onClick={onConfirm}>삭제</DeleteButton>
			</ButtonContainer>
		</Box>
	);
}
