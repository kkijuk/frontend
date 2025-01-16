import React from "react";
import styled from "styled-components";

const CustomDropdown = ({ options, placeholder, value, onChange, isOpen, onToggle, width = "135px" }) => {
  const handleOptionClick = (option) => {
    onChange(option);
    onToggle(); // 드롭다운 닫기
  };

  return (
    <DropdownContainer width={width}>
      <DropdownHeader onClick={onToggle} isActive={isOpen}>
        <Text>{value || placeholder}</Text>
        <Arrow isOpen={isOpen} />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default CustomDropdown;

// Styled Components
const DropdownContainer = styled.div`
  position: relative;
  width: ${(props) => props.width};
  font-family: Regular;
`;

const DropdownHeader = styled.div`
  height: 45px;
  border-radius: 10px;
  border: ${(props) => (props.isActive ? "1px solid var(--gray-02, #707070)" : "none")};
  background: var(--white, #fff);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.children === "학력구분" || props.children === "학력상태" ? "#d9d9d9" : "black")};
  cursor: pointer;
`;

const Text = styled.span`
  flex: 1;
  text-align: center;
`;

const Arrow = styled.div`
  width: 5px;
  height: 5px;
  border: solid #d9d9d9;
  border-width: 0 2px 2px 0;
  transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(135deg)")};
  transition: transform 0.2s;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 50px;
  width: 100%;
  border: 1px solid var(--gray-02, #707070);
  border-radius: 10px;
  background: var(--white, #fff);
  list-style: none;
  padding: 10px 0;
  margin: 0;
  z-index:1000;
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  color: black;
  background: white;

  &:hover {
    background: var(--gray-06, #f5f5f5);
  }

  & + & {
    margin-top: 15px;
  }
`;
