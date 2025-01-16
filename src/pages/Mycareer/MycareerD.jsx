import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Careerbox from '../../components/MyCareerDetail/CareerBox';
import CareerList from '../../components/MyCareerDetail/CareerList';

import DetailAdd from '../../components/MyCareerDetail/DetailAdd';
import CareerNameTag from '../../components/shared/CareerNameTag';
import AddCareerModalEdit from '../../components/Modal/AddCareerModalEdit';
import { CareerViewSelect } from '../../api/Mycareer/CareerviewSelect';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';
import { addCareer } from '../../api/Mycareer/Mycareer';
const CareerBoxList = styled.div`
	display: flex;
	width: 800px;
	height: 72px;
	align-items: flex-start;
	gap: 10px;
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;
`;

const Box = styled.div`
	width: 800px;
	height: 30px;
	box-sizing: border-box;
`;

const CareerTitle = styled.div`
	width: 800px;
	height: 108px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding-bottom: 10px;

	position: relative; /* Add this line */
`;

const ActivityDetails = styled.div`
	width: 720px;
	color: #000;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-top: 18px;
`;

const Container2 = styled.div`
	width: 800px;
	height: 600px;
`;

const CareerListBox = styled.div`
	width: 800px;
	height: 595px;
	overflow-y: auto;
	overflow-x: hidden;
`;

const Container3 = styled.div`
	width: 800px;
	height: 174px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	box-sizing: border-box;
`;

const CareerPlus = styled.button`
	width: 720px;
	height: 50px;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	border: none;
	color: white;
	cursor: pointer;
	position: fixed;
	z-index: 1;

	bottom: 30px;
	background: ${(props) => (props.disabled ? 'var(--gray-03, #D9D9D9)' : 'var(--main-01, #3AAF85)')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const ActivityRecordWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const ActivityRecord = styled.div`
	color: #000;
	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-bottom: 7px;
`;

const ActivityDate = styled.div`
	color: #707070;
	font-family: regular;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CareerNameT = styled.div`
	margin-left: 23px;
`;

const MyCareerText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 28px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

// const EditIconStyled = styled(EditIcon)`
//    width: 30px !important;  /* !important를 사용하여 우선순위를 높임 */
//   height: 30px !important; /* !important를 사용하여 우선순위를 높임 */
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   cursor: pointer;
//   color: #707070 !important; /* color 속성을 사용하여 색상 변경 */
// `;

const Line = styled.div`
	width: 800px;
	height: 2px;
	background: var(--gray-03, #d9d9d9);
`;
const categoryMapping = {
	대외활동: 'activity',
	동아리: 'circle',
	프로젝트: 'project',
	교육: 'edu',
	대회: 'competition',
	경력: 'employment',
};

const formatDate = (dateString) => {
	console.log('formatDate called with:', dateString);
	if (!dateString || typeof dateString !== 'string') return '';
	return dateString.replace(/-/g, '.');
};

export default function MycareerD() {
	const [careers, setCareers] = useState([]); // CareerBox에 들어갈 데이터
	const [selectedCareerDetail, setSelectedCareerDetail] = useState(null); // 선택된 CareerBox의 상세 정보
	const [isAdding, setIsAdding] = useState(false); // 활동 기록 추가 상태
	const { careerId, type } = useParams(); // URL에서 careerId 가져오기
	const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 모달 상태 추가
	const [modalData, setModalData] = useState(null); // 모달에 표시할 데이터 상태

	const navigate = useNavigate(); // useNavigate 훅 추가

	useEffect(() => {
		const fetchCareers = async () => {
			try {
				// API 호출
				const response = await CareerViewSelect('all'); // addCareer API 호출
				if (response.data) {
					// 데이터 매핑
					const mappedData = response.data.map((career) => ({
						...career,
						category: categoryMapping[career.category] || career.category, // 한글 카테고리 -> 영문 카테고리로 변환
					}));
					setCareers(mappedData);
				}
			} catch (error) {
				console.error('Error fetching career data:', error);
			}
		};

		fetchCareers(); // 데이터 가져오기 호출
	}, []);

	useEffect(() => {
		const loadCareerDetail = async (careerId, type) => {
			if (isAdding) setIsAdding(false);

			try {
				const careerDetail = await ViewCareerDetail(careerId, type);
				console.log('선택된 CareerBox의 상세 데이터:', careerDetail);
				setSelectedCareerDetail(careerDetail);
			} catch (error) {
				console.error('Error loading career detail:', error);
			}
		};

		if (careerId && type) {
			loadCareerDetail(careerId, type);
		}
	}, [careerId, type]);

	const handleAddComplete = async () => {
		setIsAdding(false);
		if (careerId && type) {
			const careerDetail = await ViewCareerDetail(careerId, type);
			setSelectedCareerDetail(careerDetail);
		}
	};

	// 모달 열기 핸들러
	const handleEditClick = async () => {
		console.log('Edit icon clicked');

		if (careerId) {
			try {
				const careerDetailData = await ViewCareerDetail(careerId);
				console.log('모달에 보낼 데이터:', careerDetailData);

				setIsEditModalOpen(true);
				setModalData(careerDetailData);
			} catch (error) {
				console.log('Error fetching career details:', error);
			}
		}
	};

	// 모달 닫기 핸들러
	const handleModalClose = () => {
		setIsEditModalOpen(false);
	};

	// 모달 저장 핸들러 (여기에 실제 저장 로직 추가)
	const handleModalSave = (data) => {
		console.log('저장된 데이터:', data);
		// 여기서 데이터를 저장하거나 상태를 업데이트할 수 있습니다.
	};

	return (
		<Layout title="내 커리어">
			<CareerBoxList>
				{careers.map((item) => (
					<Careerbox
						key={item.id}
						startDate={item.startdate}
						endDate={item.enddate}
						careerName={item.Name}
						category={item.category} // 변환된 카테고리 값
						onClick={() => navigate(`/mycareer/${type}/${item.id}`)} // 클릭 시 상세 보기로 이동
					/>
				))}
			</CareerBoxList>

			<Box></Box>
			<CareerTitle>
				<div>
					{selectedCareerDetail && (
						<ActivityRecordWrapper>
							<ActivityRecord>{selectedCareerDetail.data.alias} 활동기록</ActivityRecord>
							<CareerNameT>
								<CareerNameTag
									careerName={selectedCareerDetail.data.careerName}
									category={selectedCareerDetail.data.categoryId}
								/>
							</CareerNameT>
						</ActivityRecordWrapper>
					)}
					{selectedCareerDetail && (
						<>
							<ActivityDate>
								{formatDate(selectedCareerDetail.data.startDate)} ~ {formatDate(selectedCareerDetail.data.endDate)}
							</ActivityDate>
							<ActivityDetails>{selectedCareerDetail.data.summary}</ActivityDetails>
						</>
					)}
				</div>
				{/* <EditIconStyled  onClick={handleEditClick} /> */}
			</CareerTitle>

			<Container2>
				<CareerListBox>
					<Line></Line>
					{selectedCareerDetail?.data?.details?.map((detail, index) => (
						<CareerList
							key={index}
							title={detail.title}
							date={`${formatDate(detail.startDate)} ~ ${formatDate(detail.endDate)}`}
							contents={detail.content}
							detailTag={detail.careerTagList.map((tag) => tag.tagName)}
							careerId={careerId} // careerId 전달
							detailId={detail.id} // detailId 전달
							onUpdate={handleAddComplete} // 이 부분에서 onUpdate로 handleAddComplete 함수 전달
						/>
					))}
					{isAdding && <DetailAdd onCancel={() => setIsAdding(false)} onSave={handleAddComplete} careerId={careerId} />}{' '}
					{/* 콜백 전달 */}
				</CareerListBox>
			</Container2>
			<Container3>
				<CareerPlus onClick={() => setIsAdding(true)} disabled={isAdding}>
					활동 기록 추가
				</CareerPlus>
			</Container3>

			{isEditModalOpen && <AddCareerModalEdit onClose={handleModalClose} onSave={handleModalSave} data={modalData} />}
		</Layout>
	);
}
