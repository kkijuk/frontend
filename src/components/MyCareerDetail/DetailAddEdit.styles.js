import styled from 'styled-components';
import { Color } from '@/constants/color';

export const Box = styled.div`
	height: auto;
	width: 800px;
	padding: 24px 40px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 24px 20px;
	}
`;

export const Top = styled.div`
	display: flex;
	justify-content: space-between;
	height: 79px;
	width: 720px;
	margin-top: 22px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-direction: column;
		width: 100%;
		height: 100%;
		gap: 24px;
	}
`;

export const Middle = styled.div`
	height: auto;
	width: 800px;
	margin-top: 18px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const Button = styled.div`
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;
	margin-bottom: 24px;
`;

export const Title = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-right: 20px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		margin-right: 0;
	}
`;

export const Date = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const DateBox = styled.div`
	flex: 1;
	border-radius: 10px;
	cursor: pointer;
	height: 50px;
	width: 240px;
	padding: 15px 20px;
	box-sizing: border-box;
	background: ${Color.gray06};
	color: ${Color.gray02};
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const Label = styled.div`
	color: var(--black, #000);
	font-family: semibold;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-bottom: 8px;
`;

export const Cancel = styled.div`
	width: 150px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1.5px solid ${Color.subRd};
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${Color.subRd};
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	cursor: pointer;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: calc(50% - 7.5px);
	}
`;

export const Save = styled.div`
	width: 100%;
	max-width: 555px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: ${Color.main01};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${Color.white};
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	cursor: pointer;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: calc(50% - 7.5px);
	}
`;

export const Line = styled.div`
	width: 800px;
	height: 2px;
	background: ${Color.gray03};

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const Input = styled.input`
	border-radius: 10px;
	background: ${Color.gray06};
	flex-shrink: 0;
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || 'auto'};
	border: none;
	font-family: Pretendard;
	font-size: 16px;
	color: ${Color.black};
	padding: 15px 20px;
	box-sizing: border-box;
	z-index: 1;
	position: relative;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const TextArea = styled.textarea`
	border-radius: 10px;
	background: ${Color.gray06};
	flex-shrink: 0;
	/*height: ${(props) => props.height || 'auto'};*/
	min-height: 100px;
	width: ${(props) => props.width || 'auto'};
	border: none;
	font-family: Pretendard;
	font-size: 16px;
	color: var(--black, #000);
	padding: 15px 20px;
	box-sizing: border-box;
	z-index: 1;
	position: relative;
	resize: none;
	overflow-y: hidden;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const ErrorMessage = styled.div`
	color: ${Color.error};
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	margin-top: 5px;
`;

export const BlurContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(4px);
	z-index: 11;
`;

export const BaseContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 12;
`;

export const ButtonRow = styled.div`
	display: flex;
	gap: 15px; /* 버튼 사이 간격 */
	width: 100%;
	justify-content: space-between;
`;
