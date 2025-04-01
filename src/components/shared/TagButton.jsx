import React from 'react';
import styled from 'styled-components';

import { theme } from '../../constants/theme';

const StyledTag = styled.button`
	padding: 4px 20px;
	border-radius: 20px;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 400;
	font-style: normal;
	cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};

	background: ${(props) => {
		if (props.isActive) return '#fff';
		return props.hasWhiteBackground ? '#f5f5f5' : '#fff';
	}};
	color: ${theme.colors.primary};
	border: 1px solid
		${(props) => {
			if (props.isActive) return theme.colors.primary;
			return props.hasWhiteBackground ? '#f5f5f5' : '#fff';
		}};

	transition:
		background-color 0.3s ease,
		color 0.3s ease;

	@media (hover: hover) {
		&:hover {
			background-color: ${(props) => (props.isActive ? '#fff' : '#e0e0e0')};
			border-color: ${(props) => (props.hasWhiteBackground ? '#fff' : '#e0e0e0')};
		}
	}

	pointer-events: ${(props) => (props.isActive ? 'none' : 'auto')};
`;

const TagButton = ({ id, isActive, onClick, children, hasWhiteBackground = false }) => {
	return (
		<StyledTag key={id} isActive={isActive} hasWhiteBackground={hasWhiteBackground} onClick={() => onClick(id)}>
			{children}
		</StyledTag>
	);
};

export default TagButton;
