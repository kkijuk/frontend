import api from '../../Axios.js';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './history.css';
import SubNav from '../../components/Intro/SubNav';
import Convert from '../../components/Intro/Convert';
import Toggle from '../../components/Intro/Toggle';
import ButtonOptions from '../../components/Intro/AddButton.jsx';
import Alert from '../../components/Intro/Alert';
import EditApplyModal from '../../components/Intro/EditApplyModal.jsx';
import { updateRecruit } from '../../api/Apply/RecruitUpdate.js';
import { trackEvent } from '../../utils/ga4.js';
import SvgIcon from '../../components/shared/SvgIcon.jsx';

const OthersRewrite = () => {
	const navigate = useNavigate();
	const { id } = useParams();

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
		state: 0,
	});
	const [modalOpend, setModalOpend] = useState(false);
	const [dropdownOpend, setDropdownOpend] = useState(false);
	const [isCompleted, setIsCompleted] = useState(0);
	const [isEditApplyModalOpend, setIsEditApplyModalOpend] = useState(false);
	// const [show, setShow] = useState(false);
	// const [gotoShow, setGotoShow] = useState(false);
	const [charCounts, setCharCounts] = useState([]);
	const [nextQuestionId, setNextQuestionId] = useState(1);
	const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false); // 자동 저장 메시지
	const [autoSaveTime, setAutoSaveTime] = useState(''); // 자동 저장 시간


	useEffect(() => {
		setCharCounts(questions.map((question) => question.content.length));
	}, [questions]);

	useEffect(() => {
		api
			.get(`/history/intro/detail/${id}`)
			.then((response) => {
				console.log(response.data);
				const Data = response.data.data;
				// setQuestions(Data.questionList);
				setQuestions(
					Data.questionList.map((q, index) => ({
						...q,
						number: index + 1,
					})),
				);
				setNextQuestionId(Data.questionList.length + 1);
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
	}, [id]);

	const deleteResume = () => {
		api
			.delete(`/history/intro/${id}`)
			.then((response) => {
				console.log(response.data);
				changeState();
				navigate('/history/list/3');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const changeState = () => {
		api
			.patch(`/recruit/${contents.recruitId}`, { status: 'unapplied' })
			.then((response) => {
				console.log('상태 변경 결과: ', response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleInputChange = (number, field, event) => {
		const newQuestions = questions.map((question) =>
			question.number === number ? { ...question, [field]: event.target.value } : question,
		);
		setQuestions(newQuestions);
		console.log('InputChange Result: ', questions);
		// Corrected charCounts update logic
		setCharCounts((prev) =>
			prev.map((count, i) => (questions[i].number === number ? event.target.value.length : count)),
		);
	};

	const submitData = async () => {
		const Data = {
			questionList: questions,
			state: isCompleted,
		};
		console.log('자소서 수정 데이터: ', Data);
		console.log('이력서 ID: ', contents.id);
		try{
			const response = await api.patch(`history/intro/${contents.id}`, Data);
			// console.log(response.data);

			setAutoSaveTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
			setShowAutoSaveMessage(true);
			setTimeout(() => {
				setShowAutoSaveMessage(false);
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	// 자동 저장
	useEffect(() => {
		const interval = setInterval(() => {
			submitData();
		}, 60000);
		return () => clearInterval(interval);
	}, [questions]); 

	const handleSubmit = async (event) => {
		event.preventDefault();
		try{
			await submitData();
		} catch (error) {
			console.error('Error:', error);
		} finally {
			navigate(`/history/others/${id}`);
		}
	};

	const toggleEditApplyModal = () => {
		setIsEditApplyModalOpend(!isEditApplyModalOpend);
	};

	const toggleModal = () => {
		setModalOpend(!modalOpend);
	};

	const handleDropdownClick = (isCompleted) => {
		setIsCompleted(isCompleted);
		const status = isCompleted ? 'applying' : 'planned';
		api
			.patch(`/recruit/${contents.recruitId}`, { status: status })
			.then((response) => {
				console.log('상태 변경 결과: ', response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		toggleDropdown();
	};

	const toggleDropdown = () => {
		setDropdownOpend(!dropdownOpend);
	};

	const handleAddClick = () => {
		let count = 0;
		questions.map((question) => {
			if (!question.subTitle && !question.content) {
				count++;
				console.log(question.number);
			}
		});
		// if (count < 3) {
		// 	setQuestions([...questions, { number: nextQuestionId, subTitle: '', content: '' }]);
		// 	setNextQuestionId((prevId) => prevId + 1);
		// } else showLimiter();
	};

	const handleEditApply = async (data) => {
		try {
			setContents((prevContents) => ({
				...prevContents,
				recruitTitle: data.title,
				deadline: data.endTime,
				link: data.link,
				tags: data.tags,
			}));

			const status = contents.state === 0 ? 'unapplied' : 'planned';

			const updatedApply = {
				title: data.title,
				startTime: data.startTime,
				endTime: data.endTime,
				status: status,
				tags: data.tags,
				link: data.link,
			};

			await updateRecruit(contents.recruitId, updatedApply);
			console.log('Recruit updated successfully');
		} catch (error) {
			console.error('Failed to update recruit:', error);
		}
	};

	// const showLimiter = () => {
	// 	setShow(true);
	// 	setTimeout(() => {
	// 		setShow(false);
	// 	}, 3000);
	// };

	const deleteItem = (number) => {
		const deletedQuestions = questions.filter((question) => question.number !== number);
		setQuestions(deletedQuestions);
	};

	const clickGotoApply = () => {
		if (contents.link) {
			window.open(contents.link);
		} 
		// else {
		// 	setGotoShow(true);
		// 	setTimeout(() => {
		// 		setGotoShow(false);
		// 	}, 3000);
		// }
	};

	const isDeadlineWithin7Days =()=>{
		if(!contents.deadline) return false;
		const deadlineDate = new Date(contents.deadline);
		return (deadlineDate - new Date()) / (1000 * 60 * 60 * 24) < 7;
	}

	return (
		<BackgroundDiv>
			<BaseDiv>
				<ContentTitle>
					<h1 style={{ position: 'relative', display: 'inline-block', marginRight: '12px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '60%' }}>
						{contents.recruitTitle}
					</h1>
					<div style={{ display: 'inline-block', position: 'relative' }}>
						{modalOpend && <Alert closeModal={toggleModal} deleteResume={deleteResume}></Alert>}
						{/* <Limiter show={show}>빈 질문을 먼저 채워주세요!</Limiter> */}
						{/* <Limiter show={gotoShow} style={{ width: '250px', position: 'absolute', left: 20, top: 400 }}>
							등록된 링크가 없습니다. <br />
							공고 수정에서 링크를 등록해주세요!
						</Limiter> */}
						<div style={{ position: 'relative', zIndex: 1000 }}>
							{isEditApplyModalOpend && (
								<EditApplyModal
									onClose={toggleEditApplyModal}
									onSave={(data) => handleEditApply(data)}
									contents={contents}
									style={{ position: 'relative', zIndex: 1000 }}
								></EditApplyModal>
							)}
						</div>
						<Tag onClick={toggleDropdown} style={{ color: 'white', width: '60px', cursor: 'pointer' }}>
							{isCompleted ? '작성 완료' : '작성 중'} ▼
						</Tag>
						{dropdownOpend && (
							<Dropdown>
								<DropdownItem onClick={() => handleDropdownClick(0)}>작성 중</DropdownItem>
								<DropdownItem onClick={() => handleDropdownClick(1)}>작성 완료</DropdownItem>
							</Dropdown>
						)}
					</div>
					{contents.tags.map((tag) => (
						<Tag key={tag} style={{ background: '#F5F5F5', color: '#3AAF85' }}>
							{tag}
						</Tag>
					))}
					<br />
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'30px' }}>
						<p
							className="lastUpdated"
							style={{ 
								display: 'inline-block', 
								color: isDeadlineWithin7Days() ? '#FA7C79' : '#707070',
								margin: '0 20px 8px 0px', 
								textAlign: 'left' }}
						>
							공고 마감 일시 : {contents.deadline}
						</p>
						<JobLinkBox
							onClick={()=>{
								clickGotoApply();
								trackEvent('edit_click', {
									category: 'coverletter',
									detail: 'edit_recruit',
									action_type: 'edit',
									label: '공고 수정',
								});
							}}
							disabled = {!contents.link}
						>
							공고 보러가기
							<SvgIcon name="jobLink" size={15} color="var(--gray-02, #707070)"/>
						</JobLinkBox>
					</div>
					<svg
						onClick={toggleEditApplyModal}
						style={{
							width: '30px',
							height: '30px',
							position: 'absolute',
							top: '26px',
							right: '10px',
							cursor: 'pointer',
							zIndex: '900',
						}}
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 30 30"
						fill="none"
					>
						<path
							d="M0 23.7509V30H6.24913L24.6799 11.5692L18.4308 5.32009L0 23.7509ZM29.5126 6.73656C30.1625 6.08665 30.1625 5.0368 29.5126 4.38689L25.6131 0.487432C24.9632 -0.162477 23.9133 -0.162477 23.2634 0.487432L20.2139 3.53701L26.463 9.78614L29.5126 6.73656Z"
							fill="#707070"
						/>
					</svg>
				</ContentTitle>

				<Linear style={{ width: '820px' }} />
				<p className="lastUpdated" style={{ marginTop: 0 }}>
					마지막 수정일시: {contents.updatedAt}
				</p>
				<form>
					{questions.map((question, index) => (
						<div key={question.number + '_' + index} style={{ position: 'relative' }}>
							<Delete
								style={{
									left: '10px',
									top: '15px',
									color: '#707070',
									fontSize: '24px',
									lineHeight: 'normal',
									cursor: 'default',
								}}
							>
								{index + 1}
							</Delete>
							<Delete onClick={() => deleteItem(question.number)}>삭제</Delete>
							<InputTitle
								placeholder='질문을 작성하세요'
								style={{ height: '20px', marginBottom: '12px', paddingLeft: '50px', width: '750px' }}
								value={
									question.title && question.title !== 'string' 
									? question.title
									: ''
								}
								onChange={(e) => handleInputChange(question.number, 'title', e)}
							/>
							<InputWrapper>
								<InputTitle
									placeholder='답변을 작성하세요'
									style={{ height: '150px', marginBottom: '35px', width: '780px' }}
									value={
										question.content && question.content !== 'string' 
										? question.content
										: ''}
									onChange={(e) => handleInputChange(question.number, 'content', e)}
								/>
								<CharCount>
									{charCounts[index]} (공백포함)
								</CharCount>
							</InputWrapper>
						</div>
					))}
				</form>
				<AddButton onClick={handleAddClick}>+</AddButton>
				<div style={{ height: '70px' }}></div>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<Button
						onClick={toggleModal}
						style={{
							width: '160px',
							border: '1.5px solid #FF7979',
							borderRadius: '10px',
							background: '#FFF',
							color: 'red',
						}}
					>
						삭제
					</Button>
					<div style={{display: 'flex', flexDirection:'column', alignItems: 'center', position: 'relative'}}>
						{showAutoSaveMessage && (
							<p style={{ fontFamily: 'pretendard', fontSize: '14px', color: '#707070', marginBottom: '10px', position:'absolute', top:'-40px' }}>
								자동 저장을 완료했습니다. {autoSaveTime}
							</p>
						)}
						
						<Button
							onClick={handleSubmit}
							style={{ width: '185px', borderRadius: '10px', background: '#3AAF85', color: '#FFF' }}
						>
							저장하고 나가기
						</Button>
					</div>
				</div>
			</BaseDiv>
		</BackgroundDiv>
	);
};

export default OthersRewrite;

const BackgroundDiv = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 40px;
	display: flex;
	justify-content: center;
`;

const BaseDiv = styled.div`
	width: 820px;
	max-width: 820px;
	position: relative;
	z-index: 999;
`;

const ContentTitle = styled.div`
	position: relative;
	z-index: 890;
	margin-top: 10px;
	margin-bottom: 33px;
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

const Linear = styled.div`
	height: 4px;
	background-color: #f1f1f1;
	margin-top: 12px;
	margin-bottom: 20px;
`;

const InputTitle = styled.textarea`
	width: 750px;
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
	white-space: pre-wrap;

	overflow: hidden;
	overflow-y: auto;
	outline: none;
	&::-webkit-scrollbar {
    	display: none; /* 웹킷 브라우저에서 스크롤바 숨기기 */
  	}
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

const Button = styled.button`
	height: 50px;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	font-family: Regular;
	font-size: 18px;
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
`;

const DropdownItem = styled.p`
	color: var(--gray-01, #424242);
	text-align: center;
	font-family: Regular;
	font-size: 13px;
	font-weight: 400;
	cursor: pointer;
`;

const Limiter = styled.div`
	width: 200px;
	height: 80px;
	background-color: RGBA(0, 0, 0, 0.7);
	color: white;
	font-family: Regular;
	font-size: 16px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 550px;
	opacity: ${(props) => (props.show ? 1 : 0)};
	transition: opacity 1s;
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

// InputTitle와 글자수를 함께 감쌀 컨테이너
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 12px;
`;

// 글자수 표시 스타일 (p 대신 div/span 등을 써도 무방)
const CharCount = styled.div`
	position: absolute;
	bottom: 17px;
	right: 0px;
	font-family: Regular;
	font-size: 16px;
	color: #707070;
	width: 780px;
	height: 25px;
	flex-shrink: 0;
	border: none;
	border-radius: 0px 0px 10px 10px;
	background: var(--gray-06, #f5f5f5);
	padding: 0px 20px;
	line-height: normal;
	white-space: pre-wrap;
	text-align: right;
`;

const JobLinkBox = styled.div`
  width: 120px;
  height: 28px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border-radius: 12px;
  border: 2.3px solid var(--gray-03, #707070);
  font-size: 12px;
  color: var(--gray-02, #707070);
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;