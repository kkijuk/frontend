import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import instagramLogo from '../assets/instagramLogo.png';
import paperplaneicon from '../assets/paperplaneicon.png';

const FooterStyle = styled.div`
	width: 100%;
	height: 200px;
	background-color: #edf2f1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: Pretendard;
	color: #424242;
	padding: 30px 0;
	box-sizing: border-box; /* 패딩 포함 */
	margin-top: auto; /* Footer를 아래로 밀기 */
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
	font-weight: 500;
	margin-right: 20px;
	word-spacing: 1px;
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
				<br />
				<SmallText>
					<nameBox>
						<BoldText>서울특별시 광진구 면목로15길 16</BoldText>
						<BoldText>사업자등록번호 798-06-02922</BoldText>
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
