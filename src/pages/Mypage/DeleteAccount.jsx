import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '../../stores/useAuthStore';
import logo from '../../assets/logo.png';
const Logo = styled.div`
	width: 80px;
	height: 40px;
`;

const Container = styled.div`
	display: flex;
	width: 262px;
	flex-direction: column;
	align-items: center;
	gap: 160px;
	flex-shrink: 0;
	align-items: center;

	border: 1px solid black;
`;

const TitleText = styled.div`
	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Container2 = styled.div`
	display: flex;
	width: 220px;
	flex-direction: column;
	align-items: center;
	gap: 24px;
`;
const Text = styled.div`
	align-self: stretch;
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const MainButton = styled.button`
	width: 220px;
	height: 52px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-02, #707070);
`;

export default function DeleteAccount() {
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);

	const handleRedirect = () => {
		logout(); // 토큰 삭제
		navigate('/'); // 로그인 페이지로 이동
	};

	return (
		<Container>
			<Logo>
				<img src={logo} alt="끼적 로고" />
			</Logo>
			<TitleText>탈퇴 신청이 완료되었습니다.</TitleText>
			<Container2>
				<Text>
					끼적을 이용해주셔서 감사합니다. <br /> 다음에 또 만나요!
				</Text>
				<MainButton onClick={handleRedirect}>처음으로</MainButton>
			</Container2>
		</Container>
	);
}
