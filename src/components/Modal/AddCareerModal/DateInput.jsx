import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactCalendar from '../../shared/CalendarSingle';
import CustomCalendarPicker from '../../Record/CustomCalendarPicker';

const DateInput = ({ value, onChange, disabled }) => {
	const [showCalendar, setShowCalendar] = useState(false);
	const calendarRef = useRef(null);

	const formatToInputValue = (timestamp) => {
		// value: 숫자(타임스탬프) 혹은 null
  		// 내부 input에는 'YYYY-MM-DD' 형태로 표시
		if (!timestamp) return '';
		const dateObj = new Date(timestamp);
		if (isNaN(dateObj)) return '';
		return dateObj.toISOString().slice(0, 10); // 'YYYY-MM-DD'
	};

	const handleDateChange = (date) => {
		onChange(new Date(date).getTime()); // 부모 컴포넌트에 날짜 전달
		setShowCalendar(false);
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
					<CustomCalendarPicker
						value={formatToInputValue(value)}
						onChange={handleDateChange}/>
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
`;

const InputDate = styled.input`
	// position: absolute;
	font-family: Regular;
	font-size: 16px;
	width: 240px;
	height: 60px;
	// padding: 10px;
	margin-bottom: 25px;
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	background: ${(props) => (props.disabled ? '#D9D9D9' : '#F5F5F5')};
	color: ${(props) => (props.disabled ? '#A9A9A9' : '#000')};
	height: 40px;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const CalendarWrapper = styled.div`
	position: absolute;
	top: 50px; 
	left: 0;
	z-index: 1000;
	background: white;
	// box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 10px;

	width: 100%;
	height: 300px;
`;
