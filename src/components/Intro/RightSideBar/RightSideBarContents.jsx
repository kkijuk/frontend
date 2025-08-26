import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import getIntroSearch from "@/api/Intro/introSearch";
import { getActivityDetailSearch } from "@/api/MycareerSearch/getActivityDetailSearch";
import DefaultDisplay from "./DefaultDisplay";
import DetailDisplay from "./DetailDisplay";


const RightSideBarContents = ({ onAddClick }) => {
    const [currentMenu, setCurrentMenu] = useState('activity'); // 현재 메뉴
    const [resultByType, setResultByType] = useState({activity: [], intro: []}); // 검색 결과
    const [keywordByType, setKeywordByType] = useState({activity: '', intro: ''}); // 검색어
    const [careerTag, setCareerTag] = useState(['이거', '저거']); // 최근 추가한 태그
    const [currentTag, setCurrentTag] = useState(''); // 현재 선택된 태그

    const [view, setView] = useState('list'); // 현재 뷰 상태. 'list' | 'detail'
    // 상세보기 대상 { type: 'activity'|'intro', id: number|string, introKind?: 'master'|'regular' }
    const [detailTarget, setDetailTarget] = useState(null);

    const items = resultByType[currentMenu]; // 검색결과 표시값
    const searchInput = keywordByType[currentMenu]; //검색창 표시값

    useEffect(()=>{
        console.log('저장 결과: ', resultByType);
    },[resultByType]);

    useEffect(()=> {
        
    },[currentMenu])

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
            category: act.category
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
                    setCurrentTag(tag);
                    setKeywordByType(prev => ({...prev, activity: tag}));
                    // const results = await getActivityByTag(tag, 'recent');
                    // const flat = normalizeActivity(results?.data?.data ?? []);
                    // setResultByType(prev => ({ ...prev, activity: flat }));
                    setResultByType(prev => ({...prev, activity: []})); // 임시로 초기화
                    return;
                }
                
                if (useKeyword) {
                    console.log('활동기록 키워드 검색:', keyword);
                    setCurrentTag(''); // 태그 초기화
                    setKeywordByType(prev => ({...prev, activity: keyword}));

                    const results = await getActivityDetailSearch(keyword, 'recent');
                    console.log('키워드 검색 결과:', results.data);
                    const flat = normalizeActivity(Array.isArray(results.data.data) ? results.data.data : []);

                    setResultByType(prev => ({...prev, activity: flat}));
                    setKeywordByType(prev => ({...prev, activity: keyword}));
                    return;
                }

                // 아무 것도 없을 때
                setCurrentTag('');
                setKeywordByType(prev => ({...prev, activity: ''}));
                setResultByType(prev => ({...prev, activity: []}));
                return;
            }
            else if (currentMenu === 'intro') {
                // 자기소개서 검색 로직
                console.log('자기소개서 검색:', keyword);
                setKeywordByType(prev => ({...prev, intro: keyword}));
                const results = await getIntroSearch(keyword);
                if (results?.data) {
                    console.log('검색 결과:', results.data);
                    // setSearchedResults(results.data.map(item => item.content)); // content만 추출하여 상태 업데이트
                    setResultByType(prev => ({...prev, intro: results.data}));
                    return;
                }
                else {
                    setResultByType(prev => ({...prev, intro: []}));
                    return;
                }
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    // 리스트 아이템 클릭 -> 상세로 전환
    const handleItemClick = (item) => {
        if (currentMenu === 'activity') {
            setDetailTarget({type: 'activity', id: item.careerId, careerType: item.category, careerTitle: item.careerTitle, careerAlias: item.careerAlias});
            setView('detail');
        } else {
            const isMaster = !!item.masterIntroId;
            const id = isMaster ? item.masterIntroId : item.introId;
            setDetailTarget({type: 'intro', id, introKind: isMaster ? 'master' : 'regular'});
            setView('detail');
        }
        console.log('리스트에서 상세로 전환', item);
        return;
    };

    // 상세 -> 리스트로 전환
    const handleBack = () => {
        setView('list');
        console.log('상세에서 리스트로 전환');
    }

    return (
        <RightSideBarContainer>
            <Header>
                <HeaderTitle>자기소개서 작성 도우미</HeaderTitle>
                <HeaderMenu>
                    <MenuItem curMenu={currentMenu === 'activity'} onClick={()=>{setCurrentMenu('activity'); setView('list')}}>활동기록</MenuItem>
                    <MenuItem curMenu={currentMenu === 'intro'} onClick={()=>{setCurrentMenu('intro'); setView('list')}}>자기소개서</MenuItem>
                </HeaderMenu>
            </Header>
            <Body>
                {view === 'list' ? (
                    <DefaultDisplay
                        currentMenu={currentMenu}
                        items={items}
                        searchInput={searchInput}
                        careerTag={careerTag}
                        currentTag={currentTag}
                        onSearchChange={(v) => {
                            setKeywordByType(prev => ({ ...prev, [currentMenu]: v }));
                            if (currentMenu === 'activity' && currentTag) setCurrentTag('');
                        }}
                        onDebounceSearch={(kw) => handleSearch({ keyword: kw })}
                        onTagClick={(tag) => handleSearch({ tag })}
                        onItemClick={handleItemClick}
                        onAddClick={onAddClick}
                    />
                ) : (
                    <DetailDisplay
                        target={detailTarget}
                        onBack={handleBack}
                    />
                )}
            </Body>

        </RightSideBarContainer>
    );
}

export default RightSideBarContents;

const RightSideBarContainer = styled.div`
    box-sizing: border-box;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0px 15px;
    min-height: 0;
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
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    // overflow-y: auto;

`;

