import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Input,
    ButtonRow,
    Button,
    IconWrapper,
    GuideBoxContainer,
    GuideBox
} from "./styles/Skill.styles";
import CustomDropdown from "../CustomDropdown";
import SvgIcon from "../../shared/SvgIcon";
import { trackEvent } from "../../../utils/ga4";
import { BaseFormInput, BaseFormButton } from "./Form.styles";

const AddSkillForm = ({ id, mode = "add", onClose, onSave, onUpdate, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    skillTag: "",
    skillName: "",
    workmanship: "",
  });
  const [isGuideVisible, setIsGuideVisible] = useState(false);

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
  const skillTags = ["IT", "OA", "그래픽", "외국어", "기타"];
  const skillLevels = ["기초", "초급", "중급", "고급", "전문가"];

  const [showSkillTags, setShowSkillTags] = useState(false);
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

  const skillTagMapping = {
    "IT" : "IT",
    "OA" : "OA",
    "그래픽" : "GRAPHIC",
    "외국어" : "FOREIGNLANGUAGE",
    "기타" : "ETC"
  }

  const skillTagReverseMapping = {
    "IT" : "IT",
    "OA" : "OA",
    "GRAPHIC" : "그래픽",
    "FOREIGNLANGUAGE" : "외국어",
    "ETC" : "기타"
  }

  const handleDropdownToggle = (type) => {
    if (type === "skillTag") {
      setShowSkillTags((prev) => !prev);
      setShowSkillLevels(false);
    } else if (type === "skillLevel") {
      setShowSkillLevels((prev) => !prev);
      setShowSkillTags(false);
    }
  }

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
        <CustomDropdown
          options={skillTags}
          placeholder="유형"
          value={skillTagReverseMapping[formData.skillTag] || ""}
          onChange={(value) => handleInputChange("skillTag", skillTagMapping[value])}
          onToggle={() => handleDropdownToggle("skillTag")}
          isOpen={showSkillTags}
          width = '170px'
        />
        <Input
          type="text"
          placeholder="보유한 기술"
          value={formData.skillName}
          onChange={(e) => handleInputChange("skillName", e.target.value)}
          maxLength={30}
          width = '420px'
        />
      </Row>
      <Row>
        <CustomDropdown
          options={skillLevels}
          placeholder="숙련도"
          value={skillLevelsReverseMapping[formData.workmanship] || ""}
          onChange={(value) => handleInputChange("workmanship", skillLevelsMapping[value])}
          onToggle={() => handleDropdownToggle("skillLevel")}
          isOpen={showSkillLevels}
          width = '170px'
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
                    detail: 'edit_skill',
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
                    detail: 'add_skill',
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

export default AddSkillForm;


