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
	height: 300px;
`;

const Box = styled.div`
	/* props로 height 설정 */
	width: 820px;
	height: ${(props) => props.height || '100px'}; /* 기본값은 100px */
`;

const Text = styled.div`
	/*설명 텍스트*/
	width: 420px;
	height: 19px;
	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const EmailBox = styled.div`
	width: 400px;
	height: 81px;
`;

const EmailTextBox = styled.div`
	width: 400px;
	height: 31px;
	gap: 20px;
`;

const EmailText = styled.div`
	color: var(--main-01, #3aaf85);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Email = styled.div`
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
	line-height: normal;
`;

const Input = styled.input`
	width: 400px;
	height: 50px;

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

	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
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
		<Layout title="마이페이지">
			<SubNav2></SubNav2>
			<Container>
				<Box height={100}></Box>
				<Text>회원님의 정보를 보호하기 위해 가입한 이메일 재입력이 필요합니다.</Text>
				<Box height={56}></Box>
				<EmailBox>
					<EmailTextBox>
						<EmailText>이메일</EmailText>
						<Email></Email>
						<KakaoTag>카카오</KakaoTag>
					</EmailTextBox>
					<Input>이메일을 입력하세요</Input>
				</EmailBox>
				<Box height={50}></Box>
				<Button onclick={handleSubmit}>확인</Button>
				{errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
			</Container>
		</Layout>
	);
}
