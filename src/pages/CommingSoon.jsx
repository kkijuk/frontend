import styled from 'styled-components';
import React from 'react';
import logo from '../assets/logo.png';
import instagramLogo from '../assets/instagramLogo.png';
import paperplaneicon from '../assets/paperplaneicon.png';

const Box = styled.div`
    width: 100%;
    height: 100%

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
	height: 400px;
	margin-top: 150px;
	gap: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.div`
	color: ${(props) => props.color || 'var(--black, #000)'};
	font-family: Pretendard;
	font-size: ${(props) => props.fontSize || '28px'}; /* props로 폰트 사이즈 처리, 기본값 28px */
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const LogoBox = styled.div`
	display: flex;
	gap: 30px;
	margin-top: 10px;
`;

export default function CommingSoon({ titleColor, titleFontSize }) {
	const goInsta = () => {
		window.open('https://www.instagram.com/kki.juk/?utm_source=ig_web_button_share_sheet', '_blank');
	};

	const goEmail = () => {
		window.open('mailto:kkijuk30@gmail.com', '_blank');
	};
	return (
		<Box>
			<Content>
				<img style={{ width: '280px', height: '120px' }} src={logo} alt="로고" />
				<Title color="#3AAF85" fontSize="32px">
					서비스 준비중입니다
				</Title>
				<Title color="#3AAF85" fontSize="25px">
					The service is coming soon
				</Title>
				<LogoBox>
					<img
						style={{ width: '30px', height: '30px', cursor: 'pointer' }}
						src={instagramLogo}
						alt="로고"
						onClick={() => goInsta()}
					/>
					<img
						style={{ width: '30px', height: '30px', cursor: 'pointer' }}
						src={paperplaneicon}
						alt="로고"
						onClick={() => goEmail()}
					/>
				</LogoBox>
			</Content>
		</Box>
	);
}
