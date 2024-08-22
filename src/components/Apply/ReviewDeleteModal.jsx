import React from "react";
import styled from "styled-components";

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
  width: 350px;
  height: 280px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ModalTitle = styled.div`
  color: #333;
  text-align: center;
  font-family: 'Light';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;
  margin-top: 35px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 12px;
  cursor: pointer;
  font-family: Regular;
  font-size: 18px;
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
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 45px;
`;




const ReviewDeleteModal = ({ onClose, onConfirm }) => (
  <Background>
      <Modal>
          <ModalTitle>
              해당 전형 후기를<br />
              정말로 삭제하시겠습니까?
          </ModalTitle>
          <ButtonContainer>
              <CancelButton 
                  onClick={onClose} 
                  style={{ border: '1.5px solid #77AFF2', background: '#FFF', color: '#77AFF2' }}>
                  취소
              </CancelButton>
              <ConfirmButton 
                  onClick={async () => {
                      await onConfirm(); // 삭제 작업이 완료된 후
                      onClose(); // 모달 닫기
                  }}  
                  style={{ border: '1.5px solid red', background: '#FFF', color: 'red' }}>
                  삭제
              </ConfirmButton>
          </ButtonContainer>
      </Modal>
  </Background>
);

export default ReviewDeleteModal;




