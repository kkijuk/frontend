import styled from 'styled-components';
import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useNavigate } from 'react-router-dom';
import { highlightMatch } from '../../../utils/highlightMatch';

const Container = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 0 15px;
	margin-bottom: 20px;
`;

const Box = styled.div`
	width: 98%;
	margin: 16px auto;
	padding: 20px 24px 28px 24px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const TopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
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
	padding: 24px 12px;
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
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-top: 16px;
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 16px;
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

const NotExistSearch = styled.div`
	color: var(--gray-02, #707070);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

// TODO: react query로부터 받아온 데이터로 loading, 데이터 바인딩

export default function MyCareerSearchTotalActivityDetail({ activityDetail, isActivityDetailLoading, searchQuery }) {
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
						<Box
							key={idx}
							onClick={() =>
								navigate(`/mycareer/${activity.category.categoryKoName}/${activity.careerId}`, {
									state: { careerId: activity.careerId, category: activity.category.categoryKoName },
								})
							}>
							<TopWrapper>
								<TopLeft>
									<CareerCategoryCircle category={activity.category.categoryKoName} />
									<DetailCareerTitle>
										{highlightMatch(activity.careerTitle, searchQuery)} /{' '}
										{highlightMatch(activity.careerAlias, searchQuery)}
									</DetailCareerTitle>
								</TopLeft>
							</TopWrapper>
							<MainWrapper>
								{detailsToRender.map((detail, i) => (
									<DetailWrapper key={i}>
										<TopWrapper>
											<DetailTitle>{highlightMatch(detail.title, searchQuery)}</DetailTitle>
											<DetailCareerDate>
												{detail.startDate} ~ {detail.endDate}
											</DetailCareerDate>
										</TopWrapper>
										<DetailContent>{highlightMatch(detail.content, searchQuery)}</DetailContent>
										<BottomWrapper>
											{detail.detailTag.map((tag, j) => (
												<DetailTag key={j}>{highlightMatch(tag.tagName, searchQuery)}</DetailTag>
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
