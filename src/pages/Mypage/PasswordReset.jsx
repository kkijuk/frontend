import React, { useState } from "react"
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { resetPassword } from "../../api/Login/passwordreset";

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


const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;


export default function PasswordReset() {
    const location = useLocation();
    const email = location.state?.email || ''; // 이전 페이지에서 전달된 email 값
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const handlePasswordChange = async () => {
        if (newPassword !== newPasswordConfirm) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const responseData = await resetPassword(email, newPassword, newPasswordConfirm);
            if (responseData) {
                alert("비밀번호가 성공적으로 재설정되었습니다.");
                // 비밀번호 재설정 성공 시 필요한 후속 처리 (예: 로그인 페이지로 이동)
            } else {
                alert("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            alert("비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.");
            console.error("Error:", error);
        }
    };

    return (
        <PageWrapper>
            <Container>
                <Top>비밀번호 재설정</Top>
                <Bottom>
                   <Box>
                   <Text1>새 비밀번호</Text1>
                        <Input
                            placeholder="대문자, 특수문자를 포함하여 8자리 이상 입력하세요"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                        />
                   </Box>
                   <Box>
                        <Text1>새 비밀번호 확인</Text1>
                        <Input
                            placeholder="비밀번호를 한 번 더 입력하세요"
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                            type="password"
                        />
                   </Box>
                   {errorMessage && (
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    )}
                    <Button onClick={handlePasswordChange}>확인</Button>
                    
                </Bottom>
            </Container>
        </PageWrapper>
    )
}
