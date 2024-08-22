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
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;

  .modal-content {
    background-color: #fefefe;
    margin: 5% auto; /* 모달이 화면 중앙에 오도록 조정 */
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-height: 80%; /* 모달의 최대 높이를 설정 */
    overflow-y: auto; /* 모달 내에서 내용 스크롤 가능하도록 설정 */
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

  .image-container {
    text-align: center;
    margin: 20px 0; /* 이미지와 텍스트 사이에 여백 추가 */
  }

  img {
    max-width: 100%;
    height: auto;
  }
    h2 {
    color: #000; /* 검정색 글씨 */
    margin-top: 20px; /* 위치를 아래로 내리기 위한 마진 */
    text-align: center; /* 텍스트 중앙 정렬 */
  }
`;

const AgreementModal = ({ show, handleModal }) => (
  <StyledModal show={show}>
    <div className="modal-content">
      <span className="close" onClick={handleModal}>&times;</span>
      <h2>개인정보 수집 및 이용 동의(필수)</h2>
      <p>
        제 1 조 (목적)<br />
        끼적 서비스 이용을 위해 아래와 같이 개인정보를 수집 및 이용합니다.
동의를 거부할 권리가 있으며, 동의 거부 시 끼적적 회원서비스 이용이 불가합니다.
      </p>
      <div className="image-container">
      <img src="Agreement.png"  />
      </div>
    </div>
  </StyledModal>
);

export default AgreementModal;
