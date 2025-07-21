import React, { useState, useEffect, useRef } from 'react';
import { useCareerList, useCareerDetail } from '@/hooks/MycareerDetail/useCareerQueries';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import DetailAdd from '../../components/MyCareerDetail/DetailAdd';
import DetailAddEdit from '../../components/MyCareerDetail/DetailAddEdit';
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';
import Careerbox from '../../components/MyCareerDetail/CareerBox';
import CareerList from '../../components/MyCareerDetail/CareerList';
import SearchBar from '../../components/Mycareer/shareSearchBar';
import PageExitModal from '@/components/Modal/PageExitModal';
import { CareertextEdit } from '../../api/Mycareer/CareerEdit';
import { trackEvent } from '../../utils/ga4';
import { formatDate } from '../../utils/formateDate';
import { useBlockNavigation } from '@/hooks/useBlockNavigation';
import {
	Container,
	SearchIcon,
	CareerBoxContainer,
	CareerContentContainer,
	TitleContainer,
	TitleBox,
	IconWrapper,
	Title,
	Date,
	Content,
	Line,
	CareerListBox,
	CareerPlus,
	EditActivityContent,
	Textbox,
	EditBoxContainer,
	CancelButton,
	EditButton,
	PageContainer,
	NoContents,
	ContentWrapper,
	EditTag,
	NameTag,
	categoryToColorMap,
} from './MycareerDetail.styles';

const categoryToTypeMap = {
	대외활동: 'activity',
	동아리: 'circle',
	프로젝트: 'project',
	교육: 'edu',
	공모전대회: 'competition',
	경력: 'employment',
	기타: 'etc',
};

export default function MycareerDetail() {
	const location = useLocation();
	const navigate = useNavigate();

	const { careerId, category } = location.state || {};

	const [selectedCareer, setSelectedCareer] = useState({ id: careerId || null, type: category || null });
	const { data: careerList = [] } = useCareerList();
	const { data: details, refetch: refetchDetails } = useCareerDetail(selectedCareer.id, selectedCareer.type);

	const [summary, setSummary] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [editingDetailId, setEditingDetailId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isFixed, setIsFixed] = useState(false);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false); // AddCareerModal용

	const [isExitModalOpen, setIsExitModalOpen] = useState(false);
	const [nextLocation, setNextLocation] = useState(null);

	// 이동 차단 훅
	useBlockNavigation(isAdding, (tx) => {
		setIsExitModalOpen(true);
		setNextLocation(() => tx.retry);
	});

	const handleConfirmLeave = () => {
		setIsExitModalOpen(false);
		setIsAdding(false); // 추가 상태 해제
		nextLocation(); // tx.retry() 실행 = 이동 계속
	};

	const handleCancelLeave = () => {
		setIsExitModalOpen(false);
	};

	useEffect(() => {
		if (details) {
			setSummary(details.summary || '');
		}
	}, [details]);

	const careerBoxRef = useRef(null);
	let isDragging = false;
	let startX, scrollLeft;

	const handleMouseDown = (e) => {
		isDragging = true;
		startX = e.pageX - careerBoxRef.current.offsetLeft;
		scrollLeft = careerBoxRef.current.scrollLeft;
		careerBoxRef.current.style.cursor = 'grabbing';
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - careerBoxRef.current.offsetLeft;
		const walk = (x - startX) * 2;
		careerBoxRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleMouseUp = () => {
		isDragging = false;
		careerBoxRef.current.style.cursor = 'grab';
	};

	useEffect(() => {
		const handleScroll = () => {
			const remainingHeight = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
			setIsFixed(remainingHeight <= 220);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleAddButtonClick = () => setIsAdding(true);
	const handleCancelAdd = async () => {
		setIsAdding(false);
		await refetchDetails();
	};
	const handleSaveAdd = async () => {
		setIsAdding(false);
		await refetchDetails();
	};

	const handleCareerBoxClick = (id, type) => {
		if (isEditing) setIsEditing(false);
		setSelectedCareer({ id, type });
		setIsAdding(false);
	};

	const handleEditClick = () => setIsEditing(true);
	const handleCancelClick = () => setIsEditing(false);

	const handleSaveClick = async () => {
		try {
			await CareertextEdit(selectedCareer.id, details?.category?.categoryEnName, summary);
			alert('활동 내역이 성공적으로 저장되었습니다.');
			setIsEditing(false);
			await refetchDetails();
		} catch (error) {
			alert('활동 내역 저장에 실패했습니다.');
		}
	};

	const handleCloseEdit = async () => {
		setEditingDetailId(null);
		await refetchDetails();
	};

	// 활동 수정 모달 열기
	const openModal = () => {
		setModalData({ ...details });
		setIsEditModalOpen(true);
	};
	const closeModal = () => setIsEditModalOpen(false);

	return (
		<Layout
			title={
				<Container>
					<span>내 커리어</span>
					{isSearchOpen ? (
						<SearchBar onClose={() => setIsSearchOpen(false)} />
					) : (
						<SearchIcon onClick={() => setIsSearchOpen(true)} />
					)}
				</Container>
			}>
			<PageContainer>
				<CareerBoxContainer
					ref={careerBoxRef}
					onMouseDown={handleMouseDown}
					onMouseLeave={handleMouseUp}
					onMouseUp={handleMouseUp}
					onMouseMove={handleMouseMove}>
					{careerList.map((career) => (
						<Careerbox
							key={career.id}
							id={career.id}
							startdate={career.startdate}
							enddate={career.enddate}
							unknown={career.unknown}
							careerName={career.name}
							category={career.category.categoryKoName}
							selected={career.id === selectedCareer.id && career.category.categoryKoName === selectedCareer.type}
							onClick={() => handleCareerBoxClick(career.id, career.category.categoryKoName)}
						/>
					))}
				</CareerBoxContainer>

				<CareerContentContainer isEditing={isEditing}>
					<TitleContainer>
						<TitleBox>
							<Title>{details?.alias || '제목 없음'}</Title>
							<NameTag bgColor={categoryToColorMap[details?.category?.categoryKoName] || categoryToColorMap['default']}>
								{details?.name || 'No Name'}
							</NameTag>
						</TitleBox>
						<IconWrapper onClick={openModal}>
							<svg width="30" height="30" viewBox="0 0 30 30" fill="none">
								<path
									d="M0 23.7509V30H6.24913L24.6799 11.5692L18.4308 5.32009L0 23.7509ZM29.5126 6.73656C30.1625 6.08665 30.1625 5.0368 29.5126 4.38689L25.6131 0.487432C24.9632 -0.162477 23.9133 -0.162477 23.2634 0.487432L20.2139 3.53701L26.463 9.78614L29.5126 6.73656Z"
									fill="#707070"
								/>
							</svg>
						</IconWrapper>
					</TitleContainer>
					<Date>{formatDate(details?.startdate, details?.endDate, details?.unknown)}</Date>
					{isEditing ? (
						<EditActivityContent>
							<Textbox
								value={summary}
								onChange={(e) => e.target.value.length <= 500 && setSummary(e.target.value)}
								maxLength={500}
							/>
							<EditBoxContainer>
								<CancelButton onClick={handleCancelClick}>취소</CancelButton>
								<EditButton onClick={handleSaveClick}>저장</EditButton>
							</EditBoxContainer>
						</EditActivityContent>
					) : (
						<ContentWrapper>
							{details?.summary ? (
								<>
									<Content hasSummary>{details.summary}</Content>
									<EditTag onClick={handleEditClick}>수정</EditTag>
								</>
							) : (
								<Content onClick={handleEditClick} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
									활동내역을 작성해주세요.
								</Content>
							)}
						</ContentWrapper>
					)}
				</CareerContentContainer>

				<Line />

				<CareerListBox>
					{isAdding && (
						<DetailAdd
							onCancel={handleCancelAdd}
							onSave={handleSaveAdd}
							careerId={selectedCareer.id}
							careerType={categoryToTypeMap[selectedCareer.type]}
						/>
					)}

					{details?.detailList?.length > 0 ? (
						details.detailList.map((detail) =>
							editingDetailId === detail.detailId ? (
								<DetailAddEdit
									key={detail.detailId}
									initialTitle={detail.title}
									initialDate={detail.startDate}
									initialEndDate={detail.endDate}
									initialUnknown={detail.unknown}
									initialContents={detail.content}
									initialTags={detail.detailTag || []}
									careerId={selectedCareer.id}
									detailId={detail.detailId}
									onClose={handleCloseEdit}
									onUpdate={refetchDetails}
								/>
							) : (
								<CareerList
									key={detail.detailId}
									title={detail.title}
									startDate={detail.startDate}
									endDate={detail.endDate}
									unknown={detail.unknown}
									contents={detail.content}
									detailTag={detail.detailTag || []}
									careerId={selectedCareer.id}
									detailId={detail.detailId}
									categoryEnName={details?.category?.categoryEnName}
									onClose={handleCloseEdit}
									onUpdate={refetchDetails}
									onEditClick={() => setEditingDetailId(detail.detailId)}
								/>
							),
						)
					) : (
						<NoContents>
							등록된 활동 기록이 없습니다. <br />
							아래 버튼을 눌러 활동 기록을 추가해주세요!
						</NoContents>
					)}
				</CareerListBox>

				<CareerPlus
					onClick={() => {
						trackEvent('add_click', {
							category: 'mycareer',
							detail: 'career_detail',
							action_type: 'add',
							label: '활동 기록 추가',
						});
						window.scrollTo({ top: 0, behavior: 'smooth' });
						handleAddButtonClick();
					}}
					disabled={editingDetailId !== null}
					$isFixed={isFixed}>
					활동 기록 추가
				</CareerPlus>

				{isEditModalOpen && modalData && (
					<AddCareerModal onClose={closeModal} mode="edit" initialData={modalData} onRefresh={refetchDetails} />
				)}

				{isExitModalOpen && <PageExitModal isOpen={true} onClose={handleCancelLeave} onConfirm={handleConfirmLeave} />}
			</PageContainer>
		</Layout>
	);
}
