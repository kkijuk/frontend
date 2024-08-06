import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    width: 833px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
    margin-bottom: 13px;
    position: relative;
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
    align-items: center;
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const TagInputContainer = styled.div`
    width: 650px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 10px;
    background: #F5F5F5;
    padding: 5px 10px;
    gap: 5px;
`;

const TagInput = styled.input`
    flex: 1;
    border: none;
    background: #F5F5F5;
    font-family: Pretendard;
    font-size: 16px;
    color: #999;
    &:focus {
        outline: none;
        color: #000;
    }
`;

const TagBoxList = styled.div`
    width: 300px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--white, #FFF);
    box-shadow: 0px 0.5px 1px 0px ;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 1000;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TagBoxListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 22px;
        padding: 0px 8px;
        border-radius: 10px;
        background: #F5F5F5;
        color: var(--main-01, #3AAF85);
        text-align: center;
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
        border: 1px solid #F5F5F5;
    }
`;

const WhiteTag = styled.div`
     display: flex;
    align-items: center;
    height: 22px;
    padding: 0px 8px; 
    justify-content: center;
    gap: 5px; 
    border-radius: 10px;
    background: #FFF; 
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
    padding: 0;
    margin-left: 4px;
`;

export default function TagBox({ onTagChange }) {
    const [isTagVisible, setIsTagVisible] = useState(false);
    const [tagText, setTagText] = useState('태그 선택 혹은 입력');
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState(['인턴', '정규직', '대외활동', '동아리']);
    const tagInputRef = useRef(null);
    const tagBoxListRef = useRef(null);

    const handleTagClick = () => {
        setIsTagVisible(true);
        if (tagText === '태그 선택 혹은 입력') {
            setTagText('');
        }
    };

    const handleTagChange = (event) => {
        setTagText(event.target.value);
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagText.trim() !== '' && e.nativeEvent.isComposing === false) {
            e.preventDefault();
            const newTag = tagText.trim();

            if (!tags.includes(newTag) && allTags.includes(newTag)) {
                const newTags = [...tags, newTag];
                setTags(newTags);
                onTagChange(newTags);
            } else if (!allTags.includes(newTag)) {
                const newTags = [...tags, newTag];
                const newAllTags = [...allTags, newTag];
                setTags(newTags);
                setAllTags(newAllTags);
                onTagChange(newTags);
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
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        onTagChange(newTags);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTagBoxItemClick = (tag) => {
        if (!tags.includes(tag)) {
            const newTags = [...tags, tag];
            setTags(newTags);
            onTagChange(newTags);
        }
    };

    return (
        <Box>
            <Row>
            
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
                            <div key={index} onClick={() => handleTagBoxItemClick(tag)}>{tag}</div>
                        ))}
                    </TagBoxListContainer>
                </TagBoxList>
            )}
        </Box>
    );
}