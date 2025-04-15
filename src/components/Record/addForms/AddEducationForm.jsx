import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CustomDropdown from "../CustomDropdown";
import CustomDatePicker from "../CustomDatePicker";
import { trackEvent } from "../../../utils/ga4";
import { theme } from '../../../constants/theme';

const AddEducationForm = ({ id, mode = "add", onClose, onSave, onUpdate, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    category: "",
    schoolName: "",
    major: "",
    state: "",
    admissionDate: "",
    graduationDate: "",
  });

  // 수정 모드일 경우 formData 기존 내용으로 초기화
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  // 변경된 데이터 저장
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  // Dropdown 관련
  const optionsEducationType = ["고등학교", "전문대학교", "대학교", "대학원(석사)", "대학원(박사)"];
  const optionsEducationStatus = ["재학", "휴학", "졸업예정", "졸업", "중퇴", "편입"];

  const [showEducationTypeDropdown, setShowEducationTypeDropdown] = useState(false); // 학력 구분
  const [showEducationStatusDropdown, setShowEducationStatusDropdown] = useState(false); // 학력 상태
  const [showAdmissionDatePicker, setShowAdmissionDatePicker] = useState(false); // 입학년월 DatePicker
  const [showGraduationDatePicker, setShowGraduationDatePicker] = useState(false); // 졸업년월 DatePicker

  const admissionInputRef = useRef(null);
  const graduationInputRef = useRef(null);

  const handleDropdownToggle = (type) => {
    if (type === "category") {
      setShowEducationTypeDropdown((prev) => !prev);
      setShowEducationStatusDropdown(false); // 다른 드롭다운 닫기
    } else if (type === "state") {
      setShowEducationStatusDropdown((prev) => !prev);
      setShowEducationTypeDropdown(false); // 다른 드롭다운 닫기
    }
  };

  const handleDatePickerToggle = (type) => {
    if (type === "admissionDate") {
      setShowAdmissionDatePicker((prev) => !prev);
      setShowGraduationDatePicker(false); // 다른 DatePicker는 닫기
    } else if (type === "graduationDate") {
      setShowGraduationDatePicker((prev) => !prev);
      setShowAdmissionDatePicker(false); // 다른 DatePicker는 닫기
    }
  };

  const handleDateChange = (type, value) => {
    handleInputChange(type, value); // 선택된 값을 formData에 업데이트
    if (type === "admissionDate") {
      setShowAdmissionDatePicker(false);
    } else if (type === "graduationDate") {
      setShowGraduationDatePicker(false);
    }
  };

  const calculatePickerPosition = (ref) => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY -151, // Input 아래 5px
      left: rect.left + window.scrollX -357,
    };
  };

  const hasEmptyField =(data)=>{
    const { id, educationId, isCurrent, ...fields } = data; //id, isCurrent 제외
    return Object.values(fields).some((value) => {
      console.log('value:', value);
      if (typeof value !== "string") {return true;}
      return value.trim() === ""
    });
  }

  // Log formData whenever it changes
  useEffect(() => {
    console.log("formData changed:", formData);
  }, [formData]);

  return (
    <Container>
      <Row>
        <CustomDropdown
          options={optionsEducationType}
          placeholder="학력구분"
          value={formData.category}
          onChange={(value) => handleInputChange("category", value)}
          onToggle={() => handleDropdownToggle("category")}
          isOpen={showEducationTypeDropdown}
        />

        <Input
            type="text"
            placeholder="학교명(ex.00대학교)"
            value={formData.schoolName}
            onChange={(e) => handleInputChange("schoolName", e.target.value)}
            maxLength={20}
        />
      </Row>
      <Row>
        <Input
          type="text"
          placeholder="전공 및 계열(ex. 00학과 또는 인문계열)"
          value={formData.major}
          onChange={(e) => handleInputChange("major", e.target.value)}
          maxLength={20}
          fullWidth
        />
      </Row>
      <Row>
        <CustomDropdown
          options={optionsEducationStatus}
          placeholder="학력상태"
          value={formData.state}
          onChange={(value) => handleInputChange("state", value)}
          onToggle={() => handleDropdownToggle("state")}
          isOpen={showEducationStatusDropdown}
        />
        <PeriodWrapper>
          <DatePickerContainer>
            <DatePickerInput
              readOnly
              type="text"
              placeholder="입학년월"
              value={formData.admissionDate}
              onClick={() => handleDatePickerToggle("admissionDate")}
            />
            {showAdmissionDatePicker && (
              <DatePickerWrapper isGraduation={false}>
                <CustomDatePicker
                  value={formData.admissionDate}
                  onChange={(value) => handleDateChange("admissionDate", value)}
                  onClose={() => setShowAdmissionDatePicker(false)}
                />
              </DatePickerWrapper>
            )}
          </DatePickerContainer>
          <p>~</p>
          <DatePickerContainer>
            <DatePickerInput
              readOnly
              type="text"
              placeholder="졸업년월"
              value={formData.graduationDate}
              onClick={() => handleDatePickerToggle("graduationDate")}
            />
            {showGraduationDatePicker && (
              <DatePickerWrapper isGraduation={true}>
                <CustomDatePicker
                  value={formData.graduationDate}
                  onChange={(value) => handleDateChange("graduationDate", value)}
                  onClose={() => setShowGraduationDatePicker(false)}
                />
              </DatePickerWrapper>
            )}
          </DatePickerContainer>
        </PeriodWrapper>


        <ButtonRow>
          {mode === "edit" ? (
            <Button
              onClick={()=>{
                onDelete();
                onClose();
              }}
              style={{
                border: "1px solid var(--sub-bu, #FA7C79)",
                background: "var(--white, #FFF)",
                color: "#FA7C79",
              }}
            >
              삭제
            </Button>
          ) : (
            <Button
              onClick={onClose}
              style={{
                border: "1px solid var(--sub-bu, #77AFF2)",
                background: "var(--white, #FFF)",
                color: "#77AFF2",
              }}
            >
              취소
            </Button>
        )}
        {mode === "edit" ? (
          <Button 
            primary 
            onClick={() => {
              if(hasEmptyField(formData)){
                alert("입력하지 않은 항목이 있습니다.");
                return;
              }
              onUpdate(formData);
              onClose();
              trackEvent('edit_click', {
                category: 'resume',
                detail: 'edit_education',
                action_type: 'edit',
                label: '활동 수정하기',
              });
            }}
            style={{border:'1px solid var(--sub-bu, #3AAF85)', background:'var(--white, #3AAF85)', color: '#FFFFFF'}}>
            저장
          </Button>
          ) : (
          <Button 
            primary 
            onClick={() => {
              if(hasEmptyField(formData)){
                alert("입력하지 않은 항목이 있습니다.");
                return;
              }
              onSave(formData);
              onClose();
              trackEvent('add_confirm', {
                category: 'resume',
                detail: 'add_education',
                action_type: 'confirm',
                label: '추가',
              });
            }}
            style={{border:'1px solid var(--sub-bu, #3AAF85)', background:'var(--white, #3AAF85)', color: '#FFFFFF'}}>
            추가
          </Button>
        )}
      </ButtonRow>
      </Row>
    </Container>
  );
};

export default AddEducationForm;

const Container = styled.div`
  width: 610px;
  padding: 20px;
  background: var(--gray-06, #f5f5f5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  margin-bottom: 50px;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 270px;
    height: 294px;
    padding: 16px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 12px;
  }
`;


const Input = styled.input`
  height: 45px;
  width: ${(props) => (props.fullWidth ? "590px" : "435px")};
  border-radius: 10px;
  border:none;
  background: var(--white, #fff);
  text-align: left;
  font-family: Regular;
  font-size: 16px;
  font-weight: 400;
  color: black;
  padding-left: 10px;
  padding-right: 10px;
  color: black!important;
  color: ${(props) => (props.hasValue ? "black" : "#D9D9D9")};
  &::placeholder {
    color: #d9d9d9; /* Placeholder는 회색 */
  }
  @media (max-width: ${theme.breakpoints.md}) {
    width: 230px;
    height: 17px;
    padding: 12px 20px;
  }
  
`;

const PeriodWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  height: 41px;
`;

const DatePickerInput = styled.input.attrs({ type: "text" })`
  height: 45px;
  width: 135px;
  border-radius: 10px;
  background: var(--white, #fff);
  text-align: center;
  font-family: Regular;
  font-size: 16px;
  font-weight: 400;
  color: black;
  border: ${(props) => (props.isActive ? "1px solid var(--gray-02, #707070)" : "none")};
  cursor:pointer;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 92.5px;
    height: 17px;
    padding: 12px 16px;
  }
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  transform: translateY(10px);
  @media (max-width: ${theme.breakpoints.md}) {
   top: 32.5px;
   left: ${({ isGraduation }) => (isGraduation ? "-75px" : "0")};
  }
`;

const DatePickerContainer = styled.div`
	position: relative;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
    gap: 12px;
  }
`;

const Button = styled.button`
  all: unset;
  width: 65px;
  height: 25px;
  border-radius: 10px;
  font-family: Regular;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    width: 89px;
    height: 17px;
    padding: 4px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
