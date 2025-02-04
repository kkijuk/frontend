import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewInputBox from './ReviewInputBox';
import ReactCalendar from './ReviewCalendar';
import moment from 'moment';
import { editReview } from '../../api/Apply/ReviewEdit';
import { deleteReview } from '../../api/Apply/DeleteReview';

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
	font-family: regular;
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
	font-family: regular;
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

export default function ReviewDetailAddEdit({
	recruitId,
	reviewId,
	initialTitle,
	initialDate,
	initialContents,
	onSave,
	onDelete,
	fetchData,
	disableTitleEdit
}) {
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(initialDate);
	const [title, setTitle] = useState(initialTitle);
	const [contents, setContents] = useState(initialContents);
	const [isEditing, setIsEditing] = useState(true); // 수정란 상태

	const handleDateClick = () => {
		setShowCalendar(!showCalendar);
	};

	const handleDateChange = (date) => {
		const formattedDate = moment(date).format('YYYY-MM-DD');
		setSelectedDate(formattedDate);
		setShowCalendar(false);
	};

	const handleSaveClick = async () => {
		try {
			const reviewData = {
				title: title || initialTitle,
				content: contents || initialContents,
				date: selectedDate || initialDate,
			};
			await editReview(recruitId, reviewId, reviewData);

			if (onSave) {
				onSave(); // 저장 후 부모 컴포넌트에서 전달된 콜백 함수 호출
			}

			// 수정 후 최신 데이터를 가져옵니다.
			if (fetchData) {
				fetchData(); // 추가
			}

			setIsEditing(false); // 수정란 닫기
		} catch (error) {
			console.error('Failed to save review:', error);
		}
	};

	const handleDeleteClick = async () => {
		const confirmed = window.confirm('정말로 삭제하시겠습니까?');
		if (confirmed) {
			try {
				await deleteReview(recruitId, reviewId);

				if (onDelete) {
					onDelete(); // 부모 컴포넌트에서 상태 업데이트를 위한 콜백 함수 호출
				}

				// 삭제 후 최신 데이터를 가져옵니다.
				if (fetchData) {
					await fetchData(); // 추가
				}

				setIsEditing(false); // 수정란 닫기
				alert('삭제되었습니다.');
			} catch (error) {
				console.error('Failed to delete review:', error);
			}
		}
	};

	if (!isEditing) {
		return null; // 수정란 닫기
	}

	return (
		<Box>
			<Top>
				<Title>
					<Label>제목</Label>
					<ReviewInputBox 
	height="50px" 
	width="460px" 
	value={title} 
	onChange={(e) => setTitle(e.target.value)}
	disabled={disableTitleEdit} //  서류 리뷰는 제목 수정 비활성화
/>
				</Title>
				<Date>
					<Label>날짜</Label>
					<DateBox onClick={handleDateClick}>{selectedDate || '날짜를 선택하세요'}</DateBox>
					{showCalendar && <ReactCalendar onChange={handleDateChange} />}
				</Date>
			</Top>
			<Middle>
				<Label>내용</Label>
				<ReviewInputBox height="100px" width="720px" value={contents} onChange={(e) => setContents(e.target.value)} />
			</Middle>

			<Button>
			{onDelete && (
	         <Cancel onClick={handleDeleteClick}>삭제</Cancel>
            )}
				<Save onClick={handleSaveClick}>저장</Save>
			</Button>
		</Box>
	);
}
