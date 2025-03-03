import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { readMaster, updateMaster } from '../../api/Intro/master';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { use } from 'react';

const MasterRewrite = () => {
	const navigate = useNavigate();

	//(Data) 한줄소개, 지원동기및포부 제목 및 내용, 장단점 제목 및 내용, 직무적합성 제목 및 내용
	const [data, setData] = useState({
		oneLiner: '',
		questions:[],
		updated_at: '',
		state: 0,
	});
	// 글자 수
	const [charCounts, setCharCounts] = useState([]);
	const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

	// 글자 수 계산
	useEffect(() => {
		setCharCounts(data.questions.map((question) => question.content.length));
	}, [data.questions]);

	//1. 마스터 저장 내용 불러오기
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
			}
		}
		fetchIntro();
	}, []);	

	// 자동 저장
	useEffect(() => {
		const interval = setInterval(() => {
			submitData();
		}, 60000);
		return () => clearInterval(interval);
	}, [data]); 

	// 변경 내용 onChange
	const handleInputChange = (index, field, value) => {
		const updatedQuestions = data.questions.map((q, i) =>
			i === index ? { ...q, [field]: value } : q
		);
		setData({ ...data, questions: updatedQuestions });
	};
	// 한줄 소개 onChange
	const handleOneLinerChange = (field, value) => {
		setData({ ...data, [field]: value });
	};



	//(API) 마스터 수정
	const submitData = async () => {
		const dataToSubmit = {
			oneLiner: data.oneLiner,
			questionList: data.questions,
			state: data.state,
		};
		console.log('data to submit: ', dataToSubmit);
		try{
			const response = await updateMaster(dataToSubmit);
			console.log('마스터 자소서 수정 완료: ', response);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	// 저장 버튼 클릭 시
	const handleSubmit = async (event) => {
		event.preventDefault();
		setShowLoadingSpinner(true);
		try{
			await submitData();
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setShowLoadingSpinner(false);
			navigate('/history/master');
		}
	};

	// 질문 추가
	const handleAddClick = () => {
		setData((prevData) => ({
		  ...prevData,
		  questions: [...prevData.questions, { title: "", content: "" }],
		}));
	};

	// 드롭다운 클릭
	const handleDropdownClick = (isCompleted) => {
		setDropdownOpened(true);
		setData({ ...data, state: isCompleted });
		setDropdownOpened(false);
	};

	// data 변경 시 로그
	useEffect(() => {
		console.log('data:', data);
	}
	, [data]);

	return (
		<BackgroundDiv>
			{showLoadingSpinner && <LoadingSpinner message = "마스터 자소서 수정 중..."/>}
			<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
				<p style={{fontFamily: 'pretendard', fontSize: '28px', marginBottom: '20px', fontWeight: 700}}>
					Master 자기소개서
				</p>
				<Tag onClick={(value)=>{setDropdownOpened(!value)}} style={{ color: 'white', width: '60px', cursor: 'pointer' }}>
						{isCompleted ? '작성 완료' : '작성 중'} ▼
						{dropdownOpened && (
						<Dropdown>
							<DropdownItem onClick={() => handleDropdownClick(0)}>작성 중</DropdownItem>
							<DropdownItem onClick={() => handleDropdownClick(1)}>작성 완료</DropdownItem>
						</Dropdown>
						)}
				</Tag>
			</div>
			<Linear style={{ width: '820px' }} />
			<BaseDiv>
				<div style={{ position: 'relative' }}>
					<InputTitle
						id="oneLiner"
						placeholder="한줄소개를 입력하세요"
						style={{ height: '40px', marginBottom: '12px' }}
						value={data.oneLiner || ''}
						onChange={(e) => handleOneLinerChange(e.target.id, e.target.value)}
					/>

					{data.questions.map((question, index) => {
						// 첫번째, 두번째, 세번째 질문에 대해서만 특수한 placeholder를 설정
						let titlePlaceholder = '질문 제목을 작성하세요';
						let contentPlaceholder = '답변을 작성하세요';
						if (index === 0) {
						titlePlaceholder = '지원동기 및 포부 [소제목]';
						contentPlaceholder = '답변을 작성하세요';
						} else if (index === 1) {
						titlePlaceholder = '장단점 [소제목]';
						contentPlaceholder = '답변을 작성하세요';
						} else if (index === 2) {
						titlePlaceholder = '직무적합성 [소제목]';
						contentPlaceholder = '답변을 작성하세요';
						}

						const currentTitle = (question.title && question.title !== 'string') ? question.title : '';
						const currentContent = (question.content && question.content !== 'string') ? question.content : '';

						return (
						<div key={index} style={{position:'relative'}}>
							<InputTitle
							placeholder={titlePlaceholder}
							style={{ height: '20px', marginBottom: '12px' }}
							value={currentTitle}
							onChange={(e) => handleInputChange(index, 'title', e.target.value)}
							/>
							<InputTitle
							placeholder={contentPlaceholder}
							style={{ height: '150px', marginBottom: '12px' }}
							value={currentContent}
							onChange={(e) => handleInputChange(index, 'content', e.target.value)}
							/>
							<p
							style={{
								fontFamily: 'Regular',
								fontSize: '16px',
								color: '#707070',
								textAlign: 'right',
								marginRight: '20px',
								position: 'absolute',
								bottom: '35px',
								right: '5px',
							}}
							>
							{currentContent.length} (공백 포함)
							</p>
						</div>
						);
					})}
				</div>
				<AddButton onClick={handleAddClick}>+</AddButton>
				<div style={{ height: '70px' }}></div>
				<Button
					onClick={handleSubmit}
					style={{ width: '820px', borderRadius: '10px', background: '#3AAF85', color: '#FFF' }}
				>
					저장하고 나가기
				</Button>
				<div style={{ height: '70px' }}></div>
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

const AddButton = styled.button`
	width: 820px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
	text-align: center;
	background: #fff;
	color: #d9d9d9;
	font-size: 30px;
	cursor: pointer;
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
	font-family: Regular;
	font-size: 12px;
	text-align: center;
	font-weight: 400;
	line-height: normal;
`;

const Dropdown = styled.div`
	width: 90px;
	height: 70px;
	flex-shrink: 0;
	border-radius: 13px;
	border: 1px solid var(--gray-02, #707070);
	background: #fff;
	position: absolute;
	top: 23px;
	margin-top: 20px;
	z-index: 1000;
`;

const DropdownItem = styled.p`
	color: var(--gray-01, #424242);
	text-align: center;
	font-family: Regular;
	font-size: 13px;
	font-weight: 400;
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
	top: 20px;
	right: 10px;
`;
