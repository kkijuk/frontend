import React, { useState } from 'react';
import styled from 'styled-components';
import '../../pages/History/history.css';

// api에서 받는 구분(state)으로 만료 여부도 표현
const Edu = ({ isLevel, onChange, value }) => {
	const [dropdownOpend, setDropdownOpend] = useState(false);
	const category = ['고등학교', '전문대학교', '대학교', '대학원(석사)', '대학원(박사)'];
	const state = ['재학', '휴학', '졸업예정', '졸업', '중퇴', '편입'];
	const [education, setEducation] = useState(isLevel === '학력구분' ? category : state);
	const [selectedItem, setSelectedItem] = useState(isLevel === '학력구분' ? '학력구분' : '학력상태');

	const handleToggleClick = () => {
		setDropdownOpend(!dropdownOpend);
	};

	const handleItemClick = (item) => {
		setSelectedItem(item);
		setDropdownOpend(false);
		if (onChange) {
			onChange(item); //item을 부모 컴포넌트로 전달
		}
	};

	return (
		<>
			<EditContainer>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '135px' }}>
					<DropdownBox onClick={handleToggleClick} value={value}>
						{value ? value : selectedItem}
					</DropdownBox>
					{dropdownOpend && (
						<Dropdown>
							{education.map((edu) => (
								<DropdownItem key={edu} onClick={() => handleItemClick(edu)}>
									{edu}
								</DropdownItem>
							))}
						</Dropdown>
					)}
				</div>
			</EditContainer>
		</>
	);
};
export default Edu;

// 여기부터는 수정 박스
const EditContainer = styled.div`
	width: 135px;
	height: 215px;
	position: relative; /* position 추가 */
`;

const DropdownBox = styled.div`
	width: 135px;
	height: 45px;
	border-radius: 10px;
	border: none;
	background: var(--white, #fff);
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => (props.value ? 'black' : '#D9D9D9')};
	// color:#D9D9D9;
	cursor: pointer;
`;

const Dropdown = styled.div`
	width: 135px;
	flex-shrink: 0;
	border-radius: 13px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: #fff;
	position: absolute; /* position 추가 */
	top: 45px;
	z-index: 1000; /* z-index 추가 */
`;

const DropdownItem = styled.p`
	text-align: center;
	font-family: Regular;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;
	margin-bottom: 15px;
`;
