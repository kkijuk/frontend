import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formateDate';

const getBackgroundColor = (category, selected) => {
	let color;
	switch (category) {
		case '동아리':
			color = '#FCC400';
			break;
		case '대외활동':
			color = '#77AFF2';
			break;
		case '공모전대회':
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

//const formatDate = (dateString) => {
//	if (!dateString) return '-'; // dateString이 없을 경우 기본값 '-'
//	return dateString.replace(/-/g, '.');
//};

const CareerBox = styled.div`
	width: 143px; /*수정-> 원래 139*/
	height: 58px;
	padding: 6px; /*수정-> 원래 없었음*/
	border-radius: 10px;
	background-color: ${(props) => getBackgroundColor(props.category, props.selected)};
	border: 2px solid ${(props) => getBackgroundColor(props.category)};
	box-sizing: border-box;
	position: relative;
	cursor: pointer;
	box-sizing: border-box; /*수정-> 원래 없었음*/

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
	max-width: calc(100% - 12px); /*부모의 padding 고려 */
	height: auto; /*수정 ->22.895px*/
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	color: ${(props) => (props.selected ? '#000' : '#FFF')};
	text-align: center;
	font-family: semibold;
	font-size: 14px;
	font-style: bold;
	line-height: normal;
	box-sizing: border-box;

	/*수정-> 아래부분 세개 다 새로 추가*/
	white-space: nowrap; /* 줄바꿈 방지 */
	overflow: hidden; /* 넘치는 글씨 숨김 */
	text-overflow: ellipsis; /* 넘치면 '...' 표시 */
`;

const Triangle = styled.svg`
	width: 20px;
	height: 16px;
	position: absolute;
	bottom: -12px;
	left: 50%;
	transform: translateX(-50%);
	z-index: -1;
`;

export default function Careerbox({ id, startdate, enddate, unknown, careerName, category, selected, onClick }) {
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
			<Date selected={selected}>{formatDate(startdate, enddate, unknown)}</Date>
			<Nickname selected={selected}>{careerName}</Nickname>
			{selected && (
				<Triangle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 16" fill={getBackgroundColor(category)}>
					<path d="M9.5 16L0.406736 0.249998L18.5933 0.25L9.5 16Z" />
				</Triangle>
			)}
		</CareerBox>
	);
}
