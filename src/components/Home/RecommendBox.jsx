import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex-shrink: 0;
  width: 190px;
  height: 154px;
  border-radius: 10px;
  border: 1px solid var(--gray-03, #D9D9D9);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 10px 0px 10px;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 101px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--gray-05, #F1F1F1);
    margin: 0;
`

const TextContainer = styled.div`
  width: 100%;
  margin-top: 4px;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const ContentText = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Info = styled.div`
    color: var(--gray-02, #707070);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
`;


export default function RecommendBox() {

    return (
        <Container>
            <ImageContainer>

            </ImageContainer>
            <TextContainer>
                <ContentText>00서포터즈 3기</ContentText>
                <Info>대외활동 | 2024.00.00까지</Info>
            </TextContainer>


        </Container>
    )
}