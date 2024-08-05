import React, {useState, useEffect} from "react"
import SubNav from "../../components/Mypage/SubNav"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 부모 컨테이너의 높이를 채워야 가운데 정렬 가능 */

`

const Top = styled.div`
    width: 484px;
    border: 1px solid black;
    margin-top: 7px;
    margin-bottim: 31px;
`
const Container2 = styled.div`
    width: 400px;
    margin: 0 auto;
`

const Container3 = styled.div`
    width: 400p`


const Middle = styled.div`
    width: 400px;
    border: 1px solid black;

`

const Bottom = styled.div`
`

const Text1 = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const Text2 = styled.div`
    margin-bottom: ${(props) => props.marginBottom};
    color: var(--main-01, #3AAF85);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 32px;
`;

const Input = styled.input`
    height: 50px;
    border-radius: 10px;
    width: ${(props) => props.width || '280'};
    background-color: ${(props) => props.backgroundColor || '#F5F5F5'};
    color: ${(props) => props.color || 'black'};
    border: ${(props) => props.border || 'none'};
    border-color: ${(props) => props.borderColor || 'black'};


    padding-left: 20px; /* padding-left 속성 추가 */
    box-sizing: border-box;
`

export default function MyInformation() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        // 백엔드 API 호출
        axios.get('/member/myPage/info')
            .then(response => {
                setEmail(response.data.email);
                setName(response.data.name);
            })
            .catch(error => {
                console.error("There was an error fetching the email and name!", error);
            });
    }, []);


    return (
        <Container>
            <SubNav></SubNav>
            <Top>
                <Text1>개인정보 수정</Text1>
                
                    
                    <Container2>
                    <Text2 marginBottom="20px">
                        이메일</Text2>
                    <div style={{ color: '#000', fontFamily: 'Pretendard', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', marginLeft: '20px'}}>
                        이메일 써주기
                    </div>
                    
                
                    
                    <Text2 marginBottom="20px">이름</Text2>
                    <div style={{ color: '#000', fontFamily: 'Pretendard', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', marginLeft: '20px'}}>
                        홍길동
                    </div>
                    </Container2>
            </Top>
            <Middle>
                <Text2 marginBottom="6px">연락처</Text2>
                <Input width="280px" placeholder="{phoneNumber}"></Input>
                <Input width="280px" backgroundColor="#fff" border="1px solid" borderColor="#E0E0E0"></Input>
                <Text2 marginBottom="6px">생년월일</Text2>

            </Middle>
            <Bottom></Bottom>
        
        </Container>
        
    )
}