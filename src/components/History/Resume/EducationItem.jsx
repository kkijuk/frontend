import React from 'react';
import styled from 'styled-components';

const EducationItem = ({ dummy, onEdit, isLastItem }) => {

    return (
      <div style={{display:'flex'}}>
        <TimeLine>
            <Oval></Oval>
            <Line isLastItem={isLastItem}></Line>
        </TimeLine>
        <Container>
            <div>
              <LevelTag>{dummy.level}</LevelTag>
              <SchoolInfo>
                  <SchoolName>{dummy.schoolName}</SchoolName>
                  {dummy.department && <Department>{dummy.department}</Department>}
                  <Dates>
                      {dummy.startDate} ~ {dummy.endDate} <Status>({dummy.status})</Status>
                  </Dates>
              </SchoolInfo>
            </div>
            <EditButton id='edit' onClick={onEdit}>수정</EditButton>
        </Container>
      </div>
        
    );
};

export default EducationItem;

// Styled Components


const TimeLine = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    margin: 0px 70px 0px 30px;
`;

const Oval = styled.div`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius:50%;
  background-color: #3AAF85;
`

const Line = styled.div`
    width:2px;
    height:166px;
    border-top: none;     
    border-right: none; 
    border-bottom: none;
    border-left:${props => props.isLastItem ? "none" : "2px solid black"};
    margin-left:10px; 
    border-color: #3AAF85;

`

const EditButton = styled.button`
  width:65px;q
  margin-left: auto;
  background-color: #F5F5F5;
  color: #707070;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  opacity:0;
  transition: opacity 0.5 ease-in-out;
  position:absolute;
  right:20px;
`;

const Container = styled.div`
  width:820px;
    display: flex;
    align-items: flex-start;
    margin-bottom: 45px;

    &:hover ${EditButton} {
      opacity:1;
      cursor:pointer;
    }
  font-family:'Regular';
  positon:relative;

`;

const LevelTag = styled.div`
    background-color: #4EC495;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    display: inline-block;
    line-height: 25px;
`

const SchoolInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SchoolName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Department = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 6px;
`;

const Dates = styled.div`
  font-size: 16px;
`;

const Status = styled.span`
`;



