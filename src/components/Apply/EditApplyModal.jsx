import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalTagBox from '../Apply/ModalTagBox';  


const ModalBackdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
`;

const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 10px;
	width: 850px;
	height: 700px;
	max-width: 90%;
	position: relative;
	align-items: center;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 320px;
	height: 620px;
	overflow-y: auto;
	scrollbar-width: none; /* Firefox */
-ms-overflow-style: none; /* IE 10+ */
&::-webkit-scrollbar {
	display: none; /* Chrome, Safari, Opera */
	}
`;

const CloseButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	background: transparent;
	border: none;
	font-size: 2em;
	color: #999;
	cursor: pointer;
`;

const ModalTitle = styled.h2`
	margin-top: 30px;
	margin-bottom: 10px;
	font-size: 1.5em;
	margin-left: 105px;
	font-family: 'Bold';
	font-size: 24px;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-left: 0;
		text-align: center;
		justify-content: center;
	}
`;

const Divider = styled.div`
	width: 650px;
	height: 6px;
	background-color: #ccc;
	margin-bottom: 20px;
	margin: 0 auto 20px;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		display: none;
	}
`;

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
	margin-left: 100px;
	margin-top: 20px;
	font-family: 'ExtraLight';
	font-size: 18px;
	&::after {
		content: ' *';
		color: #fc5555;
	}
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
	text-align: left;
	margin-bottom: 8px;
}
`;

const LabelStart = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
	margin-left: 90px;
	margin-top: 10px;
	font-family: 'ExtraLight';
	font-size: 18px;
	&::after {
		content: ' *';
		color: #fc5555;
	}
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
	text-align: left;
	margin-bottom: 8px;
}
`;

const LabelEnd = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
	margin-right: 70px;
	margin-top: 10px;
	font-family: 'ExtraLight';
	font-size: 18px;
	&::after {
		content: ' *';
		color: #fc5555;
	}
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
	text-align: left;
	margin-bottom: 8px;
}
`;

const InputWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	justify-content: center;
	}
`;

const Input = styled.input`
	width: 640px;
	padding: 12px;
	margin-bottom: 15px;
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	background: #f5f5f5;
	font-size: 1em;
	margin-top: 10px;
	height: 50px;
	font-family: 'ExtraLight';
	font-size: 16px;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
	box-sizing: border-box;
	height: 55px;
	margin-left: 0;
	margin-right: 0;
}
`;

const InputDateStart = styled.input`
	width: 305px;
	padding: 13px;
	height: 50px;
	margin-bottom: 10px;
	margin-left: 85px;
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	background: #f5f5f5;
	font-size: 1em;
	margin-top: -10px;
	font-family: 'ExtraLight';
	font-size: 16px;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
	box-sizing: border-box;
	height: 55px;
	margin-left: 0;
	margin-right: 0;
}
`;

const InputDateEnd = styled.input`
	width: 305px;
	height: 50px;
	padding: 13px;
	margin-bottom: 15px;
	margin-right: 75px;
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	background: #f5f5f5;
	font-size: 1em;
	margin-top: -10px;
	font-family: 'ExtraLight';
	font-size: 16px;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
	box-sizing: border-box;
	height: 55px;
	margin-left: 0;
	margin-right: 0;
}
`;

const InputWrapperStart = styled.div`
	margin-top: 30px;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
}
`;

const InputWrapperEnd = styled.div`
	margin-top: 30px;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
}
`;

const Row = styled.div`
	display: flex;
	justify-content: center;
	gap: 0px;
	width: 100%;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		flex-direction: column;
		align-items: center;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: -20px;
`;

const SaveButton = styled.button`
	width: 640px;
	height: 50px;
	background-color: #3aaf85;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 11px;
	cursor: pointer;
	font-size: 1em;
	margin-top: 10px;
	margin: 20px auto 0 auto;
	margin-left: 105px;
	font-family: 'ExtraLight';
	font-size: 18px;
	&:hover {
		background-color: #35a576;
	}
		@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-left: 0;
		box-sizing: border-box;
	    height: 55px;
		margin-top: 30px;
	}
`;

const LabelTag = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
	margin-left: 96px;
	margin-top: 5px;
	font-family: 'ExtraLight';
	font-size: 18px;
	&::after {
		content: ' *';
		color: #fc5555;
	}
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
	margin-bottom: -12px;
	text-align: left;
}
`;

const LabelLink = styled.label`
	display: block;
	margin-bottom: 10px;
	font-weight: bold;
	margin-left: 95px;
	margin-top: 25px;
	font-family: 'ExtraLight';
	font-size: 18px;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
	text-align: left;
	margin-bottom: 8px;
}
`;

const InputWrapperTag = styled.div`
	margin-top: 20px;
	margin-left: 90px;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
}
`;

const InputWrapperLink = styled.div`
	margin-top: 10px;
	margin-left: 90px;
	font-family: 'ExtraLight';
	font-size: 16px;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	width: 310px;
	margin: 0 auto;
}
`;

const TagBoxWrapper = styled.div`
	margin-top: 20px;
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 0.9em;
	margin-top: 10px;
	text-align: center;
	font-family: 'ExtraLight';
	font-size: 16px;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	margin: 0 auto;
	margin-top: 10px;
}
`;

const FieldWrapper = styled.div`
	margin-bottom: 10px;
`;

const LabelContainer = styled.div`
	margin-top: 10px;
`;

const formatDateTimeToLocal = (dateString) => {
	if (!dateString) return '';

	const utcDate = new Date(dateString);

	// 브라우저의 로컬 타임존으로 자동 변환
	const year = utcDate.getFullYear();
	const month = String(utcDate.getMonth() + 1).padStart(2, '0');
	const day = String(utcDate.getDate()).padStart(2, '0');
	const hours = String(utcDate.getHours()).padStart(2, '0');
	const minutes = String(utcDate.getMinutes()).padStart(2, '0');

	return `${year}.${month}.${day}T${hours}:${minutes}`;
};



const EditApplyModal = ({ onClose, onSave, job }) => {
	const [title, setTitle] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [tags, setTags] = useState(job?.tags || []);
	const [link, setLink] = useState('');
	const [applyDate, setApplyDate] = useState(job?.applyDate || '');

	useEffect(() => {
		if (job) {
		  setTitle(job.title || '');
		  setStartTime(formatDateTimeToLocal(job.startTime) || '');
		  setEndTime(formatDateTimeToLocal(job.endTime) || '');
		  setTags(job.tags || []);  //  초기 태그는 한 번만 설정
		  setLink(job.link || '');
		  setApplyDate(job.applyDate || '');
		}
	  }, [job]);

	const handleSave = async () => {
		const isAnyFieldFilled = title || tags.length > 0 || (startTime && endTime) || link;

		if (!isAnyFieldFilled) {
			alert('최소한 하나의 필드를 입력하세요!');
			return;
		}

		await onSave({
			...job,
			title: title || job.title,
			startTime: startTime || job.startTime,
			endTime: endTime || job.endTime,
			tags: tags.length > 0 ? tags : job.tags,
			link: link || job.link,
			applyDate: applyDate || job.applyDate, 
		});
		onClose();
	};

	const handleTagListChange = (newTags) => {
		setTags(newTags);
	  };

	// 캘린더에서 날짜/시간 선택 시 상태 업데이트
	const handleStartTimeChange = (e) => {
		setStartTime(e.target.value);
	};

	const handleEndTimeChange = (e) => {
		setEndTime(e.target.value);
	};

	return (
		<ModalBackdrop>
			<ModalContent>
				<CloseButton onClick={onClose}>×</CloseButton>
				<ModalTitle>공고 수정</ModalTitle>
				<Divider />
				{/* 공고 제목 필드 */}
				<FieldWrapper>
					<Label>공고 제목</Label>
					<InputWrapper>
						<Input
							type="text"
							placeholder="공고 제목을 수정하세요"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</InputWrapper>
				</FieldWrapper>
				{/* 접수 시작/마감 일시 필드 */}
				<Row>
					<InputWrapper>
						<FieldWrapper>
							<LabelStart>접수 시작 일시</LabelStart>
							<InputWrapperStart>
								<InputDateStart type="datetime-local" value={startTime} onChange={handleStartTimeChange} />
							</InputWrapperStart>
						</FieldWrapper>
					</InputWrapper>
					<InputWrapper>
						<FieldWrapper>
							<LabelEnd>접수 마감 일시</LabelEnd>
							<InputWrapperEnd>
								<InputDateEnd type="datetime-local" value={endTime} onChange={handleEndTimeChange} />
							</InputWrapperEnd>
						</FieldWrapper>
					</InputWrapper>
				</Row>
				{/* 태그 필드 */}
				<FieldWrapper>
  <LabelTag>태그</LabelTag>
  <InputWrapperTag>
    <TagBoxWrapper>
	<ModalTagBox onTagListChange={handleTagListChange} initialTags={job?.tags || []} />
    </TagBoxWrapper>
  </InputWrapperTag>
</FieldWrapper>

				{/* 링크 필드 */}
				<FieldWrapper>
					<LabelContainer>
						<LabelLink>링크</LabelLink>
					</LabelContainer>
					<InputWrapperLink>
						<Input
							type="text"
							placeholder="공고 혹은 접수 페이지 링크를 입력하세요"
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
					</InputWrapperLink>
				</FieldWrapper>
				<ErrorMessage>*최소 하나의 필드를 입력하세요!</ErrorMessage>
				{/* 저장 버튼 */}
				<ButtonWrapper>
					<SaveButton onClick={handleSave}>저장</SaveButton>
				</ButtonWrapper>
			</ModalContent>
		</ModalBackdrop>
	);
};

export default EditApplyModal;
