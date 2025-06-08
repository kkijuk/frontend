import React, { useState }from 'react';
import styled from 'styled-components';
import AddAwardForm from '../addForms/AddAwardForm';
import { KebabMenu2 } from '../KebabMenu';
import { theme } from '../../../constants/theme';
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

// Styled Components
const EditButton = styled.button`
	border: none;
	position: absolute;
	right: 0;
	// top:10px;
	background-color: transparent;
	opacity: 0;
	padding: 0px 50px 70px 0px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  width:100%;
  padding: 10px;
  font-family:Regular;
  margin-bottom: 20px;
	&:hover ${EditButton} {
		opacity: 1;
		cursor: pointer;
	}
`;

const TimeLine = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0px 70px 0px 30px;
  @media (max-width: ${theme.breakpoints.md}) {
		margin: 0px 24px 0px 20px;
	}
`;

const Oval = styled.div`
	width: 19px;
	height: 19px;
	flex-shrink: 0;
	border-radius: 50%;
	border: 3px solid #707070;
	background-color: '#FFF';
  @media (max-width: ${theme.breakpoints.md}) {
    width: 16px;
    height: 16px;
  }
`;

const AwardInfo = styled.div`
  flex: 1;
`;

const AwardName = styled.div`
  font-size: 20px;
  font-weight: bold;
  @media (max-width: ${theme.breakpoints.md}) {
		font-size: 16px;
	}
`;

const AwardDetails = styled.div`
  font-size: 16px;
  color: var(--gray-02, #333);
  margin-top: 5px;
  @media (max-width: ${theme.breakpoints.md}) {
		font-size: 14px;
	}
`;



const EditContainer = styled.div`
	width: 820px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 45px;
	font-family: 'Regular';
`