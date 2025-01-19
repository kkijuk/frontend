import React, { useState } from 'react';
import styled from 'styled-components';
import { editCareer } from '../../api/Mycareer/Career';

const CareerItem = ({ data, isLastItem, onEdit }) => {
	// const today = new Date();
	// const formattedToday = today.toISOString().slice(0,7).replace('-','.');
	// const isPastDue = data.endDate < formattedToday; //true: 기한 경과, false: 기한 내

	// 상태 관리
	const [careerData, setCareerData] = useState(data);
	const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
	const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
	const [isSummaryEditMode, setIsSummaryEditMode] = useState(false);

	const handleDetailSave = () => {
		setIsSummaryEditMode(false);
		setIsKebabMenuOpen(false);
		// 활동내역 수정 api 호출
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
	const displayCategory = data.category.categoryKoName === '경력' ? getEmploymentsType(data.type) : data.category.categoryKoName;

	return (
		<div style={{ display: 'flex', width: '100%' }}>	
			{isCareerModalOpen && 
				<AddCareerModal 
					mode='edit'
					initialData={careerData} 
					onClose={() => setIsCareerModalOpen(false)} 
			/>}
			<TimeLine>
				<Oval category={data.category.categoryKoName} isPastDue={data.isCurrent}></Oval>
				<Line category={data.category.categoryKoName} isLastItem={isLastItem} isPastDue={data.isCurrent} isSummaryEditMode={isSummaryEditMode}></Line>
			</TimeLine>
			<Container>
				<div>
					<LevelTag category={data.category.categoryKoName}>{displayCategory}</LevelTag>
					<SchoolInfo>
						<SchoolName>{data.name}</SchoolName>
						<Dates>
							{data.startdate ? data.startdate : '시작 날짜 없음'} ~ {data.enddate ? data.enddate : '종료 날짜 없음'}
							{activityMonths ? <Status>({activityMonths}개월)</Status> : <Status>(진행 중)</Status>}
						</Dates>
						<DetailContainer>
							<span style={{ fontWeight: '600', marginRight: '30px', lineHeight:'14px' }}>활동내역</span>
							{isSummaryEditMode ? (
								<DetailWrapper>
									<DetailTextArea></DetailTextArea>
									<DetailSaveButton
										onClick={handleDetailSave}
									>확인</DetailSaveButton>
								</DetailWrapper>
							) : (
								<>
									{data.summary}
								</>
							)}
						</DetailContainer>
					</SchoolInfo>
				</div>
				<EditButton>
					<KebabMenu
						onModalOpen={() => setIsCareerModalOpen(true)}
						onDetailOpen={() => setIsSummaryEditMode(true)}
					/>
				</EditButton>

			</Container>
		</div>
	);
};

export default CareerItem;

// Styled Components

const TimeLine = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0px 70px 0px 30px;
`;

const Oval = styled.div`
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  border-radius:50%;
    background-color: ${(props) =>
			!props.isPastDue
				? '#FFFFFF'
				: props.category === '동아리'
					? '#FCC400'
					: props.category === '대외활동'
						? '#77AFF2'
						: props.category === '공모전/대회'
							? '#C48DEF'
							: props.category === '프로젝트'
								? '#78D333'
								: props.category === '경력'
									? '#FA7C79'
									: props.category === '교육'
										? '#F99538'
										: props.category === '기타활동'
											? '#707070'
											: '#000000'};
    border: ${(props) =>
			props.category === '동아리'
				? '3px solid #FCC400'
				: props.category === '대외활동'
					? '3px solid #77AFF2'
					: props.category === '공모전/대회'
						? '3px solid #C48DEF'
						: props.category === '프로젝트'
							? '3px solid #78D333'
							: props.category === '경력'
								? '3px solid #FA7C79'
								: props.category === '교육'
									? '3px solid #F99538'
									: props.category === '기타활동'
										? '3px solid #707070'
										: '#000000'};
    }
`;

const Line = styled.div`
	width: 2px;
	height: ${(props) => (props.isSummaryEditMode ? '220px' : '166px')};
	border-top: none;
	border-right: none;
	border-bottom: none;
	margin-left: 11px;
	border-left: ${(props) =>
		props.isLastItem
			? 'none'
			: props.category === '동아리' && props.isPastDue
				? '2px solid #FCC400'
				: props.category === '대외활동' && props.isPastDue
					? '2px solid #77AFF2'
					: props.category === '공모전/대회' && props.isPastDue
						? '2px solid #C48DEF'
						: props.category === '프로젝트' && props.isPastDue
							? '2px solid #78D333'
							: props.category === '경력' && props.isPastDue
								? '2px solid #FA7C79'
								: props.category === '교육' && props.isPastDue
									? '2px solid #F99538'
									: props.category === '기타활동' && props.isPastDue
										? '2px solid #707070'
										: props.category === '동아리' && !props.isPastDue
											? '2px dashed #FCC400'
											: props.category === '대외활동' && !props.isPastDue
												? '2px dashed #77AFF2'
												: props.category === '공모전/대회' && !props.isPastDue
													? '2px dashed #C48DEF'
													: props.category === '프로젝트' && !props.isPastDue
														? '2px dashed #78D333'
														: props.category === '경력' && !props.isPastDue
															? '2px dashed #FA7C79'
															: props.category === '교육' && !props.isPastDue
																? '2px dashed #F99538'
																: props.category === '기타활동' && !props.isPastDue
																	? '2px dashed #707070'
																	: '#000000'};
`;

const EditButton = styled.button`
	border: none;
	padding: 5px 10px;
	position: absolute;
	right: -450px;
	top:0;
	background-color: #FFF;
`;

const Container = styled.div`
	width: 100%
	display: flex;
	align-items: flex-start;
	margin-bottom: 45px;
	font-family: 'Regular';
	position: relative;
	&:hover ${EditButton} {
		opacity: 1;
		cursor: pointer;
	}
`;

const LevelTag = styled.div`
	width: 80px;
	height: 22px;
	background-color: ${(props) =>
		props.category === '동아리'
			? '#FCC400'
			: props.category === '대외활동'
				? '#77AFF2'
				: props.category === '공모전/대회'
					? '#C48DEF'
					: props.category === '프로젝트'
						? '#78D333'
						: props.category === '경력'
							? '#FA7C79'
							: props.category === '교육'
								? '#F99538'
								: '#707070'};
	color: white;
	border-radius: 5px;
	font-size: 14px;
	font-family: 'Regular';
	font-weight: 700;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	line-height: 25px;
`;

const SchoolInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const SchoolName = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 5px;
`;

const Department = styled.div`
	font-size: 14px;
	color: #333;
	margin-bottom: 5px;
`;

const Dates = styled.div`
	font-size: 16px;
`;

const Status = styled.span`
	margin-left: 10px;
	font-family: 'Regular';
`;

const DetailContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
`;

const DetailWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	margin-top: 10px;
`

const DetailTextArea = styled.textarea`
	width: 430px;
	height: 76px;
	padding: 10px;
	border-radius: 7px;
	border: none;
	background: var(--gray-05, #F1F1F1);
	font-family: 'Regular';
	font-size: 16px;
	resize: none;
`

const DetailSaveButton = styled.button`
	width: 67px;
	height: 96px;
	margin-left: 10px;
	flex-shrink: 0;
	border-radius: 7px;
	border: none;
	background: var(--main-01, #3AAF85);	
	cursor = pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Regular';
	font-size: 12px;
	color: white;
	cursor: pointer;
`
