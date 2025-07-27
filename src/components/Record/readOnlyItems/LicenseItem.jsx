import React, { useState } from 'react';
import {
  EditContainer,
  LicenseInfo,
  LicenseName,
  LicenseDetails,
  EditButton,
  Container
} from './styles/License.styles';
import AddLicenseForm from '../addForms/AddLicenseForm';
import { KebabMenu2 } from '../KebabMenu';
import { formateDateDashToDot } from '@/utils/formateDate';

const LicenseItem = ({ data, isSecondColumn, onSave, onUpdate, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Container>
      <>
        <LicenseInfo>
          <LicenseName>{data.licenseName}</LicenseName>
          <LicenseDetails>
            {formateDateDashToDot(data.acquireDate)} 
            {data.administer && data.administer !== '' ?  ` ・ ${data.administer}` : ''} 
            {data.licenseNumber && data.licenseNumber !== '' ? ` ・ ${data.licenseNumber}` : ''}
          </LicenseDetails>
        </LicenseInfo>
        <EditButton>
          <KebabMenu2 onModalOpen={()=>setIsEditMode(true)} />
        </EditButton>
      </>
      {isEditMode && (
        <>
          <div style={{height:'20px'}}/>
          <EditContainer isSecondColumn={isSecondColumn}>
            <AddLicenseForm
              mode = "edit"
              initialData = {data}
              onUpdate = {(FormData) => onUpdate(FormData)}
              onDelete = {onDelete}
              onClose={()=>setIsEditMode(false)}
            />
          </EditContainer>
        </>
      )}
    </Container>
  );
};

export default LicenseItem;

