import React, { useRef, useState } from "react";
import styled from "styled-components";

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

      if (fileExtension === 'pdf' && fileSizeMB <= 50) {
        setFileName(file.name); // 파일 이름 설정
        onFileSelect(file); // 선택한 파일 전달
      } else {
        alert('pdf 파일만 첨부할 수 있으며, 파일 크기는 50MB 이하이어야 합니다.');
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

const Container = styled.div`
  width: 444px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const FileNameField = styled.div`
  width: 410px;
  height: 25px;
  flex-shrink: 0;
  padding: 10px 20px;
  border:none;
  border-radius: 10px;
  background: var(--white, #FFF);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  p:{
    font-size: 16px;
    font-family: 'Regular';
    font-weight: 400;
    margin:0;
  }
`;

const Button = styled.button`
  width: 85px;
  height: 45px;
  position: absolute;
  right: 20px;
  border: none;
  background: none;
  color: #707070;
  font-family:'Regular';
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`
