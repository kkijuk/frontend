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
    font-style: light;
    line-height: normal;
`;

const TagInputContainer = styled.div`
    width: 650px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    padding-left: 5px; /* 전체 컨테이너의 좌측에 패딩 추가 */
    padding-top: 5px;
    padding-bottom: 5px;

`;

const TagInput = styled.input`
    flex: 1;
        border: 1px solid black;

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
    font-style: light;
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

export default function TagBox( { externalTags, externalSetTags, onTagListChange } ) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setTags(externalTags || []);  // null 또는 undefined가 아닌 배열로 설정
    }, [externalTags]);

    const [TagBoxTags, setTagBoxTags] = useState([]); // TagBoxListContainer에 표시할 태그들

    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [isTagBoxListVisible, setIsTagBoxListVisible] = useState(false);
    const tagBoxRef = useRef(null);


    
    useEffect(() => {
        const fetchTags = async () => {
            const fetchedTags = await TagBoxFetchList();
            setTagBoxTags(fetchedTags);
        };
        fetchTags();
        console.log("활동기록 생성 tags:", tags);

    }, []); //여기 tags를 써서 tags에 변화가 생길 때마다 해당 useEffect가 실행되게 함 (Warning메시지 떠서 삭제함...)

    useEffect(() => {
        if (typeof onTagListChange === 'function') {
            const tagIds = tags.map(tag => {
                const tagObject = TagBoxTags.find(t => t.tagName === tag);
                return tagObject ? tagObject.id : null;
            }).filter(id => id !== null);
            onTagListChange(tagIds);
        } else {
            console.error('onTagListChange prop is not a function');
        }
    }, [tags, TagBoxTags]); //여기도 원래 tags, TagBoxTags, onTagListChange
    

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    //엔터 눌렀을 때 태그 추가
    const handleKeyDown = async(e) => {
        if (e.nativeEvent.isComposing) { //마지막 한글자 태그로 만들어지는거 막는 부분
            e.stopPropagation();
            return;
        }

        if (e.key === 'Enter' && inputValue.trim() !== ''){
            const newTag = inputValue.trim();

            // 이미 TagInputContainer에 있는 태그라면 추가하지 않음
            if (tags.includes(newTag)) {
                setInputValue('');
                return;
            }

            // TagBoxListContainer에만 있고, TagInputContainer에는 없는 태그라면
            if (TagBoxTags.some(tag => tag.tagName === newTag)) {
                setTags([...tags, newTag]);
                setInputValue('');
                return;
            }

            try {
                // API 호출해서 태그 전송
                const response = await TagBoxCreateTag(newTag);
                const createdTag = response.data;

                console.log('API 응답:', response);

    
                // TagInputContainer와 TagBoxListContainer에 태그 추가
                setTags((prevTags) => [...prevTags, createdTag.tagName]);
                setTagBoxTags((prevTagBoxTags) => [...prevTagBoxTags, createdTag]);
    
                setInputValue('');
                console.log(`태그 ${newTag} 서버로 전송 성공`);
            } catch (error) {
                console.log(`태그 ${newTag} 서버 전송 실패`, error);
            }
        }
            
    };

    // TagBoxListContainer에서 태그 클릭 시 TagInputContainer에 추가
    const handleTagClick = (tagName) => {
        if (!tags.includes(tagName)) {
            setTags([...tags, tagName]);
        }
    };
    
    // TagInputContainer에서 태그 삭제
    const handleTagRemove = (tagName) => {
        setTags(tags.filter(tag => tag !== tagName));
    };

    const handleTagDelete = async (tagId, tagName) => {
        try {
            await TagBoxDeleteTag(tagId);
            console.log(`태그 ${tagId} 삭제 완료`);

            // TagBoxListContainer에서 태그 삭제
            setTagBoxTags(TagBoxTags.filter(tag => tag.id !== tagId));

            // TagInputContainer에서도 해당 태그 삭제
            setTags(tags.filter(tag => tag !== tagName));
        } catch (error) {
            console.log(`태그 ${tagId} 삭제 실패`, error);
        }
    };

    //placeholder 내용없애기
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleClickOutside = (e) => {
        if (tagBoxRef.current && !tagBoxRef.current.contains(e.target)) {
            setIsTagBoxListVisible(false);
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    

    return (
        <Box ref={tagBoxRef}>
            <Row>
                <Text>태그</Text>
                <TagInputContainer onClick={() => setIsTagBoxListVisible(true)}>
                    {tags.map((tag) => (
                        <WhiteTag key={tag.id}>
                            {tag}
                            <CloseButton onClick={() => handleTagRemove(tag)}>x</CloseButton>
                        </WhiteTag>
                    ))}
                    <TagInput
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={(tags.length === 0 && !isFocused && inputValue === '') ? '태그 선택 혹은 입력' : ''}
                    />
                </TagInputContainer>
            </Row>

            {isTagBoxListVisible &&(
                <TagBoxList>
                    <TagBoxListContainer>
                        {TagBoxTags.map((tag) => (
                            <Tag key={tag.id} onClick={() => handleTagClick(tag.tagName)}>
                                {tag.tagName}
                                <CloseButton onClick={(e) => { e.stopPropagation(); handleTagDelete(tag.id, tag.tagName); }}>x</CloseButton>

                            </Tag>
                        ))}
                    </TagBoxListContainer>
                </TagBoxList>
            )}
        </Box>
    );
}