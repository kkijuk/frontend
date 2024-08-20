import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../api/Home/getUserInfo';
import { useAuth } from '../AuthContext';  

const Container = styled.div`
  flex-shrink: 0;
  width: 240px;
  height: 160px;
  border-radius: 10px;
  border: 1px solid var(--gray-03, #D9D9D9);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 0;

  color: var(--black, #000);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-family: Pretendard;
`;

const BoldText = styled.h5`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: ${props => props.fontSize || '14px'};
    font-style: normal;
    font-weight: 700;
    margin: 0;
`;

const GreenSpan = styled.span`
    color: #3AAF85;
`;

const BoxContainer = styled.div`
    flex-shrink: 0;
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 9px;
    margin-bottom: 10px;
    gap: 10px;
    align-items: center;
    justify-content: center;
    align-items: center;
`;

const CountBox = styled.div`
    width: 105px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);
    align-items: center;

    display: flex;
    width: 105px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--black, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
`;

const OKButton = styled.button`
    width: 220px;
    height: 30px;
    flex-shrink: 0;
    border: none;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    margin-bottom: 8px;

    color: var(--white, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
    background-color: #35a576;
  }
`;

const LoginButton = styled.button`
    width: 220px;
    height: 30px;
    flex-shrink: 0;
    border: none;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    margin-bottom: 8px;
    margin-top: 20px;

    color: var(--white, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
    background-color: #35a576;
  }
`;

const SignupButton = styled.button`
    color: var(--gray-02, #707070);
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-family: Pretendard;
    border: none;
    background: none;
    cursor: pointer;
`;

export default function LoginProfileBox() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); 
    const [userName, setUserName] = useState('');
    const [monthDuration, setMonthDuration] = useState(0);
    const [careerCount, setCareerCount] = useState(0);
    const [recruitCount, setRecruitCount] = useState(0);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserInfo = async () => {
                try {
                    const data = await getUserInfo();
                    if (data) {
                        setUserName(data.userName);
                        setMonthDuration(data.monthDuration);
                        setCareerCount(data.careerCount);
                        setRecruitCount(data.recruitCount);
                    } else {
                        console.error('Failed to fetch data');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchUserInfo();
        } else {
            setUserName('');
            setMonthDuration(0);
            setCareerCount(0);
            setRecruitCount(0);
        }
    }, [isLoggedIn]);

    const goCareer = () => {
        navigate('/mycareer');
    };

    const goCareerAdd = () => {
        navigate('/mycareer', { state: { showModal: true } });
    };

    const goApply = () => {
        navigate('/apply-status');
    };

    const goLogin = () => {
        navigate('/login');
    };

    const goSignup = () => {
        navigate('/signup');
    };

    return (
        <Container>
            <TextContainer>
                {isLoggedIn ? (
                    <>
                        안녕하세요 {userName} 님,
                        <BoldText><GreenSpan>끼적</GreenSpan>한 지 {monthDuration}개월이 지났어요!</BoldText>
                    </>
                ) : (
                    <>
                        <BoldText>지금 로그인하고<br />당신의 끼를 적어두세요.</BoldText>
                        <LoginButton onClick={goLogin}>로그인</LoginButton>
                        <SignupButton onClick={goSignup}>회원가입</SignupButton>
                    </>
                )}
            </TextContainer>
            {isLoggedIn && (
                <>
                    <BoxContainer>
                        <CountBox onClick={goCareer}>
                            내 활동
                            <BoldText fontSize='12px'>{careerCount}</BoldText>
                        </CountBox>

                        <CountBox onClick={goApply}>
                            지원현황
                            <BoldText fontSize='12px'>{recruitCount}</BoldText>
                        </CountBox>
                    </BoxContainer>

                    <OKButton onClick={goCareerAdd}>활동 추가하기</OKButton>
                </>
            )}
        </Container>
    );
}

