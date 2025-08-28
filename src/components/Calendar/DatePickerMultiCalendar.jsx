import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './DatePickerMultiCalendar.css';
import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DatePickerMultiCalendar() {
	const [selected, setSelected] = useState(null); // { from?: Date, to?: Date } | null
	const [lastClicked, setLastClicked] = useState(null);
	//날짜 하루만 선택 기능
	//날짜 하루 가능 로직 (같은 날짜 두 번 클릭하면 from === to)

	//클릭된 day를 저장해두고, 선택 결과는 onSelect에서 통제
	const handleDayClick = (day) => {
		setLastClicked(day);
	};

	const handleSelect = (range) => {
		//range는 내부 로직에 따라 undefined가 들어오기도 함
		if (!range) {
			setSelected(null);
			return;
		}

		// 첫 클릭: from만 존재 (to 없음)
		if (range.from && !range.to) {
			setSelected({ from: range.from, to: undefined });
			return;
		}

		//두 번째 클릭 이후
		if (range.from && range.to) {
			//마지막 클릭이 시작일과 같은 날 → "하루 선택"으로 강제
			if (lastClicked && isSameDay(lastClicked, range.from)) {
				setSelected({ from: range.from, to: range.from });
			} else {
				//일반 범위 선택
				setSelected(range);
			}
			return;
		}

		//그 외 비정상 케이스 방어
		setSelected(range ?? null);
	};

	return (
		<div>
			<DayPicker
				mode="range"
				navLayout="around"
				locale={ko}
				selected={selected}
				onDayClick={handleDayClick}
				onSelect={handleSelect}
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
