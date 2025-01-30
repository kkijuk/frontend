import React from 'react';
import styled from 'styled-components';

import TimelineChart from '../Mycareer/TimelineChart'; // 추가

const TimelineBox = styled.div`
	height: 160px;
	max-width: 820px;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background-color: white;
	margin: 0 auto;
	margin-bottom: 30px;
	white-space: nowrap;
	overflow: hidden; // 추가: 내부 컨텐츠가 넘치지 않도록 함
	position: relative; // 추가: 자식 요소의 절대 위치 기준점

	@media (max-width: 600px) {
		padding: 1px 0;
		margin-bottom: 20px;
	}
`;

const ChartWrapper = styled.div`
	position: absolute;
	width: 100%;
	// left: -100px; // 차트를 왼쪽으로 이동
	// right: 10px; // 오른쪽 여백 조정
`;

const CareerTimeline = () => {
	return (
		<TimelineBox>
			<ChartWrapper>
				<TimelineChart />
			</ChartWrapper>
		</TimelineBox>
	);
};

export default CareerTimeline;
