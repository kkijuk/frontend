import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { theme } from '../../../constants/theme';

const DateInput = ({ value, onChange, disabled }) => {
	const [showCalendar, setShowCalendar] = useState(false);
	const calendarRef = useRef(null);

	const formatToInputValue = (timestamp) => {
		// value: 숫자(타임스탬프) 혹은 null
  		// 내부 input에는 'YYYY-MM-DD' 형태로 표시
		if (!timestamp) return '';
		return moment(timestamp).format('YYYY-MM-DD');

		// old code
		// if (isNaN(dateObj)) return '';
		// return dateObj.toISOString().slice(0, 10); // 'YYYY-MM-DD'
		
	};

	const handleDateChange = (date) => {
		const adjusted = moment(date).startOf('day').valueOf(); // 날짜를 자정으로 설정
		onChange(adjusted); // 부모 컴포넌트에 날짜 전달
		setShowCalendar(false);
		// console.log('selected date:', date);
		// console.log('timestamp:', adjusted);
		// console.log('adjusted date:', new Date(adjusted));
	};

	const handleClickOutside = (event) => {
		if (calendarRef.current && !calendarRef.current.contains(event.target)) {
			setShowCalendar(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<DateInputWrapper>
			<InputDate
				type="text"
				placeholder="YYYY-MM-DD"
				value={formatToInputValue(value)}
				onClick={() => setShowCalendar(!showCalendar)}
				readOnly
				disabled={disabled}
			/>
			{showCalendar && (
				<CalendarWrapper ref={calendarRef}>
					{/* <ReactCalendar onChange={handleDateChange} /> */}
					<Calendar
						onChange = {handleDateChange}
						value = {value ? new Date(value) : null}
						selectRange = {false}
						formatDay={(locale, date) => moment(date).format('D')}
						calendarType='gregory'
						next2Label={null}
						prev2Label={null}
						nextLabel = {<ChevronDownIcon className="next-icon"/>}
						prevLabel = {<ChevronDownIcon className="prev-icon" />}
						tileClassName={({ date, view }) => {
							if (moment(date).isSame(new Date(), 'day')) {
								return '';
							}
						}}
						showFixedNumberOfWeeks={true}
					/>
				</CalendarWrapper>
			)}
		</DateInputWrapper>
	);
};

export default DateInput;

const DateInput2 = ()=>{

}

export {DateInput2};

const DateInputWrapper = styled.div`
	position: relative;
	width: 260px;
	@media (max-width: ${theme.breakpoints.md}) {
		width: 140px !important;
	}
`;

const InputDate = styled.input`
	// position: absolute;
	font-family: Regular;
	font-size: 16px;
	width: 260px;
	height: 60px;
	// padding: 10px;
	margin-bottom: 25px;
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	background: ${(props) => (props.disabled ? '#D9D9D9' : '#F5F5F5')};
	color: ${(props) => (props.disabled ? '#A9A9A9' : '#000')};
	height: 40px;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
	}
`;

// const CalendarWrapper = styled.div`
// 	position: absolute;
// 	top: 50px; 
// 	left: 0;
// 	z-index: 1000;
// 	background: white;
// 	// box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// 	border-radius: 10px;

// 	width: 100%;
// 	height: 300px;
// `;

const CalendarWrapper = styled.div`
	font-family: Regular;
	.react-calendar {
		width: 281px;
		height: 263px;
		flex-shrink: 0;
		border-radius: 10px;
		border: 1px solid var(--gray-03, #d9d9d9);
		background: var(--white, #fff);
		position: absolute;
		z-index: 10000;
		top: 51px;
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
		z-index: 10000;
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

const ChevronDownIcon = ({ className }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
		<path d="M8 15L13 10L8 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);