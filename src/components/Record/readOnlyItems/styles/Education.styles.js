import styled from 'styled-components';
import { theme } from '@/constants/theme';
import { Color } from '@/constants/color';

const EditContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 45px;
	font-family: 'Regular';
`

const ReadContainer = styled.div`
	width: 100%;
	display: flex;
`
const TimeLine = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0px 70px 0px 30px;

	@media (max-width: ${theme.breakpoints.md}) {
		margin: 0px 24px 0px 0px;
	}
`;

const Oval = styled.div`
	width: 19px;
	height: 19px;
	flex-shrink: 0;
	border-radius: 50%;
	border: 3px solid ${Color.gray02};
	background-color: ${(props) =>
		props.status === '중퇴' || props.status === '편입' || props.status === '졸업' ? Color.gray02 : Color.white};
	
	@media (max-width: ${theme.breakpoints.md}) {
		width: 16px;
		height: 16px;
	}
`;

const Line = styled.div`
	width: 2px;
	height: 100%;
	border-top: none;
	border-right: none;
	border-bottom: none;
	border-left: ${(props) =>
		props.isLastItem
			? 'none'
			: props.status === '중퇴' || props.status === '편입' || props.status === '졸업'
				? `2px solid ${Color.gray02}`
				: `2px dashed ${Color.gray02}`};
	margin-left: 11px;

	@media (max-width: ${theme.breakpoints.md}) {
		margin-left: 9px;
	}
`;

const EditButton = styled.button`
	border: none;
	position: absolute;
	right: 0;
	top:40px;
	background-color: transparent;
	opacity: 0;
	padding: 0px 50px 70px 0px;

	@media (max-width: ${theme.breakpoints.md}) {
		opacity: 1;
	}
`;



const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-start;
	margin-bottom: ${({ isLastItem }) => (isLastItem ? '0' : '42px')};
	font-family: 'Regular';
	positon: relative;

	@media (max-width: ${theme.breakpoints.md}) {
		margin-bottom: ${({ isLastItem }) => (isLastItem ? '0' : '40px')};
	};
`;

const widthByLevelTagCategory = {
	'고등학교': '88px',
	'대학교': '88px',
	'전문대학교': '95px',
	'대학원(석사)': '110px',
	'대학원(박사)': '110px',
}

const mdWidthByLevelCategory = {
	'고등학교': '70px',	
	'대학교': '70px',
	'전문대학교': '80px',
	'대학원(석사)': '85px',
	'대학원(박사)': '85px',
}


const LevelTag = styled.div`
	width: ${(props) => widthByLevelTagCategory[props.category] || 'fit-content'};
	height: 22px;
	background-color: ${Color.gray02};
	color: white;
	padding: 2px 16px;
	border-radius: 5px;
	font-size: 14px;
	font-family: Bold;
	margin-bottom: 10px;
	display: inline-block;
	line-height: 25px;
	display:flex;
	justify-content:center;
	align-items:center;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 12px;
		width: ${(props) => mdWidthByLevelCategory[props.category] || 'fit-content'};
		height: 16px;
		padding: 2px 10px;
		font-weight: 700;
	};
`;

const SchoolInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const SchoolName = styled.div`
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 6px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 16px;
	}
`;

const Department = styled.div`
	font-size: 16px;
	font-weight: 400;
	color: ${Color.gray01};
	margin-bottom: 6px;
	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 14px;
	}
`;

const Dates = styled.div`
	font-size: 16px;
	font-weight: 400;
	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 14px;
	}
`;

const Status = styled.span``;

// edit button 먼저 정의
const FirstContainer = styled.div`
	width: 100%;
	display: flex;
	position:relative;
	&:hover ${EditButton} {
		opacity: 1;
		cursor: pointer;
	}
`;

export {
    EditContainer,
    ReadContainer,
    TimeLine,
    Oval,
    Line,
    EditButton,
    Container,
    LevelTag,
    SchoolInfo,
    SchoolName,
    Department,
    Dates,
    Status,
    FirstContainer,
    widthByLevelTagCategory,
    mdWidthByLevelCategory
};