import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CustomCalendarPicker from "../CustomCalendarPicker";
import { trackEvent } from "../../../utils/ga4";
import { theme } from "../../../constants/theme";

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

  // const calculatePickerPosition = (ref) => {
  //   if (!ref.current) return { top: 0, left: 0 };
  //   const rect = ref.current.getBoundingClientRect();
  //   return {
  //     top: rect.bottom + window.scrollY + 10, // Input 아래 10px
  //     left: rect.left + window.scrollX,
  //   };
  // };

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
            value={formData.acquireDate || ""}
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
          width= '195px'
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
              style={{border:'1px solid var(--sub-bu, #3AAF85)', background:'var(--white, #3AAF85)', color: '#FFFFFF'}}>
              저장
            </Button>
            ) : (
            <Button 
              primary 
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
  @media (max-width: ${theme.breakpoints.md}) {
    width: 278px;
    height: 241px;
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
  width: ${(props) => props.width || "100%"};
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
  &::placeholder {
    color: #d9d9d9; /* Placeholder는 회색 */
  }
  @media (max-width: ${theme.breakpoints.md}) {
    width: ${(props) => props.mdWidth || "238px"};
    height: 17px;
    padding: 12px 20px;
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
  @media (max-width: ${theme.breakpoints.md}) {
    width: 238px;
    height: 17px;
    padding: 12px 20px;
  }
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  top:48px;
  z-index: 1000;
  @media (max-width: ${theme.breakpoints.md}) {
    top: 41px;    
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
