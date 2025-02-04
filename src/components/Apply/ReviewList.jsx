import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewDetailAddEdit from './ReviewDetailAddEdit';
import editIcon from '../../assets/edit.svg';
import { ReviewAdd } from '../../api/Apply/ReviewAdd'; 

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
	const [documentReviewAdded, setDocumentReviewAdded] = useState(false); // 서류 리뷰 추가 여부 확인

	useEffect(() => {
		// introduceState === 1이면 "서류" 리뷰 자동 생성 및 저장
		if (introduceState === 1 && !documentReviewAdded) {
			saveDocumentReview();
			setDocumentReviewAdded(true); // 중복 요청 방지
		}
	}, [introduceState, documentReviewAdded]);

	const saveDocumentReview = async () => {
		const newReview = {
			title: "서류",
			date: new Date().toISOString().split("T")[0], // 오늘 날짜
			introduceState: 1, // introduceState 유지
		};
	
		try {
			await ReviewAdd(recruitId, newReview);
			console.log("서류 리뷰 저장 완료");
			fetchData(); // 저장 후 최신 데이터 다시 불러오기
		} catch (error) {
			console.error("서류 리뷰 저장 실패", error);
		}
	};
	

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
