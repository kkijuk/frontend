import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactCalendar from './Calendar';
import moment from 'moment';
import TagBox from '../shared/TagBox';
import { CareerDetailEdit, CareerDetailDelete } from '../../api/Mycareer/CareerDetailEdit';
import CareerDetailDeleteModal from '../Modal/CareerDetailDeleteModal';

const Box = styled.div`
	height: auto;
	width: 800px;
	padding: 24px 40px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 24px 20px;
	}
`;

const Top = styled.div`
	display: flex;
	justify-content: space-between;
	height: 79px;
	width: 720px;
	margin-top: 22px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-direction: column;
		width: 100%;
		height: 100%;
		gap: 24px;
	}
`;

const Middle = styled.div`
	height: 142px;
	width: 800px;
	margin-top: 18px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

const Button = styled.div`
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;
	margin-bottom: 24px;
`;

const Title = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-right: 20px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		margin-right: 0;
	}
`;

const Date = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

const DateBox = styled.div`
	flex: 1;
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

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
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
	width: 100%;
	max-width: 555px;
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

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

const Input = styled.input`
	border-radius: 10px;
	background: #f5f5f5;
	flex-shrink: 0;
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || 'auto'};
	border: none;
	font-family: Pretendard;
	font-size: 16px;
	color: var(--black, #000);
	padding: 15px 20px;
	box-sizing: border-box;
	z-index: 1;
	position: relative;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

const TextArea = styled.textarea`
	border-radius: 10px;
	background: #f5f5f5;
	flex-shrink: 0;
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || 'auto'};
	border: none;
	font-family: Pretendard;
	font-size: 16px;
	color: var(--black, #000);
	padding: 15px 20px;
	box-sizing: border-box;
	z-index: 1;
	position: relative;
	resize: none;
	overflow-y: auto;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

const ErrorMessage = styled.div`
	color: var(--error, #ff7979);
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	margin-top: 5px;
`;

const BlurContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(4px);
	z-index: 11;
`;

const BaseContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 12;
`;

const ButtonRow = styled.div`
	display: flex;
	gap: 15px;
	width: 100%;
	justify-content: space-between;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-direction: row;
		flex-wrap: wrap;
	}
`;

export default function DetailAddEdit({
	initialTitle,
	initialStartDate,
	initialEndDate,
	initialContents,
	initialTags,
	careerId,
	detailId,
	onClose,
	onUpdate,
}) {
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedStartDate, setSelectedStartDate] = useState(initialStartDate || '');
	const [selectedEndDate, setSelectedEndDate] = useState(initialEndDate || '');
	const [title, setTitle] = useState(initialTitle);
	const [contents, setContents] = useState(initialContents);
	const [tagNames, setTagNames] = useState([]);
	const [tagIds, setTagIds] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	useEffect(() => {
		if (initialTags && Array.isArray(initialTags) && initialTags.length > 0) {
			const extractedTagNames = initialTags.map((tag) => tag.tagName);
			setTagNames(extractedTagNames);
		}
	}, [initialTags]);

	const handleDateClick = () => setShowCalendar(!showCalendar);

	const handleDateChange = (date) => {
		if (Array.isArray(date) && date.length === 2) {
			const [startDate, endDate] = date;
			setSelectedStartDate(moment(startDate).format('YYYY-MM-DD'));
			setSelectedEndDate(moment(endDate).format('YYYY-MM-DD'));
		} else {
			const formattedDate = moment(date).format('YYYY-MM-DD');
			setSelectedStartDate(formattedDate);
			setSelectedEndDate('');
		}
		setShowCalendar(false);
	};

	const handleSave = async () => {
		if (!title) return setErrorMessage('제목을 입력해주세요.');
		if (!selectedStartDate) return setErrorMessage('날짜를 선택해주세요.');
		if (!contents) return setErrorMessage('입력한 내용이 없습니다.');

		const data = {
			title,
			content: contents,
			startDate: selectedStartDate,
			endDate: selectedEndDate || null,
			tagList: tagIds,
		};

		try {
			await CareerDetailEdit(careerId, detailId, data);
			alert('저장되었습니다.');
			onClose();
			onUpdate();
		} catch (error) {
			console.error('저장 실패:', error);
		}
	};

	const handleConfirmDelete = async () => {
		try {
			await CareerDetailDelete(careerId, detailId);
			setIsDeleteModalOpen(false);
			onClose();
			onUpdate();
		} catch (error) {
			console.error('삭제 실패:', error);
		}
	};

	return (
		<div>
			<Line />
			{isDeleteModalOpen && (
				<BlurContainer>
					<BaseContainer>
						<CareerDetailDeleteModal onCancel={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
					</BaseContainer>
				</BlurContainer>
			)}
			<Box>
				<Top>
					<Title>
						<Label>제목</Label>
						<Input height="50px" width="460px" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 30))} />
					</Title>
					<Date>
						<Label>날짜</Label>
						<DateBox onClick={handleDateClick}>
							{selectedStartDate
								? selectedEndDate
									? `${selectedStartDate} ~ ${selectedEndDate}`
									: selectedStartDate
								: '날짜를 선택하세요'}
						</DateBox>
						{showCalendar && <ReactCalendar onChange={handleDateChange} />}
					</Date>
				</Top>
				<Middle>
					<Label>내용</Label>
					<TextArea
						height="100px"
						width="720px"
						value={contents}
						onChange={(e) => setContents(e.target.value.slice(0, 800))}
					/>
				</Middle>
				<TagBox externalTags={tagNames} externalSetTags={setTagNames} onTagListChange={setTagIds} />
				<Button>
					<ButtonRow>
						<Cancel onClick={() => setIsDeleteModalOpen(true)}>삭제</Cancel>
						<Save onClick={handleSave}>저장</Save>
					</ButtonRow>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				</Button>
			</Box>
			<Line />
		</div>
	);
}
