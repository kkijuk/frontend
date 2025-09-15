import { useState, useEffect } from 'react';
import styled from 'styled-components';

import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useFetchTagList } from '../../../hooks/MycareerSearch/useFetchTagList';
import { useFetchActivityByTag } from '../../../hooks/MycareerSearch/useFetchActivityByTag';

import { useNavigate } from 'react-router-dom';
import { highlightMatch } from '../../../utils/highlightMatch';
import { NotExistSearchComponent } from '../NotExistSearchWrapper';
import { formatDate } from '../../../utils/formateDate';
import TagButton from '../../shared/TagButton';
import { Container } from '../common';
import { theme } from '../../../constants/theme';

const Box = styled.div`
	width: 98%;
	margin: 10px auto;
	padding: 0 20px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	box-sizing: border-box;

	@media (max-width: ${theme.breakpoints.md}) {
		width: 95%;
		padding: 10px;
		margin: 8px auto;
	}
`;

const TagWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 20px;
	margin-left: 10px;
`;

const TopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding-top: 10px;
	width: 100%;
	box-sizing: border-box;
	flex-wrap: wrap;
	gap: 5px;

	@media (max-width: ${theme.breakpoints.md}) {
		padding-top: 5px;
	}
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
	width: 100%;
	box-sizing: border-box;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 0 5px;
	}
`;

const DetailWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 18px 10px;
	border-bottom: 1px solid var(--gray-04, #e0e0e0);
	width: 100%;
	box-sizing: border-box;

	&:last-child {
		border-bottom: none;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 12px 5px;
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
	word-break: break-word;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 13px;
		margin-top: 12px;
	}
`;

const BottomWrapper = styled.div`
	display: flex;
	margin-top: 25px;
	flex-wrap: wrap;
	gap: 8px;

	@media (max-width: ${theme.breakpoints.md}) {
		margin-top: 15px;
	}
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
						<TagButton id={tag.tagId} isActive={selectedTag === tag.tagId} onClick={() => setSelectedTag(tag.tagId)}>
							{highlightMatch(tag.tagName, searchQuery)}
						</TagButton>
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
												{formatDate(detail.startDate, detail.endDate, detail.unknown)}
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
