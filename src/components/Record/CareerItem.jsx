import React, { useState } from 'react';
import styled from 'styled-components';
import { editCareer } from '../../api/Mycareer/Career';
import { KebabMenu1 } from './KebabMenu';
import AddCareerModal from '../Modal/AddCareerModal/AddCareerModal';

const CareerItem = ({ data, isLastItem, setIsOpen }) => {
	// const today = new Date();
	// const formattedToday = today.toISOString().slice(0,7).replace('-','.');
	// const isPastDue = data.endDate < formattedToday; //true: 기한 경과, false: 기한 내

	// 상태 관리
	const [careerData, setCareerData] = useState(data);
	const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
	const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
	const [isSummaryEditMode, setIsSummaryEditMode] = useState(false);
	const [detail, setDetail] = useState(data.summary);

	// 활동 내역 수정
	const handleDetailSave = async () => {
		try{
			console.log('활동내역수정: ', detail);
			const updatedData = {...data, summary: detail};
			await editCareer(data.id, updatedData);
			setIsSummaryEditMode(false);
			setIsKebabMenuOpen(false);
			
			// 수정된 데이터로 상태 업데이트
			setDetail(updatedData.summary);
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
	const activityMonths = calculateMonths(data.startDate, data.endDate);

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

	if (careerData.category.categoryKoName === '경력') {
		careerData.category.categoryKoName = getEmploymentsType(data.type);
	}

	// 활동내역 placeholder (아래 들여쓰기 상태 고정!)
	const detailPlaceHolder = `· 핵심적인 활동 내용과 담당했던 역할, 주요 성과를 요약해서 작성해 주세요.
· 서술식보다는 개조식으로 간결하게 작성하는 것이 좋아요.
· 이곳에 작성한 내용은 [서류준비-이력서]에 자동으로 삽입됩니다.`

	// unknown 값에 따른 분기 처리
	const endDateToDisplay = careerData.unknown ? '종료 날짜 없음' : data.endData ? data.endDate : '종료 날짜 없음';
	const statusToDisplay = careerData.unknown ? '(진행 중)' : activityMonths ? `(${activityMonths}개월)` : '(진행 중)';

	return (
		<FirstContainer>
			{isCareerModalOpen && 
				<AddCareerModal 
					mode='edit'
					initialData={careerData} 
					// onClose={() => setIsCareerModalOpen(false)} 
					onClose={() => setIsOpen(false)}
			/>}
			<TimeLine>
				<Oval category={careerData.category.categoryKoName} isPastDue={data.isCurrent}></Oval>
				<Line category={careerData.category.categoryKoName} isLastItem={isLastItem} isPastDue={data.isCurrent} isSummaryEditMode={isSummaryEditMode}></Line>
			</TimeLine>
			<Container>
				<div style={{width:'100%'}}>
					<LevelTag category={careerData.category.categoryKoName}>{careerData.category.categoryKoName}</LevelTag>
					<SchoolInfo>
						<SchoolName>{data.name}</SchoolName>
						<Dates>
							{data.startDate ? data.startDate : '시작 날짜 없음'} ~ {endDateToDisplay}
							<Status>{statusToDisplay}</Status>
						</Dates>
						<DetailContainer>
							<div style={{ width:'58px',fontWeight: '600', marginRight: '30px'}}>활동내역</div>
							{isSummaryEditMode ? (
								<DetailWrapper>
									<DetailTextArea 
										placeholder={detailPlaceHolder}
										value = {detail}
										onChange={(e) => setDetail(e.target.value)}
										></DetailTextArea>
									<DetailSaveButton
										onClick={handleDetailSave}>
										확인
									</DetailSaveButton>
								</DetailWrapper>
							) : (
								<>
									{data.summary}
								</>
							)}
						</DetailContainer>
					</SchoolInfo>
				</div>
			</Container>
			<EditButton>
				<KebabMenu1
					onModalOpen={() => setIsCareerModalOpen(true)}
					onDetailOpen={() => setIsSummaryEditMode(true)}
				/>
			</EditButton>
		</FirstContainer>
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
						: props.category === '공모전대회'
							? '#C48DEF'
							: props.category === '프로젝트'
								? '#78D333'
								: props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서'
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
					: props.category === '공모전대회'
						? '3px solid #C48DEF'
						: props.category === '프로젝트'
							? '3px solid #78D333'
							: props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서'
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
					: props.category === '공모전대회' && props.isPastDue
						? '2px solid #C48DEF'
						: props.category === '프로젝트' && props.isPastDue
							? '2px solid #78D333'
							: props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서' && props.isPastDue
								? '2px solid #FA7C79'
								: props.category === '교육' && props.isPastDue
									? '2px solid #F99538'
									: props.category === '기타활동' && props.isPastDue
										? '2px solid #707070'
										: props.category === '동아리' && !props.isPastDue
											? '2px dashed #FCC400'
											: props.category === '대외활동' && !props.isPastDue
												? '2px dashed #77AFF2'
												: props.category === '공모전대회' && !props.isPastDue
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
	position: absolute;
	right: 0;
	top:40px;
	background-color: transparent;
	opacity: 0;
	// transition: opacity 0.2s ease;
	padding: 0px 50px 70px 0px;
`;

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	margin-bottom: 45px;
	font-family: 'Regular';
	position: relative;
	&:hover ${EditButton} {
		opacity: 1;
		cursor: pointer;
	}
`;

const FirstContainer = styled.div`
	width: 100%;
	display: flex;
	position:relative;
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
				: props.category === '공모전대회'
					? '#C48DEF'
					: props.category === '프로젝트'
						? '#78D333'
						: props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서'
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
	// margin-top: 10px;
`

const DetailTextArea = styled.textarea`
	width: 519px;
	height: 76px;
	padding: 10px;
	border-radius: 7px;
	border: none;
	background: var(--gray-05, #F1F1F1);
	font-family: 'Regular';
	font-size: 16px;
	resize: none;
	:: plcaeholder {
		color: #707070;
		font-family: 'Regular';
		font-size: 16px;
		white-space: pre-line;
	}
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
