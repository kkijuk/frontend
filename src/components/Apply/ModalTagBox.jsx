import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { fetchModalTags, addModalTag, deleteModalTag } from '../../api/ApplyTag/Tag.js';

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

const TagInputContainer = styled.div`
  width: 650px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  background: #f5f5f5;
  padding: 5px 10px;
  gap: 5px;
  font-family: Light;
`;

const TagInput = styled.input`
  flex: 1;
  border: none;
  background: #f5f5f5;
  font-family: Light;
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
  background: var(--white, #fff);
  box-shadow: 0px 0.5px 1px 0px;
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 1000;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: Light;
`;

const TagBoxListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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

const Tag = styled.div`
  background: #F5F5F5;
  color: var(--main-01, #3aaf85);
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 13px;
  margin-left: 5px;
  font-family: Light;
  cursor: pointer;
`;

export default function ModalTagBox({ onTagListChange, initialTags = [] }) {
  const [tags, setTags] = useState(Array.isArray(initialTags) ? initialTags : []);
  const [inputValue, setInputValue] = useState('');
  const [isTagBoxVisible, setIsTagBoxVisible] = useState(false);
  const tagBoxRef = useRef(null);
  const [allTags, setAllTags] = useState([]); //  API에서 불러온 전체 태그 목록
  const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그 (초기값 비어있음)


  // 태그가 변경될 때 부모 컴포넌트에 전달
  useEffect(() => {
    if (typeof onTagListChange === 'function') {
      onTagListChange(tags);
    } else {
      console.error('onTagListChange is not a function');
    }
  }, [tags]);

  // 태그 불러오기 (GET 요청)
  useEffect(() => {
    const fetchTags = async () => {
        try {
            const fetchedTags = await fetchModalTags();
            setAllTags(Array.isArray(fetchedTags) ? fetchedTags : []); // 전체 태그 저장
        } catch (error) {
            console.error('태그 불러오기 오류:', error);
            setAllTags([]);
        }
    };
    fetchTags();
}, []);

//  태그 직접 입력 시 추가 (엔터 입력)
const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
        const newTag = inputValue.trim();
        if (!selectedTags.includes(newTag)) {
            try {
                const createdTag = await addModalTag(newTag);
                const tagName = createdTag?.tagName || newTag;
                if (tagName) {
                    const updatedTags = [...selectedTags, tagName];
                    setSelectedTags(updatedTags);
                    onTagListChange(updatedTags);
                }
                setInputValue(''); // 입력값 초기화
            } catch (error) {
                console.error('태그 추가 오류:', error);
            }
        }
    }
};

//  태그 박스에서 태그 클릭 시 추가
const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
        const updatedTags = [...selectedTags, tag];
        setSelectedTags(updatedTags);
        onTagListChange(updatedTags);
    }
};

// 선택된 태그 삭제
const handleTagRemove = async (tagName) => {
  try {
    await deleteModalTag(tagName);
    const updatedTags = tags.filter((tag) => tag !== tagName);
    setTags(updatedTags);
    onTagListChange(updatedTags);
  } catch (error) {
    console.error('태그 삭제 오류:', error);
  }
}; 


  // 태그 입력 처리
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

const handleTagInputClick = () => {
  setIsTagBoxVisible(true);
};

// 모달 외부 클릭 시 태그 박스 닫기
const handleClickOutside = (e) => {
  if (tagBoxRef.current && !tagBoxRef.current.contains(e.target)) {
    setIsTagBoxVisible(false);
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
        <TagInputContainer onClick={handleTagInputClick}>
  {tags.map((tag) => (
    <Tag key={tag}>
      {tag}
      <CloseButton onClick={() => handleTagRemove(tag)}>x</CloseButton> {/* 태그 내부 x 버튼 */}
    </Tag>
  ))}
  <TagInput
    value={inputValue}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
    placeholder="태그 입력"
  />
</TagInputContainer>
        </Row>
        {allTags.length > 0 && isTagBoxVisible && (
  <TagBoxList>
    <TagBoxListContainer>
      {allTags.map((tag) => (
        <Tag key={tag} onClick={() => handleTagSelect(tag)}>
          {tag}
        </Tag>
      ))}
    </TagBoxListContainer>
  </TagBoxList>
)}

    </Box>
);
}