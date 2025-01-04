import styled from 'styled-components';

import { useFetchActivity } from '../../hooks/MyCareerSearch/useFetchActivity';
import { useFetchActivityDetail } from '../../hooks/MyCareerSearch/useFetchActivityDetail';

import MyCareerSearchTotalActivity from './MyCareerSearchTotal/MyCareerSearchTotalActivity';
import MyCareerSearchTotalActivityDetail from './MyCareerSearchTotal/MyCareerSearchTotalActivityDetail';
import { useFetchTagList } from '../../hooks/MyCareerSearch/useFetchTagList';

import MyCareerSearchTotalActivityTags from './MyCareerSearchTotal/MyCareerSearchTotalActivityTags';

import { getActivityByTag } from '../../api/MycareerSearch/getActivityByTag';
import { useFetchActivityByTag } from '../../hooks/MyCareerSearch/useFetchActivityByTag';

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	margin: 0 auto;
	box-sizing: border-box;
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: Inter;
	font-size: 1rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-left: 20px;
	margin-bottom: 5px;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ChangeViewButton = styled.button`
	border: none;
	cursor: pointer;
	font-family: Inter;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	color: var(--gray-02, #707070);
`;

export default function MyCareerSearchTotal({ sortOrder, searchQuery, onViewToggle }) {
	const {
		data: activity,
		isLoading: isActivityLoading,
		error: activityError,
	} = useFetchActivity(searchQuery, sortOrder);

	const {
		data: activityDetail,
		isLoading: isActivityDetailLoading,
		error: activityDetailError,
	} = useFetchActivityDetail(searchQuery, sortOrder);

	const {
		data: activityTagList,
		isLoading: isActivityTagListLoading,
		error: activityTagListError,
	} = useFetchTagList(searchQuery);

	// const {} = useFetchActivityByTag(tagID, sortOrder);
	console.log(activityTagList);

	const handleButtonClick = (e) => {
		onViewToggle(e.target.value);
	};

	return (
		<Container>
			<Title>활동 ({activity?.data.data.length})</Title>
			<MyCareerSearchTotalActivity activity={activity} isActivityLoading={isActivityLoading} />

			<Wrapper>
				<Title>
					활동기록 ({activityDetail?.data.data.reduce((total, item) => total + (item.detailList?.length || 0), 0)})
				</Title>
				<ChangeViewButton value="2" onClick={handleButtonClick}>
					모두보기
				</ChangeViewButton>
			</Wrapper>
			<MyCareerSearchTotalActivityDetail
				activityDetail={activityDetail}
				isActivityDetailLoading={isActivityDetailLoading}
			/>

			<Wrapper>
				<Title>태그 ({activityTagList?.data.data.detailCount})</Title>
				<ChangeViewButton value="3" onClick={handleButtonClick}>
					모두보기
				</ChangeViewButton>
			</Wrapper>

			<MyCareerSearchTotalActivityTags
				activityTagList={activityTagList}
				isActivityTagListLoading={isActivityTagListLoading}
				sortOrder={sortOrder}
			/>
		</Container>
	);
}
