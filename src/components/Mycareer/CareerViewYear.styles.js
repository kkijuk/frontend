import styled from 'styled-components';
import { theme } from '../../constants/theme';

export const Container = styled.div`
	width: 100%;
	max-width: 820px;
	box-sizing: border-box;
	// padding: 0 15px; /* 좌우 여백 추가로 반응형에서 보기 좋게 */

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 0 10px; /* 작은 화면에서 패딩 조정 */
	}
`;

export const YearBox = styled.div`
	width: 100%;
	gap: 12px;
	margin-bottom: 24px;
`;

export const Year = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	/* font-weight: 400; */
	margin-bottom: 12px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 18px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

export const ListBox = styled.div`
	width: 95%; /* 화면에 맞게 가변적으로 조정 */
	height: auto;
	padding: 12px 24px;
	background-color: white;
	flex-shrink: 0;
	border-radius: 10px;
	margin-bottom: 12px;
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
	cursor: pointer;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 10px; /* 작은 화면에서 패딩 축소 */
	}
`;

export const Category = styled.div`
	display: flex;
	align-items: center;
`;

export const CategoryTextBox = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 12px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

export const CareerName = styled.div`
	color: var(--black, #000);
	font-family: bold;
	font-size: 18px;
	/* font-weight: 700; */

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 16px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

export const AliasName = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	/* font-weight: 400; */

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 16px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

export const CareerContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 8px 0;

	flex-wrap: wrap; /* 작은 화면에서 요소가 줄 바꿈되도록 설정 */
`;

export const Date = styled.div`
	font-size: 12px;
	color: var(--gray-02, #707070);
	/* font-weight: 400; */

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 12px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;
