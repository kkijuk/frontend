import styled from 'styled-components';
import { theme } from '../../constants/theme';
import { Color } from '@/constants/color';

export const Container = styled.div`
	width: 100%;
	max-width: 820px;
	margin: 0 auto;
	background-color: ${Color.white};
	box-sizing: border-box;
`;

export const SearchBox = styled.div`
	width: 100%;
	max-width: 820px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	margin-top: 35px;
	box-sizing: border-box;

	@media (max-width: ${theme.breakpoints.md}) {
		flex-direction: column; /* 작은 화면에서는 세로로 정렬 */
		align-items: flex-start; /* 왼쪽 정렬 */
		height: auto; /* 높이 자동 조정 */
		padding: 0 20px;
		margin-top: 20px; /* 위쪽 여백 조정 */
	}
`;

export const SearchQueryResultBox = styled.div`
	width: 100%;
	max-width: 820px;
	padding: 0 18px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 32px 0;
	box-sizing: border-box;
`;

export const SearchQueryResult = styled.h1`
	color: ${Color.black};
	font-family: Pretendard;
	font-size: 28px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export const BackgroundSection = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: ${Color.gray06};
	position: relative;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 20px 0;
`;
