import styled from 'styled-components';
import { theme } from '../../constants/theme';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 30px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		padding: 0 16px;
	}
`;

export const SearchIcon = styled.svg`
	width: 25px;
	height: 25px;
	flex-shrink: 0;
	fill: var(--gray-02, #707070);
	cursor: pointer;
`;

export const CareerBoxContainer = styled.div`
	width: 100%;
	max-width: 820px;
	height: 68px;
	margin-top: 40px;
	display: flex; /* 플렉스 박스를 사용 */
	flex-wrap: nowrap; /* 줄 바꿈을 방지 */
	gap: 10px; /* 박스 간격 */
	overflow-x: auto; /*가로 스크롤 활성화 */
	overflow-y: hidden; /*세로 스크롤 방지 */
	white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
	position: relative; /* 제발*/

	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		max-width: 100%;
		width: 100%;
	}
`;

export const CareerContentContainer = styled.div`
	/*width: 720px;*/
	width: 100%;
	max-width: 720px;
	height: ${(props) => (props.isEditing ? '175px' : 'auto')}; /* 편집 상태에 따라 높이 변경 원래 auto 대신 88*/
	margin-top: 32px;
	margin-bottom: 28px;

	box-sizing: border-box;
	position: relative; /* 위치를 기준으로 자식 컴포넌트가 확장 */

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		max-width: 100%;
		width: 100%;
		height: auto;
		padding: 0 16px;
	}
`;

export const TitleContainer = styled.div`
	height: 30px;
	width: 100%;
	display: flex; /* 요소를 가로로 배치 */
	justify-content: space-between; /* 양쪽 끝에 요소 배치 */
	align-items: center; /* 세로 가운데 정렬 */
`;

export const TitleBox = styled.div`
	height: 30px;
	display: flex; /* 요소를 가로로 배치 */
	gap: 20px;
`;

export const IconWrapper = styled.div`
	width: 30px;
	height: 30px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	svg {
		width: 30px;
		height: 30px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 24px;
		height: 24px;

		svg {
			width: 24px;
			height: 24px;
		}
	}
`;

export const Title = styled.div`
	color: #000;

	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export const Date = styled.div`
	height: 15px;
	color: #707070;

	margin-top: 8px;
	margin-bottom: 20px;

	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const Content = styled.div`
	width: 720px;
	height: auto;
	color: ${({ hasSummary }) => (hasSummary ? '#000' : 'var(--gray-02, #707070)')};
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-decoration: ${({ hasSummary }) => (hasSummary ? 'none' : 'underline')};
	text-decoration-style: solid;
	text-decoration-skip-ink: none;
	text-decoration-thickness: auto;
	text-underline-offset: auto;
	text-underline-position: from-font;
`;

export const Line = styled.div`
	width: 100%;
	max-width: 800px;
	height: 6px;
	margin-bottom: 2px; /*추가*/
	background: var(--gray-03, #d9d9d9);

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		max-width: 100%;
		width: 100%;
		padding: 0 16px;
	}
`;

export const CareerListBox = styled.div`
	wideh: 100%;
	max-width: 800px;
	height: auto; /* 원래 560px */
	/* overflow-y: auto; 삭제 */
	overflow-x: hidden;

	/*box-sizing: border-box;
	border: 1px solid black;*/

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		max-width: 100%;
		width: 100%;
		padding: 0 16px;
	}
`;

export const CareerPlus = styled.button`
	max-width: 720px;
	width: 100%;
	height: 50px;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	border: none;
	color: white;
	cursor: pointer;
	position: sticky; /* fixed → absolute */

	left: 0;
	right: 0;
	margin: auto;

	bottom: ${(props) => (props.isFixed ? '220px' : '30px')}; /* 🚀 기본적으로 30px, 남은 높이 200px 이하일 때는 200px */
	transition: bottom 0.2s ease-in-out; /* 부드러운 이동 효과 뭘까이건*/

	margin-top: 20px;
	margin-bottom: 20px;

	z-index: 10;
	color: #fff;

	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	background: ${(props) => (props.disabled ? 'var(--gray-03, #D9D9D9)' : 'var(--main-01, #3AAF85)')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		max-width: 100%;
		width: 100%;
		box-sizing: border-box;ㄴ
	}
`;

export const EditActivityContent = styled.div`
	max-width: 720px;
	width: 100%;
	height: 106px;
	box-sizing: border-box;

	display: flex; /* 가로 배치 */
	justify-content: space-between; /* 양쪽 끝에 배치 */
	align-items: center; /* 세로 가운데 정렬 */

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		flex-direction: column;
		align-items: stretch; /* 버튼 너비 100% */
		height: auto;
		gap: 16px;
	}
`;

export const Textbox = styled.textarea`
	max-width: 625px;
	width: 100%;
	height: 106px;
	flex-shrink: 0;
	padding: 10px; /* 텍스트 영역 내부 여백 */
	border: none;
	box-sizing: border-box;
	outline: none; /* 파란색 테두리 제거 */

	border-radius: 10px;
	background: #f5f5f5;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const EditBoxContainer = styled.div`
	width: 80px;
	min-height: 106px;
	gap: 6px;
	display: flex;
	flex-direction: column; /* 세로 배치 */
	align-items: center; /* 버튼 가운데 정렬 */

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		min-height: auto;
		height: auto;
		flex-direction: row;
		justify-content: space-between;
		gap: 6px;
	}
`;

export const CancelButton = styled.button`
	width: 80px;
	height: 40px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--sub-bu, #77aff2);

	color: var(--sub-bu, #77aff2);
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-basis: calc(50% - 3px);
		height: 50px;
	}
`;

export const EditButton = styled.button`
	width: 80px;
	height: 60px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	border: none;

	color: #fff;

	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-basis: calc(50% - 3px);
		height: 50px;
	}
`;

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column; /* 위에서 아래로 배치 */
	align-items: center; /* 필요하면 가운데 정렬 */
	width: 100%; /* 전체 너비 */

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		padding: 0 16px;
		box-sizing: border-box;
	}
`;

export const NoContents = styled.div`
	max-width: 600px;
	width: 100%;
	height: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	color: #707070;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	text-align: center;
	position: relative;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		max-width: 100%;
		width: 100%;
		padding: 0 16px;
	}
`;

export const ContentWrapper = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	width: 100%; /* 부모 컨테이너 전체 너비 */
`;

export const EditTag = styled.div`
	width: 65px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);

	margin-left: auto; /* 오른쪽 정렬 */
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

export const categoryToColorMap = {
	동아리: '#FCC400',
	대외활동: '#77AFF2',
	공모전대회: '#BB7AEF',
	프로젝트: '#78D333',
	경력: '#FA7C79',
	교육: '#F99538',
	기타: '#707070',
	default: '#707070',
};

export const NameTag = styled.div`
	display: inline-flex;
	height: 20px;
	padding: 2px 16px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	background-color: ${(props) => props.bgColor || categoryToColorMap['default']};
	color: white;
	font-size: 14px;
	font-weight: bold;
	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
