import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FileSearch from "../FileSearch";
import { trackEvent } from "../../../utils/ga4";
import { downS3File } from "../../../api/Record/s3File";

const AddFileForm = ({ mode="add", onClose, onSave, onUpdate, onDelete, initialData}) => {
  const [formData, setFormData] = useState({
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

  // 수정 모드일 경우 formData 기존 내용으로 초기화
  useEffect(() => {
    if (mode === "edit" && initialData) {
      console.log('initialData:', initialData);
      setFormData(initialData);
      setIsTypeUrl(initialData.fileType === "URL");

      downS3File(initialData)
        .then((url) => setExistingFileUrl(url))
        .catch((error) => console.error("다운로드 URL 가져오기 실패:", error));
    }
  }, []);


  // 변경된 데이터 저장
  const handleInputChange = (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
  };
    

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
                            style={{ width: "610px" }}
                        />
                    ) : (
                        <Input
                            type="text"
                            placeholder="첨부파일 제목(ex. 포트폴리오, 경력기술서 등)"
                            value={formData.fileTitle}
                            onChange={(e) => handleInputChange("fileTitle", e.target.value)}
                            style={{ width: "610px" }}
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
                        style={{ width: "450px" }}
                      />
                    ) : (
                      existingFileUrl ? (
                        <InputWrapper>
                          <Input
                            type="text"
                            placeholder="첨부파일 제목(ex. 포트폴리오, 경력기술서 등)"
                            value={existingFileUrl}
                            onClick = {()=>window.open(existingFileUrl, "_blank")}
                            readOnly
                            style={{ width: "450px", cursor: "pointer" }}
                          />
                          <FileSelectButton onClick={()=>setExistingFileUrl(null)}>파일 선택</FileSelectButton>
                        </InputWrapper>
                      ) : (
                        <FileSearch
                          onFileSelect={(selectedFile) => handleInputChange("file", selectedFile)}
                        />
                      )
                    )}
                    <ButtonRow>
                    {mode === "edit" ? (
                      <Button
                        onClick={()=>{
                          onDelete(formData);
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
                          trackEvent('edit_click', {
                            category: 'resume',
                            detail: 'add_attatchment',
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
                          onSave(formData);
                          onClose();
                          trackEvent('add_confirm', {
                            category: 'resume',
                            detail: 'add_attachment',
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
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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

const InputWrapper = styled.div`
  position: relative;
`
const FileSelectButton = styled.button`
  width: 85px;
  height: 45px;
  position: absolute;
  right: 20px;
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
