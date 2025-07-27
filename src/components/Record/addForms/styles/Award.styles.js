import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import { BaseFormInput } from "@/components/Record/addForms/Form.styles";

const Container = styled.div`
  width: 650px;
  height: 110px;
  padding: 20px;
  background: ${Color.gray06};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  margin-bottom: 50px;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 278px;
    height: 241px;
    padding: 16px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Input = styled(BaseFormInput)`
  width: ${(props) => props.width || "100%"};
  @media (max-width: ${theme.breakpoints.md}) {
    width: 238px;
    height: 17px;
    padding: 12px 20px;
  }
`;

const DatePickerInput = styled.input.attrs({ type: "text" })`
  height: 45px;
  width: 135px;
  border-radius: 10px;
  background: ${Color.white};
  text-align: center;
  font-family: Regular;
  font-size: 16px;
  font-weight: 400;
  color: black;
  border: ${(props) => (props.isActive ? `1px solid ${Color.gray02}` : "none")};
  cursor: pointer;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 238px;
    height: 17px;
    padding: 12px 20px;
  }
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  top:48px;
  z-index: 1000;
  @media (max-width: ${theme.breakpoints.md}) {
    top: 41px;    
  }
`;

const DatePickerContainer = styled.div`
	position: relative;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export {
  Container,
  Row,
  Input,
  DatePickerInput,
  DatePickerWrapper,
  DatePickerContainer,
  ButtonRow
};