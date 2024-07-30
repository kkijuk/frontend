import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import AbilityTag from './AbilityTag'; // AbilityTag 컴포넌트 가져오기

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
    width: 668px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
`;

const TagInput = styled.input`
    flex: 1;
    border: none; /* 테두리 제거 */
    padding-left: 20px;
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

    const handleTagClick = () => {
        setIsTagVisible(true);
        if (tagText === '태그 선택 혹은 입력') {
            setTagText(''); // 태그 클릭 시 텍스트 삭제
        }
    };

    const handleTagChange = (event) => {
        setTagText(event.target.value);
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagText.trim() !== '' && e.nativeEvent.isComposing == false) {
            e.preventDefault(); // 기본 엔터키 동작 방지
            const newTag = tagText.trim();

            // TagBoxList에 있지만 TagInput에 없는 태그를 TagInput에 추가
            if (!tags.includes(newTag) && allTags.includes(newTag)) {
                setTags((prevTags) => [...prevTags, newTag]);
            }
            // 새로운 태그 추가
            else if (!allTags.includes(newTag)) {
                setTags((prevTags) => [...prevTags, newTag]);
                setAllTags((prevAllTags) => [...prevAllTags, newTag]);
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

    const handleTagRemove = (tagToRemove) => {
        setTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
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
                            <CloseButton onClick={() => handleTagRemove(tag)}>x</CloseButton>
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
                            <AbilityTag key={index} tags={[tag]} />
                        ))}
                    </TagBoxListContainer>
                </TagBoxList>
            )}
        </Box>
    );
}
