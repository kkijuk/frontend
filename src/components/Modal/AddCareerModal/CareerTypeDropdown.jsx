import React, { useState } from 'react';
import styled from 'styled-components';

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

const DropdownContainer = styled.div`
	width: 100%;
`;

const Select = styled.select`
	width: 100%;
	padding: 10px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 10px;
	background-color: #f5f5f5;
	color: #707070;
	cursor: pointer;

	&:focus {
		outline: none;
		border-color: #3aaf85;
	}

	option {
		color: #000;
	}
`;

const Option = styled.option`
	background-color: #fff;
	color: #707070;

	&[value=''] {
		color: #a9a9a9; /* placeholder 색상 */
	}
`;
