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
  background: #fff;
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
        setTags(Array.isArray(fetchedTags) ? fetchedTags : []); // 배열인지 확인
      } catch (error) {
        console.error('태그 불러오기 오류:', error);
        setTags([]); // 오류 시 빈 배열 설정
      }
    };
    fetchTags();
  }, []);

  // 태그 입력 처리
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 엔터 입력 시 태그 추가 (POST 요청)
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        try {
          const createdTag = await addModalTag(newTag);
          const tagName = createdTag?.tagName || newTag; // 기본적으로 입력값 사용
          if (tagName) {
            const updatedTags = [...tags, tagName];
            setTags(updatedTags);
            onTagListChange(updatedTags);
          } else {
            console.error('Invalid tag data:', createdTag);
          }
          setInputValue('');
        } catch (error) {
          console.error('태그 추가 오류:', error);
        }
      }
    }
  };

  // 태그 삭제 (DELETE 요청)
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

  // TagBox 외부 클릭 시 닫기
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
    <Box ref={tagBoxRef}>
      <Row>
        <TagInputContainer onClick={() => setIsTagBoxVisible(true)}>
          {(Array.isArray(tags) ? tags : []).map((tag) => (
            <Tag key={tag}>
              {tag}
              <CloseButton onClick={() => handleTagRemove(tag)}>x</CloseButton>
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
      {isTagBoxVisible && (
        <TagBoxList>
          <TagBoxListContainer>
            {(Array.isArray(tags) ? tags : []).map((tag) => (
              <Tag key={tag} onClick={() => handleTagRemove(tag)}>
                {tag}
              </Tag>
            ))}
          </TagBoxListContainer>
        </TagBoxList>
      )}
    </Box>
  );
}