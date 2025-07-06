import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Input,
  DatePickerInput,
  DatePickerWrapper,
  DatePickerContainer,
  ButtonRow
} from "./styles/Award.styles";
import CustomCalendarPicker from "../CustomCalendarPicker";
import { trackEvent } from "../../../utils/ga4";
import { BaseFormInput, BaseFormButton } from "./Form.styles";
import { formateDateDashToDot } from "@/utils/formateDate";

const AddAwardForm = ({ id, mode = "add", onClose, onSave, onUpdate, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    acquireDate: "",
    competitionName: "",
    awardName: "",
    administer: "",
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

  // DatePicker 관련
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef(null);

  const handleDatePickerToggle = () => {
    setShowDatePicker((prev) => !prev);
  };

  const handleDateChange = (value) => {
    const dateObj = new Date(value);
    const year = dateObj.getFullYear();
    const month = (`0${dateObj.getMonth() + 1}`).slice(-2);
    const day = (`0${dateObj.getDate()}`).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    
    handleInputChange("acquireDate", formattedDate);
    setShowDatePicker(false);
  };


  // Log formData whenever it changes
  useEffect(() => {
    console.log("formData changed:", formData);
    Object.keys(formData).forEach(key => {
      console.log(`${key} (${typeof formData[key]}):`, formData[key]);
    });
  }, [formData]);

  const hasEmptyField =(data)=>{
    const { id, ...fields } = data; //id 제외
    return Object.values(fields).some((value) => {
      if (typeof value !== "string") {return true;}
      return value.trim() === ""
    });
  }

  return (
    <Container>
      <Row>
        <DatePickerContainer>
          <DatePickerInput
            ref={dateInputRef}
            readOnly
            type="text"
            placeholder="수상일자"
            value={formateDateDashToDot(formData.acquireDate || "")}
            onClick={handleDatePickerToggle}
          />
          {showDatePicker && (
              <DatePickerWrapper>
                <CustomCalendarPicker
                  value={formData.acquireDate}
                  onChange={handleDateChange}
                  onClose={() => setShowDatePicker(false)}
                />
              </DatePickerWrapper>
          )}
        </DatePickerContainer>
        <Input
          type="text"
          placeholder="대회명"
          value={formData.competitionName}
          onChange={(e) => handleInputChange("competitionName", e.target.value)}
          width = '455px'
          // style={{width:'455px'}}
          maxLength={30}
        />
      </Row>
      <Row>
        <Input
          type="text"
          placeholder="수상명"
          value={formData.awardName}
          onChange={(e) => handleInputChange("awardName", e.target.value)}
          width= '195px' //padding 고려
          // style={{width:'195px'}}
          maxLength={15}
        />
        <Input
          type="text"
          placeholder="수여기관"
          value={formData.administer}
          onChange={(e) => handleInputChange("administer", e.target.value)}
          width= '195px'
          // style={{width:'195px'}}
          maxLength={15}
        />
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
                  alert('입력하지 않은 항목이 있습니다.');
                  return;
                }
                onUpdate(formData);
                onClose();
                trackEvent('edit_click', {
                  category: 'resume',
                  detail: 'edit_award',
                  action_type: 'edit',
                  label: '활동 수정하기',
                });
              }}
              variantType="save">
              저장
            </BaseFormButton>
            ) : (
            <BaseFormButton
              onClick={() => {
                if(hasEmptyField(formData)){
                  alert('입력하지 않은 항목이 있습니다.');
                  return;
                }
                onSave(formData);
                onClose();
                trackEvent('add_confirm', {
                  category: 'resume',
                  detail: 'add_award',
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

export default AddAwardForm;




