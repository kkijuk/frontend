import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getIntroduce } from '../../api/Home/getIntroduce';
import { useAuth } from '../AuthContext';  // AuthContext 가져오기
import { useNavigate } from 'react-router-dom';

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
  justify-content: flex-start;
  padding: 20px 25px 20px 25px;
  box-sizing: border-box;
`;

const Label = styled.div`
    color: var(--black, #000);
    font-family: SemiBold;
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
    justify-content: flex-start;
    margin-top: 6px;
    align-items: center;

    color: var(--black, #000);
    font-family: Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
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
    font-family: ${props => props.font || 'Medium'};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`;

const PlaceholderText = styled.div`
    color: var(--gray-03, #D9D9D9);  // 회색 글씨
    font-family: Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: left;
`;

export default function WritingNoti() {
    const { isLoggedIn } = useAuth();  // 로그인 상태 가져오기
    const navigate = useNavigate();
    const [introduceList, setIntroduceList] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchIntroduce = async () => {
                try {
                    const data = await getIntroduce();
                    if (data && data.length > 0) {
                        const filledIntroduceList = [...data.slice(0, 2)]; // 최대 2개의 데이터만 사용
                        // 빈 박스가 있어야 하므로 데이터가 2개 미만일 경우 빈 박스를 추가
                        while (filledIntroduceList.length < 2) {
                            filledIntroduceList.push({});
                        }
                        setIntroduceList(filledIntroduceList);
                    } else {
                        setIntroduceList([{}, {}]); // 데이터가 없을 경우 빈 박스 유지
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setIntroduceList([{}, {}]); // 에러 발생 시에도 빈 박스 유지
                }
            };
            
            fetchIntroduce();
        } else {
            setIntroduceList([{}, {}]); // 로그아웃 상태에서도 빈 박스 유지
        }
    }, [isLoggedIn]);

    const regex = /[^0-9]/g;

    const handleClick = (isEmpty, id) => {
        window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤

        if (isEmpty) {
            navigate('/history/master');
        } else {
            navigate(`/history/others/${id}`);
        }
    };

    return (
        <Container>
            <Label>자기소개서 작성 완료를 기다려요</Label>
            {introduceList.map((introduce, index) => {
                const isEmpty = !introduce.recruitTitle;  // 로그인 상태일 때만 데이터 표시 -> 취소
                const num = introduce.deadline ? parseInt(introduce.deadline.replace(regex, ""), 10) : null;
                const id = introduce.introduceId;
                const fontColor = num <= 7 ? '#FA7C79' : '#707070'; // 현재: 7일 이하면 글자색 빨간색
                const fontB = num <= 7 ? 'SemiBold' : 'Medium';

                return (
                    <Box key={index} onClick={() => handleClick(isEmpty, id)}>
                        {isEmpty ? (
                            <PlaceholderText>자기소개서를 작성해 주세요</PlaceholderText>
                        ) : (
                            <>
                                {introduce.recruitTitle}
                                <DDayBox>
                                    <DDayText fontColor={fontColor} font={fontB}>D-</DDayText>
                                    <DDayText fontColor={fontColor} font={fontB}>{num}</DDayText>
                                </DDayBox>
                            </>
                        )}
                    </Box>
                );
            })}
        </Container>
    )
}
