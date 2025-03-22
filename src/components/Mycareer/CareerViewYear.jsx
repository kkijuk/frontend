import React from 'react';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '../../utils/formateDate';

import EmptyActivityMessage from './EmptyActivityMessage';
import CareerCategoryCircle from './CareerCategoryCircle';
import {
	Container,
	YearBox,
	Year,
	ListBox,
	Category,
	CategoryTextBox,
	CareerName,
	AliasName,
	CareerContainer,
	Date,
} from './CareerViewYear.styles';

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
	);
};

export default CareerViewYear;
