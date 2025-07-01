import React, { useState, useRef, useEffect } from "react";
import {
    RealFirstContainer,
    FirstContainer,
    TypeWrapper,
    Container,
    TypeToggle,
    TypeButton,
    FormContent,
    Row,
    Input,
    ButtonRow,
    Button,
    DatePickerWrapper,
    DatePickerInput,
    DatePickerContainer
} from "./styles/License.styles";
import CustomCalendarPicker from "../CustomCalendarPicker";
import { trackEvent } from "../../../utils/ga4";
import { BaseFormInput, BaseFormButton } from "./Form.styles";
import { formateDateDashToDot } from "@/utils/formateDate";

const AddLicenseForm = ({ id, mode = "add", onClose, onSave, onUpdate, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    licenseTag: "LICENSE", // 기본 값
    acquireDate: "",
    licenseName: "",
    licenseGrade: "",
    licenseNumber: "",
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef(null);


  // DatePicker 관련
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
    // const { id, ...fields } = data; //id 제외
    // return Object.values(fields).some((value) => {
    //   if (typeof value !== "string") {return true;}
    //   return value.trim() === ""
    // });
    const { acquireDate, licenseName } = data;
    return !acquireDate.trim() || !licenseName.trim();
  }

  return (
    <RealFirstContainer>
    <FirstContainer>
        <TypeWrapper>
            <TypeToggle>
                <TypeButton
                  active={formData.licenseTag === "LICENSE"}
                  onClick={() => handleInputChange("licenseTag", "LICENSE")}
                >
                자격증
                </TypeButton>
                <TypeButton
                  active={formData.licenseTag === "FOREIGN"}
                  onClick={() => handleInputChange("licenseTag", "FOREIGN")}
                >
                외국어
                </TypeButton>
            </TypeToggle>
        </TypeWrapper>
        <Container>
        <FormContent>
            <Row>
              <DatePickerContainer>
                <DatePickerInput
                    ref={dateInputRef}
                    readOnly
                    type="text"
                    placeholder="응시일자"
                    value={formateDateDashToDot(formData.acquireDate) || ""}
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
                placeholder="자격증 or 어학 시험명(ex. OPIc 영어)"
                value={formData.licenseName}
                onChange={(e) => handleInputChange("licenseName", e.target.value)}
                width = '295px'
                // style={{ width: "275px" }}
                maxLength={30}
            />
            <Input
                type="text"
                placeholder="점수/등급"
                value={formData.licenseGrade}
                onChange={(e) => handleInputChange("licenseGrade", e.target.value)}
                width = '140px'
                // style={{ width: "120px" }}
                maxLength={10}
            />
            </Row>
            <Row>
            <Input
                type="text"
                placeholder="수험번호/자격번호"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                width = '195px'
                // style={{ width: "175px" }}
            />
            <Input
                type="text"
                placeholder="주관처(선택)"
                value={formData.administer}
                onChange={(e) => handleInputChange("administer", e.target.value)}
                width = '195px'
                // style={{ width: "175px" }}
                maxLength={15}
            />
            <ButtonRow>
              {mode === "edit" ? (
                <BaseFormButton
                  onClick={()=>onDelete(id)}
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
                    if (hasEmptyField(formData)) {
                      alert("입력하지 않은 항목이 있습니다.");
                      return;
                    }
                    onUpdate(formData);
                    onClose();
                    trackEvent('edit_click', {
                      category: 'resume',
                      detail: 'edit_certificate',
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
                    if (hasEmptyField(formData)) {
                      alert("입력하지 않은 항목이 있습니다.");
                      return;
                    }
                    onSave(formData);
                    onClose();
                    trackEvent('add_confirm', {
                      category: 'resume',
                      detail: 'add_certificate',
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
        </FormContent>
        </Container>
    </FirstContainer>
    </RealFirstContainer>
  );
};

export default AddLicenseForm;


