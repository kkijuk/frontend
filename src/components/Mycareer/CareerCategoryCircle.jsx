//components/Mycareer/CareerViewCategory, CareerViewYear
import React from 'react';
import styled from 'styled-components';

import getColorByCategory from '../../utils/getColorByCategory';

const Circle = styled.div`
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: ${(props) => getColorByCategory(props.category)};
	margin: 0 6px 6px 0;
`;

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export default function CareerCategoryCircle({ category }) {
	return (
		<TagContainer>
			<Circle category={category} />
		</TagContainer>
	);
}
