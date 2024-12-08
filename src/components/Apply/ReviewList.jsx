import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewDetailAddEdit from './ReviewDetailAddEdit';

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

// const EditIconStyled = styled(EditIcon)`
// 	position: absolute;
// 	bottom: 24px;
// 	right: 40px;
// 	cursor: pointer;
// `;

export default function ReviewList({ recruitId, reviewId, title, date, contents = '', onDelete, fetchData }) {
	const [isDetailAddVisible, setIsDetailAddVisible] = useState(false);

	const handleEditClick = () => {
		console.log(`Editing review with ID: ${reviewId}`); // Review ID 로그 출력
		setIsDetailAddVisible(!isDetailAddVisible);
	};

	const handleDeleteClick = () => {
		if (onDelete) {
			onDelete(reviewId); // 삭제 핸들러 호출
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

				{/* <EditIconStyled titleAccess="Edit" onClick={handleEditClick} /> */}
			</Box>
			{isDetailAddVisible && (
				<ReviewDetailAddEdit
					recruitId={recruitId} // recruitId 전달
					reviewId={reviewId} // 리뷰 ID 전달
					initialTitle={title}
					initialDate={date}
					initialContents={contents}
					onDelete={handleDeleteClick} // ReviewDetailAddEdit에서 삭제가 완료되면 호출
					onSave={() => {
						setIsDetailAddVisible(false);
						fetchData(); // 저장 후 최신 데이터를 다시 불러옴
					}}
					fetchData={fetchData} // fetchData 전달
				/>
			)}
			<Line></Line>
		</div>
	);
}
