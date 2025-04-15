import React, {useState} from "react";
import styled from "styled-components";
import { theme } from "../../constants/theme";

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

const NullModeAddress = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: #999;
`;

const HoverWrapper = styled.div`
  display: inline-block;
  position: relative;
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: flex-start;
  }
`;

const EditButton = styled.button`
	width: 40px;
	height: 19px;
	border-radius: 7px;
	color: var(--gray-02, #707070);
	font-size: 12px;
	background: var(--gray-06, #F5F5F5);
	cursor: pointer;
	border:none;
	margin-left: 20px;
	justify-content:center;
  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 0px;
  }
`;

const EditAddressContainer = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column; /* 두 줄로 배치 */
  }
`;

const AddressInput = styled.input`
  width: 200px;
  padding: 4px 8px;
  border:none;
  border-radius: 7px;
  color:#000000;  
  font-size: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: #F5F5F5;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 250px; 
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row-reverse; 
    justify-content: flex-end; 
  }
`;

const SaveButton = styled.button`
	width: 45px;
	height: 20px;
	border-radius: 7px;
	color: var(--gray-02, #FFF);
	font-size: 12px;
  font-weight: 400;
  font-family: 'Regular';
  line-height: normal;
	background: var(--gray-06, #3AAF85);
	cursor: pointer;
	border:none;
	display:flex;
	justify-content:center;
  align-items:center;
`;

const CancelButton = styled.button`
	width: 45px;
	height: 20px;
	border-radius: 7px;
	color: var(--gray-02, #707070);
	font-size: 12px;
  font-weight: 400;
  font-family: 'Regular';
  line-height: normal;
	background: var(--gray-06, #FFF);
	cursor: pointer;
	border: 1px solid var(--gray-02, #707070);
	display:flex;
	justify-content:center;
  align-items:center;
`;