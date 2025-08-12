import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import ButtonSmallPrimary from "@/components/Button/button-small/primary";
import { formateDateDashToDot } from "@/utils/formateDate";

// data : {content, introId, title, createDate}
        // if (currentMenu === 'activity'){
        //     setData({
        //         detailId: itemData.detailId,
        //         title: itemData.title,
        //         content: itemData.content,
        //         startDate: itemData.startDate,
        //         endDate: itemData.endDate,
        //         detailTag: itemData.detailTag, //Array
        //         // 활동 정보
        //         careerId: itemData.careerId,
        //         careerTitle: itemData.careerTitle,
        //         careerAlias: itemData.careerAlias,
        //         category: itemData.category,
        //     })
        // }
        // else if(currentMenu === 'intro') {
        //     setData({
        //         title: itemData.title ||  '',
        //         updatedDate: itemData.updatedDate || '',
        //         content: itemData.content || ''
        //     });
        // }

const ResultItem = ({ currentMenu, keyword, data, onClick }) => {
    // const [data, setData] = useState(null);
    if(!data) return null;

    const range = (s, e) => (s || e ? `${formateDateDashToDot(s)} ~ ${e ? formateDateDashToDot(e) : "현재"}` : "");

    const isActivity = currentMenu === 'activity';
    const mainTitle = isActivity ? (data.careerTitle ?? "") : (data.title ?? "");
    const alias = isActivity ? (data.careerAlias ?? "") : "";
    const subTitle = isActivity ? (data.title ?? "") : ""; // 디테일 제목
    const date = isActivity ? range(data.startDate, data.endDate) : (formateDateDashToDot(data.updatedDate) ?? "");

    return (
        <ResultItemContainer>
            <Header>
                <Title>
                    {mainTitle}
                    {isActivity && alias && ` / ${alias}`}
                </Title>
                <Date>{date}</Date>
            </Header>
            <Body>
                {isActivity && subTitle && <SubTitle>{subTitle}</SubTitle>}
                <Content>{data.content}</Content>
            </Body>
            {/* <AddThisItemButton onClick={onClick}>
                <ButtonSmallPrimary text="삽입" width={21} height={14} />
            </AddThisItemButton> */}
            <Footer>
                <AddThisItemButton onClick={onClick}>
                    <ButtonSmallPrimary text="삽입" width={21} height={14} />
                </AddThisItemButton>
            </Footer>
        </ResultItemContainer>
    );
}

export default ResultItem;
const AddThisItemButton = styled.div`
    // display: none;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    cursor: pointer;
`;


const ResultItemContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;

    position: relative;

    border-radius: 10px;
    background-color: ${Color.white};
    box-shadow: 1px 1px 6px 0 rgba(112, 112, 112, 0.25);
    // cursor: pointer;

    // &:hover {
    //     background-color: ${Color.gray01};

    //     ${AddThisItemButton} {
    //         display: block;
    //     }
    // }
`;

const Title = styled.p`
    display: flex;
    flex-direction: row;
    gap: 5px;
    font-size: 16px;
    font-family: 'Bold';
    color: ${Color.black};  
    margin: 0;
`;

const SubTitle = styled.p`
    font-size: 16px;
    font-family: 'Regular';
    margin: 0;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Date = styled.p`
    font-size: 14px;
    font-family: 'Regular';
    color: ${Color.gray02};
    margin: 0;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Content = styled.p`
    margin: 0;
    font-size: 14px;
    color: ${Color.gray02};
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
     display: -webkit-box;
    -webkit-line-clamp: 5; /* 최대 5줄까지 표시 */
    -webkit-box-orient: vertical;
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
