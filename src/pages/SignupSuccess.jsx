import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import createMaster from '../api/Signup/createMaster';
import createResume from '../api/Signup/createResume';
import { useAuth } from '../components/AuthContext';

const SignupSuccessScreen = styled.div`
	max-width: flex;
	margin: 50px auto;
	padding: 20px;
	background: white;
	border-radius: 10px;
	text-align: center;
	margin-bottom: 90px;
	position: relative;
	top: 180px;

	p {
		margin-bottom: 10px;
		color: var(--main-01, #3aaf85);
		text-align: center;
		font-family: Regular;
		font-size: 27px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.button {
		width: 255px;
		height: 57px;
		flex-shrink: 0;
		padding: 10px;
		margin: 10px 0;
		border: none;
		border-radius: 10px;
		background-color: #3aaf85;
		color: white;
		font-family: 'Light';
		font-size: 19px;
		font-weight: 500;
		cursor: pointer;
		margin-top: 15px;
	}

	.Interests-text1 {
		color: #707070;
		text-align: center;
		font-family: Light;
		font-size: 19px;
		font-weight: 400;
		line-height: normal;
		margin-top: 60px;
	}

	.Interests-text2 {
		margin-top: -5px;
		color: #707070;
		text-align: center;
		font-family: Light;
		font-size: 19px;
		font-weight: 400;
		line-height: normal;
	}
`;

const SignupSuccess = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [hasCalled, setHasCalled] = useState(false); // 호출 여부 상태 관리

	const address = 'string';
	const profileImageUrl = 'string';

	useEffect(() => {
		const preventScroll = (e) => {
			e.preventDefault();
		};

		const $body = document.querySelector('body');
		$body.style.overflow = 'hidden';
		$body.addEventListener('wheel', preventScroll, { passive: false });
		$body.addEventListener('touchmove', preventScroll, { passive: false });

		if (!hasCalled) {
			createMaster();
			createResume(address, profileImageUrl);
			setHasCalled(true); // 호출 후 true로 설정
		}

		return () => {
			$body.removeEventListener('wheel', preventScroll);
			$body.removeEventListener('touchmove', preventScroll);
			$body.style.overflow = '';
		};
	}, [hasCalled]);

	const handleButtonClick = () => {
		login(); // 회원가입이 완료된 후 자동 로그인
		navigate('/signupinterest'); // 관심분야 등록 페이지로 이동
	};

	return (
		<SignupSuccessScreen>
			<p>회원가입이 완료되었습니다.</p>
			<p className="Interests-text1">끼적에서의 더 나은 경험을 위해</p>
			<p className="Interests-text2">요즘 관심 있는 분야를 알려주세요!</p>
			<button className="button" onClick={handleButtonClick}>
				관심분야 등록
			</button>
		</SignupSuccessScreen>
	);
};

export default SignupSuccess;
