import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { readMaster, updateMaster } from '../../api/Intro/master';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { use } from 'react';
import { trackEvent } from '../../utils/ga4';
import { theme } from '../../constants/theme';
import { Color } from '@/constants/color';
import { useReadMaster, useUpdateMaster } from '@/hooks/Intro/useMaster';
import { BackgroundDiv, BaseDiv, IntroHeader, Header, TagWrapper, Tag, Dropdown, DropdownItem, Linear, IntroBody,
	 QnAItem, TitleWrapper, NumberLabel, DeleteButton, InputTitle, AnswerWrapper, InputAnswer, CharCount, AddButton, IntroFooter, FooterButton, SaveBtnWrapper, AutoSaveMessage} 
from './Rewrite.styles';

const MasterRewrite = () => {
	// 1. 기본 설정 & 초기값
	const navigate = useNavigate();

	const [charCounts, setCharCounts] = useState([]); // 글자 수
	const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
	const [dropdownOpened, setDropdownOpened] = useState(false); // 드롭다운 열림
	const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false); // 자동 저장 메시지
	const [autoSaveTime, setAutoSaveTime] = useState(''); // 자동 저장 시간

	const [questions, setQuestions] = useState([]);
	const [contents, setContents] = useState({
		oneLiner: '',
		updated_at: '',
		state: 0,
	});
	const [isCompleted, setIsCompleted] = useState(0);

	// 2. 서버 통신
	const { data: masterData, isLoading, isError } = useReadMaster();
	const { mutate: updateMasterData } = useUpdateMaster();
	console.log('masterData:', masterData);


	// masterData 상태 업데이트
	useEffect(() => {
		if (masterData) {
			const updatedQuestions = masterData.questionList.map((q, i) => {
				let title = q.title;
				let content = q.content;

				if(!title || title === 'string') {
					if (i === 0) title = '지원동기 및 포부 [소제목]';
					else if (i === 1) title = '장단점 [소제목]';
					else if (i === 2) title = '직무적합성 [소제목]';
					else title = '';
				}

				return {
					...q,
					title: title,
					content: content,
				}
			})

			setQuestions(updatedQuestions);
			setContents({
				oneLiner: masterData.oneLiner,
				updated_at: masterData.updatedAt,
				state: masterData.state,
			});
			setIsCompleted(masterData.state);
		}
	}, [masterData]);	

	//(API) 마스터 수정
	const submitData = async () => {
		// if (!questions) return;

		const dataToSubmit = {
			oneLiner: contents.oneLiner,
			questionList: questions,
			state: isCompleted,
		};

		updateMasterData(dataToSubmit, {
			onSuccess: () => {
				setAutoSaveTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
				setShowAutoSaveMessage(true);
				setTimeout(() => {
					setShowAutoSaveMessage(false);
				}, 3000);
			}
		});
	};
	
	// 3. 핸들링 함수

	// 글자 수 계산
	useEffect(() => {
		setCharCounts(
			questions.map((question) => 
				question.content && question.content !== 'string' ? question.content.length : 0
		));
	}, [questions]);

	// 질문-답변 변경 핸들러
	const handleInputChange = (index, field, event) => {
		const textarea = event.target;
		const value = textarea.value;

		if (field === 'content') {
			textarea.style.height = 'auto'; // 높이 초기화
			textarea.style.height = `${textarea.scrollHeight}px`; // 높이 조정
		}

		const updatedQuestions = questions.map((q, i) =>
			i === index ? { ...q, [field]: value } : q
		);
		setQuestions(updatedQuestions);
	};

	// 한줄 소개 변경 핸들러
	const handleOneLinerChange = (field, value) => {
		setContents({ ...contents, [field]: value });
	};

	// 질문 추가
	const handleAddClick = () => {
		// 새로 추가할 question 객체 생성
		const maxNumber = questions.length
		? Math.max(...questions.map((q) => q.number))
		: -1;

		const newQuestion = {
			title: '',
			content: '',
			number: maxNumber + 1,
		};

		setQuestions(prev => [...prev, newQuestion]);
	};

	// 질문 삭제
	const deleteItem = (number) => {
		setQuestions(prev => prev.filter(q => q.number !== number));
	};

	// 마스터 자소서 자동 저장
	useEffect(() => {
		const interval = setInterval(() => {
			submitData();
		}, 60000);
		return () => clearInterval(interval);
	}, [questions, contents, isCompleted]); 

	// 마스터 자소서 수동 저장
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

			trackEvent('add_confirm', {
				category: 'coverletter',
				detail: 'add_coverletter',
				action_type: 'confirm',
				label: '저장하고 나가기',
			});
		}
	};

	// 드롭다운 클릭
	const handleDropdownClick = (isCompleted) => {
		setDropdownOpened(true);
		setIsCompleted(isCompleted);
		setDropdownOpened(false);
	};

	return (
		<BackgroundDiv>
			{showLoadingSpinner && <LoadingSpinner message = "마스터 자소서 수정 중..."/>}
			<BaseDiv>
				<IntroHeader>
					<Header>
						<Title>
							Master 자기소개서
						</Title>
						<TagWrapper>
							<Tag onClick={()=>{setDropdownOpened(!dropdownOpened)}} isCompleted={isCompleted}>
									{isCompleted ? '작성 완료' : '작성 중'} ▼
							</Tag>
							{dropdownOpened && (
								<Dropdown>
									<DropdownItem onClick={() => handleDropdownClick(0)}>작성 중</DropdownItem>
									<DropdownItem onClick={() => handleDropdownClick(1)}>작성 완료</DropdownItem>
								</Dropdown>
							)}
						</TagWrapper>
					</Header>
					<Linear/>
				</IntroHeader>

				<IntroBody>
					{/* 한줄소개 */}
					<InputTitle
						id="oneLiner"
						placeholder="한줄소개를 입력하세요"
						value={contents.oneLiner || ''}
						style={{ borderRadius: '10px', padding: '10px 20px'}}
						onChange={(e) => handleOneLinerChange(e.target.id, e.target.value)}
					/>

					{questions.map((question, index) => {
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
						<QnAItem key={index} style={{position:'relative'}}>
							<TitleWrapper>
									<NumberLabel
										style={{ 
											color: `${Color.gray02}`,
											fontSize: '24px',
											cursor: 'default',
										}}>
										{index + 1}
									</NumberLabel>
									<InputTitle
										placeholder={titlePlaceholder}
										value={currentTitle}
										onChange={(e) => handleInputChange(index, 'title', e)}
									/>
									<DeleteButton
										onClick={() => deleteItem(question.number)}
									>
											삭제
									</DeleteButton>
							</TitleWrapper>
							<AnswerWrapper>
								<InputAnswer
									placeholder={contentPlaceholder}
									value={currentContent}
									onChange={(e) => handleInputChange(index, 'content', e)}
								/>
								<CharCount>
									{currentContent.length} (공백 포함)
								</CharCount>
							</AnswerWrapper>
						</QnAItem>
						);
					})}
					<AddButton onClick={handleAddClick}>+</AddButton>
				</IntroBody>
				
				{/* <div style={{ height: '70px' }}></div> */}
				<IntroFooter>
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
				{/* <div style={{ height: '70px' }}></div> */}
			</BaseDiv>
		</BackgroundDiv>
	);
};
export default MasterRewrite;

const Title = styled.div`
	font-family: semibold;
	font-size: 28px;
	// margin-bottom: 20px;
	font-weight: 700;

	@media (max-width: ${theme.breakpoints.md}) {
		margin-bottom: 0px;
	}
`


