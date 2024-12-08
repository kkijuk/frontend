import React, { useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import SelectContent from '../../components/ResumeExport/SelectContent';
import SelectResume from '../../components/ResumeExport/SelectResume';
import Modal from '../../components/ResumeExport/Modal';

const Section = styled.div`
	width: 820px;
	height: 100%;
`;

const Text = styled.div`
	width: 820px;
	height: 21px;
	margin-bottom: 24px;
	margin-top: ${(props) => props.marginTop || '0px'};

	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Box1 = styled.div`
	width: 820px;
	height: 300px;
`;

const Box2 = styled.div`
	width: 820px;
	height: 505px;
`;

const Button = styled.button`
	width: 720px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	border: none; /* 테두리 제거 */

	background: ${(props) => (props.disabled ? 'var(--gray-03, #d9d9d9)' : 'var(--main-01, #3aaf85)')};
	margin: 30px auto 0;

	display: flex; /* Flexbox로 중앙 정렬 */
	align-items: center; /* 가로 중앙 정렬 */
	justify-content: center; /* 세로 중앙 정렬 추가 */

	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')}; /* 비활성화 시 포인터 변경 */
`;

export default function ResumePdf() {
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
	const [selectedResume, setSelectedResume] = useState(null); // Resume 선택 상태 관리

	const handleButtonClick = () => {
		if (!selectedResume) return; // 선택되지 않은 상태에서 버튼 비활성화
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
						<SelectResume
							onSelect={(boxId) => setSelectedResume(boxId)} // 선택된 Resume Format 업데이트
							selected={selectedResume} // 현재 선택된 Resume Format 전달
						/>
					</Box2>
					<Button
						onClick={handleButtonClick}
						disabled={!selectedResume} // 선택되지 않으면 비활성화
					>
						확인
					</Button>
				</Section>

				{/* 모달 표시 */}
				{isModalOpen && <Modal onClose={handleCloseModal} />}
			</Layout>
		</div>
	);
}
