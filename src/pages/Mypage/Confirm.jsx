import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom의 useNavigate 훅 추가

import SubNav2 from '../../components/Mypage/SubNav2';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import { fetchLogindata, fetchEmail } from '../../api/Mypage/mypage';

//마이페이지 변경 이후 !!필요!! 한 부분
//베타 테스트에 사용

//내 정보 이메일 재입력

import {
	Container,
	Text,
	EmailBox,
	EmailTextBox,
	EmailText,
	Email,
	Tag,
	Input,
	ErrorMessage,
	Button,
} from './Confirm.styles';

export default function Confirm() {
	const [inputEmail, setInputEmail] = useState('');
	const [maskedEmail, setMaskedEmail] = useState(''); // 가려진 이메일 상태
	const [socialType, setSocialType] = useState(''); // 로그인 방식 상태
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate(); // useNavigate 훅 사용

	const socialTypeMap = {
		KAKAO: '카카오',
		NAVER: '네이버',
	};

	useEffect(() => {
		// API 호출하여 가려진 이메일 및 로그인 방식 가져오기
		const fetchLoginData = async () => {
			try {
				const data = await fetchLogindata();
				setMaskedEmail(data.email);
				setSocialType(data.socialType);
			} catch (error) {
				console.error('로그인 데이터 가져오기 오류:', error);
			}
		};

		fetchLoginData();
	}, []);

	// 이메일 형식 검증 함수
	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleInputChange = (e) => {
		setInputEmail(e.target.value);
		setErrorMessage('');
	};

	const handleSubmit = async () => {
		if (!isValidEmail(inputEmail)) {
			setErrorMessage('올바른 이메일 형식이 아닙니다.');
			return;
		}

		try {
			// API 호출로 입력한 이메일 확인
			const isMatched = await fetchEmail(inputEmail);

			// 디버깅 로그 추가
			console.log('isMatched 값:', isMatched, '타입:', typeof isMatched);

			// boolean(true) 또는 문자열("true")인 경우 처리
			if (isMatched === true || isMatched === 'true') {
				navigate('/mypage/myinformation'); // 페이지 이동,socialType 전달
			} else {
				setErrorMessage('등록된 이메일과 다릅니다. 다시 입력해 주세요.');
			}
		} catch (error) {
			setErrorMessage('이메일을 확인하는 중 오류가 발생했습니다.');
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<SubNav2></SubNav2>

			<Container>
				<Text>회원님의 정보를 보호하기 위해 가입한 이메일 재입력이 필요합니다.</Text>
				<EmailBox>
					<EmailTextBox>
						<EmailText>이메일</EmailText>
						<Email>{maskedEmail}</Email>
						<Tag socialType={socialType}>{socialTypeMap[socialType] || socialType}</Tag>
					</EmailTextBox>
					<Input
						placeholder="이메일을 입력하세요"
						value={inputEmail} // 상태값 바인딩
						onChange={handleInputChange} // 입력값 변경 시 호출
					/>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				</EmailBox>
				<Button onClick={handleSubmit}>확인</Button>
				{/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
			</Container>
		</div>
	);
}
