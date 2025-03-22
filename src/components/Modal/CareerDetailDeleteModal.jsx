import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
	width: 252px;
	height: 104px;
	display: flex;
	padding: 32px 24px 24px 24px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 24px;

	box-sizing: content-box;
	border-radius: 10px;
	background: #fff;
`;

const Text = styled.div`
	color: #333;

	text-align: center;
	font-family: 'Noto Sans KR';
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const ButtonContainer = styled.div`
	width: 252px;
	display: flex; /* flex 추가 */
	gap: 12px;
	flex-direction: row; /* 가로 배치 */
	justify-content: center; /* 버튼들을 가로 중앙 정렬 */
	align-items: center; /* 버튼들을 세로 중앙 정렬 */
`;

const CancelButton = styled.button`
	width: 120px;
	height: 35px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--gray-04, #e0e0e0);
	cursor: pointer;

	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	border: none;
`;

const DeleteButton = styled.button`
	width: 120px;
	height: 35px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--error, #ff7979);
	cursor: pointer;

	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	border: none;
`;

export default function CareerDetailDeleteModal({ onCancel, onConfirm }) {
	return (
		<Box>
			<div>
				<Text>해당 활동 기록을</Text>
				<Text>정말로 삭제하시겠습니까?</Text>
			</div>
			<ButtonContainer>
				<CancelButton onClick={onCancel}>취소</CancelButton>
				<DeleteButton onClick={onConfirm}>삭제</DeleteButton>
			</ButtonContainer>
		</Box>
	);
}
