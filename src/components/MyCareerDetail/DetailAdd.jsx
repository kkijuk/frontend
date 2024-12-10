import React, { useState } from 'react';
import styled from 'styled-components';
import ReactCalendar from './Calendar';
import moment from 'moment';
import TagBox from '../shared/TagBox';
import { AddDetail } from '../../api/Mycareer/AddDetail';

const Box = styled.div`
	height: 384px;
	width: 800px;
	padding: 24px 40px;
`;

const Top = styled.div`
	display: flex;
	justify-content: space-between;
	height: 79px;
	width: 720px;
	margin-top: 22px;
`;

const Middle = styled.div`
	height: 142px;
	width: 800px;
	margin-top: 18px;
`;

const Button = styled.div`
	height: 50px;
	display: flex;
	gap: 15px;
	margin-bottom: 24px;
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 20px;
`;

const Date = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

const DateBox = styled.div`
	border-radius: 10px;
	cursor: pointer;
	height: 50px;
	width: 240px;
	padding: 15px 20px;
	box-sizing: border-box;
	background: #f5f5f5;
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const Label = styled.div`
	color: var(--black, #000);
	font-family: semibold;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-bottom: 8px;
`;

const Cancel = styled.div`
	width: 150px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1.5px solid var(--sub-rd, #fa7c79);
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--sub-rd, #fa7c79);
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	cursor: pointer;
`;

const Save = styled.div`
	width: 555px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	cursor: pointer;
`;

const Line = styled.div`
	width: 800px;
	height: 2px;
	background: var(--gray-03, #d9d9d9);
`;

const Input = styled.input`
	border-radius: 10px;
	background: #f5f5f5;
	flex-shrink: 0;
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || 'auto'};
	border: none; /* 테두리를 없앰 */
	font-family: Pretendard;
	font-size: 16px;
	color: var(--black, #000);
	padding: 15px 20px; /* 위아래 15px, 양옆 20px */
	box-sizing: border-box; /* padding을 포함한 요소의 전체 크기를 설정된 width와 height에 맞춤 */
	z-index: 1; /* z-index 추가 */
	position: relative; /* z-index가 적용되도록 position 속성 추가 */
`;

const TextArea = styled.textarea`
	border-radius: 10px;
	background: #f5f5f5;
	flex-shrink: 0;
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || 'auto'};
	border: none; /* 테두리를 없앰 */
	font-family: Pretendard;
	font-size: 16px;
	color: var(--black, #000);
	padding: 15px 20px; /* 위아래 15px, 양옆 20px */
	box-sizing: border-box; /* padding을 포함한 요소의 전체 크기를 설정된 width와 height에 맞춤 */
	z-index: 1; /* z-index 추가 */
	position: relative; /* z-index가 적용되도록 position 속성 추가 */
	resize: none; /* 사용자가 텍스트 영역 크기 조절 못하도록 함 */
	overflow-y: auto; /* 텍스트가 넘칠 경우 스크롤 생성 */
`;

export default function DetailAdd({ onCancel, onSave, careerId, careerType }) {
	// careerId도 prop으로 받음
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tagList, setTagList] = useState([]); // 태그 ID 리스트를 상태로 관리

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
		if (!title || !content) {
			console.error('Title or Content is empty!');
			return;
		}
		const [startDate, endDate] = selectedDate.split(' ~ ');
		const data = {
			careerType,
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
		setTitle(event.target.value);
	};

	const saveContent = (event) => {
		setContent(event.target.value);
		console.log(event.target.value);
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
				<TextArea
					height="100px"
					width="720px"
					placeholder="활동 세부 내용을 작성하세요"
					value={content}
					onChange={saveContent}
				/>
			</Middle>
			<TagBox onTagListChange={setTagList} /> {/* 태그 박스에서 선택한 태그 관리 */}
			<Button>
				<Cancel onClick={onCancel}>취소</Cancel>
				<Save onClick={handleSave}>저장</Save>
			</Button>
			<Line></Line>
		</Box>
	);
}
