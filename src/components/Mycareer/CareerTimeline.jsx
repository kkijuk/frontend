import React from 'react';
import styled from 'styled-components';
import CareerNameTag from '../shared/CareerNameTag';
import TimelineChart from '../Mycareer/TimelineChart'; // 추가

const TimelineBox = styled.div`
	flex-shrink: 0;
	width: 820px;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background-color: white;
	padding: 2px 0;
	margin: 0 auto;
	margin-bottom: 30px;
	overflow-x: auto; /* Add horizontal scroll */
	white-space: nowrap; /* Prevent line breaks */
`;

const CareerNameT = styled.div`
	margin-left: 23px;
`;

const TimelineDate = styled.div`
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CareerTimeline = ({ data }) => {
	// const careerNames = data.map((item) => item.careerName);
	// const categories = data.map((item) => item.category);
	return (
		<TimelineBox>
			<TimelineChart data={data} /> {/* 차트 추가 */}
		</TimelineBox>
	);
};

export default CareerTimeline;
