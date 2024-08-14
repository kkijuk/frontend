import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getIntroduce } from '../../api/Home/getIntroduce';

const Container = styled.div`
  flex-shrink: 0;
  width: 400px;
  height: 154px;
  border-radius: 10px;
  border: none;
  background: var(--gray-06, #F5F5F5);
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 20px 25px 20px 25px;
  box-sizing: border-box;
`;

const Label = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 3px;
`;

const Box = styled.div`
    width: 350px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid var(--gray-03, #D9D9D9);
    background: var(--white, #FFF);
    padding: 7px 20px 7px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 6px;
    align-items: center;

    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const DDayBox = styled.div`
    width: 60px;
    height: 25px;
    border-radius: 12px;
    background: var(--gray-06, #F5F5F5);
    margin-left: auto;
    display: flex;
    justify-content: center;
      align-items: center;
`;

const DDayText = styled.div`
    flex-shrink: 0;
    color: ${props => props.fontColor || '#707070'};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`;

export default function WritingNoti() {

    const [recruitTitle, setRecruitTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        const fetchIntroduce = async () => {
            try {
                const data = await getIntroduce;
                console.log("데이터", data);
                if (data && data.length > 0) {
                    
                    const firstItem = data[0];
                    setRecruitTitle(firstItem.recruitTitle);
                    setDeadline(firstItem.deadline);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchIntroduce();
    }, []);

    const regex = /[^0-9]/g;
    const num = parseInt(data.deadline.replace(regex, ""), 10);

    return (
        <Container>
            <Label>자기소개서 작성 완료를 기다려요</Label>
            {getIntroduce.map((introduce) => {
                const fontColor = num <= 7 ? '#FA7C79' : '#707070'; //현재: 7일 이하면 글자색 빨간색

                return (
                    <Box>
                        {introduce.recruitTitle} 
                        <DDayBox>
                            <DDayText fontColor={fontColor}>D-</DDayText>
                            <DDayText fontColor={fontColor}>{introduce.num}</DDayText>
                        </DDayBox>
                    </Box>
                );
            })}
        </Container>
    )
}