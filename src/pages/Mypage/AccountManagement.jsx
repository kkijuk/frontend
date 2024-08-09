import React, { useState } from "react";
import SubNav from "../../components/Mypage/SubNav";
import styled from "styled-components";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Container1 = styled.div`
    width: 464px;
    height: 308px;
    margin-bottom: 80px;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Line = styled.div`
    width: 500px;
    height: 2px;
    flex-shrink: 0;
    background: var(--gray-05, #F1F1F1);
    margin-bottom: 32px;
`;

const Text1 = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 32px;
`;

const Input = styled.input`
    height: 50px;
    border-radius: 10px;
    width: 400px;
    background: #F5F5F5;
    border: none;
    color: #707070;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

const Button = styled.button`
    width: 400px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 32px;
`;

const ErrorMessage = styled.p`
    width: 400px;
    height: 22px;
    margin: 0;
    margin-left: 32px;
    padding: 0;
    color: #FF7979;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Container2 = styled.div`
    width: 464px;
    height: 308px;
    margin-top: 32px;
`;

const DeleteText = styled.div`
    width: 430px;
    height: 76px;
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    margin-left: 18px;
    margin-bottom: 28px;
    margin-top: 28px;
`;

const BoldText = styled.span`
    font-weight: 700;
`;

const RegularText = styled.span`
    font-weight: 400;
`;

const DeleteButton = styled.button`
    width: 400px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    margin-left: 26px;
    border: 1px solid #000;

    background: var(--white, #FFF);

    color: #000;

    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export default function AccountMangement() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validatePassword = () => {
        if (currentPassword !== "비밀번호") { // 현재 비밀번호 검사 로직 수정 필요
            return "비밀번호가 일치하지 않습니다.";
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return "대문자, 특수문자를 포함하여 8자리 이상 입력하세요";
        }

        if (newPassword !== newPasswordConfirm) {
            return "새 비밀번호가 일치하지 않습니다.";
        }

        return "";
    };

    const handleSubmit = () => {
        const error = validatePassword();
        setErrorMessage(error);
    };

    return (
        <Box>
            <SubNav />
            <Container1>
                <Text1>비밀번호 변경</Text1>
                <InputBox>
                    <Input
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="현재 비밀번호를 입력하세요"
                        type="password"
                    />
                    <Input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="변경할 비밀번호를 입력하세요"
                        type="password"
                    />
                    <Input
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        placeholder="변경할 비밀번호를 다시 입력하세요"
                        type="password"
                    />
                </InputBox>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <Button onClick={handleSubmit}>확인</Button>
            </Container1>
            <Line />
            <Container2>
                <Text1>계정 탈퇴</Text1>
                <DeleteText>
                    <RegularText>탈퇴하기 버튼 클릭 시 7일 후 회원님의 끼적 계정을 탈퇴 처리합니다.</RegularText>
                    <br /><br />
                    <BoldText>탈퇴 신청 후 7일이 경과하면 기록한 모든 정보는 완전히 삭제되며,</BoldText>
                    <br />
                    <RegularText>7일 이내에 다시 로그인하면 탈퇴 처리가 취소됩니다.</RegularText>
                </DeleteText>
                <DeleteButton>탈퇴하기</DeleteButton>
            </Container2>
        </Box>
    );
}
