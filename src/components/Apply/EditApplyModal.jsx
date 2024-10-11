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
  z-index: 2;
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

const formatDateTimeToLocal = (dateString) => {
  if (!dateString) return '';

  const utcDate = new Date(dateString);
  const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EditApplyModal = ({ onClose, onSave, job }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState('');

  useEffect(() => {
    if (job) {
      setTitle(job.title || '');
      setStartTime(formatDateTimeToLocal(job.startTime) || '');
      setEndTime(formatDateTimeToLocal(job.endTime) || '');
      setTags(job.tags || []);  // 태그를 초기화할 때 job.tags 값을 사용
      setLink(job.link || '');
    }
  }, [job]);

  const handleSave = async () => {
    const isAnyFieldFilled = title || tags.length > 0 || (startTime && endTime) || link;

    if (!isAnyFieldFilled) {
      alert("최소한 하나의 필드를 입력하세요!");
      return;
    }

    await onSave({
      ...job,
      title: title || job.title,
      startTime: startTime || job.startTime,
      endTime: endTime || job.endTime,
      tags: tags.length > 0 ? tags : job.tags,
      link: link || job.link,
    });
    onClose();
  };

  const handleTagChange = (newTags) => {
    setTags(newTags);
  };

  // 캘린더에서 날짜/시간 선택 시 상태 업데이트
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

   return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>공고 수정</ModalTitle>
        <Divider />
        {/* 공고 제목 필드 */}
        <FieldWrapper>
          <Label>공고 제목</Label>
          <InputWrapper>
            <Input
              type="text"
              placeholder="공고 제목을 수정하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputWrapper>
        </FieldWrapper>
        {/* 접수 시작/마감 일시 필드 */}
        <Row>
          <InputWrapper>
            <FieldWrapper>
              <LabelStart>접수 시작 일시</LabelStart>
              <InputWrapperStart>
                <InputDateStart
                  type="datetime-local"
                  value={startTime}
                  onChange={handleStartTimeChange}
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
                  onChange={handleEndTimeChange}
                />
              </InputWrapperEnd>
            </FieldWrapper>
          </InputWrapper>
        </Row>
        {/* 태그 필드 */}
        <FieldWrapper>
          <LabelTag>태그</LabelTag>
          <InputWrapperTag>
            <TagBoxWrapper>
              <TagBox onTagChange={handleTagChange} initialTags={tags} />
            </TagBoxWrapper>
          </InputWrapperTag>
        </FieldWrapper>
        {/* 링크 필드 */}
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
        <ErrorMessage>*최소 하나의 필드를 입력하세요!</ErrorMessage>
        {/* 저장 버튼 */}
        <ButtonWrapper>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EditApplyModal;