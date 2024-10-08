import React, { useState } from "react";
import styled from "styled-components";

const Address = ({ status, data, isEdit, onSave }) => {
    const [curData, setData] = useState(data);

    const handleChange = (e) => {
        const { value } = e.target;
        setData(value);
    }

    return (
        <>
            {!status ? (
                <Container>
                    <p style={{ color: '#707070', fontFamily: 'Regular', fontSize: '14px', margin: 0 }}>{curData}</p>
                    <EditButton onClick={isEdit}>수정</EditButton>
                </Container>
            ) : (
                <Container>
                    <form style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Input
                            placeholder="주소를 입력하세요"
                            value={curData}
                            onChange={handleChange}
                        />
                        <SubmitButton onClick={() => onSave(curData)}>
                            확인
                        </SubmitButton>
                    </form>
                </Container>
            )}
        </>
    );
}
export default Address;

const EditButton = styled.button`
    width: 42px;
    margin-left:30px;
    background-color: #F5F5F5;
    color: #707070;
    border: none;
    border-radius: 12px;
    padding: 5px 7px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    font-family: 'Regular'; 
`;

const SubmitButton = styled.button`
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 12px;
    padding: 5px 7px;
    font-family: 'Regular';
    background: #3AAF85;
    color: #FFF;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Regular';
    position: relative;
    &:hover ${EditButton} {
        opacity: 1;
        cursor: pointer;
    }
`;

const Input = styled.input`
    width: 284px;
    height: 30px; /* 높이를 맞추기 위해 수정 */
    border-radius: 7px;
    background: var(--gray-05, #F1F1F1);
    border: none;
    padding: 0 10px;

`;
