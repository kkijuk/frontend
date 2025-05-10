import React, { useState } from 'react';
import styled from 'styled-components';
import ReactCalendar from './Calendar';
import moment from 'moment';
import TagBox from '../shared/TagBox';
import { AddDetail } from '../../api/Mycareer/AddDetail';
import { trackEvent } from '../../utils/ga4';

import {
	Box,
	Top,
	Middle,
	Button,
	Title,
	Date,
	DateBox,
	Label,
	Cancel,
	Save,
	Line,
	Input,
	TextArea,
	ButtonRow,
	ErrorMessage,
} from './DetailAdd.styles';

export default function DetailAdd({ onCancel, onSave, careerId, careerType }) {
	// careerId도 prop으로 받음
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tagList, setTagList] = useState([]); // 태그 ID 리스트를 상태로 관리
	const [errorMessage, setErrorMessage] = useState('');

	const [textAreaHeight, setTextAreaHeight] = useState('100px');

	console.log('careerId:', careerId);
	const handleDateClick = () => {
		setShowCalendar(!showCalendar);
	};

	const handleDateChange = (date) => {
		if (Array.isArray(date) && date.length === 2) {
			const [startDate, endDate] = date;
			const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
			const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

			if (formattedStartDate === formattedEndDate) {
				setSelectedDate(formattedStartDate);
			} else {
				setSelectedDate(`${formattedStartDate} ~ ${formattedEndDate}`);
			}
		} else {
			const formattedDate = moment(date).format('YYYY-MM-DD');
			setSelectedDate(formattedDate);
		}
		setShowCalendar(false);
	};

	const handleSave = async () => {
		if (!title) {
			setErrorMessage('제목을 입력해주세요.');
			return;
		}
		if (!selectedDate) {
			setErrorMessage('날짜를 선택해주세요.');
			return;
		}
		if (!content) {
			setErrorMessage('입력한 내용이 없습니다.');
			return;
		}
		const [startDate, endDate] = selectedDate.split(' ~ ');
		const data = {
			careerType, // 받아온 careerType을 그대로 사용
			title,
			content,
			startDate,
			endDate: endDate || startDate, // 날짜가 하나만 있으면 startDate로 설정
			tagList: tagList,
		};

		await AddDetail(careerId, data);
		onSave();
		onCancel(); // 부모 컴포넌트의 상태를 변경하여 창을 닫습니다.
	};

	const saveTitle = (event) => {
		const inputText = event.target.value.slice(0, 30); // 30자 제한

		setTitle(inputText);
	};

	const saveContent = (event) => {
		const inputText = event.target.value.slice(0, 800); // 800자 제한

		setContent(inputText);

		// height 자동 조절
		const textarea = event.target;
		textarea.style.height = 'auto'; // 높이 초기화
		textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 따라 늘리기
	};

	return (
		<Box>
			<Top>
				<Title>
					<Label>제목</Label>
					<Input height="50px" width="460px" placeholder="활동 제목을 작성하세요" value={title} onChange={saveTitle} />
				</Title>
				<Date>
					<Label>날짜</Label>
					<DateBox onClick={handleDateClick}>{selectedDate || '날짜를 선택하세요'}</DateBox>
					{showCalendar && <ReactCalendar onChange={handleDateChange} />}
				</Date>
			</Top>
			<Middle>
				<Label>내용</Label>
				<TextArea width="720px" placeholder="활동 세부 내용을 작성하세요" value={content} onChange={saveContent} />
			</Middle>
			<TagBox onTagListChange={setTagList} /> {/* 태그 박스에서 선택한 태그 관리 */}
			<Button>
				<ButtonRow>
					<Cancel onClick={onCancel}>취소</Cancel>
					<Save
						onClick={() => {
							trackEvent('add_confirm', {
								category: 'mycareer',
								detail: 'career_detail',
								action_type: 'confirm',
								label: '저장',
							});
							handleSave();
						}}>
						저장
					</Save>
				</ButtonRow>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</Button>
			<Line></Line>
		</Box>
	);
}
