import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import getIntroSearch from "@/api/Intro/introSearch";
import SearchBar from "../../shared/SearchBar";
import ResultItem from "./ResultItem";
import { set } from "lodash";

const RightSideBarContents = ({ onClick }) => {
    const [currentMenu, setCurrentMenu] = useState('intro');
    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() => { // 검색어 초기화
        setSearchedResults([]);
    }, [currentMenu]);

    // 현재 메뉴에 따라 검색 api 호출
    const handleSearch = async (keyword) => {
        try {
            if (currentMenu === 'activity') {
                // 활동기록 검색 로직
                console.log('활동기록 검색:', keyword);
                // 여기에 활동기록 검색 API 호출 로직 추가
            }
            else if (currentMenu === 'intro') {
                // 자기소개서 검색 로직
                console.log('자기소개서 검색:', keyword);
                const results = await getIntroSearch(keyword);
                if (results?.data) {
                    console.log('검색 결과:', results.data);
                    // setSearchedResults(results.data.map(item => item.content)); // content만 추출하여 상태 업데이트
                    setSearchedResults(results.data);
                };
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <RightSideBarContainer>
            <Header>
                <HeaderTitle>자기소개서 작성 도우미</HeaderTitle>
                <HeaderMenu>
                    <MenuItem curMenu={currentMenu === 'activity'} onClick={()=>{setCurrentMenu('activity')}}>활동기록</MenuItem>
                    <MenuItem curMenu={currentMenu === 'intro'} onClick={()=>{setCurrentMenu('intro')}}>자기소개서</MenuItem>
                </HeaderMenu>
                <SearchBar
                    placeholder="검색어를 입력하세요."
                    onDebounceSearch={handleSearch}
                />
            </Header>
            <Body>
                <SearchedHeaderInfo>
                    <p>총 {searchedResults.length}건</p>
                </SearchedHeaderInfo>
                <ResultListBox>
                    {searchedResults.length > 0 ? (
                        searchedResults.map((result, index) => (
                            <ResultItem 
                                key={index}
                                data={result}
                                onClick={() => {onClick(result.content)}}
                            />
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
            </Body>

        </RightSideBarContainer>
    );
}

export default RightSideBarContents;

const RightSideBarContainer = styled.div`
    box-sizing: border-box;
    padding: 0px 20px;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const HeaderTitle = styled.p`
    font-size: 20px;
    font-weight: 700;
    color: ${Color.black};
    text-align: center;
`;

const HeaderMenu = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const MenuItem = styled.div`
    width: 100%;
    cursor: pointer;
    color: ${props => props.curMenu ? Color.black : Color.gray02};
    font-weight: ${props => props.curMenu ? '700' : '400'};
    border-bottom: ${props => props.curMenu ? `5px solid ${Color.main01}` : 'none'};
    text-align: center;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px;
    scroll: auto;
`;

const SearchedHeaderInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
`;

const ResultListBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

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