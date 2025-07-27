import React, { useState }from 'react';
import { EditButton, Container, EditContainer, TimeLine, Oval, AwardInfo, AwardName, AwardDetails } from './styles/Award.styles'
import AddAwardForm from '../addForms/AddAwardForm';
import { KebabMenu2 } from '../KebabMenu';
import { formateDateDashToDot } from '@/utils/formateDate';

const AwardItem = ({ data, onSave, onUpdate, onDelete, onClose }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // console.log('AwardItem: ', data);

  return (
    <Container>
      {isEditMode ? (
        <EditContainer>
          <AddAwardForm
            mode="edit"
            initialData={data}
            onClose={() => setIsEditMode(false)}
            onUpdate = {(FormData) => onUpdate(FormData)}
            onDelete={onDelete}
          />
        </EditContainer>
        ):(
          <>
          <TimeLine>
            <Oval></Oval>
          </TimeLine>
          <AwardInfo>
            <AwardName>{data.competitionName} / {data.awardName}</AwardName>
            <AwardDetails>
              {formateDateDashToDot(data.acquireDate)} ・ {data.administer}
            </AwardDetails>
          </AwardInfo>
          <EditButton id="edit">
            <KebabMenu2 onModalOpen={()=>setIsEditMode(true)} />
					</EditButton>
          </>
        )}
    </Container>
  );
};

export default AwardItem;