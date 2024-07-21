import React from 'react';
import styled from 'styled-components';
import InputBox from './shared/InputBox';

const Box = styled.div`
    height: 384px;
    width: 800px;
    padding: 24px 40px; /*양옆 40, 위아래 24씩 띄워줘야 해서 추가*/

    border: 1px solid black;
    box-sizing: border-box; /* 추가 */

`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    height: 79px;
    width: 720px;
    pdding: 0 40px;


`
const Middle = styled.div`
    height: 147px;
    width: 800px;
    margin-top: 18px;
`

const Button = styled.div`
    height: 63px;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px; /* Title과 Date 사이의 거리를 20px로 설정 */

`

const Date = styled.div`
    display: flex;
    flex-direction: column;

`



const Label = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 8px; /* Label과 InputBox 사이에 8px 간격 */

`;



export default function DetailAdd() {
    return (
        <Box>
            <Top>
                <Title>
                    <Label>제목</Label>
                    <InputBox height="50px" width="460px" placeholderText="활동 제목을 작성하세요" />
                </Title>
                <Date>
                    <Label>날짜</Label>
                    <InputBox height="50px" width="240px" placeholderText="날짜를 선택하세요" />
                </Date>
            </Top>
            <Middle>
                
                <Label>내용</Label>
                <InputBox height="100px" width="720px" placeholderText="활동 세부 내용을 작성하세요" />
                
            </Middle>
            <Button>

            </Button>
            
        </Box>
    );
}
