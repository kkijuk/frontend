import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomDropdown from "../CustomDropdown";
import CustomDatePicker from "../CustomDatePicker";

const EducationForm = ({ mode, onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState(
      initialData || {
        type: '',
        school: '',
        major: '',
        state: '',
        startDate: '',
        endDate: '',
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
            placeholder="학력구분"
            menuItems={['고등학교', '전문대학교', '대학교', '대학원(석사)', '대학원(박사)']}
            width={200}
            onSelect={(value) => handleChange('type', value)}
          />
          <Input
            placeholder="학교명(ex. 00대학교)"
            value={formData.school}
            onChange={(e) => handleChange('school', e.target.value)}
          />
        </Row>
        <Row>
          <Input
            placeholder="전공 및 계열(ex. 00학과 또는 인문계열)"
            value={formData.major}
            onChange={(e) => handleChange('major', e.target.value)}
          />
          <CustomDropdown
            placeholder="학력상태"
            menuItems={['재학', '휴학', '졸업예정', '졸업', '중퇴', '편입']}
            width={200}
            onSelect={(value) => handleChange('state', value)}
          />
        </Row>
        <Row>
          <CustomDatePicker
            placeholder="입학년월"
            width={200}
            onSelect={(value) => handleChange('startDate', value)}
          />
          <CustomDatePicker
            placeholder="졸업년월"
            width={200}
            onSelect={(value) => handleChange('endDate', value)}
          />
        </Row>
        <ButtonContainer>
          <Button variant="cancel" onClick={onCancel}>
            취소
          </Button>
          {mode === 'edit' && (
            <Button variant="delete" onClick={onSubmit}>
              삭제
            </Button>
          )}
          <Button onClick={handleSubmit}>{mode === 'edit' ? '저장' : '추가'}</Button>
        </ButtonContainer>
      </FormContainer>
    );
  };

// EducationForm.propTypes = {
//     mode: PropTypes.oneOf(['add', 'edit']).isRequired,
//     category: PropTypes.string.isRequired,
//     recordId: PropTypes.number, // 수정 시 필요
//     onAdd: PropTypes.func.isRequired,
//     onUpdate: PropTypes.func.isRequired,
//     onDelete: PropTypes.func.isRequired,
//     initialData: PropTypes.shape({
//       type: PropTypes.string,
//       school: PropTypes.string,
//       major: PropTypes.string,
//       state: PropTypes.string,
//       startDate: PropTypes.string,
//       endDate: PropTypes.string,
//     }),
//   };
  
  export default EducationForm;

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