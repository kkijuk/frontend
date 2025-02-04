import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewDetailAddEdit from './ReviewDetailAddEdit';
import editIcon from '../../assets/edit.svg';
import linkIcon from '../../assets/link.svg';
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

const TitleWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 14px; /* 버튼과 제목 간격 */
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

const NoContentText = styled.p`
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

const LinkButton = styled.button`
	display: flex;
	align-items: center;
	gap: 7px; /* 아이콘과 텍스트 간격 */
	justify-content: center;
	border-radius: 10px;
	border: 1px solid var(--black, #000);
	width: 110px;
	height: 28px;
	flex-shrink: 0;
	background: white;
	cursor: pointer;
	font-size: 14px;
	font-family: Pretendard;
	
	&:hover {
		background: #f5f5f5;
	}
`;

const LinkIcon = styled.img`
	width: 15px;
	height: 15px;
`;

export default function ReviewList({ recruitId, reviewId, title, date, content = '', introduceState, introduceId, onDelete, fetchData }) {
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
			introduceState: 1,
			introduceId: introduceId ?? 0, // ✅ introduceId 추가
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

	const handleLinkClick = () => {
		console.log("자기소개서 버튼 클릭됨!");
	};

	return (
		<div>
			<Box>
				<TitleDateContainer>
					<TitleWrapper>
						<Title>{title}</Title>
						{introduceState === 1 && title === '서류' && (
							<LinkButton onClick={handleLinkClick}>
								<LinkIcon src={linkIcon} alt="link icon" />
								자기소개서
							</LinkButton>
						)}
					</TitleWrapper>
					<Date>{date}</Date>
				</TitleDateContainer>

				{/* ✅ "서류" 리뷰도 포함하여 모든 리뷰의 내용 표시 */}
				<Contents>
					{content ? (
						content.split('\n').map((line, index) => <p key={index}>{line}</p>)
					) : (
						<NoContentText>전형 후기가 없습니다</NoContentText> // ✅ 내용이 없으면 표시
					)}
				</Contents>

				{/* ✅ "서류" 리뷰도 수정 버튼 활성화 */}
				<EditIconStyled src={editIcon} alt="Edit" title="Edit" onClick={handleEditClick} />
			</Box>

			{isDetailAddVisible && (
				<ReviewDetailAddEdit
					recruitId={recruitId}
					reviewId={reviewId}
					initialTitle={title}
					initialDate={date}
					initialContent={content}
					onDelete={handleDeleteClick}
					onSave={() => {
						setIsDetailAddVisible(false);
						fetchData();
					}}
					fetchData={fetchData}
					disableTitleEdit={introduceState === 1 && title === '서류' && introduceId !== 0} // ✅ introduceId 반영
				/>
			)}
			<Line></Line>
		</div>
	);
}
