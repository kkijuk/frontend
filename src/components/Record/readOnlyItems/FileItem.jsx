import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { downS3File } from "../../../api/Record/s3File";
import AddFileForm from "../addForms/AddFileForm";

const FileItem = ({ id, data, onSave, onUpdate, onDelete }) => {

  const [isTypeURL, setIsTypeUrl] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (data) {
      setIsTypeUrl(data.fileType === "URL");
      console.log("File Data:", data);
    }
  }, [data]);

  const handleDownload = async () => {
    try{
      // 1. presigned URL을 가져오기
      const signedURL = await downS3File(data);
      if(!signedURL){
        alert("파일 다운로드 URL을 가져오는데 실패했습니다.");
        return;
      }

      // 2. presigned URL로 파일 다운로드
      const fileResponse = await fetch(signedURL);
      if(!fileResponse.ok){
        throw new Error("Failed to download file");
      }

      // 3. blob으로 변환
      const blob = await fileResponse.blob();
      const url = window.URL.createObjectURL(blob);

      // 4. 다운로드 트리거 생성
      const a = document.createElement("a");
      a.href = url;
      a.download = data.fileTitle; // 다운받을 때 보이는 파일 이름
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading file: ", error);
    }
  }

  const handleContentLinkClick = () => {
    if (isTypeURL) {
      window.open(data.url, "_blank");
    } else {
      handleDownload();
    }
  };

  return (
    <div style={{ display: 'flex', width:'100%'}}>
      {isEditMode ? (
        <EditContainer>
          <AddFileForm
            mode='edit'
            initialData={data}
            onClose={() => setIsEditMode(false)}
            onUpdate = {(FormData) => onUpdate(FormData)}
            onDelete={(FormData)=>onDelete(FormData)}
          />
        </EditContainer>
      ):(
        <Container>
          <FileOrURLName>
            {isTypeURL ? data.urlTitle : data.fileTitle}
          </FileOrURLName>
          <ContentLink onClick={handleContentLinkClick}>
            {isTypeURL ? data.url : data.fileTitle}
          </ContentLink>
          <DeleteButton onClick = {setIsEditMode(true)}>수정</DeleteButton>
        </Container>
      )}
    </div>
  );
};

export default FileItem;

const FileOrURLName = styled.div`
    width: 120px;
    color: #000;
    font-family: Regular;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ContentLink = styled.div`
    cursor: pointer;
    color: #000;
    font-family: Regular;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
`;

const DeleteButton = styled.button`
  width:65px;
  margin-left: auto;
  background-color: #F5F5F5;
  color: #707070;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  opacity:0;
  transition: opacity 0.2s ease-in-out;
  position:absolute;
  right:20px;
  cursor: pointer;
`

const Container = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    position: relative;

    &:hover ${DeleteButton} {
        opacity: 1;
        cursor: pointer;
	}
`;

const EditContainer = styled.div`
	width: 820px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 45px;
	font-family: 'Regular';
`