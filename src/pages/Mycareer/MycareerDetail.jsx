import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import DetailAdd from '../../components/MyCareerDetail/DetailAdd';
import DetailAddEdit from '../../components/MyCareerDetail/DetailAddEdit';
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';
import AddCareerModalEdit from '../../components/Modal/AddCareerModalEdit';
import { useParams } from 'react-router-dom';

import Careerbox from '../../components/MyCareerDetail/CareerBox';
import CareerList from '../../components/MyCareerDetail/CareerList';

import { CareerViewSelect } from '../../api/Mycareer/CareerviewSelect';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';
import { CareertextEdit } from '../../api/Mycareer/CareerEdit';

const CareerBoxContainer = styled.div`
	width: 100%; /* 가로 스크롤을 위해 전체 너비 */
	height: 72px;
	margin-top: 40px;
	display: flex; /* 플렉스 박스를 사용 */
	flex-wrap: nowrap; /* 줄 바꿈을 방지 */
	gap: 10px; /* 박스 간격 */
	overflow-x: auto; /* 가로 스크롤 활성화 */
	overflow-y: hidden; /* 세로 스크롤 방지 */
	white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
`;

const CareerContentContainer = styled.div`
	width: 720px;
	height: ${(props) => (props.isEditing ? '175px' : '88px')}; /* 편집 상태에 따라 높이 변경 */
	margin-top: 30px;
	margin-bottom: 32px;

	/*border: 1px solid black;
	box-sizing: border-box;*/

	position: relative; /* 위치를 기준으로 자식 컴포넌트가 확장 */
`;

const TitleContainer = styled.div`
	height: 30px;
	width: 100%;
	display: flex; /* 요소를 가로로 배치 */
	justify-content: space-between; /* 양쪽 끝에 요소 배치 */
	align-items: center; /* 세로 가운데 정렬 */
`;

const IconWrapper = styled.div`
	width: 30px;
	height: 30px;
	cursor: pointer; /* 클릭 가능한 아이콘 */
`;

const Title = styled.div`
	color: #000;

	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Date = styled.div`
	height: 15px;
	color: #707070;

	margin-top: 7px;
	margin-bottom: 18px;

	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const Content = styled.div`
	width: 720px;
	height: auto;
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-decoration-line: underline;
	text-decoration-style: solid;
	text-decoration-skip-ink: none;
	text-decoration-thickness: auto;
	text-underline-offset: auto;
	text-underline-position: from-font;
`;

const Line = styled.div`
	width: 800px;
	height: 6px;

	background: var(--gray-03, #d9d9d9);
`;

const CareerListBox = styled.div`
	width: 800px;
	height: 595px;
	overflow-y: auto;
	overflow-x: hidden;
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

	color: #fff;

	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	bottom: 30px;
	background: ${(props) => (props.disabled ? 'var(--gray-03, #D9D9D9)' : 'var(--main-01, #3AAF85)')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const EditActivityContent = styled.div`
	width: 720px;
	height: 106px;
	box-sizing: border-box;

	display: flex; /* 가로 배치 */
	justify-content: space-between; /* 양쪽 끝에 배치 */
	align-items: center; /* 세로 가운데 정렬 */
`;

const Textbox = styled.textarea`
	width: 625px;
	height: 106px;
	flex-shrink: 0;
	padding: 10px; /* 텍스트 영역 내부 여백 */
	border: none;
	box-sizing: border-box;
	outline: none; /* 파란색 테두리 제거 */

	border-radius: 10px;
	background: #f5f5f5;
`;

const EditBoxContainer = styled.div`
	width: 80px;
	height: 106px;
	gap: 6px;
	display: flex;
	flex-direction: column; /* 세로 배치 */
	align-items: center; /* 버튼 가운데 정렬 */
`;

const CancelButton = styled.button`
	width: 80px;
	height: 40px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--sub-bu, #77aff2);

	color: var(--sub-bu, #77aff2);
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const EditButton = styled.button`
	width: 80px;
	height: 60px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	border: none;

	color: #fff;

	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const PageContainer = styled.div`
	display: flex;
	flex-direction: column; /* 위에서 아래로 배치 */
	align-items: center; /* 필요하면 가운데 정렬 */
	width: 100%; /* 전체 너비 */
`;

const NoContents = styled.div`
	width: 600px;
	height: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	color: #707070;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	text-align: center;
	position: relative;
`;

const ContentWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%; /* 부모 컨테이너 전체 너비 */
`;

const EditTag = styled.div`
	width: 65px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);

	margin-left: auto; /* ✅ 오른쪽 정렬 */
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function MycareerDetail() {
	const location = useLocation();
	const { careerId, category } = location.state || {};
	const [details, setDetails] = useState(null);
	const [careerList, setCareerList] = useState([]);
	const [selectedCareer, setSelectedCareer] = useState({ id: careerId || null, type: category || null });
	const [isEditing, setIsEditing] = useState(false); // 편집 상태 추가
	const [isAdding, setIsAdding] = useState(false); // 상태 추가  const [editingDetailId, setEditingDetailId] = useState(null); // 현재 DetailAddEdit 상태인 detailId
	const [editingDetailId, setEditingDetailId] = useState(null); // 현재 DetailAddEdit 상태인 detailId
	const [isModalOpen, setIsModalOpen] = useState(false); // 수정 모달 상태 관리
	const [modalData, setModalData] = useState(null); // 모달에 전달할 데이터

	const categoryToTypeMap = {
		대외활동: 'activity',
		동아리: 'circle',
		프로젝트: 'project',
		교육: 'edu',
		대회: 'competition',
		경력: 'employment',
	};

	const fetchCareerDetails = async (id, type) => {
		try {
			const response = await ViewCareerDetail(id, type);
			console.log('가져온 Career Details:', response.data); // 데이터 확인

			// startDate -> startdate로 변환
			const formattedData = {
				...response.data,
				startdate: response.data.startdate || response.data.startDate, // startDate가 있으면 startdate로 변환
				endDate: response.data.endDate || response.data.enddate, // enddate도 일관성 유지
			};

			setDetails(formattedData);
		} catch (error) {
			console.error('Error fetching career details:', error);
		}
	};

	useEffect(() => {
		if (careerId && category) {
			const type = categoryToTypeMap[category] || category;
			fetchCareerDetails(careerId, type);
		}
	}, [careerId, category]);

	useEffect(() => {
		const fetchAllCareers = async () => {
			try {
				const response = await CareerViewSelect('all');
				if (Array.isArray(response.data)) {
					const formattedData = response.data.map((career) => ({
						...career,
						startdate: career.startdate || career.startDate, // startDate가 있으면 startdate로 변환
					}));
					setCareerList(formattedData);
				}
			} catch (error) {
				console.error('Error fetching all careers:', error);
			}
		};

		fetchAllCareers();
	}, []);

	const handleAddButtonClick = () => {
		setIsAdding(true); // DetailAdd 표시
	};

	const handleCancelAdd = () => {
		setIsAdding(false); // DetailAdd 숨기기
	};

	const handleSaveAdd = async () => {
		setIsAdding(false); // DetailAdd 숨기기
		await fetchCareerDetails(careerId, categoryToTypeMap[category]); // 데이터 새로고침
	};

	const handleCareerBoxClick = (id, type) => {
		const mappedType = categoryToTypeMap[type] || type;
		setSelectedCareer({ id, type: mappedType });
		setIsAdding(false);
		fetchCareerDetails(id, mappedType);
	};

	const handleEditClick = () => {
		setIsEditing(true); // 편집 모드로 변경
	};

	const handleSaveClick = async () => {
		try {
			// ✅ 빈 내용도 저장 가능하도록 alert 삭제
			// API 호출
			await CareertextEdit(
				careerId, // 현재 활동 ID
				details?.category?.categoryEnName, // 카테고리 이름
				details?.summary || '', // 빈 문자열도 저장 가능하게 수정
			);

			alert('활동 내역이 성공적으로 저장되었습니다.');
			setIsEditing(false); // 편집 모드 종료
		} catch (error) {
			alert('활동 내역 저장에 실패했습니다.');
		}
	};

	const handleCancelClick = () => {
		setIsEditing(false); // 편집 모드 종료
	};

	const handleCloseEdit = () => {
		setEditingDetailId(null); // DetailAddEdit 닫기
	}; //추가

	const openModal = () => {
		// 모달 열기 + 데이터 설정, 데이터 다보내기
		setModalData({ ...details }); // 전체 details 데이터를 modalData로 설정
		setIsModalOpen(true);
		console.log('Generated initialData for AddCareerModal:', modalData);
	};

	const closeModal = () => {
		setIsModalOpen(false); // 모달 닫기
	};

	return (
		<Layout title="내 커리어">
			<PageContainer>
				<CareerBoxContainer>
					{careerList.map((career) => (
						<Careerbox
							key={career.id}
							id={career.id}
							startdate={career.startdate}
							enddate={career.endDate}
							careerName={career.name}
							category={career.category.categoryKoName}
							selected={career.id === selectedCareer.id && categoryToTypeMap[career.category] === selectedCareer.type}
							onClick={() => handleCareerBoxClick(career.id, career.category)}
						/>
					))}
				</CareerBoxContainer>
				<CareerContentContainer isEditing={isEditing}>
					<TitleContainer>
						<Title>{details?.alias || '제목 없음'}</Title>
						<IconWrapper onClick={openModal}>
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
								<path
									d="M0 23.7509V30H6.24913L24.6799 11.5692L18.4308 5.32009L0 23.7509ZM29.5126 6.73656C30.1625 6.08665 30.1625 5.0368 29.5126 4.38689L25.6131 0.487432C24.9632 -0.162477 23.9133 -0.162477 23.2634 0.487432L20.2139 3.53701L26.463 9.78614L29.5126 6.73656Z"
									fill="#707070"
								/>
							</svg>
						</IconWrapper>
					</TitleContainer>
					<Date>
						{details?.startdate} ~ {details?.endDate}
					</Date>
					{isEditing ? (
						<EditActivityContent>
							<Textbox
								defaultValue={details?.summary || ''}
								onChange={(e) => setDetails({ ...details, summary: e.target.value })}
							/>
							<EditBoxContainer>
								<CancelButton onClick={handleCancelClick}>취소</CancelButton>
								<EditButton onClick={handleSaveClick}>저장</EditButton>
							</EditBoxContainer>
						</EditActivityContent>
					) : (
						<ContentWrapper>
							<Content style={{ textDecoration: details?.summary ? 'none' : 'underline' }}>
								{details?.summary || '활동내역을 작성해주세요.'}
							</Content>
							<EditTag onClick={handleEditClick}>수정</EditTag> {/* ✅ 클릭 시 수정 모드로 변경 */}
						</ContentWrapper>
					)}
				</CareerContentContainer>
				<Line></Line>
				<CareerListBox>
					{details?.detailList?.length > 0 ? (
						details.detailList.map((detail) =>
							editingDetailId === detail.detailId ? (
								<DetailAddEdit
									key={detail.detailId}
									initialTitle={detail.title}
									initialDate={detail.startDate}
									initialContents={detail.content}
									initialTags={detail.detailTag || []}
									careerId={careerId}
									detailId={detail.detailId}
									onClose={handleCloseEdit}
									onUpdate={() => fetchCareerDetails(careerId, selectedCareer.type)}
								/>
							) : (
								<CareerList
									key={detail.detailId}
									title={detail.title}
									date={`${detail.startDate} ~ ${detail.endDate || '진행중'}`}
									contents={detail.content}
									detailTag={detail.detailTag || []}
									careerId={careerId}
									detailId={detail.detailId}
									categoryEnName={details?.category?.categoryEnName}
									onClose={handleCloseEdit}
									onUpdate={() => fetchCareerDetails(careerId, selectedCareer.type)}
									onEditClick={() => handleEditClick(detail.detailId)}
								/>
							),
						)
					) : (
						<NoContents>
							등록된 활동 기록이 없습니다. <br />
							아래 버튼을 눌러 활동 기록을 추가해주세요!
						</NoContents>
					)}
					{isAdding && (
						<DetailAdd
							onCancel={handleCancelAdd}
							onSave={handleSaveAdd}
							careerId={careerId}
							careerType={categoryToTypeMap[category]}
						/>
					)}
				</CareerListBox>

				<CareerPlus onClick={handleAddButtonClick}>활동 기록 추가</CareerPlus>
				{isModalOpen && modalData && (
					<AddCareerModal onClose={closeModal} data={modalData} mode="edit" initialData={modalData} />
				)}
			</PageContainer>
		</Layout>
	);
}
