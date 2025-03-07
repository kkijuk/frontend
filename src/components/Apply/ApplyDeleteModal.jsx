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
	width: 300px;
	height: 230px;
	background: rgba(255, 255, 255, 1);
	border-radius: 10px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
const Title = styled.div`
	color: #333;
    text-align: center;
    font-family: norma;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
`;
const ModalTitle = styled.div`
	color: #333;
	text-align: center;
	font-family: normal;
	font-size: 16px;
	font-weight: 400;
	line-height: 1.8;
	margin-top: 25px;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 20px;
	margin-top: -20px;
`;

const CancelButton = styled.button`
	width: 120px;
	height: 35px;
	border-radius: 10px;
    border: 1px solid var(--gray-04, #E0E0E0);
	cursor: pointer;
	font-family: Regular;
	font-size: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 45px;
`;

const ConfirmButton = styled.button`
	width: 120px;
	height: 35px;
	border-radius: 12px;
	cursor: pointer;
	font-family: Regular;
	font-size: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 45px;
`;

const ApplyDeleteModal = ({ onClose, onConfirm }) => (
	<Background>
		<Modal>
		<Title>
				공고 삭제
			</Title>
			<ModalTitle>
				공고를 삭제하면 해당 공고에
				<br />
				입력한 전형 후기도 모두 삭제됩니다.
				<br />
				정말로 삭제하시겠습니까?
			</ModalTitle>
			<ButtonContainer>
				<CancelButton onClick={onClose} style={{ border: '1.5px solid #E0E0E0', background: '#FFF', color: '#707070' }}>
					취소
				</CancelButton>
				<ConfirmButton onClick={onConfirm} style={{ border: '1.5px solid #FF7979', background: '#FF7979', color: 'white' }}>
					삭제
				</ConfirmButton>
			</ButtonContainer>
		</Modal>
	</Background>
);

export default ApplyDeleteModal;
