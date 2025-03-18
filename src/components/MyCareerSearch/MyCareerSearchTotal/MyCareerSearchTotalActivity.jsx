import styled from 'styled-components';
import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useNavigate } from 'react-router-dom';

const ActivityContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 0 15px;
	display: grid;
	grid-template-columns: repeat(2, 1fr); /* 기본적으로 2열 */
	gap: 20px 50px;
	margin-bottom: 20px;

	@media (max-width: 600px) {
		grid-template-columns: 1fr; /* 화면이 작아지면 1열로 변경 */
	}
`;

const ActivityContent = styled.div`
	display: flex;
	flex-direction: row; /* 기본적으로 세로로 쌓이도록 설정 */
	padding: 10px;

	@media (min-width: 600px) {
		flex-direction: column; /* 화면이 커지면 가로로 배치 */
	}
`;

const ActivityBox = styled.div`
	width: 100%;
	height: 52px;
	display: flex;
	align-items: center;
	justify-content: space-between; /* 왼쪽, 오른쪽 정렬 */
	padding: 0 10px;
	background-color: white;
	flex-shrink: 0;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const AcitivityDate = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	@media (min-width: 600px) {
		font-size: 12px; /* 큰 화면에서 폰트 크기 유지 */
	}
`;

const ActivityCareerTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-left: 5px;
`;

const NotExistSearch = styled.div`
	color: var(--gray-02, #707070);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	padding-bottom: 40px;
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
