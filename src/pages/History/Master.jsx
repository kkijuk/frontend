import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './history.css';
import SubNav from '../../components/Intro/SubNav';
import Convert from '../../components/Intro/Convert';
import Toggle from '../../components/Intro/Toggle';
import ButtonOptions from '../../components/Intro/AddButton';
import { createMaster, readMaster } from '../../api/Intro/master';
import { set } from 'react-hook-form';

const Master = () => {
	const navigate = useNavigate();

	//(Data) 한줄소개, 지원동기및포부 제목 및 내용, 장단점 제목 및 내용, 직무적합성 제목 및 내용
	// const [questions, setQuestions] = useState({
	// 	oneLiner: '',
	// 	motive_title: '',
	// 	motive: '',
	// 	prosAndCons_title: '',
	// 	prosAndCons: '',
	// 	job_fit_title: '',
	// 	job_fit: '',
	// 	updated_at: '',
	// });
	const [data, setData] = useState({
		oneLiner: '',
		questions:[],
		updated_at: '',
		state: 0,
	});
	const [showCreateButton, setShowCreateButton] = useState(false); // 자소서 생성 여부

	//(API) 마스터 조회
	useEffect(() => {
		const fetchIntro = async () => {
			try{
				const response = await readMaster();
				console.log('내용조회: ', response);

				setData({
					oneLiner: response.oneLiner,
					questions: response.questionList,
					updated_at: response.updatedAt,
					state: response.state,
				});
			} catch (error) {
				console.error('Error:', error);
				setShowCreateButton(true);
			}
		}
		fetchIntro();
	}, []);	

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
					<h1 style={{ display: 'inline-block' }}>
						{data.oneLiner ? data.oneLiner : '한줄소개를 작성해주세요!'}
					</h1>
					<p className="lastUpdated" style={{ display: 'inline-block', position: 'absolute', top: '10px', right: 0 }}>
						{data.updated_at ? `마지막 수정일시: ${data.updated_at}` : '마지막 수정일시: unknown'}
					</p>
				</ContentTitle>

				{data.questions.length > 0 ? (
					data.questions.map((question, index) => {
					// 인덱스에 따라 기본 제목과 내용을 설정
					let defaultTitle = '질문 제목을 작성하세요';
					let defaultContent = '아직 내용을 작성하지 않았어요.';

					if (index === 0) {
						defaultTitle = '1. 지원동기 및 포부 [소제목]';
						defaultContent = '아직 지원동기를 작성하지 않았어요.';
					} else if (index === 1) {
						defaultTitle = '2. 장단점 [소제목]';
						defaultContent = '아직 장단점을 작성하지 않았어요.';
					} else if (index === 2) {
						defaultTitle = '3. 직무적합성 [소제목]';
						defaultContent = '아직 직무적합성을 작성하지 않았어요.';
					}

					return (
						<div key={index}>
						<h3>{question.title && question.title !== 'string' ? question.title : defaultTitle}</h3>
						<ContentBox>
							{question.title && question.title !== 'string' ? question.content : defaultContent}
						</ContentBox>
						</div>
					);
					})
				) : (
					<p>아직 질문이 없습니다.</p>
				)}

				<EditButton onClick={() => navigate('/history/master/rewrite')} style={{ right: '100px' }}>
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
`;

const ContentBox = styled.div`
	color: var(--gray-02, #707070);
	font-family: Regular;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 60px;
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
	z-index: 10;
`;

const CreateIntroButton = styled.button`
	width: 200px;
	height: 130px;
	font-size: 24px;
	font-family: 'Regular'
`
