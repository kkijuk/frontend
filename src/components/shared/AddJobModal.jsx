import React, { useState } from 'react';
import styled from 'styled-components';

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
  padding: 35px 100px;
  border-radius: 10px;
  width: 620px;
  height: 550px;
  flex-shrink: 0;
  max-width: 90%;
  position: relative;
  z-index:1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #999;
  font-size: 3em;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5em;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 575px;
  padding: 12px;
  margin-bottom: 30px;
  border:none;
  border-radius: 5px;
  background:#F5F5F5; 
  font-size: 1em;
  
`;

const InputDate = styled.input`
  width: 270px;
  padding: 12px;
  margin-bottom: 15px;
  border:none;
  border-radius: 5px;
  background:#F5F5F5; 
  font-size: 1em;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  justify-content:space-between;
`;

const TagButton = styled.button`
  background-color: #3AAF85;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #35a576;
  }
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

  &:hover {
    background-color: #35a576;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  font-weight:500;
  margin-bottom: 10px;
  
`;

const AddJobModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');

  const handleSave = () => {
    if (!title || !startDate || !endDate || !tags) {
      alert("필수 정보를 입력하세요!");
      return;
    }

    onSave({
      title,
      startDate,
      endDate,
      tags: tags.split(',').map(tag => tag.trim()),
      link,
    });
    onClose();
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>새로운 공고 추가</ModalTitle>
        <div style={{width:'580px',height:'6px',background:'#D9D9D9',marginBottom:'30px'}}/>
        <Label>공고 제목 <span style={{color:'red'}}>*</span></Label>
        <Input
          type="text"
          placeholder="활동 제목을 작성하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Row>
          <div>
            <Label>접수 시작 일시</Label>
            <InputDate
               type="text"
               placeholder="YYYY-MM-DD"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
               onFocus={(e) => (e.target.type = 'datetime-local')}
               onBlur={(e) => (e.target.type = 'text')}
            />
          </div>
          <div>
            <Label>접수 마감 일시 <span style={{color:'red'}}>*</span></Label>
            <InputDate
               type="text"
               placeholder="YYYY-MM-DD"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
               onFocus={(e) => (e.target.type = '')}
               onBlur={(e) => (e.target.type = 'text')}
            />
          </div>
        </Row>
        <Label>태그 <span style={{color:'red'}}>*</span></Label>
        <Input
          type="text"
          placeholder="동아리, 서비스 기획"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{width:'200px'}}
        />
        <TagButton>+</TagButton>
        <Label>링크</Label>
        <Input
          type="text"
          placeholder="공고 혹은 접수 페이지 링크를 입력하세요"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <ErrorMessage>*필수 정보를 입력하세요!</ErrorMessage>
        <SaveButton onClick={handleSave}>확인</SaveButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AddJobModal;



