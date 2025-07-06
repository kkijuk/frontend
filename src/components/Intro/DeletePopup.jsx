import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Color } from "@/constants/color";

function DeletePopup({ onConfirm, onClose }) {
    const message = '이 자기소개서를 정말 삭제하시겠습니까?'

    return ReactDOM.createPortal(
        <PopupOverlay>
            <PopupContainer>
                <PopupMessage>{message}</PopupMessage>
                <div style={{height:'45px'}}></div>
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
    width: 300px;
    height: 240px;
    background: ${Color.white};
    border-radius: 10px;
    text-align: center;
    color: black;
    font-size: 14px;
    font-family: 'Regular';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PopupMessage = styled.p`
    margin-bottom: 16px;
    width: 200px;
    height: 60px;
    white-space: pre-line;
    font-size: 14px;
    font-family: 'Regular';
    text-align: center;
    line-height: 1.5;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
`;

const ConfirmButton = styled.button`
    width: 120px;
    height: 35px;
    padding: 8px 16px;
    background: ${Color.white};
    border-radius: 10px;
    border: 1px solid ${Color.subRd};
    color: ${Color.subRd};
    font-family: 'Regular';
    font-size: 14px;
    font-weight: 500;
    display: flex;
    gap: 8px;
    justify-content: center;
    cursor: pointer;
`;

const CancelButton = styled.button`
    width: 120px;
    height: 35px;
    padding: 8px 16px;
    background: white;
    border-radius: 10px;
    border: 1px solid ${Color.subRBu};
    color: ${Color.subRBu};
    font-family: 'Regular';
    font-size: 14px;
    font-weight: 500;
    display: flex;
    gap: 8px;
    justify-content: center;
    cursor: pointer;
`;