import React, {useState} from "react";
import styled from "styled-components";

const EmailAndAddress = ({type, data, onSave}) => {
    const [address, setAddress] = useState(data);
    const [isEditingMode, setIsEditingMode] = useState(false);

    return (
        <>
        {/* 주소가 NULL 인 경우 */}
        {(!data || data === "string")&& !isEditingMode && (
            <NullModeAddress onClick={()=>setIsEditingMode(true)}>
                {type === "address" ? "주소를 입력하세요" : "이메일을 입력하세요"}
            </NullModeAddress>
        )}

        {/* 주소가 NULL이 아닌데 편집 모드가 아닐 때 */}
        {data && !isEditingMode && (
            <HoverWrapper>
                <span>{address}</span>
                <EditButton onClick={()=>setIsEditingMode(true)}>수정</EditButton>
            </HoverWrapper>
        )}

        {/* 편집 모드일 때 */}
        {isEditingMode && (
            <EditAddressContainer>
                <AddressInput
                    type="text"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    placeholder={type === "address" ? "주소를 입력하세요" : "이메일을 입력하세요"}
                />
                <ButtonGroup>
                    <SaveButton onClick={()=>onSave(type, address)}>수정</SaveButton>
                    <CancelButton onClick={()=>setIsEditingMode(false)}>취소</CancelButton>
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
`;

const EditAddressContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const AddressInput = styled.input`
  font-size: 14px;
  color:#707070;
  width: 200px;
  border:none;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
	width: 42px;
	height: 19px;
	border-radius: 7px;
	color: var(--gray-02, #707070);
	font-size: 12px;
	background: var(--gray-06, #F5F5F5);
	cursor: pointer;
	border:none;
	display:flex;
	justify-content:center;
`;

const CancelButton = styled.button`
	width: 42px;
	height: 19px;
	border-radius: 7px;
	color: var(--gray-02, #F5F5F5);
	font-size: 12px;
	background: var(--gray-06, #707070);
	cursor: pointer;
		border:none;
	display:flex;
	justify-content:center;
`;