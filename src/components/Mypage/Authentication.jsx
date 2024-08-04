import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Box1 = styled.div`
    margin-top: 21px;
    margin-bottom: 54px;
`;

const InformText = styled.div`
    color: var(--black, #000);
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Box2 = styled.div`
    margin-bottom: 28px;
    
`;

const Email = styled.div`
    width: 253px;
    height: 62px;
    margin-bottom: 38px;
`;

const Text1 = styled.div`
    margin-bottom: ${(props) => props.marginBottom};
    color: var(--main-01, #3AAF85);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Password = styled.div`
    width: 400px;
    height: 86px;
`;

const PasswordInput = styled.input`
    width: 400px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #F5F5F5;
    border: none; /* border 속성 제거 */

    padding-left: 17px; /* padding-left 속성 추가 */
    box-sizing: border-box; /* box-sizing 속성 추가 */


`;

const Error = styled.div`
    width: 237px;
    height: 15px;
    flex-shrink: 0;
    color: #FF7979;

    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 11px;
`

const ConfirmBtn = styled.button`
    width: 400px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    border: none;
    color: white;
    margin-top: ${(props) => (props.hasError ? '10px' : '54px')};

`;

export default function Authentication() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // 백엔드 API 호출
        axios.get('/member/myPage/email')
            .then(response => {
                setEmail(response.data.email);
            })
            .catch(error => {
                console.error("There was an error fetching the email!", error);
            });
    }, []);

    const handleConfirm = () => {
        // 비밀번호 확인을 위한 백엔드 API 호출
        axios.post('/member/myPage/verifyPassword', { email, password })
            .then(response => {
                if (response.data.valid) {
                    setError('');
                    // 비밀번호가 일치하는 경우 처리 로직 추가
                } else {
                    setError('비밀번호가 일치하지 않습니다.');
                }
            })
            .catch(error => {
                setError('서버와 통신 중 오류가 발생했습니다.');
                console.error("There was an error verifying the password!", error);
            });
    };

    return (
        <Container>
            <Box1>
                <InformText>회원정보를 열람 및 변경하기 위해 인증이 필요합니다.</InformText>
            </Box1>
            <Box2>
                <Email>
                    <Text1 marginBottom="22px">
                        이메일
                    </Text1>
                    <div style={{ color: '#000', fontFamily: 'Pretendard', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', marginLeft: '9px', marginTop: '7px' }}>
                        {email}
                    </div>
                </Email>
                <Password>
                    <Text1 marginBottom="15px">
                        비밀번호
                    </Text1>
                    <PasswordInput
                        placeholder="비밀번호를 입력하세요"
                    />
                </Password>
            </Box2>
            {error && <Error>{error}</Error>}
            <ConfirmBtn onClick={handleConfirm}>확인</ConfirmBtn>
        </Container>
    );
}
