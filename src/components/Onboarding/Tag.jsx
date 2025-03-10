import React from 'react';
import styled from 'styled-components';

const BoxTag = styled.div`
	width: 120px;
	height: 50px;
	flex-shrink: 0;

	border-radius: 10px;
	border: 2px solid var(--main-02, #88d1b6);
	background: linear-gradient(180deg, #fff 0%, #e1f4ed 70%);
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);

	gap: 4px;
`;

const SvgContainer = styled.div`
	display: flex;
	width: 24px;
	height: 24px;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
`;

const TagText = styled.div`
	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function OnboardingTag({ svg, text }) {
	return (
		<BoxTag>
			<SvgContainer>{svg}</SvgContainer>
			<TagText>{text}</TagText>
		</BoxTag>
	);
}
