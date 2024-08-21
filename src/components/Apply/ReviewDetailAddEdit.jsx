import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewInputBox from './ReviewInputBox';
import ReactCalendar from './ReviewCalendar';
import moment from 'moment';
import { editReview } from '../../api/Apply/ReviewEdit';
import { deleteReview } from '../../api/Apply/DeleteReview';
import ReviewDeleteModal from './ReviewDeleteModal';  

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
    background: #F5F5F5;
    color: var(--gray-02, #707070);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Label = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
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
    border: 1.5px solid var(--sub-rd, #FA7C79);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sub-rd, #FA7C79);
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
    background: var(--main-01, #3AAF85);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
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
    background: var(--gray-03, #D9D9D9);
`;

export default function ReviewDetailAddEdit({ recruitId, reviewId, initialTitle, initialDate, initialContents, onSave, onDelete, fetchData }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [title, setTitle] = useState(initialTitle);
    const [contents, setContents] = useState(initialContents);
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태

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
                onSave();  // 저장 후 부모 컴포넌트에서 전달된 콜백 함수 호출
            }
    
            // 수정 후 최신 데이터를 가져옵니다.
            if (fetchData) {
                fetchData(); // 추가
            }
        } catch (error) {
            console.error('Failed to save review:', error);
        }
    };
    

    const handleDeleteClick = () => {
        setIsModalOpen(true);  // 모달 열기
    };

    const handleConfirmDelete = async () => {
        try {
            console.log(`Deleting review with ID: ${reviewId} for recruit ID: ${recruitId}`);
            await deleteReview(recruitId, reviewId);
    
            if (onDelete) {
                onDelete();  // 부모 컴포넌트에서 상태 업데이트를 위한 콜백 함수 호출
            }
    
            // 삭제 후 최신 데이터를 가져옵니다.
            if (fetchData) {
                fetchData(); // 추가
            }
    
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };
    
    

    const handleCancelDelete = () => {
        setIsModalOpen(false);  // 모달 닫기
    };

    return (
        <Box>
            <Top>
                <Title>
                    <Label>제목</Label>
                    <ReviewInputBox height="50px" width="460px" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                <Cancel onClick={handleDeleteClick}>삭제</Cancel>
                <Save onClick={handleSaveClick}>저장</Save>
            </Button>

            {isModalOpen && (
                <ReviewDeleteModal
                    onClose={handleCancelDelete}  // 취소 클릭 시 모달 닫기
                    onConfirm={handleConfirmDelete}  // 확인 클릭 시 삭제 진행
                />
            )}
        </Box>
    );
}



