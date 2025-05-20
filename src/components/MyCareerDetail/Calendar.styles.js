// components/ReactCalendar.styles.js
import styled from 'styled-components';
import React from 'react';

export const CalendarWrapper = styled.div`
	.react-calendar {
		width: 281px;
		height: 263px;
		flex-shrink: 0;
		border-radius: 10px;
		border: 1px solid var(--gray-03, #d9d9d9);
		background: var(--white, #fff);
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
		color: var(--sub-rd, #fa7c79);
	}

	.react-calendar__month-view__weekdays__weekday:nth-child(7) {
		color: var(--sub-bu, #77aff2);
	}

	.react-calendar__tile {
		background: #fff;
		color: #000;
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
		background: var(--main-01, #3aaf85) !important;
		color: var(--white, #fff) !important;
	}

	.react-calendar--selectRange .react-calendar__tile--hover {
		background-color: var(--main-03, #e1faed);
	}

	.react-calendar__tile--active {
		width: 35px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background: var(--main-01, #3aaf85) !important;
		color: var(--white, #fff) !important;
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
