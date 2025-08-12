import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import getIntroSearch from "@/api/Intro/introSearch";
import { getActivityDetailSearch } from "@/api/MycareerSearch/getActivityDetailSearch";
import SearchBar from "../../shared/SearchBar";
import ResultItem from "./ResultItem";
import CareerTagSearch from "@/components/chip/CareerTagSearch";


const RightSideBarContents = ({ onClick }) => {
    const [currentMenu, setCurrentMenu] = useState('activity'); // 현재 메뉴
    const [resultByType, setResultByType] = useState({activity: [], intro: []}); // 검색 결과
    const [keywordByType, setKeywordByType] = useState({activity: '', intro: ''}); // 검색어
    const [careerTag, setCareerTag] = useState(['이거', '저거']); // 최근 추가한 태그
    const [currentTag, setCurrentTag] = useState(''); // 현재 선택된 태그

    const items = resultByType[currentMenu];
    const keyword = keywordByType[currentMenu];

    useEffect(()=>{
        console.log('저장 결과: ', resultByType);
    },[resultByType]);

    // 활동 기록 검색 결과 정규화
    const normalizeActivity = (activityArr = []) => {
        return activityArr.flatMap(act => 
        (act.detailList || []).map(detail => ({
            // 활동 기록 정보
            detailId: detail.detailId,
            title: detail.title,
            content: detail.content,
            startDate: detail.startDate,
            endDate: detail.endDate,
            detailTag: detail.detailTag, //Array
            // 활동 정보
            careerId: act.careerId,
            careerTitle: act.careerTitle,
            careerAlias: act.careerAlias,
            category: act.category.categoryId
        })))
    };

    // 현재 메뉴에 따라 검색 api 호출
    const handleSearch = async ({keyword='', tag=''}) => {
        try {
            if (currentMenu === 'activity') {
                const useTag = !!tag; // 태그 우선 검색
                const useKeyword = !!keyword && !useTag; // 키워드 우선 검색

                if(useTag) {
                    console.log('활동 기록 태그 검색:', tag);
                    // const results = await getActivityByTag(tag, 'recent');
                    // const flat = normalizeActivity(results?.data?.data ?? []);
                    // setResultByType(prev => ({ ...prev, activity: flat }));
                    setResultByType(prev => ({...prev, activity: []})); // 임시로 초기화
                    return;
                }
                
                if (useKeyword) {
                    console.log('활동기록 키워드 검색:', keyword);
                    const results = await getActivityDetailSearch(keyword, 'recent');
                    console.log('키워드 검색 결과:', results.data);
                    const flat = normalizeActivity(Array.isArray(results.data.data) ? results.data.data : []);
                    setResultByType(prev => ({...prev, activity: flat}));
                    setKeywordByType(prev => ({...prev, activity: keyword}));
                    return;
                }
            }
            else if (currentMenu === 'intro') {
                // 자기소개서 검색 로직
                console.log('자기소개서 검색:', keyword);
                const results = await getIntroSearch(keyword);
                if (results?.data) {
                    console.log('검색 결과:', results.data);
                    // setSearchedResults(results.data.map(item => item.content)); // content만 추출하여 상태 업데이트
                    setResultByType(prev => ({...prev, intro: results.data}));
                    setKeywordByType(prev => ({...prev, intro: keyword}));
                    return;
                };
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    // 태그 클릭 시
    const handleTagClick = (tag) => {
        console.log('태그 클릭:', tag);
        setCurrentTag({tag});
        // 태그에 대한 검색 수행
        // handleSearch(tag);
    };

    return (
        <RightSideBarContainer>
            <Header>
                <HeaderTitle>자기소개서 작성 도우미</HeaderTitle>
                <HeaderMenu>
                    <MenuItem curMenu={currentMenu === 'activity'} onClick={()=>{setCurrentMenu('activity')}}>활동기록</MenuItem>
                    <MenuItem curMenu={currentMenu === 'intro'} onClick={()=>{setCurrentMenu('intro')}}>자기소개서</MenuItem>
                </HeaderMenu>
            </Header>
            <Body>
                <SearchContainer>
                    <SearchBar
                        placeholder="검색어를 입력하세요."
                        onDebounceSearch={(kw) => handleSearch({keyword : kw})}
                    />
                    {currentMenu === 'activity' && (
                        <TagContainer>
                            {careerTag.map(tag => (
                                <CareerTagSearch
                                    tag = {tag}
                                    surface = 'white'
                                    isSelected = {currentTag === tag}
                                    onClick = {() => {
                                        setCurrentTag(tag);
                                        handleSearch({tag});
                                    }}
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
                            <ResultItem 
                                currentMenu={currentMenu}
                                keyword={keyword}
                                data={item}
                                onClick={() => {onClick(item.content)}}
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0px 15px;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 27px;
`;

const HeaderTitle = styled.p`
    font-size: 20px;
    font-family: 'Bold';
    color: ${Color.black};
    text-align: center;
    margin-bottom: 0;
`;

const HeaderMenu = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const MenuItem = styled.div`
    width: 100%;
    padding-bottom: 4px;
    cursor: pointer;
    color: ${props => props.curMenu ? Color.black : Color.gray02};
    font-weight: ${props => props.curMenu ? '700' : '400'};
    border-bottom: ${props => props.curMenu ? `5px solid ${Color.main01}` : 'none'};
    text-align: center;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
`;

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