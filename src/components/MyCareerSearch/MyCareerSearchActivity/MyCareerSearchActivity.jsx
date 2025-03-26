import styled from 'styled-components';

import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { NotExistSearchComponent } from '../NotExistSearchWrapper';
import { useFetchActivityDetail } from '../../../hooks/MycareerSearch/useFetchActivityDetail';
import { Container } from '../common';

import { useNavigate } from 'react-router-dom';
import { highlightMatch } from '../../../utils/highlightMatch';
import { formatDate } from '../../../utils/formateDate';
import { theme } from '../../../constants/theme';

const Box = styled.div`
	width: 98%;
	margin: 16px auto;
	padding: 20px 24px 28px 24px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	box-sizing: border-box;

	@media (max-width: ${theme.breakpoints.md}) {
		width: 95%;
		padding: 15px;
		margin: 10px auto;
	}
`;

const TopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding-top: 10px;
	flex-wrap: wrap;
	gap: 8px;
	width: 100%;
	box-sizing: border-box;

	@media (max-width: ${theme.breakpoints.md}) {
		padding-top: 5px;
	}
`;

const TopLeft = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 5px;
`;

const DetailCareerTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	line-height: normal;
	margin-left: 5px;
	word-break: break-word;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 13px;
		margin-left: 3px;
	}
`;

const DetailCareerDate = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 400;
	line-height: normal;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 11px;
	}
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
	padding: 24px 12px;
	border-bottom: 1px solid var(--gray-04, #e0e0e0);
	width: 100%;
	box-sizing: border-box;

	&:last-child {
		border-bottom: none;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 16px 8px;
	}
`;

const DetailTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
	line-height: normal;
	word-break: break-word;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 14px;
	}
`;

const DetailContent = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 400;
	line-height: 1.5;
	margin-top: 16px;
	word-break: break-word;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 13px;
		margin-top: 12px;
	}
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 16px;

	@media (max-width: ${theme.breakpoints.md}) {
		gap: 6px;
		margin-top: 12px;
	}
`;

const DetailTag = styled.div`
	padding: 2px 15px;
	border-radius: 20px;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 400;
	cursor: pointer;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	background: #f5f5f5;
	color: #3aaf85;
	border: 1px solid #f5f5f5;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 2px 12px;
		font-size: 11px;
	}

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
										<DetailCareerDate>{formatDate(detail.startDate, detail.endDate, detail.unknown)}</DetailCareerDate>
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
