import React from 'react';

import { ViewToggleStyled, ToggleButtonsContainer, ToggleButton, ViewTitle } from './CareerView.styles';

const CareerView = ({ view, onToggle }) => {
	return (
		<ViewToggleStyled>
			<ViewTitle>활동 목록</ViewTitle>
			<ToggleButtonsContainer>
				<ToggleButton active={view === 'year'} onClick={() => onToggle('year')}>
					시간순
				</ToggleButton>
				<ToggleButton active={view === 'category'} onClick={() => onToggle('category')}>
					분류별
				</ToggleButton>
			</ToggleButtonsContainer>
		</ViewToggleStyled>
	);
};

export default CareerView;
