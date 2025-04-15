import React from 'react';
import styled from 'styled-components';
import MessageIcon from '../../assets/message.svg';
import { theme } from '../../constants/theme';

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
	width: 400px;
	height: 200px;
	background: rgba(255, 255, 255, 1);
	border-radius: 10px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	@media (max-width: ${theme.breakpoints.md}) {
			width: 325px;
		}
`;

/* 각자 수정하실 부분 - 모달 제목  */
const ModalTitle = styled.div`
	color: #333;
text-align: center;
font-family: "Noto Sans KR";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;

@media (max-width: ${theme.breakpoints.md}) {
      font-size: 14px;
    }
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 20px;
	margin-top: 20px;
`;

const CancelButton = styled.button`
	width: 120px;
	height: 35px;
	border-radius: 10px;
  background: var(--main-01, #3AAF85);
	cursor: pointer;
	border: none;
	color: white;
	font-family: Regular;
	font-size: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 5px;

	@media (max-width: ${theme.breakpoints.md}) {
      font-size: 14px;
    }
`;

const ConfirmButton = styled.button`
	width: 120px;
	height: 35px;
	background: white;
	border-radius: 10px;
   border: 1px solid var(--gray-03, #D9D9D9);
	cursor: pointer;
	font-family: Regular;
	font-size: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 5px;
	color: #707070;

	@media (max-width: ${theme.breakpoints.md}) {
      font-size: 14px;
    }
`;

const Info = styled.div`
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: 'Noto Sans KR';
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	margin-top: 10px;

	@media (max-width: ${theme.breakpoints.md}) {
      font-size: 12px;
    }
`;

const Icon = styled.img`
	width: 24px;
	height: 24px;
	margin-bottom: 20px;

	@media (max-width: ${theme.breakpoints.md}) {
      width: 20px;
	height: 20px;
    }
`;

const ApplyDeleteModal = ({ onClose, onConfirm } /* 각자 수정하실 부분 함수 선언에 맞춰 이름을 변경해주세요 */) => (
	<Background>
		<Modal>
		<Icon src={MessageIcon} alt="message icon" />
			<ModalTitle>
				관심분야 설정을 바탕으로 끼적이 더 똑똑해져요!
				<br />
				그래도 설정하지 않고 건너뛸까요?
			</ModalTitle>
			<Info>*나중에 [마이페이지-관심분야 설정]에서 추가할 수 있어요.</Info>
			<ButtonContainer>
				<ConfirmButton onClick={onConfirm} >
					건너뛰기
				</ConfirmButton>
				<CancelButton onClick={onClose} >
					설정 
				</CancelButton>
			</ButtonContainer>
		</Modal>
	</Background>
);

export default ApplyDeleteModal;
