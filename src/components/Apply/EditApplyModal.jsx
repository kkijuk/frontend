import React, { useState, useEffect } from 'react';
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
  width: 850px;
  height: 700px;
  max-width: 90%;
  position: relative;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 2em;
  color: #999;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 1.5em;
  margin-left: 105px;
  font-family: 'Bold';
  font-size: 24px;
`;

const Divider = styled.div`
  width: 650px;
  height: 6px;
  background-color: #ccc;
  margin-bottom: 20px;
  margin: 0 auto 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  margin-left: 100px;
  margin-top: 20px;
  font-family: 'ExtraLight';
  font-size: 18px;
   &::after {
    content: ' *';
    color: #FC5555;
  }
`;

const LabelStart = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  margin-left: 90px;
  margin-top: 10px;
  font-family: 'ExtraLight';
  font-size: 18px;
   &::after {
    content: ' *';
    color: #FC5555;
  }
`;

const LabelEnd = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  margin-right: 70px;
  margin-top: 10px;
  font-family: 'ExtraLight';
  font-size: 18px;
   &::after {
    content: ' *';
    color: #FC5555;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 640px;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #F5F5F5;
  border-radius: 10px;
  background: #F5F5F5;
  font-size: 1em;
  margin-top: 10px;
  height: 25px;
  font-family: 'ExtraLight';
  font-size: 16px;
`;

const InputDateStart = styled.input`
  width: 300px;
  padding: 12px;
  height: 25px;
  margin-bottom: 10px;
  margin-left: 85px;
  border: 1px solid #F5F5F5;
  border-radius: 10px;
  background: #F5F5F5;
  font-size: 1em;
  margin-top: -10px;
  font-family: 'ExtraLight';
  font-size: 16px;
`;

const InputDateEnd = styled.input`
  width: 300px;
  height: 25px;
  padding: 12px;
  margin-bottom: 15px;
  margin-right: 75px;
  border: 1px solid #F5F5F5;
  border-radius: 10px;
  background: #F5F5F5;
  font-size: 1em;
  margin-top: -10px;
  font-family: 'ExtraLight';
  font-size: 16px;
  
`;

const InputWrapperStart = styled.div`
  margin-top: 30px;
`;

const InputWrapperEnd = styled.div`
  margin-top: 30px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 0px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -20px;
`;

const SaveButton = styled.button`
  width: 640px;
  height: 50px;
  background-color: #3AAF85;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 11px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
  margin: 20px auto 0 auto;
  margin-left: 105px;
  font-family: 'ExtraLight';
  font-size: 18px;
  &:hover {
    background-color: #35a576;
  }
`;

const LabelTag = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  margin-left: 96px;
  margin-top: 5px;
  font-family: 'ExtraLight';
  font-size: 18px;
   &::after {
    content: ' *';
    color: #FC5555;
  }
`;

const LabelLink = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  margin-left: 95px;
  margin-top: 25px;
  font-family: 'ExtraLight';
  font-size: 18px;
`;

const InputWrapperTag = styled.div`
  margin-top: 20px;
  margin-left: 90px;
`;

const InputWrapperLink = styled.div`
  margin-top: 10px;
  margin-left: 90px;
  font-family: 'ExtraLight';
  font-size: 16px;
`;

const TagBoxWrapper = styled.div`
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
  text-align: center;
  font-family: 'ExtraLight';
  font-size: 16px;
`;

const FieldWrapper = styled.div`
  margin-bottom: 10px;
`;

const LabelContainer = styled.div`
  margin-top: 10px;
`;

const EditApplyModal = ({ onClose, onSave, job }) => {
  const [title, setTitle] = useState(job.details || '');
  const [startTime, setStartTime] = useState(job.startDate || '');
  const [endTime, setEndTime] = useState(job.endDate || '');
  const [tags, setTags] = useState(job.tags || []);
  const [link, setLink] = useState(job.link || '');
  const [status, setStatus] = useState('planned');

  useEffect(() => {
    setTitle(job.details || '');
    setStartTime(job.startDate || '');
    setEndTime(job.endDate || '');
    setTags(job.tags || []);
    setLink(job.link || '');
  }, [job]);

  const handleSave = () => {
    if (!title || !startTime || !endTime) {
      alert("필수 정보를 입력하세요!");
      return;
    }

    onSave({
      ...job,
      details: title,
      startDate: startTime,
      endDate: endTime,
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
        <ModalTitle>공고 수정</ModalTitle>
        <Divider /> 
        <FieldWrapper>
          <Label>공고 제목</Label>
          <InputWrapper> 
            <Input
              type="text"
              placeholder="활동 제목을 작성하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputWrapper>
        </FieldWrapper>
        <Row>
          <InputWrapper> 
            <FieldWrapper>
              <LabelStart>접수 시작 일시</LabelStart>
              <InputWrapperStart>
                <InputDateStart
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </InputWrapperStart>
            </FieldWrapper>
          </InputWrapper> 
          <InputWrapper> 
            <FieldWrapper>
              <LabelEnd>접수 마감 일시</LabelEnd>
              <InputWrapperEnd>
                <InputDateEnd
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </InputWrapperEnd>
            </FieldWrapper>
          </InputWrapper>
        </Row>
        <FieldWrapper>
          <LabelTag>태그</LabelTag>
          <InputWrapperTag>
            <TagBoxWrapper>
              <TagBox onTagChange={handleTagChange} initialTags={tags} />
            </TagBoxWrapper>
          </InputWrapperTag>
        </FieldWrapper>
        <FieldWrapper>
          <LabelContainer>
            <LabelLink>링크</LabelLink>
          </LabelContainer>
          <InputWrapperLink>
            <Input
              type="text"
              placeholder="공고 혹은 접수 페이지 링크를 입력하세요"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </InputWrapperLink>
        </FieldWrapper>
        <ErrorMessage>*필수 정보를 입력하세요!</ErrorMessage>
        <ButtonWrapper> 
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EditApplyModal;
