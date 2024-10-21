import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import instagramLogo from '../assets/instagramLogo.png';
import paperplaneicon from '../assets/paperplaneicon.png';

const FooterStyle = styled.div`
	width: 100%;
	height: 300px;
	background-color: #edf2f1;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 50px;
	flex-direction: column;
	font-family: Pretendard;
	color: #424242;
	position: absolute;
	padding-top: 30px;
	z-index: 10;
`;

const SmallText = styled.div`
	color: #707070;
	text-align: center;
	justify-content: center;
	font-family: Pretendard;
	font-size: 11px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	word-spacing: 5px;
	line-height: 15px;
`;

const BoldText = styled.span`
	font-weight: 700;
`;

const div = styled.div`
  position: relative;
  width: 100%
  font-size: 20px;
`;

const logoBox = styled.div`
	display: flex;
	gap: 30px;
`;

export default function Footer() {
	const goInsta = () => {
		window.open('https://www.instagram.com/kki.juk/?utm_source=ig_web_button_share_sheet', '_blank');
	};

	const goEmail = () => {
		window.open('mailto:kkijuk30@gmail.com', '_blank');
	};

	return (
		<div>
			<FooterStyle>
				<img style={{ width: '70px', height: '30px' }} src={logo} alt="로고" />
				UMC 6th KKIJUK
				<br />
				<br />
				<SmallText>
					" 당신의 끼를 적어두세요 "<br />
					<nameBox>
						<BoldText>PM</BoldText> 엎질 <BoldText>DESIGN</BoldText> 운히 <BoldText>WEB</BoldText> 카이트 모니 연두 퍼지{' '}
						<BoldText>SERVER</BoldText> 테이프 넬리 노아 사이다
						<br />
						<br />
					</nameBox>
					kkijuk30@gmail.com
					<br />
					<logoBox>
						<img
							style={{ width: '18px', height: '18px', cursor: 'pointer', marginRight: '10px', marginTop: '10px' }}
							src={instagramLogo}
							alt="로고"
							onClick={() => goInsta()}
						/>
						<img
							style={{ width: '18px', height: '18px', cursor: 'pointer' }}
							src={paperplaneicon}
							alt="로고"
							onClick={() => goEmail()}
						/>
					</logoBox>
				</SmallText>
			</FooterStyle>
		</div>
	);
}
