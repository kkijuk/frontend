import React from 'react';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '../../utils/formateDate';

import CareerCategoryCircle from './CareerCategoryCircle';
import EmptyActivityMessage from './EmptyActivityMessage';
import {
	Container,
	CategoryBox,
	Category,
	CategoryText,
	ListBox,
	Name,
	AliasName,
	CareerContainer,
	CareerName,
	Date,
} from './CareerViewCategory.styles';

const CareerViewCategory = ({ data }) => {
	const navigate = useNavigate();

	// 데이터가 없거나 유효하지 않을 경우 처리
	if (!data || typeof data !== 'object') {
		return <EmptyActivityMessage />;
	}

	// 데이터의 키를 정렬
	const sortedKey = Object.keys(data).sort((a, b) => b - a);

	// 데이터가 없을 경우 처리
	const hasData = sortedKey.some((key) => Array.isArray(data[key]) && data[key].length > 0);
	if (!hasData) {
		return <EmptyActivityMessage />;
	}

	const handleListBoxClick = (careerId, category) => {
		navigate(`/mycareer/${category}/${careerId}`, { state: { careerId, category } });
	};

	const formatCategoryName = (category) => {
		//세연 추가
		const categoryMap = {
			공모전대회: '공모전/대회',
		};

		return categoryMap[category] || category; // 매핑된 값이 있으면 변환, 없으면 그대로 반환
	};

	return (
		<CategoryBox>
			{sortedKey.map((category) => {
				// 카테고리 내 데이터가 없는 경우 건너뜀
				if (!Array.isArray(data[category]) || data[category].length === 0) return null;

				return (
					<Container key={category}>
						<Category>
							<CareerCategoryCircle category={category} />
							<CategoryText>{formatCategoryName(category)}</CategoryText> {/* 세연 수정 */}
						</Category>

						{data[category].map((item) => (
							<ListBox
								key={`${item.id}_${item.category}`}
								onClick={() => handleListBoxClick(item.id, item.category.categoryKoName)} // 클릭 시 career.id 전송
							>
								<Name>
									<CareerContainer>
										<CareerName>{item.name}</CareerName>
										<AliasName>&nbsp;/ {item.alias}</AliasName>
									</CareerContainer>
								</Name>
								<Date>{formatDate(item.startdate, item.enddate, item.unknown)}</Date>
							</ListBox>
						))}
					</Container>
				);
			})}
		</CategoryBox>
	);
};

export default CareerViewCategory;
