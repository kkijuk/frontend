import React from 'react';
import styled from 'styled-components';

const Input = styled.textarea`
    border-radius: 10px;
    background: #f5f5f5;
    flex-shrink: 0;
    height: ${(props) => props.height || 'auto'};
    width: ${(props) => props.width || 'auto'};
    border: none;
    font-family: Pretendard;
    font-size: 16px;
    color: var(--black, #000);
    padding: 15px 20px;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
    resize: none; /* 사용자가 크기 조절 못 하게 함 */
    line-height: 1.5; /* 줄 간격 조정 */
    vertical-align: top; /* 커서를 첫 번째 줄로 위치 */
    white-space: normal; /* 줄바꿈 허용 */
    word-wrap: break-word; /* 단어가 박스를 넘어가면 자동 줄바꿈 */
    overflow-y: auto; /* 내용이 많아지면 스크롤 표시 */

    ::placeholder {
        color: #707070;
        opacity: 1;
    }

    ${(props) => props.disabled && 'cursor: not-allowed; background: #e0e0e0;'}
`;


export default function InputBox({ height, width, value, onChange, disabled = false, placeholder }) {
	return <Input height={height} width={width} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} />;
}
