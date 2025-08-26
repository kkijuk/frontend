import styled from 'styled-components';
import { theme } from '../../constants/theme';
import { Color } from '@/constants/color';

//컬러팔레트 적용 완료

export const ViewToggleStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center; /* top에서 center로 변경하여 수직 중앙 정렬 */
	margin-top: 32px;

	@media (max-width: ${theme.breakpoints.md}) {
		justify-content: space-between; /* 좌우 배치 유지 */
		padding: 0 10px; /* 필요한 경우 좌우 여백 추가 */
	}
`;

export const ToggleButtonsContainer = styled.div`
	display: flex;
	flex-wrap: wrap; /* 버튼이 화면에 맞춰 줄 바꿈되도록 설정 */

	@media (max-width: ${theme.breakpoints.md}) {
		gap: 5px; /* 버튼 사이 간격 조정 (필요한 경우) */
	}
`;

export const ToggleButton = styled.button`
	padding: 8px 20px;
	border-radius: 10px 10px 0px 0px;
	background-color: ${(props) => (props.active ? Color.gray06 : Color.white)};
	cursor: pointer;
	border: 2px solid ${(props) => (props.active ? Color.gray06 : Color.white)};
	width: 85px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	color: ${(props) => (props.active ? '#3AAF85' : '#707070')};
	transition: all 0.3s ease; /* 버튼 클릭 시 부드러운 전환 효과 */

	@media (max-width: ${theme.breakpoints.md}) {
		width: 70px; /* 작은 화면에서는 버튼 너비 축소 */
		font-size: 12px; /* 폰트 크기 축소 */
		padding: 6px 8px; /* 패딩 축소 */
	}
`;

export const ViewTitle = styled.div`
	color: ${Color.black};
	font-family: Pretendard;
	font-size: 20px;
	font-weight: 600;
	margin-left: 6px;

	@media (max-width: ${theme.breakpoints.md}) {
		font-size: 18px; /* 작은 화면에서는 제목 폰트 크기 축소 */
	}
`;
