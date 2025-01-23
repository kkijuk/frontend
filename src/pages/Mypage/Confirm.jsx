import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom의 useNavigate 훅 추가

import SubNav2 from '../../components/Mypage/SubNav2';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import { fetchEmail } from '../../api/Mypage/MyinformationVerify';

//마이페이지 변경 이후 !!필요!! 한 부분
//베타 테스트에 사용

//내 정보 이메일 재입력

const Container = styled.div`
	width: 820px;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
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

const KakaoTag = styled.div`
	width: 65px;
	height: 25px;
	border-radius: 10px;
	background: var(--sub-ye, #fcc400);

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

export default function AuthenticationAccount() {
	const [inputEmail, setInputEmail] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate(); // useNavigate 훅 사용

	const handleInputChange = (e) => {
		setInputEmail(e.target.value);
		setErrorMessage('');
	};

	const handleSubmit = async () => {
		const userEmail = await fetchEmail();

		if (!userEmail) {
			setErrorMessage('이메일을 확인하는 중 오류가 발생했습니다.');
			return;
		}

		if (inputEmail === userEmail) {
			//다음 페이지로 이동하는 코드 작성
			navigate('/mypage/myinformation');
		} else {
			setErrorMessage('입력한 이메일이 일치하지 않습니다. 다시 확인해주세요.');
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
						<Email>k*****ij.@naver.com</Email>
						<KakaoTag>카카오</KakaoTag>
					</EmailTextBox>
					<Input placeholder="이메일을 입력하세요" />
				</EmailBox>
				<Button>확인</Button>
			</Container>
		</div>
	);
}
