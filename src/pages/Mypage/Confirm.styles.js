import styled from 'styled-components';
import { Color } from '@/constants/color';

export const Container = styled.div`
	max-width: 820px;
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 auto 50px auto;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 0 16px;
		box-sizing: border-box;
	}
`;

export const Text = styled.div`
	max-width: 500px;
	width: 100%;
	color: ${Color.black};
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
	margin-top: 52px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const EmailBox = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 400px;
	width: 100%;
	margin-top: 48px;
	gap: 12px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const EmailTextBox = styled.div`
	max-width: 400px;
	width: 100%;
	gap: 8px;
	display: flex;
	align-items: center;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const EmailText = styled.div`
	color: ${Color.main01};
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 500;
	margin-right: 8px;
`;

export const Email = styled.div`
	color: ${Color.gray02};
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
`;

export const Tag = styled.div`
	width: 65px;
	height: 25px;
	border-radius: 10px;
	background: ${(props) => (props.socialType === 'KAKAO' ? Color.subYe : '#03C75A')};
	color: ${Color.white};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	line-height: 25px;
`;

export const Input = styled.input`
	width: 400px;
	height: 50px;
	padding-left: 20px;
	border: none;
	outline: none;
	border-radius: 10px;
	background: ${Color.gray06};
	color: ${Color.gray02};
	font-family: Pretendard;
	font-size: 16px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		box-sizing: border-box;
	}
`;

export const ErrorMessage = styled.p`
	color: ${Color.error};
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	margin-top: 8px;
`;

export const Button = styled.button`
	max-width: 400px;
	width: 100%;
	height: 50px;
	border-radius: 10px;
	background: ${Color.main01};
	border: none;
	outline: none;
	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 500;
	margin: 48px auto 200px auto;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 0 16px;
		box-sizing: border-box;
	}
`;
