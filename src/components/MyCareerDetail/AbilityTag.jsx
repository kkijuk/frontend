//components/MyCareerDetail/CareerList
//태그
import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';
import { useNavigate } from 'react-router-dom';

const Tag = styled.div`
	display: flex;
	height: 22px;
	padding: 0px 16px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 10px;
	background: ${Color.gray06};
	color: ${Color.main01};
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	cursor: pointer;
`;

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px; /* 태그 간 간격 추가 */
`;

export default function AbilityTag({ tags }) {
	const navigate = useNavigate();

	const handleTagClick = (tagName) => {
		console.log(`태그 클릭됨: ${tagName}`);
		navigate(`/Mycareer_search?query=${encodeURIComponent(tagName)}`);
	};
	return (
		<TagContainer>
			{tags.map((tag, index) => (
				<Tag key={index} onClick={() => handleTagClick(tag)}>
					{tag}
				</Tag>
			))}
		</TagContainer>
	);
}
