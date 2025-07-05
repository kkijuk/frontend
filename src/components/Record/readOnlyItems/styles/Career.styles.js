import styled from 'styled-components';
import { theme } from '@/constants/theme';
import { Color } from '@/constants/color';

const TimeLine = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px 70px 0px 30px;
    height: auto;

    @media (max-width: ${theme.breakpoints.md}) {
        margin: 0px 24px 0px 0px;
        height: auto;
    }
`;

const Oval = styled.div`
    width: 19px;
    height: 19px;
    flex-shrink: 0;
    border-radius:50%;
    background-color: ${(props) =>
            !props.isPastDue
                ? Color.white
                : props.category === '동아리'
                    ? Color.subYe
                    : props.category === '대외활동'
                        ? Color.subBu
                        : props.category === '공모전/대회'
                            ? Color.subPu
                            : props.category === '프로젝트'
                                ? Color.subGn
                                : props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서'
                                    ? Color.subRd
                                    : props.category === '교육'
                                        ? Color.subOg
                                        : props.category === '기타'
                                            ? Color.gray02
                                            : Color.black};
    border: ${(props) =>
			props.category === '동아리'
				? `3px solid ${Color.subYe}`
				: props.category === '대외활동'
					? `3px solid ${Color.subBu}`
					: props.category === '공모전/대회'
						? `3px solid ${Color.subPu}`
						: props.category === '프로젝트'
							? `3px solid ${Color.subGn}`
							: props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서'
								? `3px solid ${Color.subRd}`
								: props.category === '교육'
									? `3px solid ${Color.subOg}`
									: props.category === '기타'
										? `3px solid ${Color.gray02}`
										: `3px solid ${Color.black}`};
                                        
		@media (max-width: ${theme.breakpoints.md}) {
			width: 16px;
			height: 16px;
		}
    }
`;

const Line = styled.div`
	width: 2px;
	flex-grow: 1;
	// height: ${(props) => (props.isSummaryEditMode ? '220px' : '166px')};
	// height: 100%;
	border-top: none;
	border-right: none;
	border-bottom: none;
	margin-left: 9.5px;
	@media (max-width: ${theme.breakpoints.md}) {
		margin-left: 9.5px;
		// height: ${(props) => (props.isSummaryEditMode ? '303px' : '166px')};
		// height: 100%;
	}
	border-left: ${(props) =>
		props.isLastItem
			? 'none'
			: props.category === '동아리' && props.isPastDue
				? `2px solid ${Color.subYe}`
				: props.category === '대외활동' && props.isPastDue
					? `2px solid ${Color.subBu}`
					: props.category === '공모전/대회' && props.isPastDue
						? `2px solid ${Color.subPu}`
						: props.category === '프로젝트' && props.isPastDue
							? `2px solid ${Color.subGn}`
							: props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서' && props.isPastDue
								? `2px solid ${Color.subRd}`
								: props.category === '교육' && props.isPastDue
									? `2px solid ${Color.subOg}`
									: props.category === '기타' && props.isPastDue
										? `2px solid ${Color.gray02}`
										: props.category === '동아리' && !props.isPastDue
											? `2px dashed ${Color.subYe}`
											: props.category === '대외활동' && !props.isPastDue
												? `2px dashed ${Color.subBu}`
												: props.category === '공모전/대회' && !props.isPastDue
													? `2px dashed ${Color.subPu}`
													: props.category === '프로젝트' && !props.isPastDue
														? `2px dashed ${Color.subGn}`
														: props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서' && props.isPastDue && !props.isPastDue
															? `2px dashed ${Color.subRd}`
															: props.category === '교육' && !props.isPastDue
																? `2px dashed ${Color.subOg}`
																: props.category === '기타' && !props.isPastDue
																	? `2px dashed ${Color.gray02}`
																	: `2px dashed ${Color.black}`};
`;

const EditButton = styled.button`
	border: none;
	position: absolute;
	right: 0;
	top:40px;
	background-color: transparent;
	opacity: 0;
	// transition: opacity 0.2s ease;
	padding: 0px 50px 70px 0px;
	@media (max-width: ${theme.breakpoints.md}) {
		opacity: 1;
		top: 0px;
	}
`;

const Container = styled.div`
	display: flex;
	height: auto;
	flex-direction: row;
	margin-bottom: 45px;
	font-family: 'Regular';
	position: relative;
	cursor: pointer;
	&:hover ${EditButton} {
		opacity: 1;
		cursor: pointer;
	}
`;


const LevelTag = styled.div`
	width: 80px;
	height: 22px;
	background-color: ${(props) =>
		props.category === '동아리'
			? Color.subYe
			: props.category === '대외활동'
				? Color.subBu
				: props.category === '공모전/대회'
					? Color.subPu
					: props.category === '프로젝트'
						? Color.subGn
						: props.category === '아르바이트'|| props.category === '인턴'|| props.category === '정규직'|| props.category === '계약직'|| props.category === '프리랜서'
							? Color.subRd
							: props.category === '교육'
								? Color.subOg
								: Color.gray02};
	color: white;
	border-radius: 5px;
	font-size: 14px;
	font-family: 'Regular';
	font-weight: 700;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	line-height: 25px;
	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 12px;
		width: 80px;
		height: 16px;
		padding: 4px 10px;
		font-weight: 700;
	};
`;

const SchoolInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const SchoolName = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 5px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 16px;
	}
`;

const Department = styled.div`
	font-size: 14px;
	color: ${Color.gray01};
	margin-bottom: 5px;
	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 14px;
	}
`;

const Dates = styled.div`
	font-size: 16px;
`;

const Status = styled.span`
	margin-left: 10px;
	font-family: 'Regular';
`;

const DetailContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
`;

const DetailLabel = styled.div`
	width: 58px;
	font-weight: 600;
	margin-right: 30px;
	flex-shrink: 0;
	@media (max-width: ${theme.breakpoints.md}) {
		margin-right: 20px;
	}
`

const DetailWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	// margin-top: 10px;
	@media (max-width: ${theme.breakpoints.md}) {
		flex-direction: column;
	}
`

const DetailTextArea = styled.textarea`
	width: 519px;
	height: 76px;
	padding: 10px;
	border-radius: 7px;
	border: none;
	background: ${Color.gray05};
	font-family: 'Regular';
	font-size: 16px;
	resize: none;
	:: plcaeholder {
		color: #707070;
		font-family: 'Regular';
		font-size: 16px;
		white-space: pre-line;
	}
	@media (max-width: ${theme.breakpoints.md}) {
		width: 205px;
		height: 119px;
		padding: 16px;
		font-size: 14px;
		margin-bottom: 15px;
	}
`

const ButtonWrapper = styled.div`
	padding: 15px 0px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	align-items: center;

	@media (max-width: ${theme.breakpoints.md}) {
		flex-direction: row;
		gap: 12px;
		padding: 0px;
	}
`

const DetailSaveButton = styled.button`
	all: unset;
	width: 25px;
	height: 17px;
	padding: 4px 20px;
	margin-left: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	border: none;
	background: ${Color.main01};
	cursor = pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Regular';
	font-size: 14px;
	color: white;
	cursor: pointer;
	@media (max-width: ${theme.breakpoints.md}) {
		width: 72.5px;
		height: 17px;
		padding: 4px 20px;
		font-size: 14px;
		border-radius: 10px;
		margin-left: 0px;
	}
`
const FirstContainer = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	position:relative;
	&:hover ${EditButton} {
		opacity: 1;
		cursor: pointer;
	}
`;

export {
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
    DetailContainer,
    DetailLabel,
    DetailWrapper,
    DetailTextArea,
    ButtonWrapper,
    DetailSaveButton,
    FirstContainer
};