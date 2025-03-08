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
  max-height: 200px;
  overflow-y: auto;
  border-radius: 10px;
  background: var(--white, #fff);
  box-shadow: 0px 5px 10px 0px #d9d9d9;
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
  display: flex;
  align-items: center;
  background: ${({ isWhite }) => (isWhite ? '#fff' : '#F5F5F5')};
  color: var(--main-01, #3aaf85);
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 13px;
  font-family: Light;
  cursor: pointer;
  gap: 5px;
`;

export default function ModalTagBox({ onTagListChange, initialTags, isWhiteBackground = false }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTagBoxVisible, setIsTagBoxVisible] = useState(false);
  const tagBoxRef = useRef(null);
  const [allTags, setAllTags] = useState([]);

  // ✅ `initialTags`가 변경될 때 즉시 반영
  useEffect(() => {
    setTags(initialTags || []);
  }, [initialTags]);

  useEffect(() => {
    if (typeof onTagListChange === 'function') {
      onTagListChange(tags);
    }
  }, [tags, onTagListChange]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await fetchModalTags();
        setAllTags(Array.isArray(fetchedTags) ? fetchedTags : []);
      } catch (error) {
        console.error('태그 불러오기 오류:', error);
        setAllTags([]);
      }
    };
    fetchTags();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        try {
          const createdTag = await addModalTag(newTag);
          const tagName = createdTag?.tagName || newTag;
          setTags((prevTags) => {
            const updatedTags = [...prevTags, tagName];
            onTagListChange(updatedTags);
            return updatedTags;
          });
          setInputValue('');
        } catch (error) {
          console.error('태그 추가 오류:', error);
        }
      }
    }
  };

  const handleTagRemove = async (tagName) => {
    try {
      await deleteModalTag(tagName);
      setTags((prevTags) => {
        const updatedTags = prevTags.filter((tag) => tag !== tagName);
        onTagListChange(updatedTags);
        return updatedTags;
      });
    } catch (error) {
      console.error('태그 삭제 오류:', error);
    }
  };

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

  const handleTagSelect = (tag) => {
    if (!tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      onTagListChange(updatedTags);
    }
  };

  return (
    <Box ref={tagBoxRef}>
      <Row>
        <TagInputContainer onClick={() => setIsTagBoxVisible(true)}>
          {tags.map((tag) => (
            <Tag key={tag} isWhite={isWhiteBackground}>
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
