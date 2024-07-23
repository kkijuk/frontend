import React, { useState } from 'react';
import styled from 'styled-components';
import InputBox from '../shared/InputBox';
import ReactCalendar from '../shared/Calendar';
import moment from 'moment';

const Box = styled.div`
    height: 384px;
    width: 800px;
    padding: 24px 40px;
    border: 1px solid black;
    box-sizing: border-box;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    height: 79px;
    width: 720px;
`;

const Middle = styled.div`
    height: 147px;
    width: 800px;
    margin-top: 18px;
`;

const Button = styled.div`
    height: 63px;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`;

const Date = styled.div`
    display: flex;
    flex-direction: column;
    position: relative; /* 캘린더 위치를 설정하기 위해 추가 */
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

export default function DetailAdd() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (date) => {
        if (Array.isArray(date) && date.length === 2) {
            const [startDate, endDate] = date;
            const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
            const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
    
            if (formattedStartDate === formattedEndDate) {
                // 두 날짜가 같은 경우
                setSelectedDate(formattedStartDate);
            } else {
                // 두 날짜가 다른 경우
                setSelectedDate(`${formattedStartDate} - ${formattedEndDate}`);
            }
        } else {
            // 배열이 아닌 경우 또는 날짜가 하나만 선택된 경우
            const formattedDate = moment(date).format('YYYY-MM-DD');
            setSelectedDate(formattedDate);
        }
        setShowCalendar(false);
    };
    

    return (
        <Box>
            <Top>
                <Title>
                    <Label>제목</Label>
                    <InputBox height="50px" width="460px" placeholderText="활동 제목을 작성하세요" />
                </Title>
                <Date>
                    <Label>날짜</Label>
                    <DateBox onClick={handleDateClick}>{selectedDate || '날짜를 선택하세요'}</DateBox>
                    {showCalendar && <ReactCalendar onChange={handleDateChange} />}
                </Date>
            </Top>
            <Middle>
                <Label>내용</Label>
                <InputBox height="100px" width="720px" placeholderText="활동 세부 내용을 작성하세요" />
            </Middle>
            <Button>
            </Button>
        </Box>
    );
}
