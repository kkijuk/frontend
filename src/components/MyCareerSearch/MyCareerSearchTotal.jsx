import styled from 'styled-components';

import { useFetchActivity } from '../../hooks/MyCareerSearch/useFetchActivity';
import { useFetchActivityDetail } from '../../hooks/MyCareerSearch/useFetchActivityDetail';

import MyCareerSearchTotalActivity from './MyCareerSearchTotal/MyCareerSearchTotalActivity';
import MyCareerSearchTotalActivityDetail from './MyCareerSearchTotal/MyCareerSearchTotalActivityDetail';

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

const activityDetailMockData = {
	message: '활동 조회가 정상적으로 이루어졌습니다.',
	data: [
		{
			careerId: 1, //"활동"에 대한 데이터들 ( 활동 아이디 )
			careerType: '프로젝트', //카테고리
			careerTitle: '웹 프로젝트', //활동 명
			careerAlias: '끼적', //활동 별칭
			startdate: '2024-04-14', //활동 시작 날짜
			endDate: '2024-10-14', //활동 종료 날짜
			detailList: [
				//"활동 기록" 에 대한 데이터들
				{
					detailId: 1, //활동 기록 아이디
					title: '피그마', //활동 기록 제목
					content: '끼적 웹 프로젝트 디자인', //활동 기록 내용
					startDate: '2024-04-14', //활동 기록 시작 날짜
					endDate: '2024-10-14', //활동 기록 종료 날짜
					detailTag: [
						//태그 관련 데이터들
						{
							id: 1, //태그 아이디
							tagName: '피그마 활용 능력', //태그 이름
						},
						{
							id: 2,
							tagName: '커뮤니케이션 활용 능력',
						},
					],
				},
			],
		},
		{
			careerId: 1,
			careerType: '경력', //카테고리
			careerTitle: '학원 채점 아르바이트',
			careerAlias: '근무처',
			startdate: '2024-04-14',
			endDate: '2024-10-14',
			detailList: [
				{
					detailId: 3,
					title: '경력',
					content: '피그마를 사용해서~',
					startDate: '2024-04-14',
					endDate: '2024-10-14',
					detailTag: [
						{
							id: 1,
							tagName: '피그마 활용 능력',
						},
						{
							id: 2,
							tagName: '커뮤니케이션 활용 능력',
						},
						{
							id: 3,
							tagName: '대인관계 능력',
						},
					],
				},
				{
					detailId: 3,
					title: '경력',
					content: '피그마를 사용해서~',
					startDate: '2024-04-14',
					endDate: '2024-10-14',
					detailTag: [
						{
							id: 1,
							tagName: '피그마 활용 능력',
						},
						{
							id: 2,
							tagName: '커뮤니케이션 활용 능력',
						},
						{
							id: 3,
							tagName: '대인관계 능력',
						},
					],
				},
			],
		},
	],
};

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

	const handleButtonClick = (e) => {
		onViewToggle(e.target.value);
	};

	return (
		<Container>
			<Title>활동 ({activity?.data.data.length})</Title>
			<MyCareerSearchTotalActivity activity={activity} isActivityLoading={isActivityLoading} />
			<Wrapper>
				<Title>활동기록 ({activityDetailMockData?.data.length})</Title>
				<ChangeViewButton value="2" onClick={handleButtonClick}>
					모두보기
				</ChangeViewButton>
			</Wrapper>
			<MyCareerSearchTotalActivityDetail
				activityDetail={activityDetailMockData}
				isActivityDetailLoading={isActivityDetailLoading}
			/>
		</Container>
	);
}
