import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const Modal = styled.div`
	width: 310px;
	height: 150px;
	background: rgba(255, 255, 255, 1);
	border-radius: 10px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: relative;
`;

const ModalTitle = styled.div`
	color: #333;
	text-align: center;
	font-family: normal;
	font-size: 16px;
	font-weight: 400;
	line-height: 1.8;
	margin-top: -5px;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 20px;
	margin-top: 15px;
`;

const StyledButton = styled.button`
	width: 120px;
	height: 40px; /* 🔥 버튼 크기 살짝 키움 */
	border-radius: 12px;
	cursor: pointer;
	font-family: Regular;
	font-size: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	padding: 0;
	outline: none;
	background: ${({ isDelete }) => (isDelete ? '#FF7979' : '#FFF')};
	color: ${({ isDelete }) => (isDelete ? 'white' : '#707070')};
	border: ${({ isDelete }) => (isDelete ? '1.5px solid #FF7979' : '1.5px solid #E0E0E0')};
	width: 100%;
	height: 100%;
	
	/* 🔥 버튼 클릭 범위 확장 */
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	&:hover {
		background: ${({ isDelete }) => (isDelete ? '#e06666' : '#f5f5f5')};
	}
`;

const ReviewDeleteModal = ({ onClose, onConfirm }) => {
	// ✅ 삭제 버튼 클릭 시 동작
	const handleDelete = async () => {
		onClose(); // ✅ 모달 닫기
		await onConfirm(); // ✅ 삭제 실행
	};

	return (
		<Background>
			<Modal>
				<ModalTitle>
					해당 전형 후기를
					<br />
					정말로 삭제하시겠습니까?
				</ModalTitle>
				<ButtonContainer>
					<StyledButton onClick={onClose}>취소</StyledButton> {/* ✅ 취소 버튼 정상 동작 */}
					<StyledButton isDelete onClick={handleDelete}>삭제</StyledButton> {/* ✅ 삭제 버튼 정상 동작 */}
				</ButtonContainer>
			</Modal>
		</Background>
	);
};

export default ReviewDeleteModal;
