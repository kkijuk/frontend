import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewInputBox from './ReviewInputBox';
import ReactCalendar from './ReviewCalendar';
import moment from 'moment';
import { ReviewAdd } from '../../api/Apply/ReviewAdd';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails'; // RecruitDetails API에서 함수 불러오기
import { updateRecruit } from '../../api/Apply/RecruitUpdate';  // 공고 업데이트 API 가져오기

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
    border: 1.5px solid var(--sub-rd, #FA7C79);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sub-rd, #FA7C79);
    text-align: center;
    font-family: regular;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
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
    font-family: regular;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Line = styled.div`
    width : 800px;
    height: 2px;
    background: var(--gray-03, #D9D9D9);
`;

// 공고의 태그를 업데이트하는 함수
const updateRecruitTags = async (recruitId, newTag) => {
    try {
        // 기존 태그 가져오기
        const recruitDetails = await getRecruitDetails(recruitId);
        const currentTags = recruitDetails.tags || [];

        // 태그 중복 확인 후 앞에 추가
        if (!currentTags.includes(newTag)) {
            const updatedTags = [newTag, ...currentTags];  // 새로운 태그를 맨 앞에 추가
            await updateRecruit(recruitId, { ...recruitDetails, tags: updatedTags });  // 공고 업데이트
        }
    } catch (error) {
        console.error('Failed to update tags:', error);
    }
};

export default function ReviewDetailAdd({ recruitId, onSave }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');  // 제목을 태그로 추가
    const [content, setContent] = useState('');

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
                title,
                content,
                date: selectedDate,
            };
            await ReviewAdd(recruitId, reviewData);  // 리뷰 추가 API 호출

            // 제목으로 태그 추가, 리스트에서 상태에 따라 적용됨
            await updateRecruitTags(recruitId, title);

            onSave(); // 저장 후 콜백 실행 (예: 모달 닫기, 목록 갱신 등)
        } catch (error) {
            console.error('Failed to save review:', error);
        }
    };

    return (
        <Box>
            <Top>
                <Title>
                    <Label>제목</Label>
                    <ReviewInputBox 
                        height="50px" 
                        width="460px" 
                        placeholderText="활동 제목을 작성하세요" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                <ReviewInputBox 
                    height="100px" 
                    width="720px" 
                    placeholderText="활동 세부 내용을 작성하세요" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Middle>

            <Button>
                <Cancel onClick={() => onSave()}>취소</Cancel>
                <Save onClick={handleSaveClick}>저장</Save>
            </Button>
            <Line></Line>
        </Box>
    );
}
