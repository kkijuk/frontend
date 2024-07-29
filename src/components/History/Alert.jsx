import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Alert = ({closeModal}) => {
    const navigate = useNavigate();
    const handleDelete =()=>{
        navigate('/history/list');
        //삭제 요청
    }

    return (
        <Background>
        <Modal>
            <h3>자기소개서를 삭제하면 복구할 수 없습니다.</h3>
            <h3>이 자기소개서를 정말로 삭제하시겠습니까?</h3>
            <ButtonGroup>
            <Button onClick={closeModal} style={{ background: '#707070', color: 'white' }}>취소</Button>
            <Button onClick={handleDelete} style={{ border: '1.5px solid red', background: '#FFF', color: 'red' }}>삭제</Button>
            </ButtonGroup>
        </Modal>
        </Background>
    );
};

export default Alert;

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
  width: 500px;
  height: 300px;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.div`
  height: 50px;
  width: 100px;
  border-radius: 5px;
  cursor: pointer;
  font-family: Regular;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
