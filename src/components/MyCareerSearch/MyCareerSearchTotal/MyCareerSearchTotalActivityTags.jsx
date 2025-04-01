import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useFetchActivityByTag } from '../../../hooks/MycareerSearch/useFetchActivityByTag';

import { useNavigate } from 'react-router-dom';
import { highlightMatch } from '../../../utils/highlightMatch';
import { formatDate } from '../../../utils/formateDate';
import TagButton from '../../shared/TagButton';
import { theme } from '../../../constants/theme';

// 메인 컨테이너
const Container = styled.div`
	width: 100%;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 0 15px
	display: grid;
	background-color: #fff;
	grid-template-columns: repeat(1, 1fr);
	gap:gap: 16px;
	border-radius: 10px;
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 0 10px;
		margin-bottom: 12px;
	}
`;

// 태그 목록 Wrapper
const TagWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding-top: 20px;
	gap: 10px;
`;

// 활동 리스트 Wrapper
const ActivityWrapper = styled.div`
	cursor: pointer;
`;

// 활동 항목
const ActivityItem = styled.div`
	border-bottom: 1px solid #eaeaea;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 24px 0;
	width: 100%;
	box-sizing: border-box;

	&:last-child {
		border-bottom: none;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 15px 0;
	}
`;

// 상단 Wrapper (제목과 날짜를 양쪽 정렬)
const ActivityTop = styled.div`
	display: flex;
	justify-content: space-between;
	height: auto;
	align-items: center;
	margin-bottom: 8px;
	flex-wrap: wrap;
	gap: 5px;
	width: 100%;
	box-sizing: border-box;

	@media (max-width: ${theme.breakpoints.md}) {
		margin-bottom: 5px;
	}
`;

// 제목 (왼쪽)
const ActivityTitle = styled.h3`
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
	margin: 0;
`;

// 날짜 (오른쪽)
const ActivityDate = styled.div`
	font-size: 12px;
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-weight: 400;
`;

// 콘텐츠
const ActivityContent = styled.p`
	font-size: 14px;
	color: var(--black, #000);
	margin: 0;
	line-height: 1.5;
`;

// 검색 결과가 없을 때 표시
const NotExistSearch = styled.div`
	color: var(--gray-02, #707070);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	padding-bottom: 40px;
`;

// TODO: API 데이터 형식 피그마와 대조하여 수정 필요

export default function MyCareerSearchTotalActivityTags({
	activityTagList,
	isActivityTagListLoading,
	sortOrder,
	searchQuery,
}) {
	const [selectedTag, setSelectedTag] = useState(null); // 선택된 태그 상태

	const navigate = useNavigate();

	const {
		data: activityData, // 선택된 태그에 대한 활동
		isLoading: isActivityLoading,
		error: activityError,
	} = useFetchActivityByTag(selectedTag, sortOrder);

	// 첫 번째 태그를 기본 선택
	useEffect(() => {
		if (activityTagList?.data?.data.tagList.length > 0) {
			setSelectedTag(activityTagList.data.data.tagList[0].tagId); // 첫 번째 태그 ID를 기본값으로 설정
		}
		return () => setSelectedTag(null);
	}, [activityTagList]);

	let totalDetailsRendered = 0; // 총 렌더링된 detail 개수를 추적

	return (
		<>
			{isActivityTagListLoading ? (
				<p>로딩중...</p>
			) : activityTagList?.data?.data.tagList.length === 0 ? (
				<NotExistSearch>검색 결과가 없어요.</NotExistSearch>
			) : (
				<Container>
					<TagWrapper>
						{/* 태그 목록 */}
						{activityTagList?.data?.data.tagList.map((tag) => (
							<TagButton
								id={tag.tagId}
								isActive={selectedTag === tag.tagId}
								onClick={() => setSelectedTag(tag.tagId)}
								hasWhiteBackground={true}>
								{highlightMatch(tag.tagName, searchQuery)}
							</TagButton>
						))}
					</TagWrapper>

					{/* 활동 리스트 */}
					{isActivityLoading ? (
						<p>로딩중...</p>
					) : activityError ? (
						<p>오류가 발생했습니다. 다시 시도해주세요.</p>
					) : activityData?.data.data.length > 0 ? (
						<ActivityWrapper>
							{activityData?.data.data.map((activity) => {
								const remainingDetails = 3 - totalDetailsRendered;
								if (remainingDetails <= 0) return null; // 총 3개의 detail만 렌더링

								// 현재 activity의 detailList를 제한된 개수만 렌더링
								const detailsToRender = activity.detailList.slice(0, remainingDetails);

								// 렌더링된 detail 개수 업데이트
								totalDetailsRendered += detailsToRender.length;

								return detailsToRender.map((detail, i) => (
									<ActivityItem
										key={detail.careerId}
										onClick={() =>
											navigate(`/mycareer/${activity.category.categoryKoName}/${activity.careerId}`, {
												state: { careerId: activity.careerId, category: activity.category.categoryKoName },
											})
										}>
										<ActivityTop>
											<ActivityTitle>{highlightMatch(detail.title, searchQuery)}</ActivityTitle>
											<ActivityDate>{formatDate(detail.startDate, detail.endDate, detail.unknown)}</ActivityDate>
										</ActivityTop>
										<ActivityContent>{highlightMatch(detail.content, searchQuery)}</ActivityContent>
									</ActivityItem>
								));
							})}
						</ActivityWrapper>
					) : (
						<NotExistSearch>선택된 태그에 대한 활동이 없어요.</NotExistSearch>
					)}
				</Container>
			)}
		</>
	);
}
