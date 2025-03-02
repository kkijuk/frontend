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
`;

const TextContainer = styled.div`
	width: 190px;
	gap: 12px;
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const TextNormal = styled.div`
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
	border-radius: 10px;
	background: var(--error, #ff7979);
	border: 1px solid var(--sub-rd, #fa7c79);
	color: var(--white, #fff);
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
	border: 1px solid var(#707070);
	background: #fff;

	color: var(--gray-02, #707070);
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
			<TextContainer>
				<TextNormal>
					태그를 삭제하시면 <TextBold as="span">모든 활동 기록</TextBold>에서
					<br />
					해당 태그가 지워집니다.
				</TextNormal>
				<TextNormal>그래도 삭제하시겠습니까?</TextNormal>
			</TextContainer>
			<ButtonContainer>
				<CancelButton onClick={onCancel}>취소</CancelButton>
				<DeleteButton onClick={onConfirm}>삭제</DeleteButton>
			</ButtonContainer>
		</Box>
	);
}
