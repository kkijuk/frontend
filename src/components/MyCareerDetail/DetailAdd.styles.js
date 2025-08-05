import styled from 'styled-components';
import { Color } from '@/constants/color';

export const Box = styled.div`
	height: auto; /*원래 384!*/
	width: 800px;
	padding: 24px 40px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 24px 20px;
		box-sizing: border-box;
	}
`;

export const Top = styled.div`
	display: flex;
	justify-content: space-between;
	height: 79px;
	width: 720px;
	margin-top: 22px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		height: 100%;
		gap: 24px;
		box-sizing: border-box;
		flex-direction: column;
	}
`;

export const Middle = styled.div`
	/*height: 142px;*/
	height: auto;
	width: 800px;
	margin-top: 18px;
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		box-sizing: border-box;
	}
`;

export const Button = styled.div`
	height: auto; /*원래 50*/
	display: flex;
	flex-direction: column; /* 버튼 + 에러 메시지를 세로로 */
	align-items: flex-start;
	gap: 8px;
	margin-bottom: 24px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		/*flex-direction: row;
		width: 100%;
		box-sizing: border-box;
	}
`;

export const Title = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-right: 20px;
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		margin-right: 0px;
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
		box-sizing: border-box;
	}
`;

export const Input = styled.input`
	border-radius: 10px;
	background: ${Color.gray06};
	flex-shrink: 0;
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || 'auto'};
	border: none; /* 테두리를 없앰 */
	font-family: Pretendard;
	font-size: 16px;
	color: ${Color.black};
	padding: 15px 20px; /* 위아래 15px, 양옆 20px */
	box-sizing: border-box; /* padding을 포함한 요소의 전체 크기를 설정된 width와 height에 맞춤 */
	z-index: 1; /* z-index 추가 */
	position: relative; /* z-index가 적용되도록 position 속성 추가 */

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		box-sizing: border-box;
	}
`;

export const TextArea = styled.textarea`
	border-radius: 10px;
	background: ${Color.gray06};
	flex-shrink: 0;
	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || 'auto'};
	border: none; /* 테두리를 없앰 */
	font-family: Pretendard;
	font-size: 16px;
	color: var(--black, #000);
	padding: 15px 20px; /* 위아래 15px, 양옆 20px */
	box-sizing: border-box; /* padding을 포함한 요소의 전체 크기를 설정된 width와 height에 맞춤 */
	z-index: 1; /* z-index 추가 */
	position: relative; /* z-index가 적용되도록 position 속성 추가 */
	resize: none; /* 사용자가 텍스트 영역 크기 조절 못하도록 함 */
	overflow-y: hidden;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		box-sizing: border-box;
	}
`;

export const ButtonRow = styled.div`
	display: flex;
	gap: 15px; /* 버튼 사이 간격 */
	width: 100%;
	justify-content: space-between;
`;

export const ErrorMessage = styled.div`
	color: ${Color.error};
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-top: 9px;
`;
