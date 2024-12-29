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
  const [tags, setTags] = useState(initialTags);
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
        const fetchedTags = await fetchModalTags();  // 공고 태그 API 호출
        setTags(fetchedTags);
      } catch (error) {
        console.error('태그 불러오기 오류:', error);
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
          const createdTag = await addModalTag(newTag); // 공고 태그 추가 API 호출
          console.log('API Response:', createdTag); // API 응답 로그 출력
  
          // createdTag의 형식을 확인하고 적절한 데이터 구조로 태그명을 가져오기
          const tagName = createdTag?.tagName || 
                          createdTag?.data?.tag?.tagName || 
                          createdTag?.data?.tagName || 
                          (Array.isArray(createdTag.tags) && createdTag.tags.includes(newTag) ? newTag : null);
          
          if (tagName) {
            const updatedTags = [...tags, tagName];
            setTags(updatedTags); // 상태 업데이트 후
            onTagListChange(updatedTags); // 변경된 태그 전달
          } else {
            console.error('Invalid tag data:', createdTag);
          }
          setInputValue(''); // 입력 필드 초기화
        } catch (error) {
          console.error('태그 추가 오류:', error);
        }
      }
    }
  };

  // 태그 삭제 (DELETE 요청)
  const handleTagRemove = async (tagName) => {
    try {
      await deleteModalTag(tagName);  // 공고 태그 삭제 API 호출
      const updatedTags = tags.filter((tag) => tag !== tagName);
      setTags(updatedTags);  // 상태 업데이트 후
      if (typeof onTagListChange === 'function') {
        onTagListChange(updatedTags);  // 변경된 태그 전달
      }
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
          {tags.map((tag) => (
            <Tag key={tag}>
              {tag}
              <CloseButton onClick={() => handleTagRemove(tag)}>x</CloseButton>
            </Tag>
          ))}
          {/* 리뷰 제목이 태그로 변환되는 부분 주석 처리 */}
          {/* <TagInput
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="태그 입력"
          /> */}
        </TagInputContainer>
      </Row>
      {isTagBoxVisible && (
        <TagBoxList>
          <TagBoxListContainer>
            {tags.map((tag) => (
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
