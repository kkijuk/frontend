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
	border-radius: 31px;
	background: ${Color.gray04};
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	cursor: pointer;
	border: none;

	&:hover {
		background: ${Color.gray02};
	}
`;

const StyledSVG = styled.svg`
	width: ${({ $iconSize }) => $iconSize || '24px'};
	height: ${({ $iconSize }) => $iconSize || '24px'};
	flex-shrink: 0;
`;

export default function ButtonCircleSecondary({ width = '62px', height = '62px', iconSize = '24px' }) {
	return (
		<Container $width={width} $height={height}>
			<StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" $iconSize={iconSize}>
				<path
					d="M14.7785 5.5127L12.953 7.33789L9.302 10.9886L2 18.2901V22.0001H5.71L13.0115 14.6981L16.6622 11.0471L18.4876 9.22182L14.7785 5.5127Z"
					fill={Color.white}
				/>
				<path
					d="M21.2315 2.7681C20.7394 2.27628 20.0722 2 19.3765 2C18.6808 2 18.0135 2.27628 17.5215 2.7681L15.7715 4.5206L19.4805 8.2321L21.2305 6.4821C21.4747 6.23845 21.6684 5.94904 21.8007 5.63043C21.9329 5.31182 22.001 4.97027 22.0011 4.62531C22.0012 4.28035 21.9333 3.93876 21.8012 3.62008C21.6691 3.3014 21.4755 3.01189 21.2315 2.7681Z"
					fill={Color.white}
				/>
			</StyledSVG>
		</Container>
	);
}
