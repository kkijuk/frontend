import React, { useState } from 'react';
import {
    EditContainer,
    ReadContainer,
    TimeLine,
    Oval,
    Line,
    EditButton,
    Container,
    LevelTag,
    SchoolInfo,
    SchoolName,
    Department,
    Dates,
    Status,
    FirstContainer,
    widthByLevelTagCategory,
    mdWidthByLevelCategory
} from './styles/Education.styles';
import AddEducationForm from '../addForms/AddEducationForm';
import { KebabMenu2 } from '../KebabMenu';
import { formateDateDashToDot } from '@/utils/formateDate';

const EducationItem = ({ data, isLastItem, onSave, onUpdate, onDelete, onClose }) => {
	const [isEditMode, setIsEditMode] = useState(false);

	// console.log('EducationItem: ', data);

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
				<ReadContainer>
					<TimeLine>
						<Oval status={data.state}></Oval>
						<Line isLastItem={isLastItem} status={data.state}></Line>
					</TimeLine>
					<Container>
						<div>
							<LevelTag 
								status={data.state}
								category={data.category}
							>
									{data.category}
								</LevelTag>
							<SchoolInfo>
								<SchoolName>{data.schoolName}</SchoolName>
								{data.major && <Department>{data.major}</Department>}
								<Dates>
									{formateDateDashToDot(data.admissionDate)} ~ {formateDateDashToDot(data.graduationDate)} <Status>({data.state})</Status>
								</Dates>
							</SchoolInfo>
						</div>
					</Container>
					<EditButton id="edit">
						<KebabMenu2 onModalOpen={() => setIsEditMode(true)} />
					</EditButton>
				</ReadContainer>
			)}
	</FirstContainer>
	);
};

export default EducationItem;


