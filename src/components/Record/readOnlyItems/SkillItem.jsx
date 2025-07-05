import React, { useState } from 'react';
import {
    EditButton,
    Container,
    EditContainer,
    SkillInfo,
    SkillName
} from './styles/Skill.styles';
import AddSkillForm from '../addForms/AddSkillForm';
import { KebabMenu2 } from '../KebabMenu';

const SkillItem = ({ data, isSecondColumn, onSave, onUpdate, onDelete }) => {
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
              onUpdate = {(FormData) => onUpdate(FormData)}
              onDelete={onDelete}
              onClose={()=>setIsEditMode(false)}
            />
          </EditContainer>
        </>
      )}
    </Container>
  );
};

export default SkillItem;


