import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/Login/Login';
import { useAuth } from '../components/AuthContext';

const LoginScreen = styled.div`
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
	background: white;
	border-radius: 10px;
	text-align: center;
	margin: 90px auto 0;
	height: auto;
	overflow: hidden;

	p {
		color: #707070;
		font-family: light;
		margin-bottom: 50px;
		text-align: center;
	}

	* {
		box-sizing: border-box;
	}

	.textInput {
		width: 400px;
		height: 50px;
		padding: 10px;
		margin: 10px 0;
		border: none;
		border-radius: 10px;
		background-color: #f5f5f5;
		transition: border 0.3s ease;
		font-family: Regular;
		font-size: 16px;

		&:focus {
			border: 2px solid #3aaf85;
			outline: none;
		}
	}

	.button {
		width: 400px;
		height: 50px;
		padding: 10px;
		margin: 10px 0;
		border: none;
		border-radius: 10px;
		background-color: #3aaf85;
		color: white;
		font-family: Regular;
		font-size: 19px;
		cursor: pointer;
		margin-top: 60px;
		margin-bottom: 20px;
	}

	a {
		color: #3aaf85;
		text-decoration: none;
		font-family: Regular;
	}

	a:hover {
		text-decoration: underline;
	}

	.links {
		color: #3aaf85;
		font-family: Regular;
		font-size: 16px;
	}
`;

const ErrorMessage = styled.div`
	color: #fc5555;
	margin-top: 50px;
	margin-bottom: 0px;
	font-family: Regular;
	font-size: 16px;
`;

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();
	const { login: setLoginState } = useAuth();

	const handleLogin = async () => {
		try {
			const result = await login({ email, password });
			if (result.message === 'login success') {
				setLoginState(true); // 로그인 상태 업데이트
				navigate('/');
			} else {
				setErrorMessage(result.message || '로그인 실패');
			}
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	useEffect(() => {
		const preventScroll = (e) => {
			e.preventDefault();
		};

		const $body = document.querySelector('body');
		$body.style.overflow = 'hidden';
		$body.addEventListener('wheel', preventScroll, { passive: false });
		$body.addEventListener('touchmove', preventScroll, { passive: false });

		return () => {
			$body.removeEventListener('wheel', preventScroll);
			$body.removeEventListener('touchmove', preventScroll);
			$body.style.overflow = '';
		};
	}, []);

	return (
		<LoginScreen>
			<img src={logo} width="100px" alt="Logo" />
			<p>당신의 끼를 적어두세요</p>
			<input
				type="email"
				placeholder="이메일"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="textInput"
			/>
			<input
				type="password"
				placeholder="비밀번호"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="textInput"
			/>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			<button className="button" onClick={handleLogin}>
				로그인
			</button>
			<div className="links">
				<a href="/signup">회원가입</a> | <a href="/passwordresetemail">비밀번호 찾기</a>
			</div>
		</LoginScreen>
	);
};

export default LoginPage;
