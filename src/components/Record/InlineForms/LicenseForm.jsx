import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomDropdown from '../CustomDropdown';
import CustomDatePicker from '../CustomDatePicker';

const LicenseForm = ({ mode, onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState(
      initialData || {
        type: '자격증',
        acquireDate: '',
        licenseName: '',
        score: '',
        licenseNumber: '',
        administer: '',
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
            placeholder="유형 선택"
            menuItems={['자격증', '외국어']}
            width={200}
            onSelect={(value) => handleChange('type', value)}
          />
          <CustomDatePicker
            placeholder="취득일자"
            width={200}
            onSelect={(value) => handleChange('acquireDate', value)}
          />
        </Row>
        <Row>
          <Input
            placeholder="자격증 or 어학 시험명(ex. OPIC 영어)"
            value={formData.licenseName}
            onChange={(e) => handleChange('licenseName', e.target.value)}
          />
          <Input
            placeholder="점수/등급(선택)"
            value={formData.score}
            onChange={(e) => handleChange('score', e.target.value)}
          />
        </Row>
        <Row>
          <Input
            placeholder="수험번호/자격번호(선택)"
            value={formData.licenseNumber}
            onChange={(e) => handleChange('licenseNumber', e.target.value)}
          />
          <Input
            placeholder="주관(선택)"
            value={formData.administer}
            onChange={(e) => handleChange('administer', e.target.value)}
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
  
  // LicenseForm.propTypes = {
  //   mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  //   onSubmit: PropTypes.func.isRequired,
  //   onCancel: PropTypes.func.isRequired,
  //   initialData: PropTypes.shape({
  //     type: PropTypes.string,
  //     acquireDate: PropTypes.string,
  //     licenseName: PropTypes.string,
  //     score: PropTypes.string,
  //     licenseNumber: PropTypes.string,
  //     administer: PropTypes.string,
  //   }),
  // };
  
  export default LicenseForm;

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