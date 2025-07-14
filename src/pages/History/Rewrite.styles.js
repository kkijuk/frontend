import styled from 'styled-components';
import { theme } from '../../constants/theme';
import { Color } from '@/constants/color';

const BackgroundDiv = styled.div`
	height: 100%;
	margin-top: 40px;
	display: flex;
	justify-content: center;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 0 20px;
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

const Header = styled.div`
	display: flex;
	gap: 24px;
	alignItems: center;

	@media (max-width: ${theme.breakpoints.md}) {
		width: 100%;
		flex-direction: column;
		gap: 12px;
	}
`

const TagWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;
	cursor: pointer;
`;

const Tag = styled.div`
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

const Dropdown = styled.div`
	width: 65px;
	height: 48px;
	padding: 12px 8px;

	display: flex;
	flex-direction: column;
	gap: 4px;

	border-radius: 13px;
	border: 1px solid ${Color.gray03};
	background: ${Color.white};

	position: absolute;
	top: 30px;

	@media (max-width: ${theme.breakpoints.md}) {
		width: 66px;
		top: 70px;
	}
`;

const DropdownItem = styled.div`
	height: 14px;
	padding: 4px 8px;
	border-radius: 4px;

	background: ${Color.white};

	color: ${Color.gray01};
	text-align: center;
	font-family: Regular;
	font-size: 13px;
	font-weight: 400;

	cursor: pointer;

	&:hover {
		background: ${Color.gray06};
	}
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
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 12px;
`

const TitleWrapper = styled.div`
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

					@media (max-width: ${theme.breakpoints.md}) {
						width: 40%;
					}
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

export {
    BackgroundDiv,
    BaseDiv,
	IntroHeader,
	Header,
	TagWrapper,
	Tag,
    Dropdown,
    DropdownItem,
	IntroInfoWrapper,
	LastUpdatedDate,
	Linear,
	IntroBody,
	QnAItem,
	TitleWrapper,
	NumberLabel,
	DeleteButton,
	InputTitle,
	AnswerWrapper,
	InputAnswer,
	CharCount,
	AddButton,
	IntroFooter,
	FooterButton,
	SaveBtnWrapper,
	AutoSaveMessage
}