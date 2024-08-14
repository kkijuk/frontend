import React from 'react';
import styled from 'styled-components';

const EducationItem = ({ dummy, onEdit }) => {
    return (
        <Container>
            <LevelTag>{dummy.level}</LevelTag>
            <SchoolInfo>
                <SchoolName>{dummy.schoolName}</SchoolName>
                {dummy.department && <Department>{dummy.department}</Department>}
                <Dates>
                    {dummy.startDate} ~ {dummy.endDate} <Status>({dummy.status})</Status>
                </Dates>
            </SchoolInfo>
            <EditButton onClick={onEdit}>수정</EditButton>
        </Container>
    );
};

export default EducationItem;

// Styled Components

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const LevelTag = styled.div`
  background-color: #4EC495;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const SchoolInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SchoolName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Department = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
`;

const Dates = styled.div`
  font-size: 14px;
  color: #666;
`;

const Status = styled.span`
  color: #999;
`;

const EditButton = styled.button`
  margin-left: auto;
  background-color: #77AFF2;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
