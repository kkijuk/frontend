import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CareerCategoryCircle from './CareerCategoryCircle';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';

const BackgroundSection = styled.div`
	width: 100vw;
	background-color: #f0f0f0;
	position: relative;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 20px 0;
`;

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	box-sizing: border-box;
	padding: 0 15px; /* 좌우 여백 추가로 반응형에서 보기 좋게 */
`;

const YearBox = styled.div`
	width: 100%;
	gap: 12px;
	margin-bottom: 20px;
`;

const Year = styled.div`
	color: var(--black, #000);
	font-family: regular;
	font-size: 22px;
	font-weight: 400;
	margin-bottom: 10px;

	@media (max-width: 600px) {
		font-size: 18px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const ListBox = styled.div`
	width: 95%; /* 화면에 맞게 가변적으로 조정 */
	height: auto;
	padding: 10px;
	background-color: white;
	flex-shrink: 0;
	border-radius: 10px;
	margin-bottom: 15px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;

	@media (max-width: 860px) {
		padding: 10px; /* 작은 화면에서 패딩 축소 */
	}
`;

const Category = styled.div`
	height: 15px;
	display: flex;
	align-items: center;
	margin-bottom: 9px;
`;

const CategoryTextBox = styled.div`
	display: flex;
	align-items: center;
	margin: 4px 0 8px 0;
	font-size: 14px;

	@media (max-width: 600px) {
		font-size: 12px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const CareerName = styled.div`
	color: var(--black, #000);
	font-family: bold;
	font-size: 18px;
	font-weight: 700;
	margin: 5px 0 9px 0;

	@media (max-width: 600px) {
		font-size: 16px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const AliasName = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 400;
	margin: 5px 0 9px 0;

	@media (max-width: 600px) {
		font-size: 16px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const CareerContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap; /* 작은 화면에서 요소가 줄 바꿈되도록 설정 */
`;

const Date = styled.div`
	font-size: 14px;
	color: #555;

	@media (max-width: 600px) {
		font-size: 12px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const formatDate = (dateString) => {
	return dateString.replace(/-/g, '.');
};

const CareerViewYear = ({ data }) => {
	console.log('CareerViewYear rendered');
	const sortedYears = Object.keys(data).sort((a, b) => b - a);

	const navigate = useNavigate();
	const handleListBoxClick = async (careerId) => {
		try {
			const responseData = await ViewCareerDetail(careerId);
			console.log('Received careerId:', careerId);
			if (responseData) {
				window.scrollTo(0, 0);

				navigate(`/mycareer/${careerId}`, { details: responseData });
			}
			// 여기서 tagList를 이용해 추가 작업을 할 수 있습니다.
		} catch (error) {
			console.error('Error fetching careerId:', error);
		}
	};

	if (!sortedYears.length || !data[sortedYears[0]]) {
		return <div>데이터가 없습니다.</div>;
	}

	return (
		<BackgroundSection>
			<Container>
				{sortedYears.map((year) => {
					return (
						<YearBox key={year}>
							<Year>{year}</Year>
							{data[year].map((item, index) => {
								console.log('Item:', item);
								console.log('Item year:', year);

								return (
									<ListBox key={index} onClick={() => handleListBoxClick(item.id)}>
										<Category>
											<CareerCategoryCircle category={item.category} />
											<CategoryTextBox>{item.category}</CategoryTextBox>
										</Category>
										<CareerContainer>
											<CareerName>{item.name}</CareerName>
											<AliasName>&nbsp;/ {item.alias}</AliasName>
										</CareerContainer>
										<Date>
											{item.startdate} ~ {item.endDate}
										</Date>
									</ListBox>
								);
							})}
						</YearBox>
					);
				})}
			</Container>
		</BackgroundSection>
	);
};

export default CareerViewYear;
