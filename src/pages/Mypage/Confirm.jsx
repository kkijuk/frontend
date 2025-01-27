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

const Container = styled.div`
	width: 820px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 0;
	margin-right: auto;
	margin-bottom: 50px;
	margin-left: auto;

	border: 1px solid black;
`;

const Text = styled.div`
	/*설명 텍스트*/
	width: 500px;
	height: 19px;
	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	margin-top: 100px;
`;

const EmailBox = styled.div`
	width: 400px;
	height: 81px;

	margin-top: 56px;
`;

const EmailTextBox = styled.div`
	width: 400px;
	height: 31px;
	gap: 20px;

	display: flex;
	align-items: center;
`;

const EmailText = styled.div`
	/*이메일 글씨*/
	color: var(--main-01, #3aaf85);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Email = styled.div`
	/*이메일 가린거 보여주기*/
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const Tag = styled.div`
	width: 65px;
	height: 25px;
	border-radius: 10px;
	background: ${(props) => (props.socialType === 'KAKAO' ? 'var(--sub-ye, #fcc400)' : '#03C75A')};
	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 25px;
`;
const Input = styled.input`
	width: 400px;
	height: 50px;
	padding-left: 20px;
	border: none; /* 테두리 제거 */
	outline: none; /* 포커스 시 라인 제거 */
	border-radius: 10px;
	background: #f5f5f5;

	color: #707070;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const Button = styled.button`
	width: 400px;
	height: 50px;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);

	border: none; /* 테두리 제거 */
	outline: none; /* 포커스 시 라인 제거 */
	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	margin-top: 50px;
`;

export default function Confirm() {
	const [inputEmail, setInputEmail] = useState('');
	const [maskedEmail, setMaskedEmail] = useState(''); // 가려진 이메일 상태
	const [socialType, setSocialType] = useState(''); // 로그인 방식 상태
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate(); // useNavigate 훅 사용

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

	const handleInputChange = (e) => {
		setInputEmail(e.target.value);
		setErrorMessage('');
	};

	const handleSubmit = async () => {
		try {
			// 백엔드로 입력한 이메일을 보내고 결과를 확인
			const isMatched = await fetchEmail(inputEmail);

			// boolean(true) 또는 문자열("true")인 경우 처리
			if (isMatched === true || isMatched === 'true') {
				navigate('/mypage/myinformation'); // 페이지 이동
			} else {
				setErrorMessage('입력한 이메일이 일치하지 않습니다. 다시 확인해주세요.');
			}
		} catch (error) {
			// API 요청 중 오류가 발생한 경우
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
						<Tag socialType={socialType}>{socialType}</Tag>
					</EmailTextBox>
					<Input
						placeholder="이메일을 입력하세요"
						value={inputEmail} // 상태값 바인딩
						onChange={handleInputChange} // 입력값 변경 시 호출
					/>
				</EmailBox>
				<Button onClick={handleSubmit}>확인</Button>
				{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}{' '}
			</Container>
		</div>
	);
}
