import React, { useState, useEffect } from "react";
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
    InputWrapper,
    FileSelectButton
} from "./styles/File.styles";
import { theme } from "../../../constants/theme";
import FileSearch from "../FileSearch";
import { trackEvent } from "../../../utils/ga4";
import { downS3File } from "../../../api/Record/s3File";
import { BaseFormInput, BaseFormButton } from "./Form.styles";

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


