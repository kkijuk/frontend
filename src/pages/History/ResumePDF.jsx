import React, { useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import SelectContent from '../../components/ResumeExport/SelectContent'; //1. 이력서에 ~ 아래 있는 박스
import SelectResume from '../../components/ResumeExport/SelectResume'; //2. 내보내기할 양식~ 아래 있는 박스
import Modal from '../../components/ResumeExport/Modal';

const Section = styled.div`
	width: 820px;
	height: 100%;
	border: 1px solid black;
`;

const Text = styled.div`
	width: 820px;
	height: 21px;
	margin-bottom: 24px;
	margin-top: ${(props) => props.marginTop || '0px'};

	/*text 스타일*/
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	border: 1px solid black;
	box-sizing: border-box;
`;

const Box1 = styled.div`
	width: 820px;
	height: 300px;

	border: 1px solid black;
	box-sizing: border-box;
`;

const Box2 = styled.div`
	width: 820px;
	height: 505px;

	border: 1px solid black;
	box-sizing: border-box;
`;

const Button = styled.div`
	width: 720px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	margin: 30px auto 0;

	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function ResumePdf() {
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

	const handleButtonClick = () => {
		setIsModalOpen(true); // 버튼 클릭 시 모달 열기
	};

	const handleCloseModal = () => {
		setIsModalOpen(false); // 모달 닫기
	};

	return (
		<div>
			<Layout title="이력서 내보내기">
				<Section>
					<Text marginTop="36px">1. 이력서에 포함할 내용을 선택하세요.</Text>
					<Box1>
						<SelectContent />
					</Box1>
					<Text marginTop="48px">2. 내보내기할 양식을 선택하세요.</Text>
					<Box2>
						<SelectResume />
					</Box2>
					<Button onClick={handleButtonClick}>확인</Button>
				</Section>

				{/* 모달 표시 */}
				{isModalOpen && <Modal onClose={handleCloseModal} />}
			</Layout>
		</div>
	);
}
