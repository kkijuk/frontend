import styled from 'styled-components';
import { theme } from '../../constants/theme';

export const Container = styled.div`
	max-width: 860px;
	margin-bottom: 24px;
`;

export const CategoryBox = styled.div`
	width: 100%;
	max-width: 820px;
	margin-bottom: 24px;
	padding: 0 15px; /* 좌우 여백 추가 */

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 0 10px; /* 작은 화면에서 패딩 조정 */
	}
`;

export const Category = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 12px;
`;

export const CategoryText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
	line-height: normal;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 16px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

export const ListBox = styled.div`
	width: 95%;
	height: auto;
	padding: 12px 24px;
	flex-shrink: 0;
	border-radius: 10px;
	margin-bottom: 12px;
	background: var(--white, #fff);
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
	cursor: pointer;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 10px; /* 작은 화면에서 패딩 축소 */
	}
`;

export const Name = styled.div``;

export const AliasName = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 3px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 14px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

export const CareerContainer = styled.div`
	display: flex; /* Flexbox로 가로 정렬 */
	align-items: center; /* 세로 가운데 정렬 (선택 사항) */
`;

export const CareerName = styled.div`
	color: var(--black, #000);
	font-family: bold;
	font-size: 16px;
	font-weight: 700;
	font-style: regular;
	line-height: normal;
	margin-bottom: 9px;
`;

export const Date = styled.div`
	font-size: 12px;
	color: var(--gray-02, #707070);
	font-weight: 400;
`;
