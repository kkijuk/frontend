import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CustomCalendarPicker from "../CustomCalendarPicker";

const AddAwardForm = ({ id, mode = "add", onClose, onSave, onUpdate, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    awardDate: "",
    competitionName: "",
    awardName: "",
    awardingInstitution: "",
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
    handleInputChange("awardDate", value);
    setShowDatePicker(false);
  };

  // const calculatePickerPosition = (ref) => {
  //   if (!ref.current) return { top: 0, left: 0 };
  //   const rect = ref.current.getBoundingClientRect();
  //   return {
  //     top: rect.bottom + window.scrollY + 10, // Input 아래 10px
  //     left: rect.left + window.scrollX,
  //   };
  // };

  return (
    <Container>
      <Row>
        <DatePickerContainer>
          <DatePickerInput
            ref={dateInputRef}
            readOnly
            type="text"
            placeholder="수상일자"
            value={formData.awardDate}
            onClick={handleDatePickerToggle}
          />
          {showDatePicker && (
              <DatePickerWrapper>
                <CustomCalendarPicker
                  value={formData.awardDate}
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
          style={{width:'455px'}}
        />
      </Row>
      <Row>
        <Input
          type="text"
          placeholder="수상명"
          value={formData.awardName}
          onChange={(e) => handleInputChange("awardName", e.target.value)}
          style={{width:'195px'}}
        />
        <Input
          type="text"
          placeholder="수여기관"
          value={formData.awardingInstitution}
          onChange={(e) => handleInputChange("awardingInstitution", e.target.value)}
          style={{width:'195px'}}
        />
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
                onUpdate(formData);
                onClose();
              }}
              style={{border:'1px solid var(--sub-bu, #3AAF85)', background:'var(--white, #3AAF85)', color: '#FFFFFF'}}>
              저장
            </Button>
            ) : (
            <Button 
              primary 
              onClick={() => {
                onSave(formData);
                onClose();
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

export default AddAwardForm;

// Styled Components
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
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
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
  padding-left: 10px;
  padding-right: 10px;
  color: ${(props) => (props.hasValue ? "black" : "#D9D9D9")};
  &::placeholder {
    color: #d9d9d9; /* Placeholder는 회색 */
  }
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

const DatePickerWrapper = styled.div`
  position: absolute;
  top:48px;
  z-index: 1000;
`;

const DatePickerContainer = styled.div`
	position: relative;
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
