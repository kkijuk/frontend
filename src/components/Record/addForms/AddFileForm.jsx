import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../../constants/theme";
import FileSearch from "../FileSearch";
import { trackEvent } from "../../../utils/ga4";
import { downS3File } from "../../../api/Record/s3File";
import { BaseFormInput, BaseFormButton } from "../styles/ResumeForm.styles";

const AddFileForm = ({ mode="add", onClose, onSave, onUpdate, onDelete, initialData}) => {
  const [formData, setFormData] = useState({
      fileLinkTitle: "",
      fileId: "",
      fileType: "URL", //기본값
      fileTitle: "",
      keyName: "",
      urlTitle: "",
      url: "",
      file: null,
  });

  const [isTypeURL, setIsTypeUrl] = useState(true);
  const [existingFileUrl, setExistingFileUrl] = useState(null);
  const [displayedFileUrl, setDisplayedFileUrl] = useState("");

  // 수정 모드일 경우 formData 기존 내용으로 초기화
  useEffect(() => {
    if (mode === "edit" && initialData) {
      console.log('initialData:', initialData);
      setFormData(initialData);
      setIsTypeUrl(initialData.fileType === "URL");

      if(initialData.fileType === "File") {
        downS3File(initialData)
        .then((url) => {
          setExistingFileUrl(url);
          setDisplayedFileUrl(truncateText(url, 30));
        })
        .catch((error) => console.error("다운로드 URL 가져오기 실패:", error));
      }
    }
  }, []);


  // 변경된 데이터 저장
  const handleInputChange = (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  
  // URL 유효성 검사
  function isValidUrl(value){
    try{
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <RealFirstContainer>
    <FirstContainer>
        <TypeWrapper>
            <TypeToggle>
                <TypeButton
                    active={formData.fileType === "URL"}
                    onClick={() => {handleInputChange("fileType", "URL"); setIsTypeUrl(true);}}
                >
                    URL
                </TypeButton>
                <TypeButton
                    active={formData.fileType === "File"}
                    onClick={() => {handleInputChange("fileType", "File"); setIsTypeUrl(false);}}
                >
                    첨부파일
                </TypeButton>
            </TypeToggle>
        </TypeWrapper>
        <Container>
            <FormContent>
                <Row>
                    {isTypeURL ? (
                        <Input
                            type="text"
                            placeholder="링크 제목(ex. 블로그, 링크드인 등)"
                            value={formData.urlTitle}
                            onChange={(e) => handleInputChange("urlTitle", e.target.value)}
                            width = "610px"
                            maxLength={20}
                        />
                    ) : (
                        <Input
                            type="text"
                            placeholder="첨부파일 제목(ex. 포트폴리오, 경력기술서 등)"
                            value={formData.fileTitle}
                            onChange={(e) => handleInputChange("fileTitle", e.target.value)}
                            width = "610px"
                            // style={{ width: "610px" }}
                            maxLength={20}
                        />
                    )}
                </Row>
                <Row>
                    {isTypeURL ? (
                        <Input
                        type="text"
                        placeholder="링크를 입력해주세요."
                        value={formData.url}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                        width = "450px"
                        // style={{ width: "450px" }}
                      />
                    ) : (
                      existingFileUrl ? (
                        <InputWrapper>
                          <Input
                            type="text"
                            placeholder="첨부파일 제목(ex. 포트폴리오, 경력기술서 등)"
                            value={formData.fileLinkTitle}
                            onClick = {()=>window.open(existingFileUrl, "_blank")}
                            readOnly
                            width = "450px"
                            style={{cursor: "pointer" }}
                          />
                          <FileSelectButton 
                            onClick={()=>{
                              setExistingFileUrl(null);
                            }}>
                              파일 선택
                          </FileSelectButton>
                        </InputWrapper>
                      ) : (
                        <FileSearch
                          onFileSelect={(selectedFile) =>{
                            handleInputChange("file", selectedFile);
                          }}/>
                      )
                    )}
                    <ButtonRow>
                    {mode === "edit" ? (
                      <BaseFormButton
                        onClick={()=>{
                          onDelete(formData);
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
                          // 제목 확인
                          if(formData.fileType === "URL" && (!formData.urlTitle || !formData.urlTitle.trim())){
                            alert("입력하지 않은 항목이 있습니다.");
                            return;
                          }
                          if (formData.fileType === "File" && (!formData.fileTitle || !formData.fileTitle.trim())) {
                            alert("입력하지 않은 항목이 있습니다.");
                            return;
                          }
                          //URL 유효성 확인
                          if (formData.fileType === "URL" && !isValidUrl(formData.url)) {
                            alert("유효한 URL 형식이 아닙니다.");
                            return;
                          }
                          onUpdate(formData);
                          onClose();
                          trackEvent('edit_click', {
                            category: 'resume',
                            detail: 'add_attatchment',
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
                          // 제목 확인
                          if(formData.fileType === "URL" && (!formData.urlTitle || !formData.urlTitle.trim())){
                            alert("입력하지 않은 항목이 있습니다.");
                            return;
                          }
                          if (formData.fileType === "File" && (!formData.fileTitle || !formData.fileTitle.trim())) {
                            alert("입력하지 않은 항목이 있습니다.");
                            return;
                          }
                          //URL 유효성 확인
                          if (formData.fileType === "URL" && !isValidUrl(formData.url)) {
                            alert("유효한 URL 형식이 아닙니다.");
                            return;
                          }
                          onSave(formData);
                          onClose();
                          trackEvent('add_confirm', {
                            category: 'resume',
                            detail: 'add_attachment',
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

export default AddFileForm;

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
  width: 650px;
  padding: 20px;
  background: var(--gray-06, #f5f5f5);
  border-radius: 0px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
      width: 278px;
      height: 135px;
      padding: 16px;
      gap: 12px;
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

const Input = styled(BaseFormInput)`
  width: ${(props) => props.width || "100%"};
  padding-left: 10px;
  padding-right: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 0px;
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
    width: 93px;
    height: 17px;
    padding: 4px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`
const FileSelectButton = styled.button`
  width: 85px;
  height: 45px;
  position: absolute;
  top: 0;
  right: 15px;
  border: none;
  background: none;
  color: #707070;
  font-family: 'Regular';
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
