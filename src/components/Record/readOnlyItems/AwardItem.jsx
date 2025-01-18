import React from 'react';
import styled from 'styled-components';

const AwardItem = ({ data, onEdit }) => {
  return (
    <Container>
      <TimeLine>
				<Oval></Oval>
			</TimeLine>
      <AwardInfo>
        <AwardName>{data.competitionName} / {data.awardName}</AwardName>
        <AwardDetails>
          {data.acquireDate} ・ {data.administer}
        </AwardDetails>
      </AwardInfo>
    </Container>
  );
};

export default AwardItem;

// Styled Components
const Container = styled.div`
  display: flex;
  width:100%;
  padding: 10px;
  font-family:Regular;
  &:hover button {
    visibility: visible;
  }
`;
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
	border-radius: 50%;
	border: 3px solid #707070;
	background-color: '#FFF';
`;

const AwardInfo = styled.div`
  flex: 1;
`;

const AwardName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const AwardDetails = styled.div`
  font-size: 16px;
  color: var(--gray-02, #333);
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