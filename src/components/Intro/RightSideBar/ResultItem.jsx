import React from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import ButtonSmallPrimary from "@/components/Button/button-small/primary";

// data : {content, introId, title, createDate}

const ResultItem = ({ data, onClick }) => {
    return (
        <ResultItemContainer>
            <Header>
                <Title>{data.title}</Title>
                <Date>{data.createdDate}</Date>
            </Header>
            <Body>
                <Content>{data.content}</Content>
            </Body>
            <AddThisItemButton onClick={onClick}>
                <ButtonSmallPrimary text="삽입" width={21} height={14} />
            </AddThisItemButton>
        </ResultItemContainer>
    );
}

export default ResultItem;
const AddThisItemButton = styled.div`
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
`;


const ResultItemContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;

    position: relative;

    border-radius: 10px;
    background-color: ${Color.white};
    cursor: pointer;

    &:hover {
        background-color: ${Color.gray01};

        ${AddThisItemButton} {
            display: block;
        }
    }
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 700;
    color: ${Color.black};  
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Date = styled.p`
    font-size: 12px;
    color: ${Color.gray01};
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Content = styled.p`
    font-size: 14px;
    color: ${Color.gray02};
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
     display: -webkit-box;
    -webkit-line-clamp: 5; /* 최대 5줄까지 표시 */
    -webkit-box-orient: vertical;
`;

