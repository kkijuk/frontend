import React from 'react';
import styled from 'styled-components';
import { Color } from '../../constants/color';

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
	background: ${Color.white};
	border-radius: 10px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const ModalTitle = styled.div`
	color: ${Color.gray01}
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
    border: 1.5px solid ${Color.gray04};
	background: ${Color.white};
	color: ${Color.gray02};
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
	border: 1.5px solid ${Color.red01};
	background: ${Color.red01};
	color: ${Color.white};
	cursor: pointer;
	font-family: Regular;
	font-size: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 45px;
`;

const TagDeleteModal = ({ onCancel, onConfirm }) => (
	<Background>
		<Modal>
			<ModalTitle>
            태그를 삭제하시면 모든 활동 기록에서
				<br />
				해당 태그가 지워집니다.
				<br />
				그래도 삭제하시겠습니까?
			</ModalTitle>
			<ButtonContainer>
				<CancelButton onClick={onCancel}>취소</CancelButton>
				<ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
			</ButtonContainer>
		</Modal>
	</Background>
);

export default TagDeleteModal;
