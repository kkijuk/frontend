// import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../constants/theme';
import { Color } from '@/constants/color';
import { useReadIntro } from '@/hooks/Intro/useIntro';
import LoadingSpinner from '@/components/shared/LoadingSpinner';


const Others = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	// others 자기소개서 조회
	const { data: introData, isLoading, isError } = useReadIntro(id);
	console.log('introData:', introData);

	const questions = introData?.questionList || [];
	const contents = {
		id: introData?.id || 0,
		recruitId: introData?.recruitId || 0,
		memberId: introData?.memberId || 0,
		recruitTitle: introData?.recruitTitle || '',
		deadline: introData?.deadline || '',
		link: introData?.link || '',
		tags: introData?.tags || [],
		timeSinceUpdate: introData?.timeSinceUpdate || '',
		updatedAt: introData?.updatedAt || '',
	};

	const isCompleted = introData?.state || 0; // 작성중 or 작성완료

	// 로딩 상태 처리
	if (isLoading) {
		return <LoadingSpinner message = '자기소개서를 불러오는 중입니다...'/>;
	}

	const isQuestionListEmpty = questions.length === 0 || (questions.length === 1 && questions[0].title === 'string' && questions[0].content === 'string');

	const isDeadlineWithin7Days = () => {
		if (!contents.deadline) return false;
		const deadlineDate = new Date(contents.deadline);
		return (deadlineDate - new Date()) / (1000 * 60 * 60 * 24) <= 7;
	};

	return (
		<BackgroundDiv>
			<BaseDiv>
				<ContentTitle>
					<RecruitTitle>
						{contents.recruitTitle}
					</RecruitTitle>
					<div style={{display: 'flex', alignItems: 'center'}}>
						<Tag style={{ color: 'white' }}>{isCompleted ? '작성 완료' : '작성 중'}</Tag>
						{contents.tags.map((tag) => (
							<Tag 
								key={tag}
								style={{ background: `${Color.gray06}`, color: `${Color.main01}`, cursor: 'pointer' }}
								onClick={() => navigate(`/filter?query=${tag}`)}
							>
								{tag}
							</Tag>
						))}
					</div>	
					<DateWrapper>
						<p 
							className="lastUpdated" 
							style={{ 
								color: isDeadlineWithin7Days() ? `${Color.subRd}` : `${Color.gray02}`, 
								marginBottom: '8px' 
						}}>
							공고 마감 일시 : {contents.deadline} ({contents.timeSinceUpdate})
						</p>
						<p className="lastUpdated" style={{ marginTop: 0 }}>
							마지막 수정일시: {contents.updatedAt}
						</p>
					</DateWrapper>
				</ContentTitle>
				<div>
					{isQuestionListEmpty ? (
						<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
							<p style={{
								fontFamily: 'Regular',
								fontSize: '16px',
							}}>
								아직 내용을 작성하지 않았어요.
							</p>
						</div>
					) : (
						questions.map((question, index) => (
							<div style={{ position: 'relative' }}>
								<QuestionTitle>
									{index + 1}. {
									question.title && question.title !== 'string' && question.title !== ''
									? question.title
									: '질문을 작성하세요.'
									}
								</QuestionTitle>
								<QuestionContent>
									<p>
										{question.content && question.content !== 'string' && question.content !== ''
										? question.content
										: '답변을 작성하세요.'}
									</p>
								</QuestionContent>
							</div>
						))
					)}
				</div>
				<EditButton onClick={() => navigate(`/history/others/${id}/rewrite`)} style={{ right: '100px' }}>
					<svg width="60" height="60" viewBox="2-2 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							id="Vector"
							d="M20 39.7509V46H26.2491L44.6799 27.5692L38.4308 21.3201L20 39.7509ZM49.5126 22.7366C50.1625 22.0867 50.1625 21.0368 49.5126 20.3869L45.6131 16.4874C44.9632 15.8375 43.9133 15.8375 43.2634 16.4874L40.2139 19.537L46.463 25.7861L49.5126 22.7366Z"
							fill="white"
						/>
					</svg>
				</EditButton>
			</BaseDiv>
		</BackgroundDiv>
	);
};
export default Others;

const BackgroundDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
`;

const BaseDiv = styled.div`
	width: 820px;
	max-width: 820px;
	position: relative;
`;

const SButton = styled.button`
	width: 76px;
	height: 35px;
	margin-right: 12px;
	font-family: 'Regular';
	border: none;
	border-radius: 10px;
	border-color: ${Color.white};
	padding: 6px 16px 6px 16px;
	gap: 10px;
	background-color: ${Color.gray06};
	color: ${Color.gray02};
	cursor: pointer;

	&: first-child {
		background-color: ${Color.main03};
		color: ${Color.black};
	}
`;
const ContentTitle = styled.div`
	position: relative;
	margin-block: 40px;
	display: flex;
	flex-direction: row;
	align-items: center;
	@media (max-width: ${theme.breakpoints.md}) {
		flex-direction: column;
		align-items: flex-start;
		margin-block: 32px;
	}
`;

const Tag = styled.div`
	display: inline-flex;
	height: 22px;
	padding: 0px 16px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	margin-right: 12px;

	border-radius: 20px;
	background: ${Color.main01};
	font-family: 'Regular';
	font-size: 12px;
	text-align: center;
	font-weight: 400;
	line-height: normal;
`;

const DateWrapper = styled.div`
	position: absolute;
	right: 0px;
	font-family: 'Regular';
	font-size: 14px;

	p {
		text-align: right;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		position: static;
		margin-top: 10px;
		p {
			text-align: left;
		}	
	}
`

const EditButton = styled.button`
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background-color: ${Color.gray03};
	color: white;
	position: fixed;
	bottom: 20px;
	cursor: pointer;
`;

const RecruitTitle = styled.div`
	font-family: 'bold';
	font-size: 28px;
	display: inline-block;
	margin-right: 24px;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-width: 50%; 
	position: relative;
	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 24px;
		margin-bottom: 12px;
	}
`;

const QuestionTitle = styled.div`
	font-family: 'medium';
	font-size: 20px;
	margin-bottom: 24px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-family: 'Regular';
		font-size: 16px;
		margin-bottom: 16px;
	}
`;

const QuestionContent = styled.div`
	// width: 100%;
	min-height:100px; 
	white-space: pre-wrap; 
	word-wrap: break-word;
	margin-bottom: 60px;
	font-family: Regular;
	font-size: 16px;
	padding: 0px 20px;
	color: ${Color.gray02};
	
	@media (max-width: ${theme.breakpoints.md}) {
		p {
			width: 100%;
			font-family: Regular;
			font-size: 14px;
		}
	}
`