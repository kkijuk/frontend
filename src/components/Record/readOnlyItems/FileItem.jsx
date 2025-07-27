import React, { useState, useEffect } from "react";
import {
  EditContainer,
  Container,
  FileOrURLName,
  ContentLink,
  EditButton,
} from "./styles/File.styles";
import { downS3File } from "../../../api/Record/s3File";
import AddFileForm from "../addForms/AddFileForm";
import { KebabMenu2 } from "../KebabMenu";

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
          <EditButton id="edit">
            <KebabMenu2 onModalOpen={() => setIsEditMode(true)} />
          </EditButton>
        </Container>
      )}
    </div>
  );
};

export default FileItem;

