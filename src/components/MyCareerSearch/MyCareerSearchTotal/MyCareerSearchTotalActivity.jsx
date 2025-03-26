import styled from 'styled-components';
import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../constants/theme';

const ActivityContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 0 15px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px 50px;
	margin-bottom: 32px;

	@media (max-width: ${theme.breakpoints.md}) {
		grid-template-columns: 1fr;
		gap: 15px;
		padding: 0 10px;
		margin-bottom: 24px;
	}
`;

const ActivityContent = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	flex: 1;
	min-width: 0; /* 텍스트 오버플로우 방지 */

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 8px;
	}
`;

const ActivityBox = styled.div`
	width: 100%;
	min-height: 52px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	box-sizing: border-box;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 8px;
		min-height: 45px;
		flex-wrap: wrap; /* 필요시 줄바꿈 */
	}
`;

const AcitivityDate = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 400;
	line-height: normal;
	flex-shrink: 0;
	margin-left: 10px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 11px;
		margin-left: 8px;
	}
`;

const ActivityCareerTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 700;
	line-height: normal;
	margin-left: 5px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: break-all;
	flex: 1;
	min-width: 0; /* 텍스트 오버플로우 방지 */

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 14px;
		margin-left: 4px;
		-webkit-line-clamp: 1; /* 모바일에서는 한 줄로 제한 */
	}
`;

const NotExistSearch = styled.div`
	color: var(--gray-02, #707070);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	padding-bottom: 40px;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 15px;
		padding-bottom: 30px;
	}
`;

export default function MyCareerSearchTotalActivity({ activity, isActivityLoading }) {
	const navigate = useNavigate();

	return (
		<>
			{isActivityLoading ? (
				<ActivityContainer>loading...</ActivityContainer>
			) : activity.data.data.length === 0 ? (
				<NotExistSearch>검색 결과가 없어요.</NotExistSearch>
			) : (
				<ActivityContainer>
					{activity.data.data.map((activity, idx) => (
						<ActivityBox
							key={idx}
							onClick={() =>
								navigate(`/mycareer/${activity.category.categoryKoName}/${activity.careerId}`, {
									state: { careerId: activity.careerId, category: activity.category.categoryKoName },
								})
							}>
							<ActivityContent>
								<CareerCategoryCircle category={activity.category.categoryKoName} />
								<ActivityCareerTitle>
									<b>{activity.careerTitle}</b> / {activity.careerAlias}
								</ActivityCareerTitle>
							</ActivityContent>
							<AcitivityDate>
								{activity.startdate} ~<br />
								{activity.unknown === true ? 'ing' : activity.enddate}
							</AcitivityDate>
						</ActivityBox>
					))}
				</ActivityContainer>
			)}
		</>
	);
}
