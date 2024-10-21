//components/Mycareer/CareerViewCategory, CareerViewYear
import React from 'react';
import styled from 'styled-components';

const getBackgroundColor = (category) => {
	let color;
	switch (category) {
		case 1:
			color = '#FCC400';
			break;
		case 2:
			color = '#77AFF2';
			break;
		case 3:
			color = '#BB7AEF';
			break;
		case 4:
			color = '#78D333';
			break;
		case 5:
			color = '#FA7C79';
			break;
		case 6:
			color = '#F99538';
			break;
		case 7:
			color = '#707070';
			break;
		default:
			color = '#707070';
	}
	return color;
};

const Circle = styled.div`
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: ${(props) => getBackgroundColor(props.category)};
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
