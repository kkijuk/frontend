import React, { useState } from 'react';
import styled from 'styled-components';

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
	align-items: center; /* 내부 요소 가로 중앙 정렬 */

	border: 1px solid black;
`;

const TitleContainer = styled.div`
	margin-top: 43px;
	margin-bottom: 40px;

	border: 1px solid black;
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const TitleUnderline = styled.div`
	width: 111px;
	height: 6px;
	background: var(--main-01, #3aaf85);
`;

const SvgButtonContainer = styled.div`
	position: relative; /* 내부 텍스트를 SVG 위에 배치하기 위한 설정 */
	width: 351px;
	height: 102px;

	margin-bottom: 49px;

	border: 1px solid black;
`;

const SvgButton = styled.svg`
	width: 351px;
	height: 102px;
	fill: var(--white, #fff);
	stroke-width: 1.5px;
	stroke: var(--main-01, #3aaf85);
`;

const ContentContainer = styled.div`
	position: absolute; /* SVG 위에 배치 */
	display: flex;
	flex-direction: column; /* 세로 정렬 */
	align-items: center; /* 가운데 정렬 */
	justify-content: center;
	text-align: center;

	height: auto;
	width: auto;
`;

const ContentTitle = styled.div`
	color: var(--main-01, #3aaf85);
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: 20.305px; /* 126.908% */
	letter-spacing: 0.32px;
`;

const ContentText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20.305px;
	letter-spacing: 0.32px;
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 400px;
	height: 280px;
	flex-shrink: 0;
	border-radius: 10px;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

	magrin-top: -20px;

	/*img {
		width: 100%;
		height: auto;
		border-radius: 10px;
	}*/
`;

export default function OnboardingLayout({ title, contentTitle, contentText1, contentText2, img, url }) {
	return (
		<BlurContainer>
			<BaseContainer>
				<ModalBox>
					<TitleContainer>
						<Title>{title}</Title>
						<TitleUnderline></TitleUnderline>
					</TitleContainer>
					<SvgButtonContainer>
						<SvgButton xmlns="http://www.w3.org/2000/svg" viewBox="0 0 351 102">
							<path d="M25.8417 81.2211C25.8417 90.0863 20.3628 97.6718 12.6063 100.776H46.7926H330.3C341.1 100.776 349.855 92.0212 349.855 81.2211V20.3051C349.855 9.50501 341.1 0.749809 330.3 0.749809H45.3969C34.5968 0.749809 25.8417 9.50503 25.8417 20.3051V75.2218V81.2211Z" />
						</SvgButton>
						<ContentContainer>
							<ContentTitle>{contentTitle}</ContentTitle>
							<ContentText>
								{contentText1}
								<br />
								{contentText2}
							</ContentText>
						</ContentContainer>
					</SvgButtonContainer>
					<ImageContainer href={url} target="_blank" style={{ backgroundImage: `url(${img})` }} />
				</ModalBox>
			</BaseContainer>
		</BlurContainer>
	);
}
