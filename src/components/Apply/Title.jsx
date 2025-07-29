import React from 'react';
import styled from 'styled-components';
import { Color } from '../../constants/color';

const TitleStyled = styled.h1`
	color: ${Color.black};
	font-family: Pretendard;
	font-size: 28px;
	font-weight: 700;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Title = ({ children }) => {
	return <TitleStyled>{children}</TitleStyled>;
};

export default Title;
