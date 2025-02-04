import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const getBackgroundColor = (category, selected) => {
	let color;
	switch (category) {
		case '동아리':
			color = '#FCC400';
			break;
		case '대외활동':
			color = '#77AFF2';
			break;
		case '공모전/대회':
			color = '#BB7AEF';
			break;
		case '프로젝트':
			color = '#78D333';
			break;
		case '경력':
			color = '#FA7C79';
			break;
		case '교육':
			color = '#F99538';
			break;
		case '기타':
			color = '#707070';
			break;
		default:
			color = '#707070';
	}
	return selected ? color + '4D' : color; // '4D'는 불투명도 30%를 의미
};

const formatDate = (dateString) => {
	if (!dateString) return '-'; // dateString이 없을 경우 기본값 '-'
	return dateString.replace(/-/g, '.');
};

const CareerBox = styled.div`
	width: 139px;
	height: 58px;
	border-radius: 10px;
	background-color: ${(props) => getBackgroundColor(props.category, props.selected)};
	border: 2px solid ${(props) => getBackgroundColor(props.category)};
	box-sizing: border-box;
	position: relative;
	cursor: pointer;

	display: flex;
	flex-direction: column; /* 자식 요소를 세로 방향으로 배치 */
	align-items: center; /* 가로 가운데 정렬 */
	justify-content: center;
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
	box-sizing: border-box;
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
\	box-sizing: border-box;
`;

export default function Careerbox({ id, startdate, enddate, careerName, category, selected, onClick }) {
	const navigate = useNavigate();

	const handleClick = () => {
		window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
		if (onClick) onClick(id, category); // onClick이 정의되어 있다면 호출

		console.log('Navigating to:', `/mycareer/${category}/${id}`);
		console.log('State being passed:', { careerId: id, category });

		navigate(`/mycareer/${category}/${id}`, { state: { careerId: id, category } });
	};

	return (
		<CareerBox category={category} selected={selected} onClick={handleClick}>
			<Date selected={selected}>
				{formatDate(startdate)} ~ {formatDate(enddate)}
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
					}}>
					<path d="M9.5 16L0.406736 0.249998L18.5933 0.25L9.5 16Z" fill={getBackgroundColor(category)} />
				</svg>
			)}
		</CareerBox>
	);
}
