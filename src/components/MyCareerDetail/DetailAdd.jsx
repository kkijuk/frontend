import React, { useState } from 'react';
import styled from 'styled-components';
import ReactCalendar from './Calendar';
import moment from 'moment';
import TagBox from '../shared/TagBox';
import { trackEvent } from '../../utils/ga4';
import { useCareerDetailAdd } from '@/hooks/MycareerDetail/useCareerDetailMutations';

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
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tagList, setTagList] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const addMutation = useCareerDetailAdd(() => {
		onSave();
		onCancel();
	});

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

	const handleSave = () => {
		if (!title) return setErrorMessage('제목을 입력해주세요.');
		if (!selectedDate) return setErrorMessage('날짜를 선택해주세요.');
		if (!content) return setErrorMessage('입력한 내용이 없습니다.');

		const [startDate, endDate] = selectedDate.split(' ~ ');
		const data = {
			careerType,
			title,
			content,
			startDate,
			endDate: endDate || startDate,
			tagList,
		};

		addMutation.mutate({ careerId, data });
	};

	const saveTitle = (event) => {
		const inputText = event.target.value.slice(0, 30);
		setTitle(inputText);
	};

	const saveContent = (event) => {
		const inputText = event.target.value.slice(0, 800);
		setContent(inputText);
		event.target.style.height = 'auto';
		event.target.style.height = `${event.target.scrollHeight}px`;
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
			<TagBox onTagListChange={setTagList} />
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
						}}
						disabled={addMutation.isLoading}
					>
						{addMutation.isLoading ? '저장 중...' : '저장'}
					</Save>
				</ButtonRow>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</Button>
			<Line></Line>
		</Box>
	);
}
