import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './history.css';
import { createMaster, readMaster } from '../../api/Intro/master';
import { set } from 'react-hook-form';
import { theme } from '../../constants/theme';
import { Color } from '@/constants/color';
import { useReadMaster } from '@/hooks/Intro/useMaster';

const Master = () => {
	const navigate = useNavigate();

	const { data: masterData, isLoading, isError } = useReadMaster();
	// console.log('masterData:', masterData);
	const data = {
		oneLiner: masterData?.oneLiner || '',
		questions: masterData?.questionList || [],
		updated_at: masterData?.updatedAt || '',
		state: masterData?.state || 0,
	}
	const [showCreateButton, setShowCreateButton] = useState(false); // 자소서 생성 여부

	useEffect(() => {
		if (!isLoading && (isError || !masterData)) {
			setShowCreateButton(true);
		}
	}, [isLoading, isError, masterData]);

	const handleCreateIntro = async () => {	
		try {
			const response = await createMaster({
				questionList: [
				  { title: 'string', content: 'string', number: 0 },
				  { title: 'string', content: 'string', number: 1 },
				  { title: 'string', content: 'string', number: 2 },
				],
				"state": 0
			  });
			console.log('생성: ', response);
			window.location.reload();
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<BackgroundDiv>
		{showCreateButton ? (
			<CreateIntroButton onClick={handleCreateIntro}>
				마스터 자기소개서 생성하기
			</CreateIntroButton>
		):(
			<BaseDiv>
				<ContentTitle>
					<OneLiner>
						{data.oneLiner ? data.oneLiner : '한줄소개를 작성해주세요!'}
					</OneLiner>
					<LastUpdated className="lastUpdated">
						{data.updated_at ? `마지막 수정일시: ${data.updated_at}` : '마지막 수정일시: unknown'}
					</LastUpdated>
				</ContentTitle>

				{data.questions.length > 0 ? (
					data.questions.map((question, index) => {
					// 인덱스에 따라 기본 제목과 내용을 설정
					let defaultTitle = '질문 제목을 작성하세요';
					let defaultContent = '아직 내용을 작성하지 않았어요.';

					if (index === 0) {
						defaultTitle = '1. 지원동기 및 포부 [소제목]';
						defaultContent = '아직 내용을 작성하지 않았어요.';
					} else if (index === 1) {
						defaultTitle = '2. 장단점 [소제목]';
						defaultContent = '아직 내용을 작성하지 않았어요.';
					} else if (index === 2) {
						defaultTitle = '3. 직무적합성 [소제목]';
						defaultContent = '아직 내용을 작성하지 않았어요.';
					}

					return (
						<div key={index}>
							<QuestionTitle>
								{question.title && question.title !== 'string' && question.title !== '' ? question.title : defaultTitle}
							</QuestionTitle>
							<ContentBox>
								{question.content && question.content !== 'string' && question.content !== '' ? question.content : defaultContent}
							</ContentBox>
						</div>
					);
					})
				) : (
					<p>아직 질문이 없습니다.</p>
				)}

				<EditButton 
					onClick={() => {
						navigate('/history/master/rewrite');
					}} 
					style={{ right: '100px' }}
				>
					<svg width="60" height="60" viewBox="2-2 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							id="Vector"
							d="M20 39.7509V46H26.2491L44.6799 27.5692L38.4308 21.3201L20 39.7509ZM49.5126 22.7366C50.1625 22.0867 50.1625 21.0368 49.5126 20.3869L45.6131 16.4874C44.9632 15.8375 43.9133 15.8375 43.2634 16.4874L40.2139 19.537L46.463 25.7861L49.5126 22.7366Z"
							fill="white"
						/>
					</svg>
				</EditButton>
			</BaseDiv>
		)}
		</BackgroundDiv>
	);
};
export default Master;

const BackgroundDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	@media (max-width: ${theme.breakpoints.md}) {
		margin-top: 32px;
	}
`;

const BaseDiv = styled.div`
	width: 100%;
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
	justify-content: space-between;
	align-items: center;
	@media (max-width: ${theme.breakpoints.md}) {
		display: block;
	}
`;

const OneLiner = styled.p`
  font-family: 'Semibold';
  font-weight: 700;
  font-size: 28px;
  display: inline-block;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 60%;
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 24px;
	margin: 0;
  }
`;

const LastUpdated = styled.p`
  display: inline-block;
  white-space: nowrap;
  margin-block-start: 0;
  @media (max-width: ${theme.breakpoints.md}) {
    position: static;
	margin: 0;
	font-size: 14px;
	margin-block-start: 8px;
  }
`;

const QuestionTitle = styled.div`
	font-family: 'Semibold';
	font-weight: 500;
	font-size: 20px;
	margin-bottom: 24px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-family: 'Regular';
		font-size: 16px;
		margin-bottom: 16px;
	}
`;

const ContentBox = styled.div`
	color: ${Color.gray02};
	font-family: Regular;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 60px;
	white-space: pre-wrap;
	word-break: break-word;
	padding: 0px 20px;
	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 14px;
	}
`;
const EditButton = styled.button`
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background-color: ${Color.gray03};
	color: ${Color.white};
	position: fixed;
	bottom: 20px;
	cursor: pointer;
	z-index: 10;
	@media (max-width: ${theme.breakpoints.md}) {
		bottom: 20px;
	}
`;

const CreateIntroButton = styled.button`
	width: 200px;
	height: 130px;
	font-size: 24px;
	font-family: 'Regular'
`
