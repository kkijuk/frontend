import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputBox from '../MyCareerDetail/InputBox';
import ReactCalendar from '../shared/Calendar';
import moment from 'moment';
import TagBox from '../shared/TagBox';
import { CareerDetailEdit } from '../../api/Mycareer/CareerDetailEdit';
import { CareerDetailDelete } from '../../api/Mycareer/CareerDetailEdit';


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
`;

const Line = styled.div`
    width: 800px;
    height: 2px;
    background: var(--gray-03, #D9D9D9);
`;

export default function DetailAddEdit({ initialTitle, initialDate, initialContents, initialTags, careerId, detailId, onClose, onUpdate }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [title, setTitle] = useState(initialTitle);
    const [contents, setContents] = useState(initialContents);
    const [tagNames, setTagNames] = useState([]);
    const [tagIds, setTagIds] = useState([]);

    useEffect(() => {
        // initialTags 배열의 tagName만 추출하여 tagNames 배열 생성
        const extractedTagNames = initialTags.map(tag => tag.tagName);
        setTagNames(extractedTagNames);
        console.log("initialTags:", initialTags);
    }, [initialTags]);


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
        const [startDate, endDate] = selectedDate.split(' ~ ');

        const data = {
            title,
            content: contents,
            startDate: startDate || selectedDate,
            endDate: endDate || startDate || selectedDate,
            tagList: tagIds // 태그의 id 리스트를 전송
        };

        try {
            await CareerDetailEdit(careerId, detailId, data); // API 호출
            alert('저장되었습니다.');
            onClose();
            onUpdate();
        } catch (error) {
            console.error('저장 실패:', error);
        }
    };

    const handleCancel = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await CareerDetailDelete(careerId, detailId); // 삭제 API 호출
                alert('삭제되었습니다.');
                onClose();  // 삭제 후 창 닫기
                onUpdate();
            } catch (error) {
                console.error('삭제 실패:', error);
            }
        }
    };


    return (
        <Box>
            <Top>
                <Title>
                    <Label>제목</Label>
                    <InputBox height="50px" width="460px" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Title>
                <Date>
                    <Label>날짜</Label>
                    <DateBox onClick={handleDateClick}>{selectedDate || '날짜를 선택하세요'}</DateBox>
                    {showCalendar && <ReactCalendar onChange={handleDateChange} />}
                </Date>
            </Top>
            <Middle>
                <Label>내용</Label>
                <InputBox height="100px" width="720px" value={contents} onChange={(e) => setContents(e.target.value)} />
            </Middle>
            <TagBox 
                externalTags={tagNames} 
                externalSetTags={setTagNames} 
                onTagListChange={(ids) => setTagIds(ids)} // 태그 ID 리스트를 업데이트하는 콜백 함수
            />
            <Button>
                <Cancel onClick={handleCancel}>삭제</Cancel>
                <Save onClick={handleSave}>저장</Save>
            </Button>
            <Line></Line>
        </Box>
    );
}