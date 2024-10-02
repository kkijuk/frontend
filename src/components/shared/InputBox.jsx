//components/MyCareerDetail/DetailAdd
import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    border-radius: 10px;
    background: #F5F5F5;
    flex-shrink: 0;
    height: ${props => props.height || 'auto'};
    width: ${props => props.width || 'auto'};
    border: none; /* 테두리를 없앰 */
    font-family: Pretendard;
    font-size: 16px;
    color: var(--black, #000);

    padding: 15px 20px; /* 위아래 15px, 양옆 20px */
    box-sizing: border-box; /* padding을 포함한 요소의 전체 크기를 설정된 width와 height에 맞춤 */

    z-index: 1; /* z-index 추가 */
    position: relative; /* z-index가 적용되도록 position 속성 추가 */


`;

export default function InputBox({ height, width, placeholderText }) {
    return (
        <Input height={height} width={width} placeholder={placeholderText} />
    );
}