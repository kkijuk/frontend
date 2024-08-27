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

  h2 {
    color: black; 
    margin-top: 20px; 
    text-align: center; 
  }
`;

const AgreementModal = ({ show, handleModal }) => (
  <StyledModal show={show}>
    <div className="modal-content">
      <span className="close" onClick={handleModal}>&times;</span>
      <h2>광고성 정보 수신 동의(선택)</h2>
      <p>1. 수집 및 이용 목적<br />
      회원이 수집 및 이용에 동의한 개인정보를 활용하여, 이메일을 통해 회원에게 유용한 혜택, 이벤트, 광고 정보를 전송할 수 있습니다.
      </p>
      <p>2. 수집하는 개인정보 항목<br />
      필수 동의사항에서 개인정보 수집 및 이용에 동의한 항목
      </p>
      <p>3. 보유 및 이용기간<br />
      회원탈퇴를 요청하거나 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우, 수집 및 이용목적이 달성되거나 이용기간이 종료한 경우 개인정보를 지체 없이 파기합니다.
      단, 상법 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 법령에서 규정한 보존기간 동안 거래내역과 최소한의 기본정보를 보유합니다.
      </p>
      <p>4. 수신동의 거부 및 철회방법 안내<br />
      본 동의는 거부하실 수 있습니다. 다만 거부 시 동의를 통해 제공 가능한 각종 혜택, 이벤트 안내를 받아보실 수 없습니다.
본 수신동의를 철회하고자 할 경우에는 메일링/문자메시지 설정 페이지에서 수신여부를 변경하실 수 있습니다.
      </p>
    </div>
  </StyledModal>
);

export default AgreementModal;