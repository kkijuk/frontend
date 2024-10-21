import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactCalendar from '../../shared/CalendarSingle';

const DateInput = ({ value, onChange, disabled }) => {
	const [showCalendar, setShowCalendar] = useState(false);
	const calendarRef = useRef(null);

	const handleDateChange = (date) => {
		onChange(moment(date).format('YYYY-MM-DD')); // 부모 컴포넌트에 날짜 전달
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
				value={value}
				onClick={() => setShowCalendar(!showCalendar)}
				readOnly
				disabled={disabled}
			/>
			{showCalendar && (
				<CalendarWrapper ref={calendarRef}>
					<ReactCalendar onChange={handleDateChange} />
				</CalendarWrapper>
			)}
		</DateInputWrapper>
	);
};

export default DateInput;

const DateInputWrapper = styled.div`
	position: relative;
	width: 100%; /* 부모 요소에 맞춰 전체 너비를 사용 */
`;

const InputDate = styled.input`
	font-family: Regular;
	font-size: 16px;
	width: 100%;
	padding: 12px;
	margin-bottom: 25px;
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	background: ${(props) => (props.disabled ? '#D9D9D9' : '#F5F5F5')};
	color: ${(props) => (props.disabled ? '#A9A9A9' : '#000')};
	height: 40px; /* 다른 input 필드와 동일한 높이 */
	box-sizing: border-box; /* padding과 border를 포함한 크기 */
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const CalendarWrapper = styled.div`
	position: absolute;
	top: 50px; /* input 아래로 캘린더가 나타나도록 여백 설정 */
	left: 0;
	z-index: 10;
	background: white;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	padding: 10px;
`;
