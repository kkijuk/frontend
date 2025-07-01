import React, { useState, useRef, useEffect } from "react";
import {
    Container,
    Row,
    Input,
    PeriodWrapper,
    DatePickerInput,
    DatePickerWrapper,
    DatePickerContainer,
    ButtonRow
} from "./styles/Education.styles";
import CustomDropdown from "../CustomDropdown";
import CustomDatePicker from "../CustomDatePicker";
import { trackEvent } from "../../../utils/ga4";
import { BaseFormInput, BaseFormButton } from "./Form.styles";
import { formateDateDashToDot } from "@/utils/formateDate";

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
              value={formateDateDashToDot(formData.admissionDate || "")}
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
              value={formateDateDashToDot(formData.graduationDate || "")}
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
            <BaseFormButton
              onClick={()=>{
                onDelete();
                onClose();
              }}
              variantType="delete"
            >
              삭제
            </BaseFormButton>
          ) : (
            <BaseFormButton
              onClick={onClose}
              variantType="close"
            >
              취소
            </BaseFormButton>
        )}
        {mode === "edit" ? (
          <BaseFormButton
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
            variantType="save"
          >
            저장
          </BaseFormButton>
          ) : (
          <BaseFormButton 
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
            variantType="create"
          >
            추가
          </BaseFormButton>
        )}
      </ButtonRow>
      </Row>
    </Container>
  );
};

export default AddEducationForm;


