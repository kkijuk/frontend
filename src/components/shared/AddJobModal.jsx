import React, { useState } from 'react';
import styled from 'styled-components';
import TagBox from '../Apply/ModalTagBox'; 

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const InputDate = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
  width: 100%;
  background-color: #3AAF85;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;

  &:hover {
    background-color: #35a576;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
`;

const AddJobModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('planned'); // 공고 상태는 추가 시 항상 "planned"

  const handleSave = () => {
    if (!title || !startTime || !endTime) {
      alert("필수 정보를 입력하세요!");
      return;
    }

    onSave({
      title,
      startTime,
      endTime,
      status,
      tags,
      link,
    });
    onClose();
  };

  const handleTagChange = (newTags) => {
    setTags(newTags);
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>새로운 공고 추가</ModalTitle>
        <Label>지원 제목 *</Label>
        <Input
          type="text"
          placeholder="활동 제목을 작성하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Row>
          <div>
            <Label>공고 모집 시작 날짜 *</Label>
            <InputDate
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <Label>공고 모집 종료 날짜 *</Label>
            <InputDate
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </Row>
        <Label>태그</Label>
        <TagBox onTagChange={handleTagChange} />
        <Label>지원 링크</Label>
        <Input
          type="text"
          placeholder="공고 혹은 접수 페이지 링크를 입력하세요"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AddJobModal;