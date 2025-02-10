import React, { useState } from 'react';
import styled from 'styled-components';
import AddEducationForm from '../addForms/AddEducationForm';
import { KebabMenu2 } from '../KebabMenu';

const EducationItem = ({ data, isLastItem, onSave, onUpdate, onDelete, onClose }) => {
	const [isEditMode, setIsEditMode] = useState(false);

	console.log('EducationItem: ', data);

	return (
		<FirstContainer>
			{isEditMode ? (
				<EditContainer>
					<AddEducationForm
						mode='edit'
						initialData={data}
						onClose={() => setIsEditMode(false)}
						onUpdate = {(FormData) => onUpdate(FormData)}
						onDelete={onDelete}
					/>
				</EditContainer>
			) : (
				<>
				<TimeLine>
					<Oval status={data.state}></Oval>
					<Line isLastItem={isLastItem} status={data.state}></Line>
				</TimeLine>
				<Container>
					<div>
						<LevelTag status={data.state}>{data.category}</LevelTag>
						<SchoolInfo>
							<SchoolName>{data.schoolName}</SchoolName>
							{data.major && <Department>{data.major}</Department>}
							<Dates>
								{data.admissionDate} ~ {data.graduationDate} <Status>({data.state})</Status>
							</Dates>
						</SchoolInfo>
					</div>
				</Container>
				<EditButton id="edit">
					<KebabMenu2 onModalOpen={() => setIsEditMode(true)} />
				</EditButton>
				</>
			)}
	</FirstContainer>
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
	width: 19px;
	height: 19px;
	flex-shrink: 0;
	border-radius: 50%;
	border: 3px solid #707070
	background-color: ${(props) =>
		props.status === '중퇴' || props.status === '편입' || props.status === '졸업' ? '#707070' : '#FFF'};
`;

const Line = styled.div`
	width: 2px;
	height: 166px;
	border-top: none;
	border-right: none;
	border-bottom: none;
	border-left: ${(props) =>
		props.isLastItem
			? 'none'
			: props.status === '중퇴' || props.status === '편입' || props.status === '졸업'
				? '2px solid #707070'
				: '2px dashed #707070'};
	margin-left: 11px;
`;

const EditButton = styled.button`
	border: none;
	position: absolute;
	right: 0;
	top:40px;
	background-color: transparent;
	opacity: 0;
	padding: 0px 50px 70px 0px;
`;

const EditContainer = styled.div`
	width: 820px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 45px;
	font-family: 'Regular';
`

const Container = styled.div`
	width: 820px;
	display: flex;
	align-items: flex-start;
	margin-bottom: 45px;
	font-family: 'Regular';
	positon: relative;
`;

const FirstContainer = styled.div`
	width: 100%;
	display: flex;
	position:relative;
	&:hover ${EditButton} {
		opacity: 1;
		cursor: pointer;
	}
`;

const LevelTag = styled.div`
	width:80px;
	height: 20px;
	background-color: #707070;
	color: white;
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 14px;
	font-family: Bold;
	margin-bottom: 10px;
	display: inline-block;
	line-height: 25px;
	display:flex;
	justify-content:center;
	align-items:center;
`;

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

const Status = styled.span``;
