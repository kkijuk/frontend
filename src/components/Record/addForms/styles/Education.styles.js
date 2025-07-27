import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color"; 
import { BaseFormInput } from "@/components/Record/addForms/Form.styles";  

const Container = styled.div`
  width: 610px;
  padding: 20px;
  background: ${Color.gray06};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  margin-bottom: 50px;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 278px;
    // height: 294px;
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
  width: ${(props) => (props.fullWidth ? "590px" : "435px")};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 238px;
  }
`;

const PeriodWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  height: 41px;
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
  cursor:pointer;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 96.5px;
    height: 17px;
    padding: 12px 16px;
  }
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  transform: translateY(10px);
  @media (max-width: ${theme.breakpoints.md}) {
   top: 32.5px;
   left: ${({ isGraduation }) => (isGraduation ? "-75px" : "0")};
  }
`;

const DatePickerContainer = styled.div`
	position: relative;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
    gap: 12px;
  }
`;

export {
    Container,
    Row,
    Input,
    PeriodWrapper,
    DatePickerInput,
    DatePickerWrapper,
    DatePickerContainer,
    ButtonRow
};