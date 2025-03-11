import { useState, useEffect } from 'react';
import styled from 'styled-components';

import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useFetchTagList } from '../../../hooks/MycareerSearch/useFetchTagList';
import { useFetchActivityByTag } from '../../../hooks/MycareerSearch/useFetchActivityByTag';

import { useNavigate } from 'react-router-dom';
import { highlightMatch } from '../../../utils/highlightMatch';
import { NotExistSearchComponent } from '../NotExistSearchWrapper';

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
	padding: 2px 20px;
	border-radius: 20px;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 400;
	font-style: normal;
	cursor: pointer;

	background: ${(props) => (props.isActive ? '#3aaf85' : '#f5f5f5')};
	color: ${(props) => (props.isActive ? '#ffffff' : '#3aaf85')};
	border: 1px solid ${(props) => (props.isActive ? '#3aaf85' : '#f5f5f5')};

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
	font-family: Pretenard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-left: 5px;
`;

const DetailCareerDate = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: Pretendard;
	font-size: 12px;
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
	padding: 18px 10px;
	border-bottom: 1px solid var(--gray-04, #e0e0e0);
	&:last-child {
		border-bottom: none; // 마지막 요소에는 선이 나타나지 않도록
	}
`;

const DetailTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const DetailContent = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-top: 16px;
`;

const BottomWrapper = styled.div`
	display: flex;
	margin-top: 25px;
`;

const DetailTag = styled.div`
	padding: 2px 15px;
	border-radius: 20px;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 400;
	font-style: normal;
	cursor: pointer;
	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;

	background: #f5f5f5;
	color: #3aaf85;
	border: 1px solid #f5f5f5;

	b {
		display: inline;
		font-weight: bold;
	}
`;

export default function MyCareerSearchTag({ sortOrder, searchQuery, onViewToggle }) {
	const navigate = useNavigate();

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
		if (activityTagList?.data?.data.tagList.length > 0) {
			setSelectedTag(activityTagList.data.data.tagList[0].tagId); // 첫 번째 태그 ID를 기본값으로 설정
		}
		return () => {
			setSelectedTag(null);
		};
	}, [activityTagList]);

	if (activityTagList?.data?.data.tagList.length === 0) {
		// 검색 결과가 없을 때
		return <NotExistSearchComponent query={searchQuery} onClick={() => navigate('/mycareer')} />;
	}

	return (
		<Container>
			<TagWrapper>
				{isActivityTagListLoading ? (
					<div>로딩중...</div>
				) : (
					activityTagList?.data?.data.tagList.map((tag) => (
						<Tag key={tag.tagId} isActive={selectedTag === tag.tagId} onClick={() => setSelectedTag(tag.tagId)}>
							{highlightMatch(tag.tagName, searchQuery)}
						</Tag>
					))
				)}
			</TagWrapper>
			{isActivityLoading
				? 'loading...'
				: activityData?.data.data.map((activityData, idx) => (
						<Box
							key={idx}
							onClick={() =>
								navigate(`/mycareer/${activityData.category.categoryKoName}/${activityData.careerId}`, {
									state: { careerId: activityData.careerId, category: activityData.category.categoryKoName },
								})
							}>
							<TopWrapper>
								<TopLeft>
									<CareerCategoryCircle category={activityData.category.categoryKoName} />
									<DetailCareerTitle>
										{highlightMatch(activityData.careerTitle, searchQuery)} /{' '}
										{highlightMatch(activityData.careerAlias, searchQuery)}
									</DetailCareerTitle>
								</TopLeft>
							</TopWrapper>
							<MainWrapper>
								{activityData.detailList.map((detail, i) => (
									<DetailWrapper>
										<TopWrapper>
											<DetailTitle>{highlightMatch(detail.title, searchQuery)}</DetailTitle>
											<DetailCareerDate>
												{detail.startDate} ~ {detail.endDate}
											</DetailCareerDate>
										</TopWrapper>
										<DetailContent>{highlightMatch(detail.content, searchQuery)}</DetailContent>
										<BottomWrapper>
											{detail.detailTag.map((tag, j) => (
												<DetailTag>{highlightMatch(tag.tagName, highlightMatch)}</DetailTag>
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
