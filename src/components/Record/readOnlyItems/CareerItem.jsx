import React, { useState, useEffect } from 'react';
import { TimeLine,
    Oval,
    Line,
    EditButton,
    Container,
    LevelTag,
    SchoolInfo,
    SchoolName,
    Department,
    Dates,
    Status,
    DetailContainer,
    DetailLabel,
    DetailWrapper,
    DetailTextArea,
    ButtonWrapper,
    DetailSaveButton,
    FirstContainer   
} from './styles/Career.styles';
import { useNavigate } from 'react-router-dom';
import { editCareerSummary } from '../../../api/Mycareer/Career';
import { KebabMenu1 } from '../KebabMenu';
import AddCareerModal from '../../Modal/AddCareerModal/AddCareerModal';
import { trackEvent } from '../../../utils/ga4';
import { formateDateDashToDot } from '../../../utils/formateDate';
import useRecordStore from '@/stores/useRecordStore';

const categoryMap = {
	'CIRCLE': 'activitiesAndExperiences',
	'ACTIVITY': 'activitiesAndExperiences',
	'ETC': 'activitiesAndExperiences',
	'PROJECT': 'projects',
	'COM': 'projects',
	'EMP': 'employments',
	'EDU': 'eduCareers',

}

const CareerItem = ({ data, isLastItem, onEditCareer }) => {
	// const today = new Date();
	// const formattedToday = today.toISOString().slice(0,7).replace('-','.');
	// const isPastDue = data.endDate < formattedToday; //true: 기한 경과, false: 기한 내

	const navigate = useNavigate();

	const store = useRecordStore();
	const { 
		editCareerSummary,
		activitesAndExperiences,
		projects,
		employments,
		eduCareers,
	} = store;

	console.log('CareerItem: ', data);

	// 상태 관리
	const [careerData, setCareerData] = useState(data);
	const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
	const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
	const [isSummaryEditMode, setIsSummaryEditMode] = useState(false);
	const [detail, setDetail] = useState(data.summary);

	// 내커리어-상세페이지로 이동
	const handleNavigate = () => {
		navigate(`/mycareer/${data.category.categoryKoName}/${data.id}`,{
			state: {
				careerId: data.id,
				category: data.category.categoryKoName,
			},
		});
	}

	// GA4
	const trackCategoryEvent = (category) => {
		switch(category) {
			case 'CIRCLE':
			case 'ACTIVITY':
			case 'ETC':
				trackEvent('edit_click', {
					category: 'resume',
					detail: 'edit_activitiesAndExperiences_summary',
					action_type: 'edit',
					label: '활동내역 수정하기',
				});
				break;
			case 'PROJECT':
			case 'COM':
				trackEvent('edit_click', {
					category: 'resume',
					detail: 'edit_project_summary',
					action_type: 'edit',
					label: '활동내역 수정하기',
				});
				break;
			case 'EMP':
				trackEvent('edit_click', {
					category: 'resume',
					detail: 'edit_career_summary',
					action_type: 'edit',
					label: '활동내역 수정하기',
				});
				break;
			case 'EDU':
				trackEvent('edit_click', {
					category: 'resume',
					detail: 'edit_training_summary',
					action_type: 'edit',
					label: '활동내역 수정하기',
				});
				break;
		}
	}

	useEffect(() => {
		console.log(store[categoryMap[data.category.categoryEnName]]?.find((item) => item.id === data.id)?.summary);
	}, [data.id, data.category.categoryEnName, store]);

	// 활동 내역 수정
	const handleDetailSave = async () => {
		try{
			console.log('활동내역수정: ', detail);
			const updatedData = {
				type: data.category.categoryEnName,
				summary: detail
			};
			// await editCareerSummary(data.id, updatedData);
			await editCareerSummary(data.id, updatedData, categoryMap[data.category.categoryEnName]);
			setIsSummaryEditMode(false);
			setIsKebabMenuOpen(false);
			
			// window.location.reload();
			trackCategoryEvent(data.category.categoryEnName);
		} catch (error) {
			console.error('활동내역 수정 실패: ', error);
		}
	}

	// 활동 기간 계산
	const calculateMonths = (start, end) => {
		if (!end) return null; // endDate가 null이면 null 반환
	
		const startDate = new Date(start);
		const endDate = new Date(end);
		const yearDiff = endDate.getFullYear() - startDate.getFullYear();
		const monthDiff = endDate.getMonth() - startDate.getMonth();
	
		return yearDiff * 12 + monthDiff + 1; // 총 개월 수 계산
	};
	const activityMonths = calculateMonths(data.startdate, data.enddate);

	// 경력인 경우, 태그에는 categoryKoName이 아닌 type으로 표시
	const getEmploymentsType = (type) => {
		switch(type) {
			case 'PART_TIME':
				return '아르바이트';
			case 'INTERNSHIP':
				return '인턴';
			case 'FULL_TIME':
				return '정규직';
			case 'CONTRACT':
				return '계약직';
			case 'FREELANCE':
				return '프리랜서';
			default:
				return '기타';
		}
	};

	// if (careerData.category.categoryKoName === '경력') {
	// 	careerData.category.categoryKoName = getEmploymentsType(data.type);
	// }

	const displayKoName = data.category.categoryKoName === '경력'
	? getEmploymentsType(data.type)
	: data.category.categoryKoName === '공모전대회'
	? '공모전/대회'
	: data.category.categoryKoName;

	// 활동내역 placeholder (아래 들여쓰기 상태 고정!)
	const detailPlaceHolder = `· 핵심적인 활동 내용과 담당했던 역할, 주요 성과를 요약해서 작성해 주세요.
· 서술식보다는 개조식으로 간결하게 작성하는 것이 좋아요.
· 이곳에 작성한 내용은 [서류준비-이력서]에 자동으로 삽입됩니다.`

	// unknown 값에 따른 분기 처리
	const endDateToDisplay = careerData.unknown ? '종료 날짜 없음' : data.enddate ? data.enddate : '종료 날짜 없음';
	const statusToDisplay = careerData.unknown ? '(진행 중)' : activityMonths ? `(${activityMonths}개월)` : '(진행 중)';

	// 활동 진행 중 여부 확인(Line 스타일 적용 방식 선택 위해)
	const today = new Date();
	const checkPastDue = data.enddate ? new Date(data.enddate) < today : false;


	return (
		<FirstContainer>
			<TimeLine>
				<Oval category={displayKoName} isPastDue={checkPastDue}></Oval>
				<Line category={displayKoName} isLastItem={isLastItem} isPastDue={checkPastDue} isSummaryEditMode={isSummaryEditMode}></Line>
			</TimeLine>
			<Container onClick = {!isSummaryEditMode ? handleNavigate : null} isLastItem={isLastItem}>
				<div style={{width:'100%'}}>
					<LevelTag category={displayKoName}>{displayKoName}</LevelTag>
					<SchoolInfo>
						<SchoolName>{data.name} 
							<span style={{fontWeight:'normal'}}> / {data.alias}</span>
						</SchoolName>
						<Dates>
							{formateDateDashToDot(data.startdate) ? formateDateDashToDot(data.startdate) : '시작 날짜 없음'} ~ {formateDateDashToDot(endDateToDisplay)}
							<Status>{statusToDisplay}</Status>
						</Dates>
						<DetailContainer>
							<DetailLabel>활동내역</DetailLabel>
							{isSummaryEditMode ? (
								<DetailWrapper>
									<DetailTextArea 
										placeholder={detailPlaceHolder}
										value = {detail}
										onChange={(e) => setDetail(e.target.value)}
									/>
									<ButtonWrapper>
										<DetailSaveButton
											onClick={() => {setIsSummaryEditMode(false);}}
											style={{backgroundColor:'#FFF', color:'#707070', border: '1px solid var(--sub-bu, #D0D0D0)'}}>
											취소
										</DetailSaveButton>
										<DetailSaveButton
											onClick={handleDetailSave}>
											확인
										</DetailSaveButton>
									</ButtonWrapper>
								</DetailWrapper>
							) : (
								<>
									{store[categoryMap[data.category.categoryEnName]]?.find((item) => item.id === data.id)?.summary}
								</>
							)}
						</DetailContainer>
					</SchoolInfo>
				</div>
			</Container>
			<EditButton $isEditing={isSummaryEditMode}>
				<KebabMenu1
					onModalOpen={() => onEditCareer(data)}
					onDetailOpen={() => setIsSummaryEditMode(true)}
				/>
			</EditButton>
		</FirstContainer>
	);
};

export default CareerItem;
