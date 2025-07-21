import React, { useState } from 'react';
import styled from 'styled-components';
import { ViewToggleStyled } from '../Mycareer/CareerView.styles';

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);

	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContainer = styled.div`
	display: flex;
	padding: 24px 32px;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	border-radius: 10px;
	background: #fff;

	align-items: center;
`;

const Top = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	align-self: stretch;
`;

const IconWrapper = styled.div`
	width: 18px;
	height: 18px;
`;

const TextContaienr = styled.div`
	display: flex;
	gap: 12px;

	flex-direction: column;
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

const Text2 = styled.div`
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: 'Noto Sans KR';
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const ButtonContaienr = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const CancelButton = styled.div`
	display: flex;
	width: 120px;
	height: 35px;
	justify-content: center;
	align-items: center;
	border: none;

	border-radius: 10px;
	border: 1px solid var(--gray-03, #bdbdbd);
`;

const ExitButton = styled.div`
	display: flex;
	width: 120.002px;
	height: 35px;
	justify-content: center;
	align-items: center;
	border: none;

	border-radius: 10px;
	background: var(--main-01, #3aaf85);
`;

export default function PageExitModal({ isOpen, onClose, onConfirm }) {
	if (!isOpen) return null; // 추가: 모달이 열리지 않으면 null 반환

	return (
		<Overlay onClick={onClose}>
			<ModalContainer onClick={(e) => e.stopPropagation()}>
				<Top>
					<IconWrapper>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 19 18" fill="none">
							<g clipPath="url(#clip0_9920_6058)">
								<path
									d="M9.5 18C4.5293 18 0.5 13.9707 0.5 9C0.5 4.0302 4.5293 0 9.5 0C14.4707 0 18.5 4.0302 18.5 9C18.5 13.9707 14.4707 18 9.5 18ZM9.5 4.5C9.2613 4.5 9.03239 4.59482 8.8636 4.7636C8.69482 4.93239 8.6 5.1613 8.6 5.4V9.9C8.6 10.1387 8.69482 10.3676 8.8636 10.5364C9.03239 10.7052 9.2613 10.8 9.5 10.8C9.7387 10.8 9.96761 10.7052 10.1364 10.5364C10.3052 10.3676 10.4 10.1387 10.4 9.9V5.4C10.4 5.1613 10.3052 4.93239 10.1364 4.7636C9.96761 4.59482 9.7387 4.5 9.5 4.5ZM9.5 13.5C9.7387 13.5 9.96761 13.4052 10.1364 13.2364C10.3052 13.0676 10.4 12.8387 10.4 12.6C10.4 12.3613 10.3052 12.1324 10.1364 11.9636C9.96761 11.7948 9.7387 11.7 9.5 11.7C9.2613 11.7 9.03239 11.7948 8.8636 11.9636C8.69482 12.1324 8.6 12.3613 8.6 12.6C8.6 12.8387 8.69482 13.0676 8.8636 13.2364C9.03239 13.4052 9.2613 13.5 9.5 13.5Z"
									fill="#333F58"
								/>
							</g>
							<defs>
								<clipPath id="clip0_9920_6058">
									<rect width="18" height="18" fill="white" transform="translate(0.5)" />
								</clipPath>
							</defs>
						</svg>
					</IconWrapper>
					<TextContaienr>
						<Text>페이지를 떠나시겠습니까?</Text>
						<Text2>지금 나가면 편집 내용이 저장되지 않아요.</Text2>
					</TextContaienr>
				</Top>
				<ButtonContaienr>
					<ExitButton onClick={onConfirm}>떠나기</ExitButton>
					<CancelButton onClick={onClose}>닫기</CancelButton>
				</ButtonContaienr>
			</ModalContainer>
		</Overlay>
	);
}
