import React from 'react';
import styled from 'styled-components';
import { theme } from '../constants/theme';
const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-direction: column;

	@media (max-width: ${theme.breakpoints.md}) {
		align-items: stretch;
	}
`;

const Container = styled.div`
	display: flex;
	width: 1280px;
	max-width: 1280px;
	height: 100%;

	@media (max-width: 1280px) {
		justify-content: center;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		flex-direction: column; /* 세로로 배치 */
		width: 100%;
	}
`;

const Top = styled.div`
	width: 820px;
	max-width: 820px;
	height: 68px;

	@media (max-width: 1280px) {
		width: 100%;
		box-sizing: border-box;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		height: auto;
		padding: 16px 0;
	}
`;

const Section = styled.div`
	width: 100%;
	max-width: 820px;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 820px) {
		width: 100%;
		height: auto;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 0;
	}
`;

const RightAside = styled.div`
	width: 230px;
	height: 100%;

	@media (max-width: 1280px) {
		display: none;
	}
`;

const LeftAside = styled.div`
	width: 230px;
	height: 100%;

	@media (max-width: 1280px) {
		display: none;
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

	@media (max-width: ${theme.breakpoints.md}) {
		text-align: center;
	}
`;

export default function Layout({ title, children, leftAsideContent, rightAsideContent }) {
	return (
		<Wrapper>
			<Container>
				<LeftAside>{leftAsideContent}</LeftAside>
				<Section>
					<Top>
						<TitleText>{title}</TitleText>
					</Top>
					{children}
				</Section>
				<RightAside>{rightAsideContent}</RightAside>
			</Container>
		</Wrapper>
	);
}
