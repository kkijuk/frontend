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

const DocumentReview = styled.div`
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
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

export default function ReviewList({ recruitId, reviews = [], introduceState, onDelete, fetchData }) {
	const [isDetailAddVisible, setIsDetailAddVisible] = useState(false);
	const [selectedReview, setSelectedReview] = useState(null);

	const handleEditClick = (review) => {
		console.log(`Editing review with ID: ${review.reviewId}`); // Review ID 로그 출력
		setSelectedReview(review);
		setIsDetailAddVisible(true);
	};

	const handleDeleteClick = (reviewId) => {
		if (onDelete) {
			onDelete(reviewId); // 삭제 핸들러 호출
		}
	};

	// "서류" 후기 추가 (introduceState === 1일 때만)
	const documentReview = introduceState === 1
		? [{ reviewId: 'introduce', title: '서류', content: '전형 후기가 없습니다', date: '' }]
		: [];

	// 기존 리뷰 리스트 유지 + "서류" 후기를 가장 위에 추가
	const updatedReviews = [...documentReview, ...reviews];

	return (
		<div>
			{updatedReviews.map((review, idx) => (
				<Box key={idx}>
					<TitleDateContainer>
						<Title>{review.title}</Title>
						<Date>{review.date}</Date>
					</TitleDateContainer>

					{/* "서류" 리뷰는 별도 스타일 적용 */}
					{review.reviewId === 'introduce' ? (
						<DocumentReview>{review.content}</DocumentReview>
					) : (
						<Contents>
							{review.content.split('\n').map((line, index) => (
								<p key={index}>{line}</p>
							))}
						</Contents>
					)}

					{/* "서류" 후기는 수정 불가, 나머지 리뷰는 수정 가능 */}
					{review.reviewId !== 'introduce' && (
						<EditIconStyled src={editIcon} alt="Edit" title="Edit" onClick={() => handleEditClick(review)} />
					)}
				</Box>
			))}

			{/* ReviewDetailAddEdit 추가 (기존 코드 유지) */}
			{isDetailAddVisible && selectedReview && (
				<ReviewDetailAddEdit
					recruitId={recruitId} // recruitId 전달
					reviewId={selectedReview.reviewId} // 선택한 리뷰 ID 전달
					initialTitle={selectedReview.title}
					initialDate={selectedReview.date}
					initialContents={selectedReview.content}
					onDelete={() => handleDeleteClick(selectedReview.reviewId)} // ReviewDetailAddEdit에서 삭제 완료 시 호출
					onSave={() => {
						setIsDetailAddVisible(false);
						fetchData(); // 저장 후 최신 데이터를 다시 불러옴
					}}
					fetchData={fetchData} // fetchData 전달
				/>
			)}

			<Line />
		</div>
	);
}