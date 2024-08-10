import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import AbilityTag from './AbilityTag'; // AbilityTag 컴포넌트 가져오기
import { TagBoxFetchList, TagBoxCreateTag, TagBoxDeleteTag } from '../../api/Mycareer/TagBoxAPI';

const Box = styled.div`
    width: 720px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
    margin-bottom: 13px;
    position: relative; /* 자식 요소의 절대 위치를 위한 상대 위치 설정 */
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Text = styled.div`
    width: 32px;
    height: 21px;
    margin-top: 5px;
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const TagInputContainer = styled.div`
    width: 660px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
        padding-left: 5px; /* 전체 컨테이너의 좌측에 패딩 추가 */

`;

const TagInput = styled.input`
    flex: 1;
    border: none; /* 테두리 제거 */
    padding-left: 5px;
    background: #F5F5F5;
    font-family: Pretendard;
    font-size: 16px;
    color: #999;

    &:focus {
        outline: none; /* 포커스 시 외곽선 제거 */
        color: #000; /* 입력 시 텍스트 색상 변경 */
    }
`;

const TagBoxList = styled.div`
    width: 300px;
    height: 350px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--white, #FFF);
    box-shadow: 0px 5px 10px 0px #D9D9D9;
    position: absolute; /* 절대 위치 */
    top: 40px; /* Tag 컴포넌트 아래에 위치시키기 위한 값 조정 */
    left: 0;
    z-index: 1000; /* 다른 요소 위에 표시되도록 */
    padding: 10px; /* 패딩 추가 */
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid black;
`;

const TagBoxListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px; /* 태그 간 간격 추가 */
`;

const WhiteTag = styled.div`
    display: flex;
    align-items: center;
    height: 22px;
    padding: 0px 8px; /* 간격 조정 */
    justify-content: center;
    gap: 5px; /* 태그와 x 버튼 간 간격 조정 */
    border-radius: 10px;
    background: #FFF; /* 흰색 배경 */
    color: var(--main-01, #3AAF85);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;
    height: 22px;
    padding: 0px 8px; /* 간격 조정 */
    justify-content: center;
    gap: 5px; /* 태그와 x 버튼 간 간격 조정 */
    border-radius: 10px;
    background: #F5F5F5;
    color: var(--main-01, #3AAF85);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: relative;
    cursor: pointer; 

    &:hover button {
        visibility: visible; /* Hover 시 x 버튼 보이게 하는 속성*/
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #999;
    font-size: 12px;
    cursor: pointer;
    padding: 0; /* 패딩 제거 */
    margin-left: 4px; /* 왼쪽 여백 추가 */
`;

export default function TagBox() {
    const [isTagVisible, setIsTagVisible] = useState(false);
    const [tagText, setTagText] = useState('태그 선택 혹은 입력');
    const [tags, setTags] = useState([]); // TagInput에서 관리할 태그
    const [allTags, setAllTags] = useState([]); // TagBoxList에서 관리할 태그
    const tagInputRef = useRef(null);
    const tagBoxListRef = useRef(null);

    const handleTagClick = async () => {
        setIsTagVisible(true);
        if (tagText === '태그 선택 혹은 입력') {
            setTagText(''); // 태그 클릭 시 텍스트 삭제
        }

        // API 호출하여 태그 목록 불러오기
        try {
            const tagList = await TagBoxFetchList();
            
            
            if (tagList && Array.isArray(tagList)) {
                setAllTags(tagList.map((tag) => ({ id: tag.id, tagName: tag.tagName })));
            } else {
                console.error('불러온 태그 목록이 유효하지 않습니다.');
            }
        } catch (error) {
            console.error('태그를 불러오는 중 오류 발생:', error);
        }
    };

    const handleTagChange = (event) => {
        setTagText(event.target.value);
    };

    const handleTagKeyDown = async (e) => {
        if (e.key === 'Enter' && tagText.trim() !== '' && e.nativeEvent.isComposing === false) {
            e.preventDefault(); // 기본 엔터키 동작 방지
            const newTag = tagText.trim();

            // TagBoxList에 있지만 TagInput에 없는 태그를 TagInput에 추가
            if (!tags.includes(newTag) && allTags.includes(newTag)) {
                setTags((prevTags) => [...prevTags, newTag]);
            }
            // 새로운 태그 추가
            else if (!allTags.includes(newTag)) {
                try {

                    await TagBoxCreateTag(newTag);
                    setTags((prevTags) => [...prevTags, newTag]);
                    setAllTags((prevAllTags) => [...prevAllTags, newTag]);
                } catch (error) {
                    console.error('태그 추가하는 중 오류 발생:', error);
                }
                
            }
            setTagText('');
        }
    };

    const handleClickOutside = (event) => {
        if (
            tagBoxListRef.current &&
            !tagBoxListRef.current.contains(event.target) &&
            tagInputRef.current &&
            !tagInputRef.current.contains(event.target)
        ) {
            setIsTagVisible(false);
        }
    };

    const handleTagRemoveFromList = (tagToRemove, event) => {
        event.stopPropagation(); // 이벤트 전파 중지

        // TagInputContainer에서 태그 삭제
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    const handleTagRemoveFromContainer = async (tagId, event) => {
        event.stopPropagation(); // 이벤트 전파 중지
        try {
            // 삭제 API 호출
            if (tagId) {
                await TagBoxDeleteTag(tagId);
            }
    
            // TagBoxListContainer와 TagInputContainer에서 태그 삭제
            setAllTags((prevAllTags) => prevAllTags.filter((tag) => tag.id !== tagId));
            setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
        } catch (error) {
            console.error("태그 삭제 중 오류 발생:", error);
        }
    };

    const handleTagAddFromList = (tagToAdd) => {
        // TagInputContainer에 태그 추가
        if (!tags.includes(tagToAdd)) {
            setTags((prevTags) => [...prevTags, tagToAdd]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Box>
            <Row>
                <Text>태그</Text>
                <TagInputContainer onClick={handleTagClick}>
                    {tags.map((tag, index) => (
                        <WhiteTag key={index}>
                            {tag}
                            <CloseButton
                                onClick={(event) => handleTagRemoveFromList(tag, event)}
                                onMouseDown={(event) => event.stopPropagation()} // 이 부분 추가
                            >
                                x
                            </CloseButton>
                        </WhiteTag>
                    ))}
                    <TagInput
                        ref={tagInputRef}
                        value={tagText}
                        onChange={handleTagChange}
                        onKeyDown={handleTagKeyDown}
                    />
                </TagInputContainer>
            </Row>
            {isTagVisible && (
                <TagBoxList ref={tagBoxListRef}>
                    <TagBoxListContainer>
                        {allTags.map((tag, index) => (
                            <Tag key={index} onClick={() => handleTagAddFromList(tag.tagName)}>
                                {tag.tagName}
                                <CloseButton
                                    onClick={(event) => handleTagRemoveFromContainer(tag.id, event)}
                                    onMouseDown={(event) => event.stopPropagation()} // 이 부분 추가
                                >
                                    x
                                </CloseButton>
                            </Tag>
                        ))}
                    </TagBoxListContainer>
                </TagBoxList>
            )}
        </Box>
    );
}
