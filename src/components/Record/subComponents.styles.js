import styled from 'styled-components';
import { theme } from '@/constants/theme';
import { Color } from '@/constants/color';

// FileSearch, KebabMenu

//FileSearch
const Container = styled.div`
    width: 444px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    @media (max-width: ${theme.breakpoints.md}) {
        width: auto;
    }
`

const FileNameField = styled.div`
    box-sizing: border-box;
    width: 450px;
    height: 45px;
    flex-shrink: 0;
    padding: 10px 20px;
    border:none;
    border-radius: 10px;
    background: ${Color.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    p:{
        font-size: 16px;
        font-family: 'Regular';
        font-weight: 400;
        margin:0;
    }

    @media (max-width: ${theme.breakpoints.md}) {
        width: ${(props) => props.mdWidth || "238px"};
        height: 17px;
        padding: 12px 20px;
    }
`;

const Button = styled.button`
  width: 85px;
  height: 45px;
  position: absolute;
  right: 20px;
  border: none;
  background: none;
  color: ${Color.gray02};
  font-family:'Regular';
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`

export { Container, FileNameField, Button };

// KebabMenu
const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
        
`

const DropDown = styled.div`
    box-sizing: border-box;
    width: 181px;
    height: ${(props) => (props.isKebabHaveTwoOption ? '102px' : '34px')};
    padding: ${(props) => (props.isKebabHaveTwoOption ? '12px' : '0')};
    background: ${Color.white};
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    position: absolute;
    top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    @media (max-width: ${theme.breakpoints.md}) {
        right: 0px;
    }
`
const MenuItem = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 4px 20px;
    font-size: 14px;
    font-family: 'Regular';
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: normal;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
        background: ${Color.gray06};
    }
`

export { IconButton, DropDown, MenuItem };