//components/History/Resume/AddCareerModalEdit, /shared/AddCareerModal/Edit
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

/* 각자 수정하실 부분 - 모달 제목  */
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


const CareerDeleteModal = ({ onClose, onConfirm }) => ( /* 각자 수정하실 부분 함수 선언에 맞춰 이름을 변경해주세요 */
  <Background>
    <Modal>
      <ModalTitle>
        활동과 작성한 기록이 모두 삭제되며,<br />
        이 작업은 복구할 수 없습니다.<br />
        그래도 삭제하시겠습니까?
      </ModalTitle>
      <ButtonContainer>
        <CancelButton onClick={onClose} style={{ border: '1.5px solid #77AFF2', background: '#FFF', color: '#77AFF2'  }}>취소</CancelButton>
        <ConfirmButton onClick={onConfirm} style={{ border: '1.5px solid red', background: '#FFF', color: 'red' }}>삭제</ConfirmButton>
      </ButtonContainer>
    </Modal>
  </Background>
);

export default CareerDeleteModal;