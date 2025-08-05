import styled from 'styled-components';
import { Color } from '@/constants/color';

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 100px;
	margin-bottom: 50px;
`;

export const Top = styled.div`
	width: 464px;
	margin-top: 17px;
	margin-bottom: 32px;
	display: flex;
	justify-content: left;
	align-items: center;
`;

export const Title = styled.h2`
	color: ${Color.black};
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export const EditButton = styled.button`
	width: 65px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	border: none;
	background: ${Color.gray06};
	margin-left: 10px;
	cursor: pointer;

	color: ${Color.gray02};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	&:hover {
		background-color: #f1f1f1;
	}
`;

export const ContentArea = styled.div`
	margin: 0 auto;
	background-color: white;
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
