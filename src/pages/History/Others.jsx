import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './history.css';
import SubNav from '../../components/Intro/SubNav';
import Convert from '../../components/Intro/Convert';
import Toggle from '../../components/Intro/Toggle';
import ButtonOptions from '../../components/Intro/AddButton';
import { string } from 'prop-types';
// import { ContentCopySharp } from '@mui/icons-material'

//Todo
//Number 주는 방법

const Others = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	// (Data) questions: 질문 목록, contents: 질문 외 정보
	const [questions, setQuestions] = useState([]);
	const [contents, setContents] = useState({
		id: 0,
		recruitId: 0,
		memberId: 0,
		recruitTitle: '',
		deadline: '',
		link: '',
		tags: [],
		timeSinceUpdate: '',
		updatedAt: '',
	});
	const [isCompleted, setIsCompleted] = useState(0); //작성중or작성완료

	// 자소서 조회
	useEffect(() => {
		api
			.get(`/history/intro/detail/${id}`)
			.then((response) => {
				console.log(response.data);
				const Data = response.data.data;
				setQuestions(Data.questionList);
				setContents({
					id: Data.id,
					recruitId: Data.recruitId,
					memberId: Data.memberId,
					recruitTitle: Data.recruitTitle,
					deadline: Data.deadline,
					link: Data.link,
					tags: Data.tags,
					timeSinceUpdate: Data.timeSinceUpdate,
					updatedAt: Data.updatedAt,
				});
				setIsCompleted(Data.state);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

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
					<Tag style={{ color: 'white' }}>{isCompleted ? '작성 완료' : '작성 중'}</Tag>
					{contents.tags.map((tag) => (
						<Tag 
							key={tag}
							style={{ background: '#F5F5F5', color: '#3AAF85' }}
							onClick={() => navigate(`/filter?query=${tag}`)}
						>
							{tag}
						</Tag>
					))}

					<div style={{ display: 'inline-block', position: 'absolute', right: 0 }}>
						<p 
							className="lastUpdated" 
							style={{ 
								color: isDeadlineWithin7Days() ? '#FA7C79' : '#707070', 
								marginBottom: '8px' 
						}}>
							공고 마감 일시 : {contents.deadline}
						</p>
						<p className="lastUpdated" style={{ marginTop: 0 }}>
							마지막 수정일시: {contents.updatedAt}
						</p>
					</div>
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
								<h3>
									{index + 1}. {
									question.title && question.title !== 'string' && question.title !== ''
									? question.title
									: '질문을 작성하세요.'
									}
								</h3>
								<div style={{ minHeight:'100px', whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
									<p>
										{question.content && question.content !== 'string' && question.content !== ''
										? question.content
										: '답변을 작성하세요.'}
									</p>
								</div>
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
	margin-top: 40px;
	display: flex;
	// align-items:center;
	justify-content: center;
`;

const BaseDiv = styled.div`
	width: 820px;
	// display:flex;
	// margin-left:400px;
	max-width: 820px;
	// background-color:#D9D9D9
	position: relative;
`;

const SButton = styled.button`
	width: 76px;
	height: 35px;
	margin-right: 12px;
	font-family: 'Regular';
	border: none;
	border-radius: 10px;
	border-color: #ffffff;
	padding: 6px 16px 6px 16px;
	gap: 10px;
	background-color: #f5f5f5;
	color: #707070;
	cursor: pointer;

	&: first-child {
		background-color: #e1faed;
		color: #000000;
	}
`;
const ContentTitle = styled.div`
	position: relative;
	margin-top: 10px;
	margin-bottom: 33px;
	display: flex;
	flex-direction: row;
	align-items: center;
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
	background: #3aaf85;
	font-family: 'Regular';
	font-size: 12px;
	text-align: center;
	font-weight: 400;
	line-height: normal;
`;
const EditButton = styled.button`
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background-color: #b0b0b0;
	color: white;
	position: fixed;
	bottom: 20px;
	cursor: pointer;
`;

const Delete = styled.div`
	width: 30px;
	height: 20px;
	color: #707070;
	font-size: 15px;
	font-family: Regular;
	cursor: pointer;
	position: absolute;
	top: 16px;
	right: 10px;
`;

const RecruitTitle = styled.h1`
  display: inline-block;
  margin-right: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%; 
  position: relative;
`;