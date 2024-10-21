import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';

const Box = styled.div`
	width: 820px;
	height: 200px;
	max-width: 820px;

	display: flex;
	flex-direction: column;
	align-items: center; /* 컨텐츠를 가운데 정렬 */

	background-color: white;

	@media (max-width: 1280px) {
		width: 100%; /* 작은 화면에서 Section이 전체 너비를 차지 */
	}
`;

export default function Mycareer() {
	return (
		<div>
			<Layout title="내 커리어">
				<Box>Hi I'm children.... :</Box>
			</Layout>
		</div>
	);
}
