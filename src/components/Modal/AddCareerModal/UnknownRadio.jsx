import React from 'react';
import styled from 'styled-components';

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
	margin-top: 35px;
`;

const RadioWrapper = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
	opacity: 0;
	width: 0;
	height: 0;
`;

const StyledRadio = styled.div`
	width: 20px;
	height: 20px;
	background: ${(props) => (props.isUnknown ? '#3AAF85' : '#F5F5F5')};
	border-radius: 50%;
	transition: all 150ms;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: 1px solid ${(props) => (props.isUnknown ? '#3AAF85' : '#ccc')};

	&:after {
		content: '';
		display: ${(props) => (props.isUnknown ? 'block' : 'none')};
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: white;
	}
`;

const Info = styled.label`
	color: var(--main-01, #3aaf85);
	font-family: Regular;
	font-size: 14px;
	font-style: normal;
	line-height: normal;
	margin-left: 15px;
`;
