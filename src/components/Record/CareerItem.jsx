import React from 'react';
import styled from 'styled-components';

const CareerItem = ({ data, isLastItem, onEdit }) => {
	// const today = new Date();
	// const formattedToday = today.toISOString().slice(0,7).replace('-','.');
	// const isPastDue = data.endDate < formattedToday; //true: 기한 경과, false: 기한 내

	return (
		<div style={{ display: 'flex', width: '100%' }}>	
			<TimeLine>
				{/* <Oval category={data.category.categoryKoName} isPastDue={data.isCurrent}></Oval> */}
				{/* <Line category={data.category.categoryKoName} isLastItem={isLastItem} isPastDue={data.isCurrent}></Line> */}
			</TimeLine>
			<Container>
				<div>
					<LevelTag category={data.category.categoryKoName}>{data.category.categoryKoName}</LevelTag>
					<SchoolInfo>
						<SchoolName>{data.name}</SchoolName>
						<Dates>
							{data.startDate} ~ {data.endDate} <Status>(n개월)</Status>
						</Dates>
						<p>
							<span style={{ fontWeight: '600', marginRight: '30px' }}>활동내역</span>
							{data.summary}
						</p>
					</SchoolInfo>
				</div>
				<EditButton id="edit" onClick={onEdit}>
					수정
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
								: props.category === '아르바이트/인턴'
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
							: props.category === '아르바이트/인턴'
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
	height: 166px;
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
							: props.category === '아르바이트/인턴' && props.isPastDue
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
														: props.category === '아르바이트/인턴' && !props.isPastDue
															? '2px dashed #FA7C79'
															: props.category === '교육' && !props.isPastDue
																? '2px dashed #F99538'
																: props.category === '기타활동' && !props.isPastDue
																	? '2px dashed #707070'
																	: '#000000'};
`;

const EditButton = styled.button`
	width: 65px;
	background-color: #f5f5f5;
	color: #707070;
	border: none;
	border-radius: 10px;
	padding: 5px 10px;
	opacity: 0;
	transition: opacity 0.2s ease-in-out;
	position: absolute;
	right: -450px;
	top:0;
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
						: props.category === '아르바이트/인턴'
							? '#FA7C79'
							: props.category === '교육'
								? '#F99538'
								: '#707070'};
	color: white;
	padding: 2px 5px;
	border-radius: 5px;
	font-size: 14px;
	font-family: 'Re	gular';
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
	color: #666;
`;

const Status = styled.span`
	color: #999;
`;
