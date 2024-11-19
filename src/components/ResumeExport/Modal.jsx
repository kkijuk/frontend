import React, { useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import ResumeComponent from './Resume1';

const ModalBackdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
`;

const ModalBox = styled.div`
	width: 820px;
	height: 726px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background: #fff;
	gap: 32px;
	border: 1px solid black;
	padding: 20px;

	position: relative;
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 500;
	line-height: normal;
	margin-bottom: 10px;
	text-align: center;

	margin-top: 20px;
`;

const ShowResume = styled.div`
	width: 800px;
	height: 600px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	overflow-y: auto;
`;

const Button = styled.div`
	width: 569px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	margin-bottom: 10px;
`;

const CloseButton = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	width: 20px;
	height: 20px;
	cursor: pointer;
`;

export default function Modal({ onClose }) {
	const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

	// 이력서 페이지를 캡처해 캔버스로 변환하는 함수
	const handleOnCoverCanvas = async () => {
		const paper = document.querySelector('.resume-page'); // 이력서 영역 선택
		if (paper !== null && paper instanceof HTMLElement) {
			const canvas = await html2canvas(paper, { scale: 2 }); // 캔버스 생성, 고화질을 위해 scale을 2로 설정
			return canvas; // 캔버스 객체 반환
		}
		return null;
	};

	// PDF 다운로드 기능을 수행하는 함수
	const handleDownloadPdf = async () => {
		setIsLoading(true); // 로딩 상태 시작
		const canvas = await handleOnCoverCanvas(); // 이력서 캡처 후 캔버스 객체 생성
		if (canvas) {
			const imageFile = canvas.toDataURL('image/png'); // 이미지 파일 생성
			const imgWidth = canvas.width; // 캡처한 이미지의 너비
			const imgHeight = canvas.height; // 캡처한 이미지의 높이

			console.log('Captured Image Width:', imgWidth);
			console.log('Captured Image Height:', imgHeight);

			const doc = new jsPDF('p', 'mm', 'a4'); // 새로운 PDF 문서 생성, A4 크기로 설정
			const pageWidth = doc.internal.pageSize.getWidth(); // PDF 페이지의 너비를 가져와 pageWidth에 저장
			const pageHeight = doc.internal.pageSize.getHeight(); // PDF 페이지의 높이를 가져와 pageHeight에 저장

			doc.addImage(imageFile, 'JPEG', 0, 0, pageWidth, pageHeight); // PDF에 이미지 추가

			// PDF를 새 탭에서 열기
			window.open(doc.output('bloburl'));

			// PDF를 "resume.pdf" 이름으로 저장
			doc.save('resume.pdf');
		}
		setIsLoading(false); // 로딩 상태 종료
	};

	return (
		<ModalBackdrop onClick={onClose}>
			<ModalBox onClick={(e) => e.stopPropagation()}>
				<CloseButton onClick={onClose}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z"
							fill="#999999"
						/>
					</svg>
				</CloseButton>
				<Title>이력서가 준비되었어요! 아래의 버튼을 눌러 다운로드하세요.</Title>
				<ShowResume>
					<div className="resume-page">
						{' '}
						{/* 이력서 내용을 담는 div */}
						<ResumeComponent />
					</div>
				</ShowResume>
				<Button onClick={handleDownloadPdf}>{isLoading ? '다운로드 중...' : 'pdf로 내보내기'}</Button>
			</ModalBox>
		</ModalBackdrop>
	);
}
