// Profile.styles.js
import styled from 'styled-components';
<<<<<<< HEAD
import { Color } from '../../constants/color';
=======
import { Color } from '@/constants/color';
>>>>>>> 9b67320c0f0ccf558849a1835ad82db9a97e3aab

export const Container = styled.div`
	width: 220px;
	height: 138px;
	display: flex;
	gap: 9px;
	flex-direction: column;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		display: flex;
		padding: 0px 16px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 9px;
		align-self: stretch;
		width: 100%;
		min-height: 146px;
	}
`;

export const Top = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Text = styled.div`
	color: ${Color.black};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 400;
`;

export const BoldText = styled.div`
	color: ${(props) => props.color || Color.black};
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 700;
	display: inline;
`;

export const Bottom = styled.div`
	width: 220px;
	height: 92px;
	display: flex;
	gap: 12px;
	flex-direction: column;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		min-height: 96px;
	}
`;

export const ActivityBoxContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const ActivityBox = styled.div`
	display: flex;
	flex: 1;
	width: 105px;
	height: 50px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background: ${Color.gray06};

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const ActivityTextBox = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const CenteredTextRow = styled.span`
	display: block;
	text-align: center;
`;

export const ActivityTitle = styled.div`
	color: ${Color.black};
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 400;
`;

export const ActivityNum = styled.div`
	color: ${Color.black};
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 700;
`;

export const Button = styled.button`
	display: inline-flex;
	height: 30px;
	width: 220px;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 10px;
<<<<<<< HEAD
	background: var(--main-01, ${Color.main01});
	color: var(--white, #fff);
=======
	background: ${Color.main01};
	color: ${Color.white};
>>>>>>> 9b67320c0f0ccf558849a1835ad82db9a97e3aab
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-weight: 700;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		height: 34px;
	}
`;
