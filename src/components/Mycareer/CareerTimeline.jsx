import React from 'react';
import styled from 'styled-components';
import CareerNameTag from '../shared/CareerNameTag';
import TimelineChart from '../Mycareer/TimelineChart'; // 추가

const TimelineBox = styled.div`
	flex-shrink: 0;
	width: 95%; /* 화면 크기에 맞게 너비 조정 */
	max-width: 820px; /* 최대 너비 제한 */
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background-color: white;
	padding: 2px 0;
	margin: 0 auto;
	margin-bottom: 30px;
	white-space: nowrap; /* 줄바꿈 방지 */

	@media (max-width: 600px) {
		padding: 1px 0; /* 작은 화면에서 패딩 축소 */
		margin-bottom: 20px; /* 마진 조정 */
	}
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
