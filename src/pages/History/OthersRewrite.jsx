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
import { BackgroundDiv, BaseDiv, Dropdown, DropdownItem } from '@/pages/History/Rewrite.styles.js';

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
			<BaseDiv>
				<IntroHeader>
					<Header>
						<h1 style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '60%', fontFamily: 'SemiBold', marginBlock: '0'}}>
							{contents.recruitTitle}
						</h1>
						<TagWrapper>
							<Tag onClick={toggleDropdown} isCompleted={isCompleted} isStatusDropdown={true}>
								{isCompleted ? '작성 완료' : '작성 중'} ▼
							</Tag>
							{dropdownOpend && (
								<Dropdown>
									<DropdownItem onClick={() => handleDropdownClick(0)}>작성 중</DropdownItem>
									<DropdownItem onClick={() => handleDropdownClick(1)}>작성 완료</DropdownItem>
								</Dropdown>
							)}
							{contents.tags.map((tag) => (
								<Tag 
									key={tag} 
									isStatusDropdown={false}
									style={{ background: `${Color.gray06}`, color: `${Color.main01}` }}
								>
									{tag}
								</Tag>
							))}
						</TagWrapper>
					</Header>
					{/* <div style={{ display: 'inline-block', position: 'relative' }}>
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
					</div> */}

					<IntroInfoWrapper>
							<ApplyDeadLineDate isDeadlineWithin7Days={isDeadlineWithin7Days}>
								공고 마감 일시 : {contents.deadline}
							</ApplyDeadLineDate>
							<LastUpdatedDate isMobile={true}>
									마지막 수정일시: {contents.updatedAt}
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
					<EditApplyButton>
						<svg
							onClick={toggleEditApplyModal}
							xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"
						>
							<path
								d="M0 23.7509V30H6.24913L24.6799 11.5692L18.4308 5.32009L0 23.7509ZM29.5126 6.73656C30.1625 6.08665 30.1625 5.0368 29.5126 4.38689L25.6131 0.487432C24.9632 -0.162477 23.9133 -0.162477 23.2634 0.487432L20.2139 3.53701L26.463 9.78614L29.5126 6.73656Z"
								fill="#707070"
							/>
						</svg>
					</EditApplyButton>

					<Linear/>
					<LastUpdatedDate isMobile={false}>
							마지막 수정일시: {contents.updatedAt}
					</LastUpdatedDate>
					
				</IntroHeader>

				<IntroBody>
					{questions.map((question, index) => {
						return (
						<QnAItem key={question.number} style={{ position: 'relative' }}>
							{/* <TitleWrapper>
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
										isDeleteButton = {true}
									>
											삭제
									</Delete>
									<InputTitle
										placeholder='질문을 작성하세요'
										value={
											question.title && question.title !== 'string' 
											? question.title
											: ''
										}
										onChange={(e) => handleInputChange(question.number, 'title', e)}
									/>
							</TitleWrapper> */}
							<TitleWrapper2>
									<NumberLabel
										style={{
											color: `${Color.gray02}`,
											fontSize: '24px',
											lineHeight: 'normal',
											cursor: 'default',
										}}
									>
										{index + 1}
									</NumberLabel>
									<InputTitle
										placeholder='질문을 작성하세요'
										value={
											question.title && question.title !== 'string' 
											? question.title
											: ''
										}
										onChange={(e) => handleInputChange(question.number, 'title', e)}
									/>
									<DeleteButton
										onClick={() => deleteItem(question.number)}
									>
											삭제
									</DeleteButton>
							</TitleWrapper2>
							<AnswerWrapper>
								<InputAnswer
									placeholder='답변을 작성하세요'
									value={
										question.content && question.content !== 'string' 
										? question.content
										: ''}
									onChange={(e) => handleInputChange(question.number, 'content', e)}
								/>
								<CharCount>
									{charCounts[index]} (공백포함)
								</CharCount>
							</AnswerWrapper>
						</QnAItem>
					);
					})}
					<AddButton onClick={handleAddClick}>+</AddButton>
				</IntroBody>

				{/* <AddButton onClick={handleAddClick}>+</AddButton> */}
				{/* <div style={{ height: '70px' }}></div> */}
				<IntroFooter>
					<FooterButton
						onClick={toggleModal}
						variant = "remove"
					>
						삭제
					</FooterButton>
					<SaveBtnWrapper>
						{showAutoSaveMessage && (
							<AutoSaveMessage>
								자동 저장을 완료했습니다. {autoSaveTime}
							</AutoSaveMessage>
						)}
						
						<FooterButton
							onClick={handleSubmit}
							variant="save"
						>
							저장하고 나가기
						</FooterButton>
					</SaveBtnWrapper>
				</IntroFooter>
			</BaseDiv>
		</BackgroundDiv>
	);
};

export default OthersRewrite;

const Header = styled.div`
	width: 820px;
	display: flex;
	gap: 24px;
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

const IntroHeader = styled.div`
	position: relative;
	z-index: 890;
	margin-bottom: 20px;

	display: flex;
	flex-direction: column;
	gap: 20px;

	@media (max-width: ${theme.breakpoints.md}) {
		gap: 12px;
		margin-bottom: 24px;
	}
`;

const TagWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;
	cursor: pointer;
`;

const Tag = styled.div`
	// width: 60px;
	width: ${(props) => (props.isStatusDropdown ? '60px' : 'none')};
	height: 14px;
	padding: 4px 12px;

	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 10px;

	flex-shrink: 0;
	border-radius: 20px;
	border: ${(props) => (props.isCompleted ? `1px solid ${Color.gray02}` : 'none')};
	background: ${(props) => (props.isCompleted ? Color.white : Color.main01 )};

	font-family: Regular;
	font-size: 12px;
	text-align: center;
	font-weight: 400;
	line-height: normal;
	color: ${(props) => (props.isCompleted ? Color.gray01 : Color.white )};

	@ media (max-width: ${theme.breakpoints.md}) {
		// width: 32px;
		width: ${(props) => (props.isStatusDropdown ? '32px' : 'none')};
		height: 22px;
		padding: 0px 16px;
	};
`;

const EditApplyButton = styled.div`
	width: 30px;
	height: 30px;

	position: absolute;
	top: 0px;
	right: 10px;
	cursor: pointer;
	z-index: 900;
`

const IntroInfoWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20px;
	
	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
	}
`

const ApplyDeadLineDate = styled.div`
	font-family: Regular;
	font-size: 14px;
	color: ${(props) => (props.isDeadlineWithin7Days ? Color.subRd : Color.gray02)};
`

const LastUpdatedDate = styled.div`
	display: ${(props) => (props.isMobile ? 'none' : 'block')};

	text-align: ${(props) => (props.isMobile ? 'left' : 'right')};
	color: ${Color.gray02};
	font-family: Regular;
	font-size: 14px;
	margin-block: 0;

	@media (max-width: ${theme.breakpoints.md}) {
	    display: ${(props) => (props.isMobile ? 'block' : 'none')};
	}
`

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
  border: 1.5px solid ${Color.gray02};

  font-size: 12px;
  color: ${Color.gray02};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const Linear = styled.div`
	height: 4px;
	background-color: ${Color.gray06};

	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
	}
`;

const IntroBody = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 32px;
	margin-bottom: 60px;
`

const QnAItem = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 12px;
`

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const TitleWrapper2 = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const NumberLabel = styled.div`
	flex: 0 0 auto;
	width: 30px;
	height: 50px;
	padding-left: 10px;

	display: flex;
	justify-content: center;
	align-items: center;

	background: ${Color.gray06};
	border-radius: 10px 0px 0px 10px;

	color: ${Color.gray02};
	font-size: 24px;
	font-family: Regular;
	font-weight: 700;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 20px;
	}
`;

const DeleteButton = styled.div`
	flex: 0 0 auto;
	width: 30px;
	height: 50px;
	padding-right: 20px;

	display: flex;
	justify-content: center;
	align-items: center;

	background: ${Color.gray06};
	border-radius: 0px 10px 10px 0px;

	color: ${Color.gray02};
	font-size: 15px;
	font-family: Regular;

	cursor: pointer;
`;

const InputTitle = styled.input`
	box-sizing: border-box;
	flex-shrink: 1;

	// width: ${({ isTitle }) => (isTitle === true ? '764px' : '780px')};
	width: 100%;
	// height: ${({ isTitle }) => (isTitle === true ? '20px' : 'auto')};
	height: 50px;
	// padding: ${({ isTitle }) => (isTitle === true ? '20px 20px 20px 36px' : '20px 20px')};
	padding-block: 10px;
	// padding-inline: 35px 40px; // 왼쪽 넘버링, 오른쪽 삭제 버튼으로 인한 여백

	border: none;
	background: ${Color.gray06};

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
		// width: ${({ isTitle }) => (isTitle === true ? '338px' : '358px')};
		width: 100%;
		// padding: ${({ isTitle }) => (isTitle === true ? '12px 16px 12px 36px' : '15px 16px 0px 16px')};
		// padding-block: 12px;
		// padding-inline: 35px 45px; // 왼쪽 넘버링, 오른쪽 삭제 버튼으로 인한 여백
	}
`;

// Answer와 글자수를 함께 감쌀 컨테이너
const AnswerWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0px;
`;

const InputAnswer = styled.textarea`
	box-sizing: border-box;
	flex-shrink: 1;

	// width: ${({ isTitle }) => (isTitle === true ? '764px' : '780px')};
	width: 100%;
	height: ${({ isTitle }) => (isTitle === true ? '20px' : 'auto')};
	min-height: ${({ isTitle }) => (isTitle === true ? '20px' : '150px')};
	max-height: 400px;
	padding: 15px 20px;
	// margin-bottom: 0px;

	border: none;
	border-radius: 10px 10px 0px 0px;
	background: ${Color.gray06};

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
		// width: ${({ isTitle }) => (isTitle === true ? '338px' : '358px')};
		width: 100%;
		// padding: ${({ isTitle }) => (isTitle === true ? '12px 16px 12px 36px' : '15px 16px 0px 16px')};
		padding: 15px 16px;
	}
`;

// 글자수 표시 스타일 (p 대신 div/span 등을 써도 무방)
const CharCount = styled.div`
	box-sizing: border-box;
	// width: 780px;	
	width: 100%;
	border-radius: 0px 0px 10px 10px;
	padding: 0px 20px 15px 20px;

	// max-width: 150px;
	height: 25px;

	// position: absolute;
	// bottom: 0px;
	// right: 0px;

	font-family: Regular;
	font-size: 16px;
	color: ${Color.gray02};
	line-height: normal;
	white-space: pre-wrap;
	text-align: right;

	background: ${Color.gray06};
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

const IntroFooter = styled.div`
	display: flex;
	gap: 15px;
`

const FooterButton = styled.button`
	height: 50px;

	border: none;
	border-radius: 10px;

	font-family: Regular;
	font-size: 18px;

	cursor: pointer;

	${({variant}) => {
		switch (variant) {
			case 'remove':
				return `
					width: 150px;
					border: 1.5px solid ${Color.error};
					background: ${Color.white};
					color: ${Color.error};
					flex-shrink: 0; // 고정 너비
				`;
			case 'save':
				return `
					width: 100%; // 남은 공간을 차지하도록 설정(SaveBtnWrapper에서 flex-grow: 1로 설정됨)
					border: none;
					background: ${Color.main01};
					color: ${Color.white};
				`;
			default:
				return '';
		}
	}}

	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
	}
`;

const SaveBtnWrapper = styled.div`
	flex-grow: 1; // IntroFooter의 남은 공간을 차지하도록 설정
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`

const AutoSaveMessage = styled.div`
	margin-bottom: 10px;
	position: absolute;
	top: -20px;
	font-family: Regular;
	font-size: 14px;
	color: ${Color.gray02};
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
	top: 15px;
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

