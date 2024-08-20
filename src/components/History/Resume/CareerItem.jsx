import React from 'react';
import styled from 'styled-components';

const CareerItem = ({ dummy, isLastItem, onEdit }) => {

    const today = new Date();
    const formattedToday = today.toISOString().slice(0,7).replace('-','.');
    const isPastDue = dummy.endDate < formattedToday; //true: 기한 경과, false: 기한 내

    return (
        <div style={{display:'flex'}}>
        <TimeLine>
                <Oval category={dummy.alias} isPastDue = {isPastDue}></Oval>
                <Line category={dummy.alias} isLastItem={isLastItem} isPastDue = {isPastDue}></Line>
            </TimeLine>
        <Container>
            <div>
                <LevelTag category={dummy.alias}>{dummy.alias}</LevelTag>
                <SchoolInfo>
                    <SchoolName>{dummy.careerName}</SchoolName>
                    <Dates>
                        {dummy.startDate} ~ {dummy.endDate} <Status>({dummy.period}개월)</Status>
                    </Dates>
                        <p><span style={{fontWeight:'600', marginRight:'30px'}}>활동내역</span>{dummy.summay}</p>

                </SchoolInfo>
            </div>
            <EditButton id='edit' onClick={onEdit}>수정</EditButton>
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
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  border-radius:50%;
    background-color: ${props => 
                        !props.isPastDue
                        ?'#FFFFFF'
                        :props.category==="동아리" ? "#FCC400" 
                        : props.category==="아르바이트" ? "#FA7C79"
                        : props.category==="대외활동" ? "#77AFF2"
                        : props.category==="공모전" ? "#C48DEF"
                        : "#000000"};
    border: ${props=>props.category==="동아리" ? "3px solid #FCC400" 
        : props.category==="아르바이트" ? "3px solid #FA7C79"
        : props.category==="대외활동" ? "3px solid #77AFF2"
        : props.category==="공모전" ? "3px solid #C48DEF"
        : "#000000"};
    }
`

const Line = styled.div`
    width:2px;
    height:166px;
    border-top: none;     
    border-right: none; 
    border-bottom: none;
    margin-left:11px; 
    border-left:${props=>props.isLastItem ? 'none'
            : props.category==="아르바이트" && props.isPastDue ? "2px solid #FA7C79"
            : props.category==="동아리" && props.isPastDue ? "2px solid ##FCC400"
            : props.category==="대외활동" && props.isPastDue ? "2px solid #77AFF2"
            : props.category==="공모전" && props.isPastDue ? "2px solid #C48DEF"
            : props.category==="아르바이트" && !props.isPastDue ? "2px dashed #FA7C79"
            : props.category==="동아리" && !props.isPastDue ? "2px dashed #FCC400"
            : props.category==="대외활동" && !props.isPastDue ? "2px dashed #77AFF2"
            : props.category==="공모전" && !props.isPastDue ? "2px dashed #C48DEF"
            : "#000000"};
`

const EditButton = styled.button`
  width:65px;
  margin-left: auto;
  background-color: #F5F5F5;
  color: #707070;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  opacity:0;
  transition: opacity 0.2s ease-in-out;
  position:absolute;
  right:20px;
`;

const Container = styled.div`
  width:820px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 45px;
  font-family:'Regular';
    &:hover ${EditButton} {
    opacity:1;
    cursor:pointer;
    positon:relative;
}
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



