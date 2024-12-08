import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;

const Container = styled.div`
	display: flex; /* 가로로 자식들을 배치 */
	width: 1280px;
	max-width: 1280px; /* 최대 너비 설정 */

	height: 100%;

	/* 화면이 1280px 이하로 줄어들면 Section을 가운데 정렬 */
	@media (max-width: 1280px) {
		justify-content: center; /* Section을 가운데 정렬 */
	}
`;

const Top = styled.div`
	width: 820px;
	max-width: 820px; /* 최대 너비 설정 */
	height: 68px;

	background-color: none;
	@media (max-width: 820px) {
		width: 100%; /* 작은 화면에서는 100% 너비를 차지 */
		box-sizing: border-box;
	}
`;

const Section = styled.div`
	width: 820px;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center; /* 컨텐츠를 가운데 정렬 */

	//background-color: #eba66e;

	@media (max-width: 1280px) {
		width: 100%; /* 작은 화면에서 Section이 전체 너비를 차지 */
		height: auto; /* 높이 자동 */
	}
`;

const RightAside = styled.div`
	width: 230px;
	height: 100%;

	background-color: none;
	@media (max-width: 1280px) {
		display: none; /* 1280px보다 작을 때 숨김 */
	}
`;

const LeftAside = styled.div`
	width: 230px;
	height: 100%;

	background-color: none;
	@media (max-width: 1280px) {
		display: none; /* 1280px보다 작을 때 숨김 */
	}
`;

const TitleText = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-top: 35px;
'`;

export default function Layout({ title, children }) {
	return (
		<Wrapper>
			<Container>
				<LeftAside></LeftAside>
				<Section>
					<Top>
						<TitleText>{title}</TitleText>
					</Top>
					{children}
				</Section>
				<RightAside></RightAside>
			</Container>
		</Wrapper>
	);
}
