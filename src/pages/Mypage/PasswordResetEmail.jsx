import React from "react"
import styled from "styled-components";

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
    background-color: #fff; /* 배경색은 필요에 따라 조정 */
`;

const Container = styled.div`
    width: 820px;
    height: 494px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

const Top = styled.div`
    width: 100%;
    height: 154px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-bottom: 1px solid black;
    color: var(--main-01, #3AAF85);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Bottom = styled.div`
    width: 100%;
    height: 340px;
    border-top: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 텍스트를 가로 방향으로 중앙에 정렬 */
    align-items: center; /* 텍스트를 세로 방향으로 중앙에 정렬 */
`;

const Text1 = styled.div`
    color: var(--black, #000);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center; /* 텍스트를 가운데 정렬 */

    width: 350px;
    height: 40px;
    margin-top: 30px;
`;

const Input = styled.input`
    width: 400px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #F5F5F5;
    margin-top: 18px;
    border:none;
    padding-left: 17px;
    box-sizing: border-box;

    color: #707070;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Button = styled.button`

    width: 400px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);

    margin-top: 54px;
    border:none;

    color: #FFF;

    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const BoldText = styled.span`
    font-weight: 700; /* 특정 부분의 텍스트만 굵게 설정 */
`;

const Email = styled.div`
    color: var(--gray-02, #707070);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 43px;
`;

export default function PasswordResetEmail() {
    return (
        <PageWrapper>
            <Container>
                <Top>비밀번호 재설정</Top>
                <Bottom>
                    <Text1>
                        <BoldText>끼적</BoldText>에 회원가입되어 있는 이메일을 입력해주세요.<br />
                        비밀번호 재설정을 위한 링크를 보내드립니다.
                        
                    </Text1>
                    <Input placeholder="이메일을 입력하세요"></Input>
                    <Button>보내기</Button>
                    <Email>
                        이메일을 찾을 수 없다면 끼적에게 문의해주세요.<br /><br />
                        kkijuk@gmail.com
                        </Email>
                </Bottom>
            </Container>
        </PageWrapper>
    )
}