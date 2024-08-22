import React, { useState } from 'react'; 
import styled from 'styled-components';

const Container = styled.div`
  flex-shrink: 0;
  width: 190px;
  height: 203px;
  border-radius: 10px;
  border: 1px solid var(--gray-03, #D9D9D9);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 120px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--gray-05, #F1F1F1);
    margin-top: 10px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
`;

const TextContainer = styled.div`
  width: 100%;
  margin-top: 4px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 5px;
`;

const ContentText = styled.div`
    color: var(--black, #000);
    font-family: Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    word-wrap: break-word;  // 단어 단위로 줄 바꿈
    word-break: break-word; // 줄 바꿈이 불가능한 긴 단어를 분할
    white-space: normal;
`;

const Info = styled.div`
    color: var(--gray-02, #707070);
    font-family: Regular;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
`;

export default function RecommendBox({data, url}) {

    const handleClick = () => {
        if (url) {
            window.open(url);
        }
    };

    return (
        <Container onClick={handleClick}>
            <ImageContainer image={data.image} />
            <TextContainer>
                <ContentText>{data.title}</ContentText>
                <Info>{data.category} | {data.endDate}</Info>
            </TextContainer>


        </Container>
    )
}