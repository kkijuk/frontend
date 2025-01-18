import React from 'react';
import styled from 'styled-components';

const LicenseItem = ({ data, onEdit }) => {
  return (
    <Container>
      <LicenseInfo>
        <LicenseName>{data.licenseName}</LicenseName>
        <LicenseDetails>
          {data.acquireDate} ・ {data.administer} ・ {data.licenseNumber}
        </LicenseDetails>
      </LicenseInfo>
    </Container>
  );
};

export default LicenseItem;

// Styled Components
const Container = styled.div`
  display: flex;
  width:100%;
  &:hover button {
    visibility: visible;
  }
`;

const LicenseInfo = styled.div`
  flex: 1;
`;

const LicenseName = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: 'Regular';
`;

const LicenseDetails = styled.div`
  font-size: 16px;
  color: var(--gray-02, #333);
  font-family: 'Regular';
  margin-top: 5px;
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
