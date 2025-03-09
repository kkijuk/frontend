import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewDetailAddEdit from './ReviewDetailAddEdit';
import editIcon from '../../assets/edit.svg';
import linkIcon from '../../assets/link.svg';
import { ReviewAdd } from '../../api/Apply/ReviewAdd';
import { useNavigate } from 'react-router-dom';

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

export default function ReviewList({ recruitId, reviews = [], onDelete, fetchData }) {
	const [isDetailAddVisible, setIsDetailAddVisible] = useState(null);
	const navigate = useNavigate();

	// "서류" 리뷰를 항상 최상단에 위치하도록 정렬 (배열 확인 추가)
	const sortedReviews = Array.isArray(reviews)
		? [...reviews].sort((a, b) => (a.title === "서류" ? -1 : b.title === "서류" ? 1 : 0))
		: [];

	const handleEditClick = (reviewId) => {
		setIsDetailAddVisible((prev) => (prev === reviewId ? null : reviewId));
	};

	const handleDeleteClick = (reviewId) => {
		if (onDelete) {
			onDelete(reviewId);
		}
	};

	const handleLinkClick = (introduceId) => {
		if (introduceId && introduceId !== 0) {
			navigate(`/history/others/${introduceId}`);
		} else {
			console.warn("유효한 introduceId가 없습니다.");
		}
	};

	return (
		<div>
			{sortedReviews.length > 0 ? (
				sortedReviews.map(({ reviewId, title, date, content, introduceState, introduceId }) => {
					const isDocumentReview = introduceState === 1 && title === "서류";
					const disableTitleEdit = isDocumentReview;

					return (
						<Box key={reviewId}>
							<TitleDateContainer>
								<TitleWrapper>
									<Title>{title}</Title>
									{/*  "서류" 리뷰에만 링크 버튼 표시 */}
									{isDocumentReview && introduceId && introduceId !== 0 && (
										<LinkButton onClick={() => handleLinkClick(introduceId)}>
											<LinkIcon src={linkIcon} alt="link icon" />
											자기소개서
										</LinkButton>
									)}
								</TitleWrapper>
								<Date>{date}</Date>
							</TitleDateContainer>

							<Contents>
								{content ? (
									content.split('\n').map((line, index) => <p key={index}>{line}</p>)
								) : (
									<NoContentText>전형 후기가 없습니다</NoContentText>
								)}
							</Contents>

							{/* ✅ 서류 리뷰는 삭제 버튼 숨김 */}
							{!isDocumentReview && (
								<EditIconStyled src={editIcon} alt="Edit" title="Edit" onClick={() => handleEditClick(reviewId)} />
							)}

							{isDetailAddVisible === reviewId && (
								<ReviewDetailAddEdit
									recruitId={recruitId}
									reviewId={reviewId}
									initialTitle={title}
									initialDate={date}
									initialContents={content}
									onDelete={!disableTitleEdit ? () => handleDeleteClick(reviewId) : null}
									onSave={() => {
										setIsDetailAddVisible(null);
										fetchData();
									}}
									fetchData={fetchData}
									disableTitleEdit={disableTitleEdit} //  서류 제목 수정 비활성화
								/>
							)}

							<Line></Line>
						</Box>
					);
				})
			) : (
				<p>등록된 전형 후기가 없습니다.</p>
			)}
		</div>
	);
}

