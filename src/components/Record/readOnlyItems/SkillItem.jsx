import React, { useState } from 'react';
import styled from 'styled-components';
import AddSkillForm from '../addForms/AddSkillForm';
import { KebabMenu2 } from '../KebabMenu';

const SkillItem = ({ data, onEdit }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Container>
      <>
        <SkillInfo>
          <SkillName>{data.skillName} · {data.workmanship}</SkillName>
        </SkillInfo>
        <EditButton>
          <KebabMenu2 onModalOpen={()=>setIsEditMode(true)} />
        </EditButton>
      </>
      {isEditMode && (
        <>
          <div style={{height:'20px'}}/>
          <EditContainer isSecondColumn={isSecondColumn}>
            <AddSkillForm
              mode = "edit"
              initialData = {data}
            />
          </EditContainer>
        </>
      )}
    </Container>
  );
};

export default SkillItem;

// Styled Components
const EditButton = styled.button`
	border: none;
	position: absolute;
	right: 0;
	top:10px;
	background-color: transparent;
	opacity: 0;
	padding: 0px 50px 70px 0px;
  z-index: 1000;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  padding: 10px;
  font-family:Regular;
  margin-bottom: 20px;
  position: relative;
	&:hover ${EditButton} {
		opacity: 1;
		cursor: pointer;
	}
`;

const EditContainer = styled.div`
	width: 820px;
	display: flex;
	// justify-content: center;
	align-items: flex-start;
	// margin-bottom: 45px;
	font-family: 'Regular';
  margin-left: ${({ isSecondColumn }) => (isSecondColumn ? '-345px' : '0')};
`

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

// const EditButton = styled.button`
//   visibility: hidden;
//   background: var(--sub-bu, #77aff2);
//   color: var(--white, #FFF);
//   border: none;
//   border-radius: 10px;
//   padding: 5px 10px;
//   cursor: pointer;
//   transition: visibility 0.2s ease-in-out;
// `;
