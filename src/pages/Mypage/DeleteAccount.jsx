import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '../../stores/useAuthStore';
import logo from '../../assets/logo.png';

import { Wrapper, Logo, Container, TitleText, Container2, Text, MainButton } from './DeleteAccount.styles';

export default function DeleteAccount() {
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);

	const handleRedirect = () => {
		logout(); // 토큰 삭제
		navigate('/'); // 로그인 페이지로 이동
	};

	return (
		<Wrapper>
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
		</Wrapper>
	);
}
