import React from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';

const Container = styled.button`
	display: flex;
	width: ${({ $width }) => $width || '62px'};
	height: ${({ $height }) => $height || '62px'};
	padding: 22px;
	align-items: center;
	justify-content: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 50%;
	background: ${Color.main01};
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	cursor: pointer;
	border: none;

	&:hover {
		background: ${Color.main_hover};
	}
`;

const StyledSVG = styled.svg`
	width: ${({ $iconSize }) => $iconSize || '18px'};
	height: ${({ $iconSize }) => $iconSize || '18px'};
	flex-shrink: 0;
`;

export default function ButtonCirclePrimary({ width = '62px', height = '62px', iconSize = '18px' }) {
	return (
		<Container $width={width} $height={height}>
			<StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" $iconSize={iconSize}>
				<path
					d="M6.74549 11.2545H0V6.74549H6.74549V0H11.2545V6.74549H18V11.2545H11.2545V18H6.74549V11.2545Z"
					fill={Color.white}
				/>
			</StyledSVG>
		</Container>
	);
}
