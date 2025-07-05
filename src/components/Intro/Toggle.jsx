import React from 'react';
import styled from 'styled-components';
import { theme } from '../../constants/theme';
import { Color } from '../../constants/color';

const Toggle = ({ checked, onChange }) => {
	return (
		<ToggleContainer>
			<ToggleCheckbox type="checkbox" id="toggle" checked={checked} onChange={onChange} />
			<ToggleLabel htmlFor="toggle">
				<ToggleSwitch checked={checked} />
				<ToggleText
					className="individual"
					checked={checked}
					style={{ color: !checked ? 'grey' : 'black', padding: '5px 0px 5px 8px', left: '5px' }}
				>
					개별보기
				</ToggleText>
				<ToggleText
					className="list"
					checked={checked}
					style={{ color: !checked ? 'black' : 'grey', padding: '5px 8px 5px 0px', left: '85px' }}
				>
					목록보기
				</ToggleText>
			</ToggleLabel>
		</ToggleContainer>
	);
};

const ToggleContainer = styled.div`
	position: relative;
	width: 150px;
	height: 35px;
	@media (max-width: ${theme.breakpoints.md}) {
		top: -199px;
	}
`;

const ToggleCheckbox = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;

const ToggleLabel = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${Color.gray06};
	border-radius: 10px;
	transition: background-color 0.4s;
`;

const ToggleText = styled.span`
	font-family: 'Regular';
	font-weight: 500px;
	font-size: 14px;
	line-height: 16.71px;
	text-align: center;
	transition: color 0.4s;
	position: absolute;
	z-index: 2;

	&.individual {
		color: ${(props) => (!props.checked ? Color.black : Color.gray03)};
	}

	&.list {
		color: ${(props) => (!props.checked ? Color.gray03 : Color.black)};
	}
`;

const ToggleSwitch = styled.span`
	content: '';
	position: absolute;
	z-index: 1;
	height: 25px;
	width: 65px;
	background-color: ${Color.white};
	border-radius: 10px;
	transition: transform 0.4s;
	left: 8px;
	transform: ${(props) => (!props.checked ? 'translateX(70px)' : 'none')};
`;

export default Toggle;
