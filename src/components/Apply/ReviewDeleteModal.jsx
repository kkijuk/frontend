import React, { useEffect } from 'react';
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
	z-index: 1100;
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
	justify-content: center; 
	gap: 20px;
	margin-top: 15px;
	width: 100%; /* 버튼이 부모 요소를 꽉 채우도록 설정 */
`;


const CancelButton = styled.button`
	width: 120px;
	height: 35px;
	border-radius: 12px;
	cursor: pointer;
	font-family: Regular;
	font-size: 15px;
	border: 1.5px solid #E0E0E0;
	background: #fff;
	color: #707070;
	position: relative;
	text-align: center; 
	z-index: 1500;
	padding: 10px 0;
	display: flex; 
	align-items: center; 
	justify-content: center; 
`;

const ConfirmButton = styled.button`
	width: 120px;
	height: 35px;
	z-index: 1500;
	padding: 10px 0;
	border-radius: 12px;
	cursor: pointer;
	font-family: Regular;
	position: relative;
	font-size: 15px;
	border: 1.5px solid #FF7979;
	background: #FF7979;
	color: white;
	text-align: center; 
	display: flex; 
	align-items: center; 
	justify-content: center; 
`;


const ReviewDeleteModal = ({ onClose, onConfirm }) => {

	//  삭제 버튼을 누르면 모달이 즉시 닫히고, 삭제 실행
	const handleDelete = async () => {
		onClose(); // 모달 닫기 먼저 실행
		await onConfirm(); // 삭제 실행
	};

	return (
		<Background >
			<Modal > 
				<ModalTitle>
					해당 전형 후기를
					<br />
					정말로 삭제하시겠습니까?
				</ModalTitle>
				<ButtonContainer>
					<CancelButton onClick={onClose}>취소</CancelButton>
					<ConfirmButton onClick={handleDelete}>삭제</ConfirmButton>
				</ButtonContainer>
			</Modal>
		</Background>
		
	);
};

export default ReviewDeleteModal;