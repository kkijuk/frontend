import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import SearchBar from "../../shared/SearchBar";
import ResultItem from "./ResultItem";
import CareerTagSearch from "@/components/chip/CareerTagSearch";
import { attachRecruitStatusToItems } from "./attachRecruitStatusToItems";
import { use } from "react";

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

    const [hasSearched, setHasSearched] = useState(false); // 온보딩 vs 검색 후 결과 없음 구분용
    const [lastSearch, setLastSearch] = useState({type: null, query: ""}); // 마지막 검색어 기록용
    const [itemsWithStatus, setItemsWithStatus] = useState([]); // intro 아이템에 공고 지원 상태 추가

    useEffect(() => {
        console.log('DefaultDisplay items:', items);
    }, [items]);

    useEffect(() => {
        console.log('itemsWithStatus changed:', itemsWithStatus);
    }, [itemsWithStatus]);

    useEffect(() => {
        let alive = true;

        (async () => {
            // intro 메뉴일 때만 상태 붙이기
            if (currentMenu === 'intro' && items?.length) {
            const merged = await attachRecruitStatusToItems(items);
            if (alive) setItemsWithStatus(merged);
            } else {
            // activity 등 다른 메뉴면 원본 그대로
            setItemsWithStatus(items ?? []);
            }
        })();

        return () => { alive = false; }
    }, [items, currentMenu]);

    // 메뉴 바뀌면 온보딩 다시 보여주기
    useEffect(()=>{
        setHasSearched(false);  
        setLastSearch({type: null, query: ""});
    }, [currentMenu])

    useEffect(() => {
        console.log('태그:', careerTag);
    }, [careerTag]);

    // 로컬 래퍼: 검색/태그 클릭 시 hasSearched = ture
    const handleDebounceSearch =(kw)=>{
        setHasSearched(true);
        setLastSearch({type: "keyword", query: kw});
        onDebounceSearch(kw);
    }
    const handleTagClick = (tagId) => {
        // careerTag 배열에서 id 일치하는 객체 찾기
        const found = careerTag.find(t => t.id === tagId);
        const tagName = found? found.name : "";
        setHasSearched(true);
        setLastSearch({type: "tag", query: tagName});
        onTagClick(tagId);
    }

    // 온보딩 vs 검색 후 결과 없음 구분
    const showOnboarding = !hasSearched && items.length === 0;
    const showNoResultAfterSearch = hasSearched && items.length === 0;

    return (
        <>
        <SearchContainer>
            <SearchBar
                placeholder="검색어를 입력하세요."
                onDebounceSearch={handleDebounceSearch}
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
                            onClick = {(tagId) => handleTagClick(tagId)}
                        />
                    ))}
                </TagContainer>
            )}
        </SearchContainer>
        <SearchedHeaderInfo>
            <p>총 {items.length}건</p>
        </SearchedHeaderInfo>
        <ResultListBox>
            {itemsWithStatus.length > 0 ? (
                itemsWithStatus.map((item) => (
                    <Clickable
                        key = {item.detailId ?? item.masterIntroId ?? item.introId ?? item.title}
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
            ) :  showOnboarding ? (
                <NoResultsMessage>
                    이곳에서 내가 끼적에 작성한&nbsp;
                    <span>활동</span>이나&nbsp;
                    <span>태그, 자기소개서</span>를 검색하고,
                    자소서 소재를 쉽게 가져오세요!
                </NoResultsMessage>
            ) : showNoResultAfterSearch ? (
                <NoResultsMessage>
                    {lastSearch.type === "tag"
                    ? "선택한 태그의 검색 결과가 없어요."
                    : `${lastSearch.query}의 검색 결과가 없어요.`}
                </NoResultsMessage>
            ) : null}
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

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
    }
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

