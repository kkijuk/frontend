import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    width: 833px;
    height: 34px;
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 15px;
    margin-bottom: 13px;
`

const Text = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

const Tag = styled.div`
    width: 668px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #F5F5F5;
`

export default function TagBox() {
    return (
        <Box>
            <Text>태그</Text>
            <Tag></Tag>
        </Box>
    );
}