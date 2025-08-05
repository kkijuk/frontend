import styled from 'styled-components';
import { Color } from '@/constants/color';

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const Top = styled.div`
	width: 464px;
	margin-top: 7px;
	margin-bottom: 31px; /* 오타 수정: margin-bottim → margin-bottom */
`;

export const Title = styled.h2`
	color: ${Color.black};
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export const ContentArea = styled.div`
	margin: 0 auto;
	background-color: ${Color.white};
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	flex-direction: column;
	overflow-y: auto;
`;

export const InterestArea = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(8, auto);
	box-sizing: border-box;
	gap: 10px;
	justify-content: center;
`;

export const SaveButton = styled.button`
	width: 100%;
	height: 52px;
	flex-shrink: 0;
	background-color: ${Color.main01};
	color: ${Color.white};
	padding: 10px 20px;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	font-size: 18px;

	margin-top: 32px;
	margin-bottom: 30px;

	display: flex;
	justify-content: center;
	align-items: center;

	text-align: center;
	font-family: Pretendard;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	&:hover {
		background-color: ${Color.main_hover};
	}
`;
