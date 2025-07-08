import api from '../../Axios.js';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './history.css';
import Alert from '../../components/Intro/Alert';
import EditApplyModal from '../../components/Intro/EditApplyModal.jsx';
import { trackEvent } from '../../utils/ga4.js';
import SvgIcon from '../../components/shared/SvgIcon.jsx';
import { theme } from '../../constants/theme.js';
import { Color } from '../../constants/color.js';
import { useReadIntro, useUpdateIntro, useReadRecruitAtIntro, useUpdateRecruitAtIntro } from '@/hooks/Intro/useIntro.js';

const OthersRewrite = () => {
	// 1. 기본 설정 & 초기값
	const navigate = useNavigate();
	const { id } = useParams();
	const introId = Number(id);

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
	const [modalOpend, setModalOpend] = useState(false); //삭제하시겠습니까?
	const [dropdownOpend, setDropdownOpend] = useState(false); //작성 상태 드롭다운
	const [isCompleted, setIsCompleted] = useState(0); // 작성 상태(0: 작성 중, 1: 작성 완료)
	const [isEditApplyModalOpend, setIsEditApplyModalOpend] = useState(false); // 공고 모달
	// const [show, setShow] = useState(false);
	// const [gotoShow, setGotoShow] = useState(false);
	const [charCounts, setCharCounts] = useState([]); //글자수
	const [nextQuestionId, setNextQuestionId] = useState(1);
	const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false); // 자동 저장 메시지
	const [autoSaveTime, setAutoSaveTime] = useState(''); // 자동 저장 시간


	useEffect(() => {
		console.log('isCompleted:', isCompleted);
	}, [isCompleted]);

	// 2. 서버 통신 
	// query hooks(useIntro) 연결
	const { data: introData, isLoading: introLoading } = useReadIntro(introId); // others 자기소개서 조회
	const { mutate: mutateIntro, isLoading: updatingIntro } = useUpdateIntro(); // others 자기소개서 수정

	const recruitId = introData?.recruitId; 
	const { data: recruitData, isLoading: recruitAtIntroLoading } = useReadRecruitAtIntro(recruitId); // 자기소개서에 연결된 공고 정보 조회
	const { mutate: mutateRecruit, isLoading: updatingRecruit } = useUpdateRecruitAtIntro(); // 공고 정보 수정


	// 자소서 내용 조회 결과 로컬 state에 저장
	useEffect(() => {
		if (!introData) return;
		console.log('자기소개서 데이터: ', introData);

		setQuestions(introData.questionList.map((q, index) => ({
			...q,
			number: index + 1,
		})));
		setNextQuestionId(introData.questionList.length + 1);
		setContents({
			id: introData.id,
			recruitId: introData.recruitId,
			memberId: introData.memberId,
			recruitTitle: introData.recruitTitle,
			deadline: introData.deadline,
			link: introData.link,
			tags: introData.tags,
			timeSinceUpdate: introData.timeSinceUpdate,
			updatedAt: introData.updatedAt,
		});
		setIsCompleted(introData.state);
	}, [introData]);

	// 공고 정보 조회 결과 로컬 state에 저장
	useEffect(() => {
		if(!recruitData) return;
		console.log('공고 데이터: ', recruitData);
		
		setContents((prev) => ({
			...prev,
			title: recruitData.title,
			startTime: recruitData.startTime,
			endTime: recruitData.endTime,
		}));
	}, [recruitData]);

	// 자소서 수정
	const handleSaveIntro =  () => {
		const payload = { oneLiner: "oneLiner", questionList: questions, state: isCompleted };

		mutateIntro(
			{ introId, data: payload },
			{
				onSuccess: () => {
					setAutoSaveTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
					setShowAutoSaveMessage(true);
					setTimeout(() => {
						setShowAutoSaveMessage(false);
					}, 3000);
				},
			},
		);
	};

	// 자소서 삭제
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

	// 작성중 or 작성완료 상태 변경
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

	// 공고 수정 
	const handleEditApply = (data) => {
		// UI 즉시 반영
		setContents((prevContents) => ({
			...prevContents,
			recruitTitle: data.title,
			deadline: data.endTime,
			link: data.link,
			tags: data.tags,
		}));
		
		// 뮤테이션 호출
		const status = contents.state === 0 ? 'unapplied' : 'planned';
		const updatedApply = {
			title: data.title,
			startTime: data.startTime,
			endTime: data.endTime,
			status: status,
			tags: data.tags,
			link: data.link,
		};

		mutateRecruit(
			{ recruitId: contents.recruitId, introId, data: updatedApply },
			{
				onSuccess: () => {
					console.log('공고 수정 성공');
					trackEvent('edit_click', {
						category: 'coverletter',
						detail: 'edit_recruit',
						action_type: 'edit',
						label: '공고 수정',
					});
				}
			},
		);
	};

	// 3. 핸들링 함수

	// 글자 수 계산
	useEffect(() => {
		setCharCounts(
			questions.map((question) => 
				question.content && question.content !== 'string' ? question.content.length : 0
		));
	}, [questions]);

	// 입력값 변경 핸들러
	const handleInputChange = (number, field, event) => {
		// const value = event.target.value;
		const textarea = event.target;
		const value = textarea.value;

		textarea.style.height = 'auto'; // 높이 초기화
		textarea.style.height = `${textarea.scrollHeight}px`; // 높이 조정

		const newQuestions = questions.map((question) =>
			question.number === number ? { ...question, [field]: value } : question
		);

		setQuestions(newQuestions);
		setCharCounts(newQuestions.map((question) =>
			question.content && question.content !== 'string' ? question.content.length : 0
		))
	};

	// 질문 추가
	const handleAddClick = () => {
		const maxNumber = questions.length 
			? Math.max(...questions.map((question) => question.number))
			: -1;
			
		const newQuestion = {
			title: '',
			content: '',
			number: maxNumber + 1,
		};

		setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

	};

	// 질문 삭제
	const deleteItem =(number) => {
		const updatedQuestions = questions.filter((question) => question.number !== number);
		setQuestions(updatedQuestions);
		// setCharCounts((prev) => prev.filter((_, i) => questions[i].number !== number));
		setCharCounts(updatedQuestions.map((question) =>
			question.content && question.content !== 'string' ? question.content.length : 0
		))
	};

	// 자소서 자동 저장
	useEffect(() => {
		const interval = setInterval(() => {
			handleSaveIntro();
		}, 60000);
		return () => clearInterval(interval);
	}, [questions]); 

	// 자소서 수동 저장
	const handleSubmit = async (event) => {
		event.preventDefault();

		const payload = { oneLiner: "oneLiner", questionList: questions, state: isCompleted };
		mutateIntro(
			{ introId, data: payload },
			{
				onSuccess: () => {
					navigate(`/history/others/${id}`);
				},
			},
		);
	};

	const toggleEditApplyModal = () => {
		setIsEditApplyModalOpend(!isEditApplyModalOpend);
	};

	const toggleModal = () => {
		setModalOpend(!modalOpend);
	};

	const toggleDropdown = () => {
		setDropdownOpend(!dropdownOpend);
	};

	const handleDropdownClick = (isCompleted) => {
		setIsCompleted(isCompleted);
		// const status = isCompleted ? 'applying' : 'planned';
		// api
		// 	.patch(`/recruit/${contents.recruitId}`, { status: status })
		// 	.then((response) => {
		// 		console.log('상태 변경 결과: ', response.data);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});

		toggleDropdown();
	};

	// 공고 보러가기 클릭
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


	// 4. util 함수
	const isDeadlineWithin7Days =()=>{
		if(!contents.deadline) return false;
		const deadlineDate = new Date(contents.deadline);
		return (deadlineDate - new Date()) / (1000 * 60 * 60 * 24) < 7;
	}

	return (
		<BackgroundDiv>
			<BaseDiv>
				<ContentTitle>
					<Header>
						<h1 style={{ position: 'relative', display: 'inline-block', marginRight: '12px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '60%' }}>
							{contents.recruitTitle}
						</h1>
						<TagWrapper>
							<Tag onClick={toggleDropdown} style={{ color: 'white', width: '60px', cursor: 'pointer' }}>
								{isCompleted ? '작성 완료' : '작성 중'} ▼
							</Tag>
							{dropdownOpend && (
								<Dropdown>
									<DropdownItem onClick={() => handleDropdownClick(0)}>작성 중</DropdownItem>
									<DropdownItem onClick={() => handleDropdownClick(1)}>작성 완료</DropdownItem>
								</Dropdown>
							)}
							{contents.tags.map((tag) => (
								<Tag key={tag} style={{ background: `${Color.gray06}`, color: `${Color.main01}` }}>
									{tag}
								</Tag>
							))}
						</TagWrapper>
					</Header>
					<div style={{ display: 'inline-block', position: 'relative' }}>
						{modalOpend && <Alert closeModal={toggleModal} deleteResume={deleteResume}></Alert>}
						<div style={{ position: 'relative', zIndex: 1000 }}>
							{isEditApplyModalOpend && (
								<EditApplyModal
									onClose={toggleEditApplyModal}
									onSave={(data) => handleEditApply(data)}
									job={contents}
									style={{ position: 'relative', zIndex: 1000 }}
								></EditApplyModal>
							)}
						</div>
					</div>

					<br />
					<IntroInfoWrapper>
							<p
								className="lastUpdated"
								style={{ 
									display: 'inline-block', 
									color: isDeadlineWithin7Days() ? `${Color.subRd}` : `${Color.gray02}`,
									margin: '0 20px 8px 0px', 
									textAlign: 'left' }}
							>
								공고 마감 일시 : {contents.deadline}
							</p>
							<LastUpdatedDate isMobile={true}>
								<p className="lastUpdated" style={{ marginTop: 0 }}>
									마지막 수정일시: {contents.updatedAt}
								</p>
							</LastUpdatedDate>
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
								<SvgIcon name="jobLink" size={15}/>
							</JobLinkBox>
					</IntroInfoWrapper>
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

				<Linear/>
				<LastUpdatedDate isMobile={false}>
					<p className="lastUpdated" style={{ marginTop: 0 }}>
						마지막 수정일시: {contents.updatedAt}
					</p>
				</LastUpdatedDate>
				<form>
					{questions.map((question, index) => {

						return (
						<div key={question.number} style={{ position: 'relative' }}>
							<TitleWrapper>
								<TitleInputContainer>
									<Delete
										isDeleteButton = {false}
										style={{
											color: `${Color.gray02}`,
											fontSize: '24px',
											lineHeight: 'normal',
											cursor: 'default',
										}}
									>
										{index + 1}
									</Delete>
									<Delete 
										onClick={() => deleteItem(question.number)}
										isDeleteButton = {true}>
											삭제
									</Delete>
									<InputTitle
										placeholder='질문을 작성하세요'
										isTitle={true}
										style={{ height: '20px', marginBottom: '12px'}}
										value={
											question.title && question.title !== 'string' 
											? question.title
											: ''
										}
										onChange={(e) => handleInputChange(question.number, 'title', e)}
									/>
								</TitleInputContainer>
							</TitleWrapper>
							<InputWrapper>
								<InputTitle
									placeholder='답변을 작성하세요'
									isTitle={false}
									style={{ marginBottom: '35px'}}
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
					);
					})}
				</form>
				<AddButton onClick={handleAddClick}>+</AddButton>
				<div style={{ height: '70px' }}></div>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<Button
						onClick={toggleModal}
						style={{
							width: '160px',
							border: `1.5px solid ${Color.subRd}`,
							borderRadius: '10px',
							background: `${Color.white}`,
							color: `${Color.error}`,
						}}
					>
						삭제
					</Button>
					<div style={{display: 'flex', flexDirection:'column', alignItems: 'center', position: 'relative'}}>
						{showAutoSaveMessage && (
							<p style={{ fontFamily: 'pretendard', fontSize: '14px', color: `${Color.gray02}`, marginBottom: '10px', position:'absolute', top:'-40px' }}>
								자동 저장을 완료했습니다. {autoSaveTime}
							</p>
						)}
						
						<Button
							onClick={handleSubmit}
							style={{ width: '185px', borderRadius: '10px', background: `${Color.main01}`, color: `${Color.white}` }}
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
	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
	}
`;

const BaseDiv = styled.div`
	width: 820px;
	max-width: 820px;
	position: relative;
	z-index: 999;

	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
	}
`;

const Header = styled.div`
	width: 820px;
	display: flex;
	gap: 20px;
	alignItems: center;
	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
		flex-direction: column;
		gap: 12px;
	}
`
const Title = styled.div`
	font-family: pretendard;
	font-size: 28px;
	margin-bottom: 20px;
	font-weight: 700;
	@media (max-width: ${theme.breakpoints.md}) {
		margin-bottom: 0px;
	}
`

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const TitleInputContainer = styled.div`
	width: 100%;
	position: relative;
`

const ContentTitle = styled.div`
	position: relative;
	z-index: 890;
	margin-top: 10px;
	margin-bottom: 33px;
`;

const TagWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;
`;

const Tag = styled.div`
	display: inline-flex;
	height: 22px;
	padding: 0px 16px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 20px;
	background: ${Color.main01};
	font-family: Regular;
	font-size: 12px;
	text-align: center;
	font-weight: 400;
	line-height: normal;
`;

const IntroInfoWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	
	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
`

const LastUpdatedDate = styled.div`
	display: ${(props) => (props.isMobile ? 'none' : 'block')};
	@media (max-width: ${theme.breakpoints.md}) {
	    display: ${(props) => (props.isMobile ? 'block' : 'none')};
	}
`

const Linear = styled.div`
	height: 4px;
	background-color: ${Color.gray06};
	margin-top: 12px;
	margin-bottom: 20px;

	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
	}
`;

const InputTitle = styled.textarea`
	width: ${({ isTitle }) => (isTitle === true ? '764px' : '780px')};
	height: ${({ isTitle }) => (isTitle === true ? '20px' : 'auto')};
	min-height: ${({ isTitle }) => (isTitle === true ? '20px' : '150px')};
	max-height: 400px;
	flex-shrink: 0;
	border: none;
	border-radius: 10px;
	background: ${Color.gray06};
	padding: ${({ isTitle }) => (isTitle === true ? '20px 20px 20px 36px' : '20px 20px')};
	color: ${Color.gray02};
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
	
	@media (max-width: ${theme.breakpoints.md}) {
		width: ${({ isTitle }) => (isTitle === true ? '338px' : '358px')};
		padding: ${({ isTitle }) => (isTitle === true ? '12px 16px 12px 36px' : '15px 16px 0px 16px')};
	}
`;

const AddButton = styled.button`
	width: 820px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid ${Color.gray03};
	text-align: center;
	background: ${Color.white};
	color: ${Color.gray04};
	font-size: 30px;
	cursor: pointer;
	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
	}
`;

const Button = styled.button`
	height: 50px;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	font-family: Regular;
	font-size: 18px;
	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
	}
`;

const Dropdown = styled.div`
	width: 90px;
	height: 70px;
	flex-shrink: 0;
	border-radius: 13px;
	border: 1px solid ${Color.gray02};
	background: ${Color.white};
	position: absolute;
	top: 23px;
`;

const DropdownItem = styled.p`
	color: ${Color.gray01};
	text-align: center;
	font-family: Regular;
	font-size: 13px;
	font-weight: 400;
	cursor: pointer;
`;

const Limiter = styled.div`
	width: 200px;
	height: 80px;
	background-color: rgba(0, 0, 0, 0.7);
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
	color: ${Color.gray02};
	font-size: 15px;
	font-family: Regular;
	cursor: pointer;
	position: absolute;
	top: 20px;
	right: 10px;
	top: ${(props) => (props.isDeleteButton ? '20px' : '16px')};
	right: ${(props) => (props.isDeleteButton ? '10px' : 'none')};
	left: ${(props) => (props.isDeleteButton ? 'none' : '10px')};
	@media (max-width: ${theme.breakpoints.md}) {
		top: ${(props) => (props.isDeleteButton ? '12px' : '9px')};
		right: ${(props) => (props.isDeleteButton ? '10px' : 'none')};
		left: ${(props) => (props.isDeleteButton ? 'none' : '10px')};
	}
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
	color: ${Color.gray02};
	width: 780px;
	height: 25px;
	flex-shrink: 0;
	border: none;
	border-radius: 0px 0px 10px 10px;
	background: ${Color.gray06};
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
  background: ${Color.white};
  border-radius: 12px;
  border: 2.3px solid ${Color.gray03};
  font-size: 12px;
  color: ${Color.gray02};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;