import React from 'react';
import styled from 'styled-components';

const SkillItem = ({ data, onEdit }) => {
  return (
    <Container>
      <SkillInfo>
        <SkillName>{data.skillName} · {data.workmanship}</SkillName>
      </SkillInfo>
    </Container>
  );
};

export default SkillItem;

// Styled Components
const Container = styled.div`
  display: flex;
  width:100%;
  font-family:Regular;
  &:hover button {
    visibility: visible;
  }
`;

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
