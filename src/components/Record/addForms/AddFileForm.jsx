import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FileSearch from "../FileSearch";

const AddFileForm = ({ onClose, onSave}) => {
    const [formData, setFormData] = useState({
        fileId: "",
        fileType: "URL", //기본값
        fileTitle: "",
        keyName: "",
        urlTitle: "",
        url: ""
    });

    const [isTypeURL, setIsTypeUrl] = useState(true);

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
                        <FileSearch></FileSearch>
                    )}
                    <ButtonRow>
                        <Button
                            onClick={onClose}
                            style={{
                            border: "1px solid var(--sub-bu, #77AFF2)",
                            background: "var(--white, #FFF)",
                            color: "#77AFF2",
                          }}>
                              취소
                        </Button>

                        <Button
                          primary
                          onClick={() => {
                              onSave(formData); // 저장 api 호출
                              onClose(); 
                            }}
                          style={{
                              border: "1px solid var(--main-01, #3AAF85)",
                              background: "var(--main-01, #3AAF85)",
                              color: "#FFFFFF",
                          }}>
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