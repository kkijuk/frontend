import React from 'react';
import styled from 'styled-components';
import AgreementImage from './Agree.svg';

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
	z-index: 1000;

	
	.image-container {
		text-align: center;
		margin: 20px 0; /* 이미지와 텍스트 사이에 여백 추가 */
	}

	img {
		max-width: 100%;
		height: auto;
	}
	.modal-content {
		background-color: #fefefe;
		border-radius: 10px;
        background: #FFF;
		margin: 5% auto; /* 모달이 화면 중앙에 오도록 조정 */
		padding: 20px;
		border: 2px solid #FFF;
		width: 540px;
        height: 350px;
        flex-shrink: 0;
		 overflow-y: auto; /* 세로 스크롤 기능 활성화 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
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
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
	}

	p {
	color: var(--gray-02, #707070);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
	}
`;

const AgreementModal = ({ show, handleModal }) => (
	<StyledModal show={show}>
	  <div className="modal-content">
		<span className="close" onClick={handleModal}>
		  &times;
		</span>
		<h2>개인정보처리방침</h2> 
		<p>
		  
		  <br />
		  끼적 서비스 이용을 위해 아래와 같이 개인정보를 수집 및 이용합니다. 동의를 거부할 권리가 있으며, 동의 거부 시
		  끼적 회원서비스 이용이 불가합니다.
		</p>
		<div className="image-container">
		  <img src={AgreementImage} alt="Agreement" />
		</div>
	  </div>
	</StyledModal>
  );
  
  export default AgreementModal;
