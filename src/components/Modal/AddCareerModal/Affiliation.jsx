import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../constants/theme';
import { Color } from '@/constants/color'; 

// 첫 번째 버전: 교내, 교외만
const Affiliation1 = ({ onAffiliationChange }) => {
	const [isOnCampus, setIsOnCampus] = useState('ON_CAMPUS');

	const toggleAffiliation = (value) => {
		setIsOnCampus(value);
		onAffiliationChange(value); //parameter
	};

	return (
		<Container isVersion1={true}>
				<SelectButton state={isOnCampus === 'ON_CAMPUS'} onClick={() => toggleAffiliation('ON_CAMPUS')}>
					교내
				</SelectButton>
				<SelectButton state={isOnCampus === 'OFF_CAMPUS'} onClick={() => toggleAffiliation('OFF_CAMPUS')}>
					교외
				</SelectButton>
		</Container>
	);
};

// 두 번째 버전: 교내, 교외, 기타
const Affiliation2 = ({ onAffiliationChange }) => {
	const [selectedAffiliation, setSelectedAffiliation] = useState('ON_CAMPUS');

	const toggleAffiliation = (value) => {
		setSelectedAffiliation(value);
		onAffiliationChange(value); //parameter
	};

	return (
		<>
			<Container isVersion1={false}>
					<SelectButton state={selectedAffiliation === 'ON_CAMPUS'} onClick={() => toggleAffiliation('ON_CAMPUS')}>
						교내
					</SelectButton>
					<SelectButton state={selectedAffiliation === 'OFF_CAMPUS'} onClick={() => toggleAffiliation('OFF_CAMPUS')}>
						교외
					</SelectButton>
					<SelectButton state={selectedAffiliation === 'OTHER'} onClick={() => toggleAffiliation('OTHER')}>
						기타
					</SelectButton>
			</Container>
		</>
	);
};

export { Affiliation1, Affiliation2 };

const Container = styled.div`
	display: flex;
	flex-direction: row;
	// justify-content: space-between;
	justify-content: ${(props) => (props.isVersion1 ? 'space-between' : 'noraml')};
	gap: 10px;
	text-align: center;
`;

const SelectButton = styled.div`
	width: 120px;
	height: 50px;
	font-size: 16px;
	font-weight: 400;
	font-family: 'Regular';
	// line-height: 50px;
	border-radius: 10px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(props) => (props.state ? Color.main03_30 : Color.gray06)};
	color: ${(props) => (props.state ? Color.main01 : Color.gray02 )};
	border: ${(props) => (props.state ? `2px solid ${Color.main01}` : 'none')};

	@media (max-width: ${theme.breakpoints.md}) {
		width: 25px;
		height: 20px;
		padding: 15px 40px;
		line-height: 20px;
		font-size: 14px;
	}
`;
