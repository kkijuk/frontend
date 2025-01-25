import React, { useState } from 'react';
import styled from 'styled-components';

// 첫 번째 버전: 교내, 교외만
const Affiliation1 = ({ onAffiliationChange }) => {
	const [isOnCampus, setIsOnCampus] = useState('ON_CAMPUS');

	const toggleAffiliation = (value) => {
		setIsOnCampus(value);
		onAffiliationChange(value); //parameter
	};

	return (
		<Container>
			<form>
				<SelectButton state={isOnCampus === 'ON_CAMPUS'} onClick={() => toggleAffiliation('ON_CAMPUS')}>
					교내
				</SelectButton>
				<SelectButton state={isOnCampus === 'OFF_CAMPUS'} onClick={() => toggleAffiliation('OFF_CAMPUS')}>
					교외
				</SelectButton>
			</form>
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
			<Container style={{ width: '600px' }}>
				<form>
					<SelectButton state={selectedAffiliation === 'ON_CAMPUS'} onClick={() => toggleAffiliation('ON_CAMPUS')}>
						교내
					</SelectButton>
					<SelectButton state={selectedAffiliation === 'OFF_CAMPUS'} onClick={() => toggleAffiliation('OFF_CAMPUS')}>
						교외
					</SelectButton>
					<SelectButton state={selectedAffiliation === 'OTHER'} onClick={() => toggleAffiliation('OTHER')}>
						기타
					</SelectButton>
				</form>
			</Container>
		</>
	);
};

export { Affiliation1, Affiliation2 };

const Container = styled.div`
	// width: 300px;
	// height: 60px;
	display: flex;
	flex-direction: row;
	gap: 10px;
	// justify-content: flex-start;
	// align-items: center;
	text-align: center;
`;

const SelectButton = styled.div`
	width: 125px;
	height: 50px;
	font-size: 16px;
	font-weight: 400;
	font-family: 'Regular';
	line-height: 50px;
	border-radius: 10px;
	cursor: pointer;
	margin-right: 10px;

	display: inline-block;
	// display: flex;
	// justify-content: center;
	// align-items: center;

	background-color: ${(props) => (props.state ? '#E1FAED' : '#F5F5F5')};
	color: ${(props) => (props.state ? '#3AAF85' : '#707070')};
	border: ${(props) => (props.state ? '2px solid #3AAF85' : 'none')};
`;
