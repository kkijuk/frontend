//MyCareerDetail의 DetailAdd, DetailAddEdit 컴포넌트에서 사용

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import { CalendarWrapper, ChevronDownIcon } from './Calendar.styles';

export default function ReactCalendar({ onChange }) {
	const [value, setValue] = useState([new Date(), new Date()]);
	const [isOpen, setIsOpen] = useState(true); //캘린더 외부 클릭시 닫히게 하기 위해 추가
	const calendarRef = useRef(); //얘도 위와 동일

	const handleDateChange = (date) => {
		if (Array.isArray(date)) {
			if (date.length === 1) {
				setValue([date[0], date[0]]);
			} else {
				setValue(date);
			}
		} else {
			setValue([date, date]);
		}
		onChange(date);
	};

	const handleClickOutside = (event) => {
		if (calendarRef.current && !calendarRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		isOpen && (
			<CalendarWrapper ref={calendarRef}>
				<Calendar
					onChange={handleDateChange}
					selectRange={true}
					value={value}
					formatDay={(locale, date) => moment(date).format('D')}
					calendarType="gregory"
					next2Label={null}
					prev2Label={null}
					nextLabel={<ChevronDownIcon className="next-icon" />}
					prevLabel={<ChevronDownIcon className="prev-icon" />}
					navigationLabel={({ date }) => moment(date).format('YYYY M월')}
					tileClassName={({ date, view }) => {
						if (moment(date).isSame(new Date(), 'day')) {
							return 'react-calendar__tile--now';
						}
						return '';
					}}
					showFixedNumberOfWeeks={true}
				/>
			</CalendarWrapper>
		)
	);
}
