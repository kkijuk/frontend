import React from 'react';
import styled from 'styled-components';

const getBackgroundColor = (category, selected) => {
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
	return selected ? color + '4D' : color; // '4D'는 불투명도 30%를 의미
};

const formatDate = (dateString) => {
	return dateString.replace(/-/g, '.');
};

const CareerBox = styled.div`
	width: 139px;
	height: 54px;
	border-radius: 10px;
	background-color: ${(props) => getBackgroundColor(props.category, props.selected)};
	border: 2px solid ${(props) => getBackgroundColor(props.category)};
	position: relative;
	cursor: pointer;
`;

const Date = styled.div`
	display: flex;
	width: 143px;
	height: 22.895px;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	color: ${(props) => (props.selected ? '#000' : '#FFF')};
	text-align: center;
	font-family: light;
	font-size: 11px;
	font-style: normal;
	line-height: normal;
	margin-top: 6px;
`;

const Nickname = styled.div`
	display: flex;
	width: 143px;
	height: 22.895px;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	color: ${(props) => (props.selected ? '#000' : '#FFF')};
	text-align: center;
	font-family: semibold;
	font-size: 14px;
	font-style: bold;
	line-height: normal;
	margin-bottom: 10px;
`;

export default function Careerbox({ startDate, endDate, careerName, category, selected, onClick }) {
	const handleClick = () => {
		window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
		if (onClick) onClick(); // onClick이 정의되어 있다면 호출
	};

	return (
		<CareerBox category={category} selected={selected} onClick={handleClick}>
			<Date selected={selected}>
				{formatDate(startDate)} ~ {formatDate(endDate)}
			</Date>
			<Nickname selected={selected}>{careerName}</Nickname>
			{selected && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="19"
					height="16"
					viewBox="0 0 19 16"
					fill="none"
					style={{
						position: 'absolute',
						bottom: '-16px', // 수정된 부분
						left: '50%',
						transform: 'translateX(-50%)',
					}}
				>
					<path d="M9.5 16L0.406736 0.249998L18.5933 0.25L9.5 16Z" fill={getBackgroundColor(category)} />
				</svg>
			)}
		</CareerBox>
	);
}
