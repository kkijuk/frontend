import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { readMaster, updateMaster } from '../../api/Intro/master';

const MasterRewrite = () => {
	const navigate = useNavigate();

	// 글자 수
	const [charCounts, setCharCounts] = useState({
		oneLiner: 0,
		motiveTitle: 0,
		motive: 0,
		prosAndConsTitle: 0,
		prosAndCons: 0,
		jobSuitabilityTitle: 0,
		jobSuitability: 0,
	});

	//(Data) 한줄소개, 지원동기및포부 제목 및 내용, 장단점 제목 및 내용, 직무적합성 제목 및 내용
	const [questions, setQuestions] = useState({
		id: 0,
		memberId: 0,
		oneLiner: '',
		motiveTitle: '',
		motive: '',
		prosAndConsTitle: '',
		prosAndCons: '',
		jobSuitabilityTitle: '',
		jobSuitability: '',
		updatedAt: '',
	});

	// 글자 수 계산
	useEffect(() => {
		setCharCounts({
			oneLiner: questions.oneLiner.length,
			motiveTitle: questions.motiveTitle.length,
			motive: questions.motive.length,
			prosAndConsTitle: questions.prosAndConsTitle.length,
			prosAndCons: questions.prosAndCons.length,
			jobSuitabilityTitle: questions.jobSuitabilityTitle.length,
			jobSuitability: questions.jobSuitability.length,
		});
	}, [questions]);

	//1. 마스터 저장 내용 불러오기
	//(API) 마스터 조회
	useEffect(() => {
		api
			.get('/history/intro/master')
			.then((response) => {
				console.log(response.data);
				const Data = response.data.data;
				console.log(Data.id);
				setQuestions({
					id: Data.id,
					memberId: Data.memberId,
					oneLiner: Data.oneLiner,
					motiveTitle: Data.motiveTitle,
					motive: Data.motive,
					prosAndConsTitle: Data.prosAndConsTitle,
					prosAndCons: Data.prosAndCons,
					jobSuitabilityTitle: Data.jobSuitabilityTitle,
					jobSuitability: Data.jobSuitability,
					updatedAt: Data.updatedAt,
				});
			})
			.catch((error) => {
				console.log('Error:', error);
			});
	}, []);

	//2. 마스터 변경 내용 수정(저장 버튼 + 정기 호출)
	const handleOnChange = (id, value) => {
		const updatedQuestions = { ...questions, [id]: value };
		setQuestions(updatedQuestions);
	};

	//(API) 마스터 수정
	const submitData = () => {
		api
			.patch(`/history/intro/master?id=${questions.id}`, questions)
			.then((response) => {
				console.log('마스터자소서수정완료: ', response.data);
			})
			.catch((error) => {
				console.log('Error: ', error);
			});
	};

	setInterval(submitData, 60000);

	const handleSubmit = (event) => {
		event.preventDefault();
		submitData();
		navigate('/history/master');
	};

	return (
		<BackgroundDiv>
			<BaseDiv>
				<div style={{ position: 'relative' }}>
					<InputTitle
						id="oneLiner"
						placeholder="한줄소개를 작성하세요"
						style={{ height: '20px', marginBottom: '12px' }}
						value={questions.oneLiner || ''}
						onChange={(e) => handleOnChange(e.target.id, e.target.value)}
					/>

					<Linear style={{ width: '820px' }} />
					{/* <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: {content.updated_at}</p>            */}
					<InputTitle
						id="motiveTitle"
						placeholder="지원동기 제목을 작성하세요"
						style={{ height: '20px', marginBottom: '12px' }}
						value={questions.motiveTitle || ''}
						onChange={(e) => handleOnChange(e.target.id, e.target.value)}
					/>

					<InputTitle
						id="motive"
						placeholder="지원동기를 작성하세요"
						style={{ height: '150px', marginBottom: '12px' }}
						value={questions.motive || ''}
						onChange={(e) => handleOnChange(e.target.id, e.target.value)}
					/>
					<div style={{ height: '30px' }} />
					<p
						style={{
							fontFamily: 'Regular',
							fontSize: '16px',
							color: '#707070',
							textAlign: 'right',
							marginRight: '20px',
							position: 'absolute',
							top: 360,
							right: 0,
						}}
					>
						{charCounts.motive} (공백 포함)
					</p>
					<InputTitle
						id="prosAndConsTitle"
						placeholder="장단점 제목을 작성하세요"
						style={{ height: '20px', marginBottom: '12px' }}
						value={questions.prosAndConsTitle || ''}
						onChange={(e) => handleOnChange(e.target.id, e.target.value)}
					/>

					<InputTitle
						id="prosAndCons"
						placeholder="장단점을 작성하세요"
						style={{ height: '150px', marginBottom: '12px' }}
						value={questions.prosAndCons || ''}
						onChange={(e) => handleOnChange(e.target.id, e.target.value)}
					/>
					<div style={{ height: '30px' }} />
					<p
						style={{
							fontFamily: 'Regular',
							fontSize: '16px',
							color: '#707070',
							textAlign: 'right',
							marginRight: '20px',
							position: 'absolute',
							top: 670,
							right: 0,
						}}
					>
						{charCounts.prosAndCons} (공백 포함)
					</p>
					<InputTitle
						id="jobSuitabilityTitle"
						placeholder="직무적합성 제목을 작성하세요"
						style={{ height: '20px', marginBottom: '12px' }}
						value={questions.jobSuitabilityTitle || ''}
						onChange={(e) => handleOnChange(e.target.id, e.target.value)}
					/>
					<InputTitle
						id="jobSuitability"
						placeholder="직무적합성을 작성하세요"
						style={{ height: '150px', marginBottom: '12px' }}
						value={questions.jobSuitability || ''}
						onChange={(e) => handleOnChange(e.target.id, e.target.value)}
					/>
					<div style={{ height: '70px' }}></div>
					<p
						style={{
							fontFamily: 'Regular',
							fontSize: '16px',
							color: '#707070',
							textAlign: 'right',
							marginRight: '20px',
							position: 'absolute',
							top: 980,
							right: 0,
						}}
					>
						{charCounts.jobSuitability} (공백 포함)
					</p>
				</div>

				<Button
					onClick={handleSubmit}
					style={{ width: '820px', borderRadius: '10px', background: '#3AAF85', color: '#FFF' }}
				>
					저장하고 나가기
				</Button>
			</BaseDiv>
		</BackgroundDiv>
	);
};
export default MasterRewrite;

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

const InputTitle = styled.textarea`
	width: 780px;
	flex-shrink: 0;
	border: none;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);
	padding: 20px 20px;
	color: var(--gray-02, #707070);
	font-family: Regular;
	font-size: 16px;
	font-weight: 400;
	line-height: normal;
	resize: none;
	overflow: hidden;
`;

const Linear = styled.div`
	height: 4px;
	background-color: #f1f1f1;
	margin-top: 12px;
	margin-bottom: 20px;
`;
const Button = styled.button`
	height: 50px;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	font-family: Regular;
	font-size: 18px;
`;
