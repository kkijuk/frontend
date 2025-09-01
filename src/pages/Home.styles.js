import styled from 'styled-components';
import { Color } from '@/constants/color';

export const Container = styled.div`
	display: flex;
	height: auto;
	gap: 32px;
	flex-direction: column;
	margin: 48px auto 48px;
	width: 100%;
	max-width: 820px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		margin: 24px auto;
		padding: 0 16px;
	}
`;

export const Top = styled.div`
	width: 100%;
	max-width: 820px;
	height: auto;
	display: flex;
	gap: 20px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		flex-direction: column;
		align-items: center;
	}
`;

export const TopBox1 = styled.div`
	display: flex;
	width: 240px;
	height: 160px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: 1px solid ${Color.gray03};

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 20px 0px;
	}
`;

export const TopBox2 = styled.div`
	width: 560px;
	height: 160px;
	flex-shrink: 0;
	border-radius: 10px;
	background: ${Color.white};

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const Middle = styled.div`
	width: auto;
	height: auto;
	max-width: 820px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const Bottom = styled.div`
	width: auto;
	max-width: 820px;
	height: auto;
	display: flex;
	flex-direction: column;
	gap: 16px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		align-items: center;
	}
`;

export const BottomText = styled.div`
	color: ${Color.black};
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	/*font-weight: 700;*/
	line-height: normal;
	align-self: flex-start;
`;

export const CareerDeatailWrapper = styled.div`
	box-sizing: border-box;
	width: auto;
	height: auto;
	padding: 24px 30px;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 24px;

	border-radius: 10px;
	background: ${Color.gray06};
`;

export const CareerDetailContentBox = styled.div`
	box-sizing: border-box;
	height: 212px;
	border-radius: 10px;
	background: ${Color.white};
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
	cursor: pointer;
`;

export const AddCareerDetailBox = styled(CareerDetailContentBox)`
	padding: 16px 24px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CareerDetailBox = styled(CareerDetailContentBox)`
	padding: 16px 24px 20px 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;
`;

export const ActivityBox = styled.div`
	width: auto;
	height: auto;
	display: flex;
	justify-content: space-between;
	gap: 16px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		display: flex;
		gap: 16px;
		flex-direction: column;
	}
`;

export const AddButton = styled.button`
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background-color: ${Color.main01};
	color: white;
	cursor: pointer;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
