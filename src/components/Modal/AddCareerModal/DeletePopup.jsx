import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { theme } from "../../../constants/theme";
import { Color } from "@/constants/color";

function DeletePopup({ onConfirm, onClose }) {
    const message = `활동과 작성한 기록이 모두 삭제되며,
                    이 작업은 복구할 수 없습니다. 
                    그래도 삭제하시겠습니까?
    `

    return ReactDOM.createPortal(
        <PopupOverlay>
            <PopupContainer>
                <MessageWrapper>
                    <PopupTitle>활동 삭제</PopupTitle>
                    <PopupMessage>{message}</PopupMessage>
                </MessageWrapper>
                <ButtonWrapper>
                    <CancelButton onClick={onClose}>취소</CancelButton>
                    <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
                </ButtonWrapper>
            </PopupContainer>
        </PopupOverlay>
        ,document.body
    );
}

export default DeletePopup;

const PopupOverlay = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
`;

const PopupContainer = styled.div`
    box-sizing: border-box;
    max-width: 300px;
    max-height: 240px;
    padding: 32px 24px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    background: ${Color.white};
    border-radius: 10px;
    text-align: center;
    color: black; 
`;

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const PopupTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const PopupMessage = styled.div`
    width: 200px;
    font-size: 14px;
    font-family: 'Regular';
    text-align: center;
    line-height: 1.5;
    white-space: pre-line;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
`;

const ConfirmButton = styled.button`
    width: 120px;
    height: 35px;

    background: ${Color.error};
    border-radius: 10px;
    border: none;

    color: ${Color.white};
    font-family: 'Regular';
    font-size: 14px;
    
    cursor: pointer;
`;

const CancelButton = styled.button`
    width: 120px;
    height: 35px;
    
    background: white;
    border-radius: 10px;
    border: 1px solid ${Color.gray04};

    color: ${Color.gray02};
    font-family: 'Regular';
    font-size: 14px;

    cursor: pointer;
`;