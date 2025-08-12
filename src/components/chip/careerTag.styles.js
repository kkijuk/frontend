import styled from 'styled-components';
import { theme } from '@/constants/theme';
import { Color } from '@/constants/color';

// 공통 속성만, 나머지 속성(hover 등) 상속해서 사용
// props: surface, isSelected
const TagContainer = styled.div`
    height: 22px;
    display: flex;
    align-items: center;

    background-color: ${({$surface = 'white', isSelected}) => 
        $surface === 'gray'
        ? Color.white
        : (isSelected ? Color.white : Color.gray06)};
    
    border-radius: 10px;
    border: ${({isSelected}) => (isSelected ? `1px solid ${Color.main01}` : 'none')};

    font-size: 12px;
    font-family: 'Regular';
    color: ${Color.main01};

    cursor: pointer;
    transition: all 0.3s ease;

    svg {
        opacity: 0;
        width: 0px;
        transition: all 0.3s ease;
        pointer-events: none; // 마우스 이벤트 차단
    }

    &:hover svg {
        opacity: 1;
        pointer-events: auto;
    }
`;

export { 
    TagContainer, 
}
