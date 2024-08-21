import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRecruitRemind } from '../../api/Home/getRecruitRemind';
import { useAuth } from '../AuthContext';  // AuthContext 가져오기

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

export default function DeadlineNoti() {
    const { isLoggedIn } = useAuth();  // 로그인 상태 가져오기
    const [recruits, setRecruits] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {  // 로그인 상태일 때만 데이터 가져오기
            async function fetchData() {
                try {
                    const response = await getRecruitRemind();
                    if (!response) {
                        throw new Error('Failed to fetch data');
                    }
                    setRecruits(response); // API에서 가져온 데이터를 설정
                } catch (error) {
                    console.error('에러- Failed to fetch data:', error);
                }
            }

            fetchData();
        }
    }, [isLoggedIn]);

    return (
        <Container>
            <Label>공고 마감이 얼마 남지 않았어요</Label>
            {isLoggedIn && recruits.map((recruit) => {  // 로그인 상태일 때만 데이터 표시
                const fontColor = recruit.dday <= 7 ? '#FA7C79' : '#707070'; // 현재: 7일 이하면 글자색 빨간색

                return (
                    <Box key={recruit.id}>
                        {recruit.title} 
                        <DDayBox>
                            <DDayText fontColor={fontColor}>D-</DDayText>
                            <DDayText fontColor={fontColor}>{recruit.dday}</DDayText>
                        </DDayBox>
                    </Box>
                );
            })}
        </Container>
    );
}
