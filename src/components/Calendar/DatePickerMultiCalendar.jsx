import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './DatePickerMultiCalendar.css';
import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DatePickerMultiCalendar() {
	const [selected, setSelected] = useState(null);

	//날짜 하루만 선택 기능
	//날짜 하루 가능 로직 (같은 날짜 두 번 클릭하면 from === to)
	const handleDayClick = (day) => {
		if (!selected?.from) {
			setSelected({ from: day, to: undefined });
			return;
		}

		if (selected.from && !selected.to) {
			if (isSameDay(day, selected.from)) {
				setSelected({ from: day, to: day }); //하루선택
			} else {
				setSelected({ from: selected.from, to: day }); //범위선택
			}
			return;
		}

		//이미 범위가 있는 상태면 새로 시작
		setSelected({ from: day, to: undefined });
	};

	return (
		<div>
			<DayPicker
				mode="range"
				navLayout="around"
				locale={ko}
				selected={selected}
				onDayClick={handleDayClick}
				//onSelect={setSelected} //기존 코드(범위 -> 하루 선택 가능 전)
				showOutsideDays
				fixedWeeks
				formatters={{
					formatCaption: (date) => format(date, 'yyyy\u00a0\u00a0\u00a0 M월', { locale: ko }),
				}}
			/>
		</div>
	);
}
