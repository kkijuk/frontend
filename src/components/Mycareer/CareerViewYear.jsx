import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CareerCategoryCircle from './CareerCategoryCircle';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';
import EmptyActivityMessage from './EmptyActivityMessage';
import { formatDate } from '../../utils/formateDate';

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	box-sizing: border-box;
	// padding: 0 15px; /* 좌우 여백 추가로 반응형에서 보기 좋게 */

	@media (max-width: 860px) {
		padding: 0 10px; /* 작은 화면에서 패딩 조정 */
	}
`;

const YearBox = styled.div`
	width: 100%;
	gap: 12px;
	margin-bottom: 24px;
`;

const Year = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
	margin-bottom: 12px;

	@media (max-width: 600px) {
		font-size: 18px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const ListBox = styled.div`
	width: 95%; /* 화면에 맞게 가변적으로 조정 */
	height: auto;
	padding: 12px 24px;
	background-color: white;
	flex-shrink: 0;
	border-radius: 10px;
	margin-bottom: 12px;
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
	cursor: pointer;

	@media (max-width: 860px) {
		padding: 10px; /* 작은 화면에서 패딩 축소 */
	}
`;

const Category = styled.div`
	display: flex;
	align-items: center;
`;

const CategoryTextBox = styled.div`
	display: flex;
	align-items: center;
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

	@media (max-width: 600px) {
		font-size: 16px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const AliasName = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 400;

	@media (max-width: 600px) {
		font-size: 16px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const CareerContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 8px 0;

	flex-wrap: wrap; /* 작은 화면에서 요소가 줄 바꿈되도록 설정 */
`;

const Date = styled.div`
	font-size: 12px;
	color: var(--gray-02, #707070);
	font-weight: 400;

	@media (max-width: 600px) {
		font-size: 12px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const CareerViewYear = ({ data }) => {
	const navigate = useNavigate();

	const handleListBoxClick = (careerId, category) => {
		navigate(`/mycareer/${category}/${careerId}`, { state: { careerId, category } });
	};

	const sortedYears = Object.keys(data).sort((a, b) => b - a);

	if (!sortedYears.length || !data[sortedYears[0]]) {
		return <EmptyActivityMessage />;
	}

	const formatCategoryName = (category) => {
		// 카테고리 변환 매핑
		const categoryMap = {
			공모전대회: '공모전/대회',
		};

		return categoryMap[category] || category; // 매핑된 값이 있으면 변환, 없으면 그대로 반환
	};

	return (
		// <BackgroundSection>
		<Container>
			{sortedYears.map((year) => {
				return (
					<YearBox key={year}>
						<Year>{year}</Year>
						{data[year].map((item, index) => {
							return (
								<ListBox
									key={`${item.category.categoryId}_${item.id}`}
									onClick={() => handleListBoxClick(item.id, item.category.categoryKoName)}>
									<Category>
										<CareerCategoryCircle category={item.category.categoryKoName} />
										<CategoryTextBox>{formatCategoryName(item.category.categoryKoName)}</CategoryTextBox>
									</Category>
									<CareerContainer>
										<CareerName>{item.name}</CareerName>
										<AliasName>&nbsp;/ {item.alias}</AliasName>
									</CareerContainer>
									<Date>{formatDate(item.startdate, item.enddate, item.unknown)}</Date>
								</ListBox>
							);
						})}
					</YearBox>
				);
			})}
		</Container>
		// </BackgroundSection>
	);
};

export default CareerViewYear;
