import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CustomCalendarPicker from "../CustomCalendarPicker";

const AddLicenseForm = ({ id, mode = "add", onClose, onSave, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    licenseTag: "자격증", // 기본 값
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
    handleInputChange("acquireDate", value);
    setShowDatePicker(false);
  };

  const calculatePickerPosition = (ref) => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 10, // Input 아래 10px
      left: rect.left + window.scrollX,
    };
  };

//    useEffect(() => {
//     console.log("formData changed:", formData);
//     }, [formData]);

  return (
    <RealFirstContainer>
    <FirstContainer>
        <TypeWrapper>
            <TypeToggle>
                <TypeButton
                active={formData.licenseTag === "자격증"}
                onClick={() => handleInputChange("licenseTag", "자격증")}
                >
                자격증
                </TypeButton>
                <TypeButton
                active={formData.licenseTag === "외국어"}
                onClick={() => handleInputChange("licenseTag", "외국어")}
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
                    value={formData.acquireDate}
                    onClick={handleDatePickerToggle}
                />
                {showDatePicker && (
                    <DatePickerWrapper style={calculatePickerPosition(dateInputRef)}>
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
                style={{ width: "275px" }}
            />
            <Input
                type="text"
                placeholder="점수/등급"
                value={formData.licenseGrade}
                onChange={(e) => handleInputChange("licenseGrade", e.target.value)}
                style={{ width: "120px" }}
            />
            </Row>
            <Row>
            <Input
                type="text"
                placeholder="수험번호/자격번호"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                style={{ width: "175px" }}
            />
            <Input
                type="text"
                placeholder="주관처(선택)"
                value={formData.administer}
                onChange={(e) => handleInputChange("administer", e.target.value)}
                style={{ width: "175px" }}
            />
            <ButtonRow>
              {mode === "edit" ? (
                <Button
                  onClick={()=>onDelete(id)}
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
              <Button
                primary
                onClick={() => {
                  onSave(formData);
                  onClose();
                }}
                style={{
                    border: "1px solid var(--main-01, #3AAF85)",
                    background: "var(--main-01, #3AAF85)",
                    color: "#FFFFFF",
                }}
                >
                추가
              </Button>
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
    height:195px;
    width:100%;
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
`;

const Input = styled.input`
  height: 45px;
  border-radius: 10px;
  border: none;
  background: var(--white, #fff);
  text-align: left;
  font-family: Regular;
  font-size: 16px;
  font-weight: 400;
  color: black;
  padding: 0px 20px;

  &::placeholder {
    color: #d9d9d9;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
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
`;

const DatePickerContainer = styled.div`
	position: relative;
`;
