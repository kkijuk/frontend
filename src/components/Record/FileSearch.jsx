import React, { useRef, useState } from "react";
import { Container, FileNameField, Button } from "./subComponents.styles"; 

const FileSearch = ({onFileSelect}) => {
  const fileInputRef = useRef(null); // 숨겨진 파일 입력 필드 참조
  const [fileName, setFileName] = useState(""); // 선택한 파일 이름 상태

  // '찾기' 버튼 클릭 시 파일 입력 필드 트리거
  const handleButtonClick = () => {
    fileInputRef.current.click(); // 숨겨진 input 클릭
  };

  // 파일 선택 시 처리
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 선택한 첫 번째 파일
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // 파일 크기(MB)
      const fileExtension = file.name.split('.').pop().toLowerCase(); // 파일 확장자

      // if (fileExtension === 'pdf' && fileSizeMB <= 50) {
      if (fileSizeMB <= 20) {
        setFileName(file.name); // 파일 이름 설정
        onFileSelect(file); // 선택한 파일 전달
      } else {
        alert('20MB 이하의 파일만 수정할 수 있습니다.');
        fileInputRef.current.value = ""; // 파일 입력 필드 초기화
        setFileName(""); // 파일 이름 초기화
      }
    } else {
      setFileName(""); // 선택 취소 시 초기화
    }
  };

  return (
    <Container>
      {/* 숨겨진 파일 입력 필드 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* 선택된 파일 이름 표시 */}
      <FileNameField>
        {fileName ? (
            <p style={{color:'black'}}>{fileName}</p>
          ) : (
            <p style={{color:'#D9D9D9'}}>파일을 첨부해주세요.(pdf 파일, 50Mb 이하)</p>
        )}
        {/* 파일 탐색 버튼 */}
        <Button onClick={handleButtonClick}>파일 선택</Button>
      </FileNameField>
    </Container>
  );
};

export default FileSearch;


