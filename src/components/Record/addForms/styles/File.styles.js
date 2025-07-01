import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import { BaseFormInput } from "@/components/Record/addForms/Form.styles";

const RealFirstContainer = styled.div`
    display:flex;
    align-items:center;
`
const FirstContainer = styled.div`
    height:195px;
    width:100%;
`

const TypeWrapper = styled.div`
  width: 224px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px 10px 0px 0px;
  background: ${Color.gray06};
  position: relative;
`

const Container = styled.div`
  width: 650px;
  padding: 20px;
  background: ${Color.gray06};
  border-radius: 0px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
      width: 278px;
      height: 135px;
      padding: 16px;
      gap: 12px;
  }
`;

const TypeToggle = styled.div`
  position: absolute;
  top: 10px;
  left: 30px;
  display: flex;
  gap: 10px;
`;

const TypeButton = styled.button`
height:25px;
  padding: 0px 20px;
  border-radius: 10px;
  border: 1px solid ${Color.gray02};
  background: ${({ active }) => (active ? Color.gray03 : Color.white)};
  color: ${({ active }) => (active ? Color.white : Color.black)};
  font-size: 14px;
  cursor: pointer;
  font-family: Regular;

  &:hover {
    opacity: 0.8;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media (max-width: ${theme.breakpoints.md}) {
      flex-direction: column;
      gap: 12px;
  }
`;

const Input = styled(BaseFormInput)`
  width: ${(props) => props.width || "100%"};
  padding-left: 10px;
  padding-right: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 238px;
    height: 17px;
    padding: 12px 20px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 0px;
  }
`;

const Button = styled.button`
  all: unset;
  width: 65px;
  height: 25px;
  border-radius: 10px;
  font-family: Regular;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    width: 93px;
    height: 17px;
    padding: 4px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`
const FileSelectButton = styled.button`
  width: 85px;
  height: 45px;
  position: absolute;
  top: 0;
  right: 15px;
  border: none;
  background: none;
  color: ${Color.gray02};
  font-family: 'Regular';
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

export {
    RealFirstContainer,
    FirstContainer,
    TypeWrapper,
    Container,
    TypeToggle,
    TypeButton,
    FormContent,
    Row,
    Input,
    ButtonRow,
    Button,
    InputWrapper,
    FileSelectButton
};  