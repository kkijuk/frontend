import styled from 'styled-components';
import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 0 15px;
	margin-bottom: 20px;
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

const NotExistSearch = styled.div`
	color: var(--gray-02, #707070);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

// TODO: react query로부터 받아온 데이터로 loading, 데이터 바인딩

export default function MyCareerSearchTotalActivityDetail({ activityDetail, isActivityDetailLoading }) {
	const navigate = useNavigate();

	let totalDetailsRendered = 0; // 총 렌더링된 detail 개수를 추적

	return (
		<Container>
			{isActivityDetailLoading ? (
				'loading...'
			) : activityDetail?.data?.data?.length === 0 ? (
				<NotExistSearch>검색 결과가 없어요.</NotExistSearch>
			) : (
				activityDetail?.data?.data.map((activity, idx) => {
					// 현재 activity의 detailList에서 렌더링 가능한 최대 개수 계산
					const remainingDetails = 3 - totalDetailsRendered;
					if (remainingDetails <= 0) return null; // 총 3개를 초과하면 렌더링 중단

					// 현재 activity의 detailList를 제한된 개수만 렌더링
					const detailsToRender = activity.detailList.slice(0, remainingDetails);

					// 렌더링된 detail 개수 업데이트
					totalDetailsRendered += detailsToRender.length;

					return (
						<Box key={idx} onClick={() => navigate(`/mycareer/${activity.category.categoryId}/${activity.careerId}`)}>
							<TopWrapper>
								<TopLeft>
									<CareerCategoryCircle category={activity.careerType} />
									<DetailCareerTitle>
										{activity.careerTitle} / {activity.careerAlias}
									</DetailCareerTitle>
								</TopLeft>
								<DetailCareerDate>
									{activity.startdate} ~ {activity.endDate}
								</DetailCareerDate>
							</TopWrapper>
							<MainWrapper>
								{detailsToRender.map((detail, i) => (
									<DetailWrapper key={i}>
										<TopWrapper>
											<DetailTitle>{detail.title}</DetailTitle>
											<DetailCareerDate>{detail.endDate}</DetailCareerDate>
										</TopWrapper>
										<DetailContent>{detail.content}</DetailContent>
										<BottomWrapper>
											{detail.detailTag.map((tag, j) => (
												<DetailTag key={j}>{tag.tagName}</DetailTag>
											))}
										</BottomWrapper>
									</DetailWrapper>
								))}
							</MainWrapper>
						</Box>
					);
				})
			)}
		</Container>
	);
}
