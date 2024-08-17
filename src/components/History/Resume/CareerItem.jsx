import React from 'react';
import styled from 'styled-components';

const CareerItem = ({ dummy, isLastItem }) => {

    return (
        <div style={{display:'flex'}}>
        <TimeLine>
                <Oval category={dummy.category}></Oval>
                <Line category={dummy.category} isLastItem={isLastItem}></Line>
            </TimeLine>
        <Container>
            <div>
                <LevelTag category={dummy.category}>{dummy.category}</LevelTag>
                <SchoolInfo>
                    <SchoolName>{dummy.title}</SchoolName>
                    <Dates>
                        {dummy.startDate} ~ {dummy.endDate} <Status>({dummy.period}개월)</Status>
                    </Dates>
                        <p><span style={{fontWeight:'600', marginRight:'30px'}}>활동내역</span>{dummy.task}</p>

                </SchoolInfo>
            </div>
        </Container>
        </div>

    );
};

export default CareerItem;

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
    background-color: ${props => props.category==="동아리" ? "#FCC400" 
                                : props.category==="아르바이트" ? "#FA7C79"
                                : props.category==="대외활동" ? "#77AFF2"
                                : props.category==="공모전" ? "#C48DEF"
                                : "#000000"};
`

const Line = styled.div`
    width:2px;
    height:166px;
    border-top: none;     
    border-right: none; 
    border-bottom: none;
    border-left:${props => props.isLastItem ? "none" : "2px solid black"};
    margin-left:10px; 
    border-color: ${props => props.category==="동아리" ? "#FCC400" 
                            : props.category==="아르바이트" ? "#FA7C79"
                            : props.category==="대외활동" ? "#77AFF2"
                            : props.category==="공모전" ? "#C48DEF"
                            : "#000000"};

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
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 45px;
  font-family:'Regular';
`;

const LevelTag = styled.div`
    height:22px;
    background-color: ${props => props.category==="동아리" ? "#FCC400" 
                                : props.category==="아르바이트" ? "#FA7C79"
                                : props.category==="대외활동" ? "#77AFF2"
                                : props.category==="공모전" ? "#C48DEF"
                                : "#000000"};
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    display: inline-block;
    line-height: 25px;
`;

const SchoolInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const SchoolName = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Department = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
`;

const Dates = styled.div`
    font-size: 16px;
    color: #666;
`;

const Status = styled.span`
    color: #999;
`;



