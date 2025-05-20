import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CustomCalendarPicker from "../CustomCalendarPicker";
import { trackEvent } from "../../../utils/ga4";
import { BaseFormInput, BaseFormButton } from "../styles/ResumeForm.styles";
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
                width = '275px'
                // style={{ width: "275px" }}
                maxLength={30}
            />
            <Input
                type="text"
                placeholder="점수/등급"
                value={formData.licenseGrade}
                onChange={(e) => handleInputChange("licenseGrade", e.target.value)}
                width = '120px'
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
                width = '175px'
                // style={{ width: "175px" }}
            />
            <Input
                type="text"
                placeholder="주관처(선택)"
                value={formData.administer}
                onChange={(e) => handleInputChange("administer", e.target.value)}
                width = '175px'
                // style={{ width: "175px" }}
                maxLength={15}
            />
            <ButtonRow>
              {mode === "edit" ? (
                <BaseFormButton
                  onClick={()=>onDelete(id)}
                  variant="delete"
                >
                  삭제
                </BaseFormButton>
              ) : (
                <BaseFormButton
                  onClick={onClose}
                  variant="close"
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
                  variant="save"
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
                  variant="create"
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

// Styled Components
const RealFirstContainer = styled.div`
    display:flex;
    align-items:center;
`
const FirstContainer = styled.div`
    width:100%;
    z-index:1000;
`

const TypeWrapper = styled.div`
  width: 224px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px 10px 0px 0px;
  background: var(--gray-06, #F5F5F5);
  position: relative;
`

const Container = styled.div`
  width: 610px;
  padding: 20px;
  background: var(--gray-06, #f5f5f5);
  border-radius: 0px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 278px;
    height: 294px;
    padding: 16px;
  }
`;

const TypeToggle = styled.div`
  position: absolute;
  top: 10px;
  left: 30px;
  display: flex;
  gap: 10px;
`;

const TypeButton = styled.button`
height:25px;
  padding: 0px 20px;
  border-radius: 10px;
  border: 1px solid var(--gray-02, #707070);
  background: ${({ active }) => (active ? "var(--gray-03, #707070)" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  font-size: 14px;
  cursor: pointer;
  font-family: Regular;

  &:hover {
    opacity: 0.8;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Input = styled.input`
  width: ${(props) => props.width || "100%"};
  padding: 0px 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
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
    width: 93px;
    height: 17px;
    padding: 4px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  z-index: 1000;
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
  cursor: pointer;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 238px;
    height: 17px;
    padding: 12px 20px;
  }
`;

const DatePickerContainer = styled.div`
	position: relative;
`;
