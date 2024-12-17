import styled from 'styled-components';
import { useFetchActivity } from '../../hooks/MycareerSearch/useFetchActivity';
import CareerCategoryCircle from '../Mycareer/CareerCategoryCircle';

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
	margin: 10px 0;
`;

const ActivityContainer = styled.div`
	width: 100%;
	max-width: 820px;
	box-sizing: border-box;
	padding: 0 15px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;
	margin-bottom: 20px;
`;

const ActivityContent = styled.div`
	display: flex;
	padding: 10px;
`;

const ActivityBox = styled.div`
	width: 90%;
	height: 3.25rem;
	display: flex;
	align-items: center;
	justify-content: space-between; /* 왼쪽, 오른쪽 정렬 */
	padding: 0 10px; /* 좌우 패딩 */
	background-color: white;
	flex-shrink: 0;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;
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

const AcitivityDate = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: Inter;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const MycareerSearchTotal = ({ sortOrder, searchQuery }) => {
	const {
		data: activity,
		isLoading: isActivityLoading,
		error: activityError,
	} = useFetchActivity(searchQuery, sortOrder);

	if (isActivityLoading) {
		return <Container>Loading...</Container>;
	}

	console.log(activity);

	return (
		<Container>
			<Title>활동 ({activity.data.data.length})</Title>
			<ActivityContainer>
				{isActivityLoading
					? 'loading...'
					: activity.data.data.map((activity) => (
							<ActivityBox key={activity.careerId}>
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
		</Container>
	);
};

export default MycareerSearchTotal;
