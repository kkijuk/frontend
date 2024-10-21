//components/MyCareerDetail/CareerList
//태그
import React from 'react';
import styled from 'styled-components';

const Tag = styled.div`
	display: flex;
	height: 22px;
	padding: 0px 16px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 10px;
	background: #f5f5f5;
	color: var(--main-01, #3aaf85);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px; /* 태그 간 간격 추가 */
`;

export default function AbilityTag({ tags }) {
	return (
		<TagContainer>
			{tags.map((tag, index) => (
				<Tag key={index}>{tag}</Tag>
			))}
		</TagContainer>
	);
}
