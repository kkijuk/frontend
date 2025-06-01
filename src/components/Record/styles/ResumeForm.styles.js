import styled from 'styled-components';
import { theme } from '../../../constants/theme';
import { Color } from '../../../constants/color';

export const BaseFormInput = styled.input`
    height: 45px;
    padding-left: 10px;
    padding-right: 10px;

    border-radius: 10px;
    border: none;
    background: ${Color.white};

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
export const BaseFormButton = styled.button.attrs(props => ({
  'data-variant': props.variantType
}))`
  all: unset;

  width: 65px;
  height: 25px;
  flex-shrink: 0;
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

  background: ${({ 'data-variant': variant }) => {
    if (variant === 'save' || variant === 'create') return `${Color.main01}`;
    if (variant === 'close' || variant === 'delete') return `${Color.white}`;
    return `${Color.white}`;
  }};

  border: ${({ 'data-variant': variant }) => {
    if (variant === 'save' || variant === 'create') return `1px solid ${Color.main01}`;
    if (variant === 'delete') return `1px solid ${Color.subRd}`;
    if (variant === 'close') return `1px solid ${Color.gray04}`;
    return `1px solid ${Color.white}`;
  }};

  color: ${({ 'data-variant': variant }) => {
    if (variant === 'save' || variant === 'create') return `${Color.white}`;
    if (variant === 'delete') return `${Color.subRd}`;
    if (variant === 'close') return `${Color.gray02}`;
    return `${Color.black}`;
  }};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 93px;
    height: 17px;
    padding: 4px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;



