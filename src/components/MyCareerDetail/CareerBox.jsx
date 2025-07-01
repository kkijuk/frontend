import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formateDate';



//const formatDate = (dateString) => {
//	if (!dateString) return '-'; // dateString이 없을 경우 기본값 '-'
//	return dateString.replace(/-/g, '.');
//};


import {
  CareerBox,
  Date,
  Nickname,
  Triangle,
  getBackgroundColor,
} from './CareerBox.styles';

export default function Careerbox({ id, startdate, enddate, unknown, careerName, category, selected, onClick }) {
	const navigate = useNavigate();

	const handleClick = () => {
		window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
		if (onClick) onClick(id, category); // onClick이 정의되어 있다면 호출

		console.log('Navigating to:', `/mycareer/${category}/${id}`);
		console.log('State being passed:', { careerId: id, category });

		navigate(`/mycareer/${category}/${id}`, { state: { careerId: id, category } });
	};

	const formattedCareerName = careerName.length > 9 ? careerName.substring(0, 9) + '...' : careerName;

	return (
		<CareerBox category={category} selected={selected} onClick={handleClick}>
			<Date selected={selected}>{formatDate(startdate, enddate, unknown)}</Date>
			<Nickname selected={selected}>{formattedCareerName}</Nickname>
			{selected && (
				<Triangle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 16" fill={getBackgroundColor(category)}>
					<path d="M9.5 16L0.406736 0.249998L18.5933 0.25L9.5 16Z" />
				</Triangle>
			)}
		</CareerBox>
	);
}
