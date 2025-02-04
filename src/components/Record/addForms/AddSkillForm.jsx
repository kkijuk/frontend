import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomDropdown from "../CustomDropdown";
import SvgIcon from "../../shared/SvgIcon";

const AddSkillForm = ({ id, mode = "add", onClose, onSave, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    skillType: "",
    skillName: "",
    workmanship: "",
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
  const skillTypes = ["IT", "OA", "그래픽", "외국어", "기타"];
  const skillLevels = ["기초", "초급", "중급", "고급", "전문가"];

  const [showSkillTypes, setShowSkillTypes] = useState(false);
  const [showSkillLevels, setShowSkillLevels] = useState(false);
  const skillLevelsMapping = {
    "기초" : "BASIC",
    "초급" : "BEGINNER",
    "중급" : "INTERMEDIATE",
    "고급" : "ADVANCED",
    "전문가" : "EXPERT"
  }

  const skillLevelsReverseMapping = {
    "BASIC" : "기초",
    "BEGINNER" : "초급",
    "INTERMEDIATE" : "중급",
    "ADVANCED" : "고급",
    "EXPERT" : "전문가"
  }

  const handleDropdownToggle = (type) => {
    if (type === "skillType") {
      setShowSkillTypes((prev) => !prev);
      setShowSkillLevels(false);
    } else if (type === "skillLevel") {
      setShowSkillLevels((prev) => !prev);
      setShowSkillTypes(false);
    }
  }

//    useEffect(() => {
//     console.log("formData changed:", formData);
//     }, [formData]);

  const [isGuideVisible, setIsGuideVisible] = useState(false);

  return (
    <Container>
      <Row>
        <CustomDropdown
          options={skillTypes}
          placeholder="유형"
          value={formData.skillType}
          onChange={(value) => handleInputChange("skillType", value)}
          onToggle={() => handleDropdownToggle("skillType")}
          isOpen={showSkillTypes}
          style={{width: "170px"}}
        />
        <Input
          type="text"
          placeholder="보유한 기술"
          value={formData.skillName}
          onChange={(e) => handleInputChange("skillName", e.target.value)}
        />
      </Row>
      <Row>
        <CustomDropdown
          options={skillLevels}
          placeholder="숙련도"
          value={skillLevelsReverseMapping[formData.workmanship] || ""}
          onChange={(value) => handleInputChange("skillLevel", value)}
          onToggle={() => handleDropdownToggle("skillLevel")}
          isOpen={showSkillLevels}
          style={{width: "170px"}}
        />
        <IconWrapper
          onMouseEnter={() => setIsGuideVisible(true)}
          onMouseLeave={() => setIsGuideVisible(false)}
        >
          <SvgIcon name="question-mark" size={20} color="#707070" />
          {isGuideVisible && (
            <GuideBoxContainer>
              {/* <Triangle /> */}
              <GuideBox>
                <p style={{fontSize:'16px'}}>숙련도란?</p>
                <p>
                • 기초: 기본적인 사용 방법과 주요 개념을 이해하고 있어요.<br/>
                • 초급: 주요 기능을 활용할 수 있고, 간단한 문제를 해결할 수 있어요.<br/>
                • 중급: 다양한 상황에서 기술을 효율적으로 활용할 수 있어요.<br/>
                • 고급: 복잡한 기능을 활용할 수 있고 프로젝트 경험이 있어요.<br/>
                • 전문가: 깊이 있는 경험을 제공할 수 있어요.
                </p>
              </GuideBox>
            </GuideBoxContainer>
          )}
        </IconWrapper>
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

    </Container>
  );
};

export default AddSkillForm;

// Styled Components
const Container = styled.div`
  width: 610px;
  padding: 20px;
  background: var(--gray-06, #f5f5f5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  margin-bottom: 50px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Input = styled.input`
  height: 45px;
  width: 430px;
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
    color: #d9d9d9;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-left:275px;
`;

const Button = styled.button`
  width: 65px;
  height: 25px;
  border-radius: 10px;
  font-family: Regular;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: relative;
`;

const GuideBoxContainer = styled.div`
  position: absolute;
  top: -30px;
  left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const GuideBox = styled.div`
  width: 300px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--gray-02, #707070);
  color: white;
  font-family: Regular;
  font-size: 14px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  p{
  font-size: 11px;
  font-family: Regular;
  }
`;

// const Triangle = styled.div`
//   width: 0;
//   height: 0;
//   border-left: 10px solid transparent;
//   border-right: 10px solid transparent;
//   border-bottom: 10px solid var(--gray-02, #707070);
//   margin-bottom: -6px;
// `;