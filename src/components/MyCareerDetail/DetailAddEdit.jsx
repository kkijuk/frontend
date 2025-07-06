import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactCalendar from './Calendar';
import moment from 'moment';
import TagBox from '../shared/TagBox';
import CareerDetailDeleteModal from '../Modal/CareerDetailDeleteModal';
import {
  Box,
  Top,
  Middle,
  Button,
  Title,
  Date,
  DateBox,
  Label,
  Cancel,
  Save,
  Line,
  Input,
  TextArea,
  ErrorMessage,
  BlurContainer,
  BaseContainer,
  ButtonRow,
} from './DetailAddEdit.styles';
import { useCareerDetailEdit, useCareerDetailDelete } from '@/hooks/MycareerDetail/useCareerDetailMutations';

export default function DetailAddEdit({
  initialTitle,
  initialStartDate,
  initialEndDate,
  initialContents,
  initialTags,
  careerId,
  detailId,
  onClose,
  onUpdate,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(initialStartDate || '');
  const [selectedEndDate, setSelectedEndDate] = useState(initialEndDate || '');
  const [title, setTitle] = useState(initialTitle);
  const [contents, setContents] = useState(initialContents);
  const [tagNames, setTagNames] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const editMutation = useCareerDetailEdit(() => {
    alert('저장되었습니다.');
    onClose();
    onUpdate();
  });

  const deleteMutation = useCareerDetailDelete(() => {
    onClose();
    onUpdate();
  });

  useEffect(() => {
    if (initialTags && Array.isArray(initialTags) && initialTags.length > 0) {
      const extractedTagNames = initialTags.map((tag) => tag.tagName);
      setTagNames(extractedTagNames);
    }
  }, [initialTags]);

  const handleDateClick = () => setShowCalendar(!showCalendar);

  const handleContentChange = (e) => {
    const inputText = e.target.value.slice(0, 800);
    setContents(inputText);

    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleDateChange = (date) => {
    if (Array.isArray(date) && date.length === 2) {
      const [startDate, endDate] = date;
      setSelectedStartDate(moment(startDate).format('YYYY-MM-DD'));
      setSelectedEndDate(moment(endDate).format('YYYY-MM-DD'));
    } else {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setSelectedStartDate(formattedDate);
      setSelectedEndDate('');
    }
    setShowCalendar(false);
  };

  const handleSave = () => {
    if (!title) return setErrorMessage('제목을 입력해주세요.');
    if (!selectedStartDate) return setErrorMessage('날짜를 선택해주세요.');
    if (!contents) return setErrorMessage('입력한 내용이 없습니다.');

    const data = {
      title,
      content: contents,
      startDate: selectedStartDate,
      endDate: selectedEndDate || null,
      tagList: tagIds,
    };

    editMutation.mutate({ careerId, detailId, data });
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate({ careerId, detailId });
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <Line />
      {isDeleteModalOpen && (
        <BlurContainer>
          <BaseContainer>
            <CareerDetailDeleteModal onCancel={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
          </BaseContainer>
        </BlurContainer>
      )}
      <Box>
        <Top>
          <Title>
            <Label>제목</Label>
            <Input height="50px" width="460px" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 30))} />
          </Title>
          <Date>
            <Label>날짜</Label>
            <DateBox onClick={handleDateClick}>
              {selectedStartDate
                ? selectedEndDate
                  ? `${selectedStartDate} ~ ${selectedEndDate}`
                  : selectedStartDate
                : '날짜를 선택하세요'}
            </DateBox>
            {showCalendar && <ReactCalendar onChange={handleDateChange} />}
          </Date>
        </Top>
        <Middle>
          <Label>내용</Label>
          <TextArea width="720px" value={contents} onChange={handleContentChange} />
        </Middle>
        <TagBox externalTags={tagNames} externalSetTags={setTagNames} onTagListChange={setTagIds} />
        <Button>
          <ButtonRow>
            <Cancel onClick={() => setIsDeleteModalOpen(true)} disabled={deleteMutation.isLoading}>
              삭제
            </Cancel>
            <Save onClick={handleSave} disabled={editMutation.isLoading}>
              {editMutation.isLoading ? '저장 중...' : '저장'}
            </Save>
          </ButtonRow>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Button>
      </Box>
      <Line />
    </div>
  );
}
