import styled from 'styled-components';
import { theme } from '../../../constants/theme';
import { Color } from '../../../constants/color';

export const BaseFormInput = styled.input`
    height: 45px;
    padding-left: 10px;
    padding-right: 10px;

    border-radius: 10px;
    border: none;
    background: ${Color.background};

    text-align: left;
    font-family: Regular;
    font-size: 16px;
    font-weight: 400;
    color: ${Color.black};

    &::placeholder {
        color: ${Color.gray03};
    }

    @media (max-width: ${theme.breakpoints.md}) {
	    width: ${(props) => props.mdWidth || "238px"};
	    height: 17px;
	    padding: 12px 20px;
    }
`
export const BaseFormButton = styled.button`
    all: unset;

    width: 65px;
    height: 25px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    font-family: Regular;
    font-size: 14px;
    font-weight: 400;

    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }

    background: ${({variant}) => {
        if (variant === 'save' || variant === 'create') return Color.main01;
        if (variant === 'close'|| variant === 'delete') return Color.white;
        return Color.white;
    }}

    border: ${({variant}) => {
        if (variant === 'save' || variant === 'create') return Color.main01;
        if (variant === 'delete') return Color.subRd;
        if (variant === 'close') return Color.subBu;
        return Color.white;
    }}

    color: ${({variant}) => {
        if (variant === 'save' || variant === 'create') return Color.white;
        if (variant === 'delete') return Color.subRd;
        if (variant === 'close') return Color.subBu;
        return Color.black;
    }}

    @media (max-width: ${theme.breakpoints.md}) {
        width: 93px;
        height: 17px;
        padding: 4px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;


