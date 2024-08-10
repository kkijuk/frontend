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

    margin-bottom: 43px;
`;

const Bottom = styled.div`
    width: 100%;
    height: 292px;
    border-top: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 텍스트를 가로 방향으로 중앙에 정렬 */
    align-items: center; /* 텍스트를 세로 방향으로 중앙에 정렬 */
`;


const Text1 = styled.div`
    color: var(--main-01, #3AAF85);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 6px;
`;

const Box = styled.div`
    height: 77px;
    width: 400px;
    margin-bottom: 15px;
    border: 1px solid black;
`

const Input = styled.input`
    width: 400px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #F5F5F5;
    
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

    margin-top: 39px;
    border:none;

    color: #FFF;

    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;




export default function PasswordReset() {
    return (
        <PageWrapper>
            <Container>
                <Top>비밀번호 재설정</Top>
                <Bottom>
                   <Box>
                        <Text1>새 비밀번호</Text1>
                        <Input placeholder="대문자, 특수문자를 포함하여 8자리 이상 입력하세요"></Input>
                   </Box>
                   <Box>
                        <Text1>새 비밀번호 확인</Text1>
                        <Input placeholder="비밀번호를 한 번 더 입력하세요"></Input>
                   </Box>
                    
                    <Button>확인</Button>
                    
                </Bottom>
            </Container>
        </PageWrapper>
    )
}
