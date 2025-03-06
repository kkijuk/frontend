import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    border-radius: 10px;
    background: #f5f5f5;
    height: ${(props) => props.height || '50px'};
    width: ${(props) => props.width || '100%'};
    border: none;
    font-family: Pretendard;
    font-size: 16px;
    color: var(--black, #000);
    padding: 15px 20px;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
    resize: none; /* 크기 조절 방지 */
    overflow: hidden; /* 스크롤 없애기 */

    ::placeholder {
        color: #707070;
        opacity: 1;
    }
`;

const Textarea = styled.textarea`
    border-radius: 10px;
    background: #f5f5f5;
    height: ${(props) => props.height || '100px'};
    width: ${(props) => props.width || '100%'};
    border: none;
    font-family: Pretendard;
    font-size: 16px;
    color: var(--black, #000);
    padding: 15px 20px;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
    resize: none; /* 크기 조절 방지 */
    overflow-y: auto; /* 스크롤 유지 */
    line-height: 1.5;
    vertical-align: top;
    word-wrap: break-word;
    white-space: pre-wrap;

    ::placeholder {
        color: #707070;
        opacity: 1;
    }
`;

// `type` prop을 추가하여 전형 입력칸은 `input`, 전형 후기는 `textarea`로 자동 설정
export default function ReviewInputBox({ height, width, placeholderText, value, onChange, type = "text" }) {
    
    const maxLength = type === "textarea" ? 1000 : 30;

    // 글자수 초과 입력 방지
    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            onChange(e);
        }
    };
    
    
    return type === "textarea" ? (
        <Textarea 
            height={height} 
            width={width} 
            placeholder={placeholderText} 
            value={value} 
            onChange={onChange} 
        />
    ) : (
        <Input 
            height={height} 
            width={width} 
            placeholder={placeholderText} 
            value={value} 
            onChange={onChange} 
        />
    );
}