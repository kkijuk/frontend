import React, { useState } from 'react';
import styled from 'styled-components';
import OnboardingTag from './Tag';
import LeftSVG from '../../assets/onboarding/left.svg';
import LogoSVG from '../../assets/onboarding/logo.png';
import RightSVG from '../../assets/onboarding/right.svg';
import Main from '../../assets/onboarding/onboardingmain.png';
import MycareerIcon from '../../assets/onboarding/mycareer.svg';
import ApplyIcon from '../../assets/onboarding/apply.svg';
import HistoryIcon from '../../assets/onboarding/history.svg';

const BlurContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(4px);
	z-index: 1;
`;

const BaseContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	width: 480px;
	height: 540px;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;
	z-index: 2;

	border: 1px solid black;
`;

const ModalBox = styled.div`
	height: 540px;
	align-self: stretch;
	background: var(--white, #fff);

	display: flex;
	flex-direction: column;
	align-items: center; /* ✅ 내부 요소 가로 중앙 정렬 */

	border: 1px solid black;
`;

const TopContainer = styled.div`
	width: 383px;
	height: 67px;
	margin-top: 52px;
	margin-bottom: 20px;
`;

const TextBox = styled.div`
	display: flex;
	height: 50px;
	padding: 16px 24px;
	justify-content: center;
	align-items: center;
	gap: 10px;

	border-radius: 10px;
	border: 2px solid var(--main-02, #88d1b6);
	background: rgba(136, 209, 182, 0.2);
	box-sizing: border-box;

	color: var(--gray-01, #424242);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const HighlightText = styled.span`
	color: var(--main-01, #3aaf85);
`;

const SvgPolygon = styled.div`
	position: absolute;
	top: 100%; /* TextBox 아래에 위치 */
	left: 50%;
	transform: translateX(-50%);
	margin-top: -8px; /* TextBox와 8px 정도 겹치도록 조정 */

	svg {
		width: 25px;
		height: 19px;
		fill: var(--main-02, #88d1b6);
	}
`;

const IconContainer = styled.div`
	height: 98px;
	width: 256px;
	margin-bottom: 20px;
`;

const LeftIcon = styled.div`
	width: 28px;
	height: 98px;
`;

const Kkijuk = styled.div`
	width: 200px;
	height: 98px;
`;

const RightIcon = styled.div`
	width: 28px;
	height: 98px;
`;

const MiddleContainer = styled.div`
	position: relative;
	width: 383px;
	height: 170px;

	border: 1px solid black;
`;

const TagPosition1 = styled.div`
	position: absolute;
	top: 1px;
	left: 22px;
`;

const TagPosition2 = styled.div`
	position: absolute;
	top: 101px;
	left: 1px;
`;

const TagPosition3 = styled.div`
	position: absolute;
	top: 0px;
	left: 261px;
	right: 2px;
`;

const MainImageStyled = styled.img`
	width: 100%;
	height: auto;
`;

const BottomContainer = styled.div`
	margin-bottom: 51px;
`;

const NextButton = styled.button`
	display: flex;
	padding: 12px 32px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	box-sizing: border-box;
	border-radius: 110px;
	background: var(--main-01, #3aaf85);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);

	color: var(--white, #fff);
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export default function OnboardingMain({ onNext }) {
	return (
		<BlurContainer>
			<BaseContainer>
				<ModalBox>
					<TopContainer>
						<TextBox>
							<HighlightText>대학생</HighlightText>과 <HighlightText>취준생</HighlightText>을 위한 경험&커리어 아카이빙
							서비스
						</TextBox>
						<SvgPolygon>
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
								<path d="M12.5 19L0.375645 0.25L24.6244 0.25L12.5 19Z" fill="#88D1B6" />
							</svg>
						</SvgPolygon>
					</TopContainer>
					<IconContainer>
						<LeftIcon src={LeftSVG} alt="왼쪽 아이콘" />
						<Kkijuk src={LogoSVG} alt="끼적 로고" />
						<RightIcon src={RightSVG} alt="오른쪽 아이콘" />
					</IconContainer>
					<MiddleContainer>
						<MainImageStyled src={Main} alt="온보딩 메인 이미지" />
						<TagPosition1>
							<OnboardingTag svg={MycareerIcon} text="내 커리어" />
						</TagPosition1>
						<TagPosition2>
							<OnboardingTag svg={ApplyIcon} text="지원관리" />
						</TagPosition2>
						<TagPosition3>
							<OnboardingTag svg={HistoryIcon} text="서류준비" />
						</TagPosition3>
					</MiddleContainer>
					<BottomContainer>
						<NextButton onClick={onNext}>200% 활용 가이드</NextButton>
					</BottomContainer>
				</ModalBox>
			</BaseContainer>
		</BlurContainer>
	);
}
