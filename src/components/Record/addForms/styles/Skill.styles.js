import styled from "styled-components";
import { theme } from "@/constants/theme";
import { Color } from "@/constants/color";
import { BaseFormInput } from "@/components/Record/addForms/Form.styles";

const Container = styled.div`
  width: 650px;
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
    height: 188px;
    padding: 16px;
    gap: 12px;
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
  width: 430px;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 238px;
  }
`;

const ButtonRow = styled.div`
  width: 65%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 0px;
    width: 100%;
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
  @media (max-width: ${theme.breakpoints.md}) {
    width: 93px;
    height: 17px;
    padding: 4px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const GuideBoxContainer = styled.div`
  position: absolute;
  top: -30px;
  left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const GuideBox = styled.div`
  width: 300px;
  height: 250px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${Color.gray02};
  color: white;
  font-family: Regular;
  font-size: 14px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  p{
  font-size: 11px;
  font-family: Regular;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export {
    Container,
    Row,
    Input,
    ButtonRow,
    Button,
    IconWrapper,
    GuideBoxContainer,
    GuideBox
};