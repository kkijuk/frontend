import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 188px;
  border-radius: 10px;
  border: none;
  background: var(--gray-05, #F1F1F1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CountPage = styled.div`
    width: 30px;
    height: 18px;
    flex-shrink: 0;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.25);

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const CountPageText = styled.h6`
    color: ${props => props.fontColor || '#707070'};
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
`;


export default function Banner() {

    return (
        <Container>
            <CountPage>
                <CountPageText fontColor='white'>
                    1
                </CountPageText>
                <CountPageText>/</CountPageText>
                <CountPageText>
                    5
                </CountPageText>
            </CountPage>

        </Container>
    )
}