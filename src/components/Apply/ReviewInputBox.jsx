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

    ${(props) => props.disabled && `
        background: #e0e0e0; 
        color: #b0b0b0;
        cursor: not-allowed;
    `}
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
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

    ${(props) => props.disabled && `
        background: #e0e0e0; 
        color: #b0b0b0;
        cursor: not-allowed;
    `}
     @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	}
`;

export default function ReviewInputBox({ 
    height, 
    width, 
    placeholderText, 
    value, 
    onChange, 
    type = "text",
    disabled = false,  // 추가: 비활성화 여부 설정
}) {
    
    const maxLength = type === "textarea" ? 1000 : 30;

    // 글자수 초과 입력 방지
    const handleChange = (e) => {
        if (!disabled && e.target.value.length <= maxLength) {
            onChange(e);
        }
    };
    
    return type === "textarea" ? (
        <Textarea 
            height={height} 
            width={width} 
            placeholder={placeholderText} 
            value={value} 
            onChange={handleChange} 
            disabled={disabled} // 추가: 서류 후기 비활성화 적용
            readOnly={disabled} // 추가: 서류 제목 비활성화 적용
        />
    ) : (
        <Input 
            height={height} 
            width={width} 
            placeholder={placeholderText} 
            value={value} 
            onChange={handleChange} 
            disabled={disabled} // 추가: 서류 제목 비활성화 적용
            readOnly={disabled} // 추가: 서류 제목 비활성화 적용
        />
    );
}
