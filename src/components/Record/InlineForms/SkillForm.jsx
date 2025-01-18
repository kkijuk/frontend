import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomDropdown from '../CustomDropdown';

const SkillForm = ({ mode, onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState(
      initialData || {
        type: '',
        skillName: '',
        proficiency: '',
      }
    );
  
    const handleChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleSubmit = () => {
      onSubmit(formData);
    };
  
    return (
      <FormContainer>
        <Row>
          <CustomDropdown
            placeholder="유형"
            menuItems={['IT', 'OA', '그래픽', '외국어', '기타']}
            width={200}
            onSelect={(value) => handleChange('type', value)}
          />
          <Input
            placeholder="보유한 기술"
            value={formData.skillName}
            onChange={(e) => handleChange('skillName', e.target.value)}
          />
        </Row>
        <Row>
          <CustomDropdown
            placeholder="숙련도"
            menuItems={['기초', '초급', '중급', '고급', '전문가']}
            width={200}
            onSelect={(value) => handleChange('proficiency', value)}
          />
        </Row>
        <ButtonContainer>
          <Button variant="cancel" onClick={onCancel}>
            취소
          </Button>
          {mode === 'edit' && (
            <Button variant="delete" onClick={() => onSubmit({ ...formData, action: 'delete' })}>
              삭제
            </Button>
          )}
          <Button onClick={handleSubmit}>{mode === 'edit' ? '저장' : '추가'}</Button>
        </ButtonContainer>
      </FormContainer>
    );
  };
  
  // SkillForm.propTypes = {
  //   mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  //   onSubmit: PropTypes.func.isRequired,
  //   onCancel: PropTypes.func.isRequired,
  //   initialData: PropTypes.shape({
  //     type: PropTypes.string,
  //     skillName: PropTypes.string,
  //     proficiency: PropTypes.string,
  //   }),
  // };
  
  export default SkillForm;

const FormContainer = styled.div`
  width: 650px;
  background: var(--gray-06, #f5f5f5);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const Input = styled.input`
  height: 45px;
  flex: 1;
  padding: 10px;
  border: 1px solid var(--gray-03, #d9d9d9);
  border-radius: 10px;
  font-size: 16px;
  color: var(--black, #000);

  &::placeholder {
    color: var(--gray-03, #d9d9d9);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  width: 65px;
  height: 25px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  border: ${({ variant }) =>
    variant === 'cancel'
      ? '1px solid var(--sub-bu, #77AFF2)'
      : variant === 'delete'
      ? '1px solid var(--sub-rd, #FA7C79)'
      : 'none'};
  background: ${({ variant }) =>
    variant === 'cancel'
      ? 'var(--white, #FFF)'
      : variant === 'delete'
      ? 'var(--white, #FFF)'
      : 'var(--main-01, #3AAF85)'};
  color: ${({ variant }) =>
    variant === 'cancel'
      ? 'var(--sub-bu, #77AFF2)'
      : variant === 'delete'
      ? 'var(--sub-rd, #FA7C79)'
      : 'var(--white, #FFF)'};
`;