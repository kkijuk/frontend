import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useFetchActivityByTag } from '../../../hooks/MyCareerSearch/useFetchActivityByTag';

// 메인 컨테이너
const Container = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	margin: 10px auto;
	margin-left: 12px;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


// 태그 목록 Wrapper
const TagWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 20px;
`;

// 태그 버튼
const Tag = styled.button`
	padding: 3px 10px;
	border-radius: 20px;
	background: ${(props) => (props.isActive ? '#3aaf85' : '#f5f5f5')};
	color: ${(props) => (props.isActive ? '#ffffff' : '#3aaf85')};
	border: 1px solid ${(props) => (props.isActive ? '#3aaf85' : '#f5f5f5')};
	font-family: Pretendard;
	font-size: 0.75rem;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		color 0.3s ease;

	&:hover {
		background-color: #3aaf85;
		color: #ffffff;
	}
`;

// 활동 리스트 Wrapper
const ActivityWrapper = styled.div`
	margin-top: 20px;
`;

// 활동 항목
const ActivityItem = styled.div`

	padding: 25px 15px;
	border-bottom: 1px solid #eaeaea;
	display: flex;
	flex-direction: column;

	&:last-child {
		border-bottom: none;
	}
`;

// 상단 Wrapper (제목과 날짜를 양쪽 정렬)
const ActivityTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;

// 제목 (왼쪽)
const ActivityTitle = styled.h3`
	font-size: 1rem;
	font-weight: 500;
	margin: 0;
`;

// 날짜 (오른쪽)
const ActivityDate = styled.div`
	font-size: 0.85rem;
	color: #6d6d6d;
`;

// 콘텐츠
const ActivityContent = styled.p`
	font-size: 0.85rem;
	color: #6d6d6d;
	margin: 5px 0 0 0;
`;

// 하단 날짜
const ActivityFooter = styled.span`
	font-size: 0.75rem;
	color: #9b9b9b;
	margin-top: 5px;
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

export default function MyCareerSearchTotalActivityTags({ activityTagList, isActivityTagListLoading, sortOrder }) {
	const [selectedTag, setSelectedTag] = useState(null); // 선택된 태그 상태

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
					{/* 태그 목록 */}
					<TagWrapper>
						{activityTagList?.data?.data.tagList.map((tag) => (
							<Tag key={tag.tagId} isActive={selectedTag === tag.tagId} onClick={() => setSelectedTag(tag.tagId)}>
								{tag.tagName}
							</Tag>
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
									<ActivityItem key={detail.careerId}>
										<ActivityTop>
											<ActivityTitle>{detail.title}</ActivityTitle>
											<ActivityDate>{detail.endDate}</ActivityDate>
										</ActivityTop>
										<ActivityContent>{detail.content}</ActivityContent>
										<ActivityFooter>{detail.date}</ActivityFooter>
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
