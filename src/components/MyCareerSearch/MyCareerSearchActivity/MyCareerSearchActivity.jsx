import styled from 'styled-components';

import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { NotExistSearchComponent } from '../NotExistSearchWrapper';
import { useFetchActivityDetail } from '../../../hooks/MycareerSearch/useFetchActivityDetail';

import { useNavigate } from 'react-router-dom';
import { highlightMatch } from '../../../utils/highlightMatch';

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	margin: 0 auto;
	box-sizing: border-box;
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
	padding-top: 10px;
`;

const TopLeft = styled.div`
	display: flex;
`;

const DetailCareerTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
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
	font-size: 14px;
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

export default function MyCareerSearchActivity({ sortOrder, searchQuery, onViewToggle }) {
	const navigate = useNavigate();

	const {
		data: activityDetail,
		isLoading: isActivityDetailLoading,
		error: activityDetailError,
	} = useFetchActivityDetail(searchQuery, sortOrder);

	return (
		<Container>
			{isActivityDetailLoading ? (
				'loading...'
			) : activityDetail?.data?.data?.length === 0 ? (
				// 검색 결과가 없을 때
				<NotExistSearchComponent query={searchQuery} onClick={() => navigate('/mycareer')} />
			) : (
				activityDetail?.data.data.map((activityDetail, idx) => (
					<Box
						key={idx}
						onClick={() =>
							navigate(`/mycareer/${activityDetail.category.categoryKoName}/${activityDetail.careerId}`, {
								state: { careerId: activityDetail.careerId, category: activityDetail.category.categoryKoName },
							})
						}>
						<TopWrapper>
							<TopLeft>
								<CareerCategoryCircle category={activityDetail.category.categoryKoName} />
								<DetailCareerTitle>
									{highlightMatch(activityDetail.careerTitle, searchQuery)} /{' '}
									{highlightMatch(activityDetail.careerAlias, searchQuery)}
								</DetailCareerTitle>
							</TopLeft>
						</TopWrapper>
						<MainWrapper>
							{activityDetail.detailList.map((detail, i) => (
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
											<DetailTag>{highlightMatch(tag.tagName, searchQuery)}</DetailTag>
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
