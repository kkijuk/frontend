import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewDetailAddEdit from './ReviewDetailAddEdit';
import editIcon from '../../assets/edit.svg';
import linkIcon from '../../assets/link.svg';
import { ReviewAdd } from '../../api/Apply/ReviewAdd'; 
import { useNavigate } from 'react-router-dom';
import { formateDateDashToDot } from '../../utils/formateDate';
import { Color } from '../../constants/color';

const Box = styled.div`
	display: flex;
	width: 720px;
	flex-direction: column;
	align-items: flex-start;
	gap: 14px;
	padding: 24px 40px;
	position: relative;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 320px;
	justify-content: center;
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 14px; /* 버튼과 제목 간격 */
`;

const Title = styled.div`
	color: ${Color.black};
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Contents = styled.div`
	color: ${Color.black};
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
	color: ${Color.gray02};
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const Date = styled.div`
	color: ${Color.gray02};
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
	background: ${Color.gray03};

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 350px;
	}
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
	border: 1px solid ${Color.black};
	width: 110px;
	height: 28px;
	flex-shrink: 0;
	background: ${Color.white};
	cursor: pointer;
	font-size: 14px;
	font-family: Pretendard;
	
	&:hover {
		background: ${Color.gray06};
	}
`;

const LinkIcon = styled.img`
	width: 15px;
	height: 15px;
`;

export default function ReviewList({ recruitId, reviewId, title, date, content = '', introduceState, introduceId, onDelete, fetchData }) {
	const [isDetailAddVisible, setIsDetailAddVisible] = useState(false);
	const navigate = useNavigate();
	const isDocumentReview = introduceState === 1 && title === '서류'; // 서류 리뷰 여부

	const handleEditClick = () => {
		setIsDetailAddVisible(!isDetailAddVisible);
	};

	const handleDeleteClick = () => {
		if (onDelete) {
			onDelete(reviewId);
		}
	};

	const handleLinkClick = () => {
		if (introduceId && introduceId !== 0) {
			navigate(`/history/others/${introduceId}`);
		} else {
			console.warn("유효한 introduceId가 없습니다.");
		}
	};

	return (
		<div>
			<Box>
				<TitleDateContainer>
					<TitleWrapper>
						<Title>{title}</Title>
						{isDocumentReview && (
							<LinkButton onClick={handleLinkClick}>
								<LinkIcon src={linkIcon} alt="link icon" />
								자기소개서
							</LinkButton>
						)}
					</TitleWrapper>
					<Date>{formateDateDashToDot(date)}</Date>

				</TitleDateContainer>

				<Contents>
					{content ? (
						content.split('\n').map((line, index) => <p key={index}>{line}</p>)
					) : (
						<NoContentText>전형 후기가 없습니다</NoContentText>
					)}
				</Contents>

				<EditIconStyled src={editIcon} alt="Edit" title="Edit" onClick={handleEditClick} />
			</Box>

			{isDetailAddVisible && (
				<ReviewDetailAddEdit
					recruitId={recruitId}
					reviewId={reviewId}
					initialTitle={title}
					initialDate={date}
					initialContents={content}
					onDelete={isDocumentReview ? null : handleDeleteClick} // 서류 리뷰는 삭제 불가능, 나머지는 삭제 가능
					onSave={() => {
						setIsDetailAddVisible(false);
						fetchData();
					}}
					fetchData={fetchData}
					disableTitleEdit={isDocumentReview} // 서류 제목 수정 불가
				/>
			)}

			<Line></Line>
		</div>
	);
} 