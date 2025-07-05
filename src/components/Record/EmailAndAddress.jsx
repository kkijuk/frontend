import React, {useState} from "react";
import {
    NullModeAddress,
    HoverWrapper,
    EditButton,
    EditAddressContainer,
    AddressInput,
    ButtonGroup,
    SaveButton,
    CancelButton
} from './Components.styles';

const EmailAndAddress = ({type, userData, onSave}) => {
    const [data, setData] = useState(userData);
    const [isEditingMode, setIsEditingMode] = useState(false);

    return (
      <>
      {/* 주소가 NULL 인 경우 */}
      {(!data || data === "string") && !isEditingMode && (
        <NullModeAddress onClick={() => setIsEditingMode(true)}>
          {type === "address" ? "주소를 입력하세요" : "이메일을 입력하세요"}
        </NullModeAddress>
      )}

      {/* 주소가 NULL이 아닌데 편집 모드가 아닐 때 */}
      {data && data !== "string" && !isEditingMode && (
        <HoverWrapper>
          <span>{data}</span>
          <EditButton onClick={() => setIsEditingMode(true)}>수정</EditButton>
        </HoverWrapper>
      )}

      {/* 편집 모드일 때 */}
      {isEditingMode && (
        <EditAddressContainer>
          <AddressInput
            type="text"
            value={data === "string" ? "" : data}
            onChange={(e) => setData(e.target.value)}
            placeholder={type === "address" ? "주소를 입력하세요" : "이메일을 입력하세요"}
          />
          <ButtonGroup>
            <SaveButton onClick={() => {onSave({type, data}); setIsEditingMode(false)}}>확인</SaveButton>
            <CancelButton onClick={() => setIsEditingMode(false)}>취소</CancelButton>
          </ButtonGroup>
        </EditAddressContainer>
      )}
      </>
    )
};

export default EmailAndAddress;

