import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useFetchActivity } from '../../hooks/MycareerSearch/useFetchActivity';
import { useFetchActivityDetail } from '../../hooks/MycareerSearch/useFetchActivityDetail';

import MyCareerSearchTotalActivity from './MyCareerSearchTotal/MyCareerSearchTotalActivity';
import MyCareerSearchTotalActivityDetail from './MyCareerSearchTotal/MyCareerSearchTotalActivityDetail';
import { useFetchTagList } from '../../hooks/MycareerSearch/useFetchTagList';
import { theme } from '../../constants/theme';

import MyCareerSearchTotalActivityTags from './MyCareerSearchTotal/MyCareerSearchTotalActivityTags';
import { NotExistSearchComponent } from './NotExistSearchWrapper';
import { Container } from './common';

const Title = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-left: 20px;
	margin-bottom: 0px;

	@media (max-width: 600px) {
		font-size: 16px;
		margin-left: 10px;
	}
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
	width: 100%;
	box-sizing: border-box;
	padding: 0 10px;

	@media (max-width: 600px) {
		padding: 0 5px;
		margin-bottom: 12px;
		flex-wrap: wrap;
		gap: 8px;
	}
`;

const ChangeViewButton = styled.button`
	color: var(--gray-02, #707070);
	border: none;
	cursor: pointer;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	@media (max-width: 600px) {
		font-size: 12px;
		padding: 5px 10px;
	}
`;

export default function MyCareerSearchTotal({ sortOrder, searchQuery, onViewToggle }) {
	const navigate = useNavigate();

	const {
		data: activity, // 전체 활동
		isLoading: isActivityLoading,
		error: activityError,
	} = useFetchActivity(searchQuery, sortOrder);

	const {
		data: activityDetail, // 전체 활동기록
		isLoading: isActivityDetailLoading,
		error: activityDetailError,
	} = useFetchActivityDetail(searchQuery, sortOrder);

	const {
		data: activityTagList, // 전체 태그
		isLoading: isActivityTagListLoading,
		error: activityTagListError,
	} = useFetchTagList(searchQuery);

	const handleButtonClick = (e) => {
		onViewToggle(e.target.value);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const getActivityDetailCount = () => {
		return activityDetail?.data.data.reduce((total, item) => total + (item.detailList?.length || 0), 0) || 0;
	};

	const isAllDataEmpty =
		!isActivityLoading &&
		!isActivityDetailLoading &&
		!isActivityTagListLoading &&
		activity?.data.data.length === 0 &&
		getActivityDetailCount() === 0 &&
		activityTagList?.data.data.detailCount === 0;

	return (
		<Container>
			{isAllDataEmpty ? (
				<NotExistSearchComponent query={searchQuery} onClick={() => navigate('/mycareer')} />
			) : (
				<>
					<Wrapper>
						<Title>활동 ({activity?.data.data.length || 0})</Title>
					</Wrapper>
					<MyCareerSearchTotalActivity activity={activity} isActivityLoading={isActivityLoading} />

					<Wrapper>
						<Title>활동기록 ({getActivityDetailCount()})</Title>
						<ChangeViewButton value="2" onClick={handleButtonClick}>
							결과 전체보기
						</ChangeViewButton>
					</Wrapper>
					<MyCareerSearchTotalActivityDetail
						activityDetail={activityDetail}
						isActivityDetailLoading={isActivityDetailLoading}
						searchQuery={searchQuery}
					/>

					<Wrapper>
						<Title>태그 ({activityTagList?.data.data.detailCount || 0})</Title>
						<ChangeViewButton value="3" onClick={handleButtonClick}>
							결과 전체보기
						</ChangeViewButton>
					</Wrapper>

					<MyCareerSearchTotalActivityTags
						activityTagList={activityTagList}
						isActivityTagListLoading={isActivityTagListLoading}
						sortOrder={sortOrder}
						searchQuery={searchQuery}
					/>
				</>
			)}
		</Container>
	);
}
