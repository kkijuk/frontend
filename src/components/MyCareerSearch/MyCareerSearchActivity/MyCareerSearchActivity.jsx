import styled from 'styled-components';

import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useFetchActivityDetail } from '../../../hooks/MyCareerSearch/useFetchActivityDetail';

import { useNavigate } from 'react-router-dom';


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

const NotExistSearchWrapper = styled.div`
	color: var(--gray-02, #707070);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
	padding: 20px;

	div {
		margin-bottom: 20px;
	}
`;

const NotExistSearchButton = styled.button`
	border-radius: 0.625rem;
	background: var(--main-01, #3aaf85);
	display: flex;
	width: 11.25rem;
	height: 1.875rem;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	flex-shrink: 0;
	color: #ffffff;
	font-family: Pretendard, sans-serif;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: normal;
	cursor: pointer;
	border: none;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #2e9872;
	}
`;

export default function MyCareerSearchActivity({ sortOrder, searchQuery, onViewToggle }) {
	const navigate = useNavigate();

	const {
		data: activityDetail,
		isLoading: isActivityDetailLoading,
		error: activityDetailError,
	} = useFetchActivityDetail(searchQuery, sortOrder);

	console.log(activityDetail);

	return (
		<Container>
			{isActivityDetailLoading ? (
				'loading...'
			) : activityDetail?.data?.data?.length === 0 ? (
				<>
					<NotExistSearchWrapper>
						<div>'{searchQuery}'의 검색 결과가 없어요.</div>
						<NotExistSearchButton onClick={() => navigate('/mycareer')}>내 활동 보러가기</NotExistSearchButton>
					</NotExistSearchWrapper>
				</>
			) : (
				activityDetail?.data.data.map((activityDetail, idx) => (
					<Box
						key={idx}
						onClick={() => navigate(`/mycareer/${activityDetail.category.categoryId}/${activityDetail.careerId}`)}>
						<TopWrapper>
							<TopLeft>
								<CareerCategoryCircle category={activityDetail.careerType} />
								<DetailCareerTitle>
									{activityDetail.careerTitle} / {activityDetail.careerAlias}
								</DetailCareerTitle>
							</TopLeft>
							<DetailCareerDate>
								{activityDetail.startdate} ~ {activityDetail.endDate}
							</DetailCareerDate>
						</TopWrapper>
						<MainWrapper>
							{activityDetail.detailList.map((detail, i) => (
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
				))
			)}
		</Container>
	);
}
