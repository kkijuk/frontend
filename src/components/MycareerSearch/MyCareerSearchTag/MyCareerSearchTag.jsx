import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useFetchActivityDetail } from '../../../hooks/MyCareerSearch/useFetchActivityDetail';
import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useFetchTagList } from '../../../hooks/MyCareerSearch/useFetchTagList';
import { useFetchActivityByTag } from '../../../hooks/MyCareerSearch/useFetchActivityByTag';

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	margin: 0 auto;
	box-sizing: border-box;
`;

const Box = styled.div`
	width: 98%;
	margin: 10px auto;
	padding: 10px 20px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const TagWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 20px;
`;

const Tag = styled.button`
	padding: 3px 10px;
	border-radius: 20px;
	// background: ${(props) => (props.isActive ? '#3aaf85' : '#f5f5f5')};
	// color: ${(props) => (props.isActive ? '#ffffff' : '#3aaf85')};
	color: #3aaf85;
	border: 1px solid ${(props) => (props.isActive ? '#3aaf85' : '#f5f5f5')};
	font-family: Pretendard;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		color 0.3s ease;

	&:hover {
		background-color: #3aaf85;
		color: #ffffff;
	}
`;

const TopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding-top: 10px;
`;

const TopLeft = styled.div`
	display: flex;
`;

const DetailCareerTitle = styled.div`
	color: var(--black, #000);
	font-family: Inter;
	font-size: 1rem;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-left: 5px;
`;

const DetailCareerDate = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: Inter;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const MainWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 10px;
`;

const DetailWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 15px 10px;
	border-bottom: 1px solid var(--gray-04, #e0e0e0);
	&:last-child {
		border-bottom: none; // 마지막 요소에는 선이 나타나지 않도록
	}
`;

const DetailTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const DetailContent = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-top: 15px;
`;

const BottomWrapper = styled.div`
	display: flex;
	margin-top: 25px;
`;

const DetailTag = styled.div`
	display: flex;
	margin-right: 10px;
	padding: 0 10px;
	border-radius: 0.6875rem;
	background: var(--gray-06, #f5f5f5);
	height: 1.375rem;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	color: var(--main-01, #3aaf85);
	text-align: center;
	font-family: Pretendard;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export default function MyCareerSearchTag({ sortOrder, searchQuery, onViewToggle }) {
	const [selectedTag, setSelectedTag] = useState(null); // 선택된 태그 상태

	const {
		data: activityTagList,
		isLoading: isActivityTagListLoading,
		error: activityTagListError,
	} = useFetchTagList(searchQuery);

	const {
		data: activityData,
		isLoading: isActivityLoading,
		error: activityError,
	} = useFetchActivityByTag(selectedTag, sortOrder);

	useEffect(() => {
		if (activityTagList?.data?.data.length > 0) {
			setSelectedTag(activityTagList.data.data[0].tagId); // 첫 번째 태그 ID를 기본값으로 설정
		}
	}, [activityTagList]);

	const handleTagClick = (tagId) => {
		setSelectedTag(tagId); // 선택된 태그 업데이트
	};

	console.log(activityTagList);
	console.log(activityData);

	return (
		<Container>
			<TagWrapper>
				{isActivityTagListLoading ? (
					<div>로딩중...</div>
				) : (
					activityTagList?.data?.data.map((tag) => (
						<Tag key={tag.tagId} isActive={selectedTag === tag.tagId} onClick={() => handleTagClick(tag.tagId)}>
							{tag.tagName}
						</Tag>
					))
				)}
			</TagWrapper>
			{isActivityLoading
				? 'loading...'
				: activityData?.data.data.map((activityData, idx) => (
						<Box key={idx}>
							<TopWrapper>
								<TopLeft>
									<CareerCategoryCircle category={activityData.careerType} />
									<DetailCareerTitle>
										{activityData.careerTitle} / {activityData.careerAlias}
									</DetailCareerTitle>
								</TopLeft>
								<DetailCareerDate>
									{activityData.startdate} ~ {activityData.endDate}
								</DetailCareerDate>
							</TopWrapper>
							<MainWrapper>
								{activityData.detailList.map((detail, i) => (
									<DetailWrapper>
										<TopWrapper>
											<DetailTitle>{detail.title}</DetailTitle>
											<DetailCareerDate>{detail.endDate}</DetailCareerDate>
										</TopWrapper>
										<DetailContent>{detail.content}</DetailContent>
										<BottomWrapper>
											{detail.detailTag.map((tag, j) => (
												<DetailTag>{tag.tagName}</DetailTag>
											))}
										</BottomWrapper>
									</DetailWrapper>
								))}
							</MainWrapper>
						</Box>
					))}
		</Container>
	);
}
