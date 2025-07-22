import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';

const Text = styled.div`
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-decoration-line: underline;
	text-decoration-style: solid;
	text-decoration-skip-ink: none;
	text-decoration-thickness: auto;
	text-underline-offset: auto;
	text-underline-position: from-font;

	&:hover {
		color: var(--gray-01, #333);
	}
`;

export default function ButtonText({ text }) {
	return <Text>{text}</Text>;
}
