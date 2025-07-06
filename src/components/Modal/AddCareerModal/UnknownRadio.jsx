import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../constants/theme';
import { Color } from '@/constants/color';

const UnknownRadio = ({ isUnknown, onToggle }) => {
	return (
		<RadioContainer>
			<RadioWrapper onClick={onToggle}>
				<HiddenRadio isUnknown={isUnknown} />
				<StyledRadio isUnknown={isUnknown} />
			</RadioWrapper>
			<Info>아직 모르겠어요</Info>
		</RadioContainer>
	);
};

export default UnknownRadio;

const RadioContainer = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	position: relative;
	top: -30px;
	@media (max-width: ${theme.breakpoints.md}) {
		right: 10px;
		top: -20px;
	}
`;

const RadioWrapper = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
	opacity: 0;
	width: 0 !important;
	height: 0;
`;

const StyledRadio = styled.div`
	width: 16px;
	height: 16px;
	background: ${(props) => (props.isUnknown ? Color.main01 : Color.gray06)};
	border-radius: 50%;
	transition: all 150ms;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: 1px solid ${(props) => (props.isUnknown ? Color.main01 : Color.gray04 )};

	&:after {
		content: '';
		display: ${(props) => (props.isUnknown ? Color.black : 'none')};
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: white;
	}
`;

const Info = styled.div`
	color: ${Color.main01};
	font-family: Regular;
	font-size: 16px;
	font-style: normal;
	line-height: normal;
	margin-left: 15px;
	// margin-top:10px;
	// margin-bottom: 0px !important;
	align-items: center;
`;
