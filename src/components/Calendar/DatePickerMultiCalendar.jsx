import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './DatePickerMultiCalendar.css';
import { format } from 'date-fns';
import { isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DatePickerMultiCalendar() {
	const [selected, setSelected] = useState(null);

	//날짜 하루 가능 코드 추가
	const handleDayClick = (day, modifiers, e) => {
		if (!selected?.from) {
			// 아직 아무 것도 선택 안 됨 → 시작일 지정
			setSelected({ from: day, to: undefined });
			return;
		}

		if (selected.from && !selected.to) {
			//시작일만 있는 상태
			if (isSameDay(day, selected.from)) {
				//같은 날짜를 다시 클릭 → 단일일 선택 (from === to)
				setSelected({ from: day, to: day });
			} else {
				//다른 날짜 클릭 → 일반 범위 선택
				setSelected({ from: selected.from, to: day });
			}
			return;
		}

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
						formatCaption: (date) => {
							return format(date, 'yyyy\u00a0\u00a0\u00a0 M월', { locale: ko });
						},
					}}
				/>
			</div>
		);
	};
}
