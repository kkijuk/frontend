import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../constants/theme';
import { Color } from '@/constants/color'; // Assuming you have a color constants file

const CareerTypeDropdown = ({ onchange }) => {
	const [selectedCareerType, setSelectedCareerType] = useState('');

	const handleSelect = (event) => {
		const value = event.target.value;
		setSelectedCareerType(value);
		onchange(value);
	};

	return (
		<DropdownContainer>
			<Select value={selectedCareerType} onChange={handleSelect}>
				<Option value="" defaultValue hidden>
					경력 구분을 선택해주세요
				</Option>
				<Option value="아르바이트">아르바이트</Option>
				<Option value="인턴">인턴</Option>
				<Option value="정규직">정규직</Option>
				<Option value="계약직">계약직</Option>
				<Option value="프리랜서">프리랜서</Option>
			</Select>
		</DropdownContainer>
	);
};

export default CareerTypeDropdown;

const CareerTypeDropdown2 = ({ options, placeholder, value, onChange, isOpen, onToggle, width="260px" }) => {
	const handleOptionClick = (option) =>{
		onChange(optionMapping[option]);
		onToggle();
	}

  const optionMapping = {
    "아르바이트" : "PART_TIME",
    "인턴" : "INTERNSHIP",
    "정규직" : "FULL_TIME",
    "계약직" : "CONTRACT",
    "프리랜서" : "FREELANCE"
  }

  const optionReverseMapping = {
    "PART_TIME" : "아르바이트",
    "INTERNSHIP" : "인턴",
    "FULL_TIME" : "정규직",
    "CONTRACT" : "계약직",
    "FREELANCE" : "프리랜서"
  }

	return(
		<DropdownContainer width={width}>
			<DropdownHeader onClick={onToggle} isActive={isOpen} isPlaceholder={!value}>
				<Text>{optionReverseMapping[value] || placeholder}</Text>
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
	)
}

export {CareerTypeDropdown2};

// const DropdownContainer = styled.div`
// 	width: 100%;
// 	height:50px;
// `;

const Select = styled.select`
  height: 45px;
  border-radius: 10px;
  border: ${(props) =>
    props.className === "경력 구분을 선택해주세요"
      ? `1px solid ${Color.gray02}`
      : "none"};
  background: ${(props) =>
    props.className === "경력 구분을 선택해주세요" ? Color.white : Color.gray06};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.className === "placeholder" ? Color.gray04 : Color.black)};
  cursor: pointer;
`;

const Option = styled.option`
	background-color: ${Color};
	color: ${Color.gray02};
	font-family:'Regular';

	&[value=''] {
		color: ${Color.gray02}; /* placeholder 색상 */
	}
`;

// Styled Components
const DropdownContainer = styled.div`
  position: relative;
  width: ${(props) => props.width};
  font-family: Regular;
`;

const DropdownHeader = styled.div`
  height: 45px;
  border-radius: 10px;
  border: 1px solid ${Color.gray02};
  background: ${Color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.isPlaceholder ? Color.gray04 : Color.black)};
  cursor: pointer;
`;

const Text = styled.span`
  flex: 1;
  text-align: center;
`;

const Arrow = styled.div`
  width: 5px;
  height: 5px;
  border: solid ${Color.gray04};
  border-width: 0 2px 2px 0;
  transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(135deg)")};
  transition: transform 0.2s;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 50px;
  width: 100%;
  border: 1px solid ${Color.gray02};
  border-radius: 10px;
  background: ${Color.white};
  list-style: none;
  padding: 10px 0;
  margin: 0;
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 16px;
  font-family:'Regular';
  text-align: center;
  cursor: pointer;
  color: black;
  background: ${Color.white};

  &:hover {
    background: ${Color.gray06};
  }

  & + & {
    margin-top: 15px;
  }
`;