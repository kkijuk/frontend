import React, { useState } from 'react';
import styled from 'styled-components';

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  width: 525px;
  height: 381px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const Content = styled.p`
  font-size: 14px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const PopupButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: ${({ disabled }) => (disabled ? '#ddd' : '#3aaf85')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export default function UserPopup({ onClose, onConfirm }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <PopupBackground>
      <PopupContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>계정 탈퇴</Title>
        <Content>
          탈퇴하기 버튼을 클릭하면, 7일 후 회원님의 계정을 탈퇴 처리합니다.
          <br />
          <br />
          <BoldText>탈퇴 시점으로부터 7일이 경과하면 기록한 모든 정보는 완전히 삭제되며,</BoldText>
          <br />
          7일 이내에 다시 로그인하면 탈퇴 처리가 취소됩니다.
        </Content>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label>탈퇴 시 유의사항을 확인하였으며, 모두 동의합니다.</label>
        </CheckboxContainer>
        <PopupButton onClick={onConfirm} disabled={!isChecked}>
          탈퇴하기
        </PopupButton>
      </PopupContainer>
    </PopupBackground>
  );
}
