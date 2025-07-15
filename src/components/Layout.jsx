import React from 'react';
import { useLocation } from 'react-router-dom';
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
		flex-direction: column;
		width: 100%;
	}
`;

const Top = styled.div`
	width: 820px;
	max-width: 820px;
	height: ${({ hide }) => (hide ? '0' : '68px')};
	overflow: hidden; // 높이 0일 때 내용 숨김

	@media (max-width: 1280px) {
		width: 100%;
		box-sizing: border-box;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		height: ${({ hide }) => (hide ? '0' : 'auto')};
		box-sizing: border-box;
	}
`;

const Section = styled.div`
	width: 100%;
	max-width: ${({ isApply }) => (isApply ? '100%' : '820px')};
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 820px) {
		width: 100%;
		height: auto;
	}

	@media (max-width: 768px) {
		box-sizing: border-box;
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
		text-align: ${({ isLeftAlign }) => (isLeftAlign ? 'left' : 'center')};
		margin-left: ${({ isLeftAlign }) => (isLeftAlign ? '20px' : '0px')};
		// margin-bottom: ${({ isLeftAlign }) => (isLeftAlign ? '32px' : '0px')};
	}
`;

export default function Layout({ title, children, leftAsideContent, rightAsideContent }) {
	const location = useLocation();

	const isApplyPage = title === '지원관리';
	const isHistoryPage = title === '서류준비';
	const isHistoryApplySelectPage = location.pathname.includes('/history/select');

	return (
		<Wrapper>
			<Container>
				<LeftAside>{leftAsideContent}</LeftAside>
				<Section>
					<Top hide={isHistoryApplySelectPage}>
						<TitleText isLeftAlign={isApplyPage || isHistoryPage}>{title}</TitleText>
					</Top>
					{children}
				</Section>
				<RightAside>{rightAsideContent}</RightAside>
			</Container>
		</Wrapper>
	);
}
