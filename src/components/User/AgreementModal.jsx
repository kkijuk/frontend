import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const AgreementModal = ({ show, handleModal }) => (
  <StyledModal show={show}>
    <div className="modal-content">
      <span className="close" onClick={handleModal}>&times;</span>
      <h2>약관 내용</h2>
      <p>약관 내용이 여기에 들어갑니다.</p>
    </div>
  </StyledModal>
);

export default AgreementModal;
