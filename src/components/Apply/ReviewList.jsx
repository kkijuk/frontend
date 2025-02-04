import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewDetailAddEdit from './ReviewDetailAddEdit';
import editIcon from '../../assets/edit.svg';

const Box = styled.div`
	display: flex;
	width: 720px;
	flex-direction: column;
	align-items: flex-start;
	gap: 14px;
	padding: 24px 40px;
	position: relative;
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Contents = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	p {
		margin: 0;
	}
`;

const Date = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	align-self: flex-start;
`;

const TitleDateContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

const Line = styled.div`
	width: 800px;
	height: 2px;
	background: var(--gray-03, #d9d9d9);
`;

const EditIconStyled = styled.img`
	position: absolute;
	bottom: 24px;
	right: 40px;
	cursor: pointer;
`;

export default function ReviewList({ recruitId, reviewId, title, date, contents = '', introduceState, onDelete, fetchData }) {
	const [isDetailAddVisible, setIsDetailAddVisible] = useState(false);

	const handleEditClick = () => {
		console.log(`Editing review with ID: ${reviewId}`);
		setIsDetailAddVisible(!isDetailAddVisible);
	};

	const handleDeleteClick = () => {
		if (onDelete) {
			onDelete(reviewId);
		}
	};

	return (
		<div>
			<Box>
				<TitleDateContainer>
					<Title>{title}</Title>
					<Date>{date}</Date>
				</TitleDateContainer>
				<Contents>
					{contents.split('\n').map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</Contents>

				{/* introduceState가 1이고 제목이 "서류"이면 수정 아이콘 비활성화 */}
				{!(introduceState === 1 && title === '서류') && (
					<EditIconStyled src={editIcon} alt="Edit" title="Edit" onClick={handleEditClick} />
				)}
			</Box>

			{isDetailAddVisible && (
				<ReviewDetailAddEdit
					recruitId={recruitId}
					reviewId={reviewId}
					initialTitle={title}
					initialDate={date}
					initialContents={contents}
					onDelete={handleDeleteClick}
					onSave={() => {
						setIsDetailAddVisible(false);
						fetchData();
					}}
					fetchData={fetchData}
				/>
			)}
			<Line></Line>
		</div>
	);
}

