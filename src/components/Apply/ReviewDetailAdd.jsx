import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewInputBox from './ReviewInputBox';
import ReactCalendar from './ReviewCalendar';
import moment from 'moment';
import { ReviewAdd } from '../../api/Apply/ReviewAdd'; 
import { trackEvent } from '../../utils/ga4';

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
    height: 142px;
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
    background: #F5F5F5;
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
    border: 1.5px solid var(--sub-rd, #E0E0E0);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sub-rd, #707070);  
    text-align: center;
    font-family: regular;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 100px;
	}
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
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 200px;
	}
`;

const Line = styled.div`
    width : 800px;
    height: 2px;
    background: var(--gray-03, #D9D9D9);
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 350px;
    width: 320px;
	}
`;

export default function ReviewDetailAdd({ recruitId, onSave }) { // recruitId를 prop으로 받아옴.
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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

    const handleContentChange = (e) => {
        if (e.target.value.length <= 1000) {
            setContent(e.target.value);
        }
    };     

    const handleSaveClick = async () => {
        if (title.trim() === "서류") { 
            alert("이미 해당 전형이 존재합니다."); 
            return;
        }

        try {
            // GA 트래킹 추가 (전형 후기 저장 버튼 클릭)
            trackEvent('add_confirm', {
                category: 'apply',
                detail: 'add_recruit_review',
                action_type: 'confirm',
                label: '저장',
            });
    
            const reviewData = {
                title,
                content,
                date: selectedDate,
            };
    
            await ReviewAdd(recruitId, reviewData);
            onSave(); // 저장 후 콜백 실행 (예: 모달 닫기, 목록 갱신 등)
        } catch (error) {
            console.error('Failed to save review:', error);
        }
    };

    return (
        <Box>
    {isMobile ? (
      <>
        <Title>
          <Label>전형</Label>
          <ReviewInputBox 
            height="50px" 
            width="100%" 
            placeholderText="전형 이름을 입력하세요." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </Title>
        <Date>
          <Label>날짜</Label>
          <DateBox onClick={handleDateClick}>
            {selectedDate || '날짜를 선택하세요'}
          </DateBox>
          {showCalendar && <ReactCalendar onChange={handleDateChange} />}
        </Date>
        <Middle>
          <Label>전형 후기</Label>  
          <ReviewInputBox 
            height="100px" 
            width="100%" 
            placeholderText="전형 후기를 입력하세요.(선택)"  
            value={content}
            onChange={handleContentChange}
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
              placeholderText="전형 이름을 입력하세요." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </Title>
          <Date>
            <Label>날짜</Label>
            <DateBox onClick={handleDateClick}>
              {selectedDate || '날짜를 선택하세요'}
            </DateBox>
            {showCalendar && <ReactCalendar onChange={handleDateChange} />}
          </Date>
        </Top>

        <Middle>
          <Label>전형 후기</Label>  
          <ReviewInputBox 
            height="100px" 
            width="720px" 
            placeholderText="전형 후기를 입력하세요.(선택)"  
            value={content}
            onChange={handleContentChange}
            type="textarea"
          />
        </Middle>
        </>
    )}
            <Button>
                <Cancel onClick={() => onSave()}>취소</Cancel>
                <Save onClick={handleSaveClick}>저장</Save>
            </Button>
            <Line></Line>
        </Box>
    );
}

