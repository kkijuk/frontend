import styled from 'styled-components';
import CareerCategoryCircle from '../../Mycareer/CareerCategoryCircle';
import { useNavigate } from 'react-router-dom';

const ActivityContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 0 15px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px 50px;
	margin-bottom: 20px;
`;

const ActivityContent = styled.div`
	display: flex;
	padding: 10px;
`;

const ActivityBox = styled.div`
	width: 100%;
	height: 3.25rem;
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
	font-family: Inter;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const ActivityCareerTitle = styled.div`
	color: var(--black, #000);
	font-family: Inter;
	font-size: 1rem;
	font-style: normal;
	font-weight: 500;
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
							onClick={() => navigate(`/mycareer/${activity.category.categoryKoName}/${activity.careerId}`)}>
							<ActivityContent>
								<CareerCategoryCircle category={activity.category.categoryKoName} />
								<ActivityCareerTitle>
									<b>{activity.careerTitle}</b> / {activity.careerAlias}
								</ActivityCareerTitle>
							</ActivityContent>
							<AcitivityDate>
								{activity.startdate} ~<br />
								{activity.enddate}
							</AcitivityDate>
						</ActivityBox>
					))}
				</ActivityContainer>
			)}
		</>
	);
}
