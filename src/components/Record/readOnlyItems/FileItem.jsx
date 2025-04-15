import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { downS3File } from "../../../api/Record/s3File";
import AddFileForm from "../addForms/AddFileForm";
import { theme } from "../../../constants/theme";

const FileItem = ({ id, data, onSave, onUpdate, onDelete }) => {

  const [isTypeURL, setIsTypeUrl] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (data) {
      setIsTypeUrl(data.fileType === "URL");
      // console.log("File Data:", data);
    }
  }, [data]);

  const handleDownload = async () => {
    try{
      
      const response = await downS3File(data);
      const presignedURL = response;
      window.open(presignedURL, '_blank');

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
            onUpdate = {(newData) => onUpdate(data, newData)} // oldData, newData 전달
            onDelete={(FormData)=>onDelete(FormData)}
          />
        </EditContainer>
      ):(
        <Container>
          <FileOrURLName>
            {isTypeURL ? data.urlTitle : data.fileTitle}
          </FileOrURLName>
          <ContentLink onClick={handleContentLinkClick}>
            {isTypeURL ? data.url : data.fileLinkTitle}
          </ContentLink>
          <DeleteButton onClick = {()=>setIsEditMode(true)}>수정</DeleteButton>
        </Container>
      )}
    </div>
  );
};

export default FileItem;

const FileOrURLName = styled.div`
    // width: 120px;
    color: #000;
    font-family: Regular;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60%;
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
    padding: 10px;

    &:hover ${DeleteButton} {
        opacity: 1;
        cursor: pointer;
	  }
    @media (max-width: ${theme.breakpoints.md}){
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
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