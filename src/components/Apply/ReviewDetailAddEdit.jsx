import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewInputBox from './ReviewInputBox';
import ReactCalendar from './ReviewCalendar';
import moment from 'moment';
import { editReview } from '../../api/Apply/ReviewEdit';
import { deleteReview } from '../../api/Apply/DeleteReview';
import ReviewDeleteModal from '../../components/Apply/ReviewDeleteModal';

const Box = styled.div`
	height: 384px;
	width: 800px;
	padding: 24px 40px;
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 320px;
	 justify-content: center;
	}
`;
const Top = styled.div`
	display: flex;
	justify-content: space-between;
	height: 79px;
	width: 720px;
	margin-top: 22px;
`;
const Middle = styled.div`
	/*height: 142px;*/
	height: auto;
	width: 800px;
	margin-top: 18px;
`;
const Button = styled.div`
	height: 50px;
	display: flex;
	gap: 15px;
	margin-bottom: 24px;
	 @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
	width: 310px;
  }
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
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
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
	font-family: regular;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	cursor: pointer;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 100px;
	}
`;
const Save = styled.div`
	width: ${(props) => (props.isDocumentReview ? "720px" : "555px")};
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
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 210px;
	}
`;
const Line = styled.div`
	width: 800px;
	height: 2px;
	background: var(--gray-03, #d9d9d9);
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 350px;
	}
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
	disableTitleEdit,
	isDocumentReview
}) {
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(initialDate);
	const [title, setTitle] = useState(initialTitle);
	const [contents, setContents] = useState(initialContents);
	const [isEditing, setIsEditing] = useState(true); 
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	  }, []);

	const handleDateClick = () => {
		setShowCalendar(!showCalendar);
	};

	const handleDateChange = (date) => {
		const formattedDate = moment(date).format('YYYY-MM-DD');
		setSelectedDate(formattedDate);
		setShowCalendar(false);
	};

	const handleSaveClick = async () => {
		if (title.trim() === "서류" && !isDocumentReview) { 
			alert("이미 해당 전형이 존재합니다."); 
			return;
		}
	
		try {
			const reviewData = {
				title: title || initialTitle,
				content: contents || initialContents,
				date: selectedDate || initialDate,
			};
			await editReview(recruitId, reviewId, reviewData);
	
			if (onSave) {
				onSave();
			}
	
			if (fetchData) {
				fetchData();
			}
	
			setIsEditing(false);
		} catch (error) {
			console.error('Failed to save review:', error);
		}
	};

	const handleDeleteClick = () => {
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		try {
			await deleteReview(recruitId, reviewId);

			if (onDelete) {
				onDelete();
			}

			if (fetchData) {
				await fetchData();
			}

			setIsEditing(false);
		} catch (error) {
			console.error('Failed to delete review:', error);
		}
		setIsDeleteModalOpen(false);
	};

	if (!isEditing) {
		return null;
	}

	return (
		<>
			<Box>
			{isMobile ? (
    <>
      <Title>
        <Label>전형</Label> 
        <ReviewInputBox
          height="50px"
          width="100%"
          value={disableTitleEdit ? "서류" : title}
          onChange={(e) => {
            if (!disableTitleEdit) setTitle(e.target.value);
          }}
          type="text"
          disabled={disableTitleEdit}
          readOnly={disableTitleEdit}
          style={disableTitleEdit ? { backgroundColor: "#f5f5f5", color: "#b0b0b0", cursor: "not-allowed" } : {}}
        />
      </Title>
	  <Date>
        <Label>날짜</Label>
        <DateBox onClick={handleDateClick}>{selectedDate || '날짜를 선택하세요'}</DateBox>
        {showCalendar && <ReactCalendar onChange={handleDateChange} />}
      </Date>
      <Middle>
        <Label>전형 후기</Label>
        <ReviewInputBox 
          height="100px" 
          width="100%" 
          value={contents} 
          onChange={(e) => setContents(e.target.value)} 
          type="textarea"
        />
      </Middle>

    </>
  ) : (
    <>
      <Top>
        <Title>
          <Label>전형</Label> 
          <ReviewInputBox
            height="50px"
            width="460px"
            value={disableTitleEdit ? "서류" : title}
            onChange={(e) => {
              if (!disableTitleEdit) setTitle(e.target.value);
            }}
            type="text"
            disabled={disableTitleEdit}
            readOnly={disableTitleEdit}
            style={disableTitleEdit ? { backgroundColor: "#f5f5f5", color: "#b0b0b0", cursor: "not-allowed" } : {}}
          />
        </Title>

        <Date>
          <Label>날짜</Label>
          <DateBox onClick={handleDateClick}>{selectedDate || '날짜를 선택하세요'}</DateBox>
          {showCalendar && <ReactCalendar onChange={handleDateChange} />}
        </Date>
      </Top>

      <Middle>
        <Label>전형 후기</Label>
        <ReviewInputBox 
          height="100px" 
          width="720px" 
          value={contents} 
          onChange={(e) => setContents(e.target.value)} 
          type="textarea"
        />
      </Middle>
    </>
  )}
				<Button>
				{!disableTitleEdit && (
                   <Cancel onClick={handleDeleteClick}>삭제</Cancel>
                 )}
					<Save isDocumentReview={disableTitleEdit} onClick={handleSaveClick}>
	                 저장
                    </Save>  
				</Button>
			</Box>
			{isDeleteModalOpen && (
				<ReviewDeleteModal 
					onClose={() => setIsDeleteModalOpen(false)}
					onConfirm={handleConfirmDelete} 
				/>
			)}
		</>
	);
}