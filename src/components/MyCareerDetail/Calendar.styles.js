// components/ReactCalendar.styles.js
import styled from 'styled-components';
import { Color } from '@/constants/color';
import React from 'react';

export const CalendarWrapper = styled.div`
	.react-calendar {
		width: 281px;
		height: 263px;
		flex-shrink: 0;
		border-radius: 10px;
		border: 1px solid ${Color.gray03};
		background: ${Color.white};
		position: absolute;
		z-index: 10;
	}

	.react-calendar__navigation {
		justify-content: center;
		gap: 15px;
		height: 20px;
		margin-top: 15px;
	}

	.react-calendar__navigation__button {
		width: 20px;
		height: 20px;
	}

	.react-calendar__month-view__weekdays abbr {
		text-decoration: none;
	}

	.react-calendar__navigation button .prev-icon {
		transform: rotate(180deg);
	}

	.react-calendar__month-view__weekdays__weekday:nth-child(1) {
		color: ${Color.subRd};
	}

	.react-calendar__month-view__weekdays__weekday:nth-child(7) {
		color: ${Color.subBu};
	}

	.react-calendar__tile {
		background: ${Color.white};
		color: ${Color.black};
		margin-top: 3px;
		margin-bottom: 3px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.react-calendar__tile--now {
		background: none;
	}

	.react-calendar__tile:enabled:hover,
	.react-calendar__tile:enabled:focus {
		width: 35px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background: ${Color.main01} !important;
		color: ${Color.white} !important;
	}

	.react-calendar--selectRange .react-calendar__tile--hover {
		background-color: ${Color.main03};
	}

	.react-calendar__tile--active {
		width: 35px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background: ${Color.main01} !important;
		color: ${Color.white} !important;
	}

	.react-calendar__month-view__days__day--neighboringMonth {
		color: rgba(66, 66, 66, 0.3);
		font-size: 14px;
		font-weight: 400;
	}
`;

export const ChevronDownIcon = ({ className }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
		<path d="M8 15L13 10L8 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);
