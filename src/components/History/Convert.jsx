import React from "react";
import styled from "styled-components";

const Convert = () => {
    return (
        <Button>문서로 내보내기</Button>
    );
}

export default Convert

const Button = styled.button`
    width: 150px;
    height: 35px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    color: var(--white, #FFF);
    text-align: center;
    font-family: Regular;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 35px;
    cursor: pointer;
    border: none;
    outline: none;
`;
