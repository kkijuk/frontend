import api from '../../Axios.js';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './history.css';
import Alert from '../../components/Intro/Alert';
// import EditApplyModal from '../../components/Intro/EditApplyModal.jsx';
import EditApplyModal from '@/components/Apply/EditApplyModal.jsx';
import RightSideBar from '@/components/Intro/RightSideBar/RightSideBar.jsx';
import RightSideBarContents from '@/components/Intro/RightSideBar/RightSideBarContents.jsx';
import { trackEvent } from '../../utils/ga4.js';
import SvgIcon from '../../components/shared/SvgIcon.jsx';
import { theme } from '../../constants/theme.js';
import { Color } from '../../constants/color.js';
import { useReadIntro, useUpdateIntro, useReadRecruitAtIntro, useUpdateRecruitAtIntro } from '@/hooks/Intro/useIntro.js';
import { BackgroundDiv, BaseDiv, IntroHeader, Header, TagWrapper, Tag, Dropdown, DropdownItem, IntroInfoWrapper, LastUpdatedDate, Linear, IntroBody,
	 QnAItem, TitleWrapper, NumberLabel, DeleteButton, InputTitle, AnswerWrapper, InputAnswer, CharCount, InsertOverlay, AddButton, IntroFooter,
	 FooterButton, SaveBtnWrapper, AutoSaveMessage, SidebarButton } from './Rewrite.styles.js';
import { set } from 'lodash';

const OthersRewrite = () => {
	// 1. 기본 설정 & 초기값
	const navigate = useNavigate();
	const inputRef = useRef({});
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
		applyDate: '',
	});
	const [recruitModalContents, setRecruitModalContents] = useState({
		title: '',
		startTime: '',
		endTime: '',
		tags: [],
		link: '',
		applyDate: '',
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
	const [isSideBarOpen, setIsSideBarOpen] = useState(false); // 사이드바 열림 상태
	const [hoveredQuestion, setHoveredQuestion] = useState(null); // 현재 호버된 질문 번호
	const [pendingResult, setPendingResult] = useState(null); // 검색 문단


	useEffect(() => {
		console.log('isCompleted:', isCompleted);
	}, [isCompleted]);

	useEffect(() => {
		console.log('questions:', questions);
	}, [questions]);

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
			applyDate: introData.applyDate,
		});
		setIsCompleted(introData.state);
	}, [introData]);

	// 공고 정보 조회 결과 로컬 state에 저장
	useEffect(() => {
		if(!recruitData) return;
		console.log('공고 데이터: ', recruitData);
		
		setRecruitModalContents({
			title: recruitData.title,
			startTime: recruitData.startTime,
			endTime: recruitData.endTime,
			tags: recruitData.tags,
			link: recruitData.link,
			applyDate: recruitData.applyDate,
		});
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
			applyDate: data.applyDate,
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

		const newQuestions = questions.map((question) =>
			question.number === number ? { ...question, [field]: value } : question
		);

		setQuestions(newQuestions);
		setCharCounts(newQuestions.map((question) =>
			question.content && question.content !== 'string' ? question.content.length : 0
		))
	};

	useEffect(() => {
		Object.values(inputRef.current).forEach((input) => {
			if (input) {
				input.style.height = 'auto'; // 높이 초기화
				input.style.height = `${input.scrollHeight}px`; // 높이 조정
			}
		});
	}, [questions]);

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
		<>
		{modalOpend && <Alert closeModal={toggleModal} deleteResume={deleteResume}></Alert>}
		<div style={{ position: 'relative', zIndex: 1000 }}>
			{isEditApplyModalOpend && (
				<EditApplyModal
					onClose={toggleEditApplyModal}
					onSave={(data) => handleEditApply(data)}
					job={recruitModalContents}
					style={{ position: 'relative', zIndex: 1000 }}
				></EditApplyModal>
			)}
		</div>
		<SidebarButton onClick={() => setIsSideBarOpen(true)}>자소서 도우미</SidebarButton>
		<RightSideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)}>
			<RightSideBarContents
				onAddClick={(result) => {
					setPendingResult(result);
					setIsSideBarOpen(false);
				}}
			/>
		</RightSideBar>
		
		<BackgroundDiv>
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
						<QnAItem key={question.number}>
							<TitleWrapper>
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
							</TitleWrapper>
							<AnswerWrapper
								onMouseEnter={() => setHoveredQuestion(question.number)}
								onMouseLeave={() => setHoveredQuestion(null)}
							>
								<InputAnswer
									placeholder='답변을 작성하세요'
									value={
										question.content && question.content !== 'string' 
										? question.content
										: ''}
									onChange={(e) => handleInputChange(question.number, 'content', e)}
									ref={el => inputRef.current[question.number] = el}
								/>
								<CharCount>
									{charCounts[index]} (공백포함)
								</CharCount>
								{hoveredQuestion === question.number && pendingResult && (
									<InsertOverlay
										onClick={(() => {
										if (pendingResult) {
											setQuestions(prev => 
												prev.map(q => 
													q.number === question.number
													? { ...q, content: (q.content || '') + pendingResult }
													: q
												)
											)
											
											setPendingResult(null);
											setHoveredQuestion(null);
											}
										})}
									>
										삽입
									</InsertOverlay>
								)}
							</AnswerWrapper>
						</QnAItem>
					);
					})}
					<AddButton type="button" onClick={handleAddClick}>+</AddButton>
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
		</>
	);
};

export default OthersRewrite;

const EditApplyButton = styled.div`
	width: 30px;
	height: 30px;

	position: absolute;
	top: 0px;
	right: 10px;
	cursor: pointer;
	z-index: 900;
`

const ApplyDeadLineDate = styled.div`
	font-family: Regular;
	font-size: 14px;
	color: ${(props) => (props.isDeadlineWithin7Days ? Color.subRd : Color.gray02)};
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


