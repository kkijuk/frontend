import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import SearchBar from "../../shared/SearchBar";
import ResultItem from "./ResultItem";
import CareerTagSearch from "@/components/chip/CareerTagSearch";

const DefaultDisplay = ({
    currentMenu,
    items,
    searchInput,
    careerTag,
    currentTag,
    onSearchChange,
    onDebounceSearch,
    onTagClick,
    onItemClick,
    onAddClick,
}) => {
    
    return (
        <>
        <SearchContainer>
            <SearchBar
                placeholder="검색어를 입력하세요."
                onDebounceSearch={onDebounceSearch}
                value = {searchInput}
                onChangeValue={onSearchChange}
            />
            {currentMenu === 'activity' && (
                <TagContainer>
                    {careerTag.map(tag => (
                        <CareerTagSearch
                            key = {tag}
                            tag = {tag}
                            surface = 'white'
                            isSelected = {currentTag === tag}
                            onClick = {() => onTagClick(tag)}
                        />
                    ))}
                </TagContainer>
            )}
        </SearchContainer>
        <SearchedHeaderInfo>
            <p>총 {items.length}건</p>
        </SearchedHeaderInfo>
        <ResultListBox>
            {items.length > 0 ? (
                items.map((item) => (
                    <Clickable
                        key = {item.detailId ?? item.masterId ?? item.introId ?? item.title}
                        onClick = {() => onItemClick(item)}
                    >
                        <ResultItem 
                            currentMenu={currentMenu}
                            keyword={searchInput}
                            data={item}
                            onAddClick={(item) => onAddClick(item)}
                        />
                    </Clickable>
                ))
            ) : (
                <NoResultsMessage>
                    이곳에서 내가 끼적에 작성한&nbsp;
                    <span>활동</span>이나&nbsp;
                    <span>태그, 자기소개서</span>를 검색하고,
                    자소서 소재를 쉽게 가져오세요!
                    검색어가 포함된 태그 혹은
                    자기소개서 문단을 불러와요.
                </NoResultsMessage>
            )}
        </ResultListBox>
        </> 
    );
};

export default DefaultDisplay;

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const TagContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 12px;
    overflow-x: auto;
`

const SearchedHeaderInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;

    & p {
        margin: 0;
    }
`;

const ResultListBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;

    /* 스크롤 영역 설정 */
    max-height: 600px;
    overflow-y: auto;

    /* 스크롤바 숨기기 */
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
    }
`;

const NoResultsMessage = styled.div`
    white-space: pre-line; /* 줄바꿈 문자를 반영 */
    color: ${Color.gray02};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;

    span {
        font-weight: 700;}
`;

const Clickable = styled.div`
    cursor: pointer;
`;

