import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ContentBox = styled.div`
	width: 450px;
	height: auto;

	border: 1px solid black;
`;

const ContentName = styled.div`
	height: 21px;
	color: var(--main-01, #3aaf85);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	margin-bottom: 20px;
`;

const Box = styled.div`
	width: 430px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-left: 20px;
	margin-bottom: 36px;
`;

const Content = styled.div`
	height: 19px;
	color: #000;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const EditButton = styled.button`
	width: 65px;
	height: 25px;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);

	border: none;
	cursor: pointer;

	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	border: 1px solid black;
`;

//이메일 수정 클릭 시 나오는 컴포넌트
const EmailEditBox = styled.div`
	width: auto;
	margin-left: 10px;
	margin-bottom: 20px; /* 아래에 20px 여백 추가 */
`;

const InputContainer = styled.div`
	gap: 7px;
	/*가로 배치*/
	display: flex;
	align-items: center;

	border: 1px solid black;
`;
const EmailInput = styled.input`
	width: 280px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: #f5f5f5;
	color: var(--gray-03, #d9d9d9);
	font-family: Pretendard;
	font-size: 15px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	border: none;
	padding-left: 20px;
	box-sizing: border-box;
`;

const NumInput = styled.input`
	width: 280px;
	height: 50px;
	border-radius: 10px;
	background: #f5f5f5;

	border: none;
	color: var(--gray-03, #d9d9d9);
	font-family: Pretendard;
	font-size: 15px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	padding-left: 20px;
	box-sizing: border-box;

	margin-top: 5px;
`;

const RequestButton = styled.button`
	display: flex;
	width: 70px;
	height: 40px;
	padding: 6px 10px;
	justify-content: center;
	align-items: center;
	margin-left: 6px;
	border: none;
	flex-shrink: 0;
	border-radius: 10px;
	background: #3aaf85;
	box-sizing: border-box;

	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CancelButton = styled.button`
	display: flex;
	width: 70px;
	height: 40px;
	padding: 6px 10px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 10px;
	border: 1px solid #707070;
	background: #fff;

	color: #707070;

	text-align: center;
	font-family: Pretendard;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const VerifyButton = styled.button`
	display: flex;
	width: 70px;
	height: 40px;
	padding: 6px 10px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border: none;
	margin-left: 6px;

	border-radius: 10px;
	background: #3aaf85;

	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

//연락처, 생년월일 수정 버튼 클릭 시 컴포넌트
const PhoneBox = styled.div`
	width: auto;
	display: flex; /* 가로 배치 */
	flex-direction: row; /* 기본값이지만 명시적으로 설정 */
	gap: 7px; /* 요소 간 간격 */
	align-items: center; /* 수직 정렬 */
	justify-content: flex-start; /* 수평 정렬 (필요에 따라 변경 가능) */
	margin-left: 10px;
	margin-bottom: 30px;
`;

const PhoneInput = styled.input`
	width: 86px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: #f5f5f5;
	color: #000;
	margin-right: 4px;
	border: none;
	box-sizing: border-box;

	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const ConfirmButton = styled.button`
	display: flex;
	width: 70px;
	height: 35px;
	padding: 6px 10px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	background: #3aaf85;
	margin-left: 2px;
	border: none;

	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CancelButton2 = styled.button`
	display: flex;
	width: 70px;
	height: 35px;
	padding: 6px 10px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid #707070;
	background: #fff;

	color: #707070;

	text-align: center;
	font-family: Pretendard;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const DeleteAccount = styled.div`
	margin-top: 20px;
	text-align: center;
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

export default function MyInformation() {
	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [isVerificationRequested, setIsVerificationRequested] = useState(false);
	const [isEditingPhone, setIsEditingPhone] = useState(false);
	const [isEditingBirth, setIsEditingBirth] = useState(false); // 생년월일 수정 상태 추가

	const handleEditClick = () => {
		setIsEditingEmail(true);
		setIsVerificationRequested(false); // 초기화
	};

	const handleCancelClick = () => {
		setIsEditingEmail(false);
		setIsVerificationRequested(false); // 초기화
	};

	const handleRequestVerification = () => {
		setIsVerificationRequested(true);
	};

	const handlePhoneEditClick = () => {
		setIsEditingPhone(true);
	};

	const handlePhoneCancelClick = () => {
		setIsEditingPhone(false);
	};

	const handleBirthEditClick = () => {
		setIsEditingBirth(true);
	};

	const handleBirthCancelClick = () => {
		setIsEditingBirth(false);
	};

	return (
		<Container>
			<ContentBox>
				<ContentName>이메일</ContentName>
				{isEditingEmail ? (
					<EmailEditBox>
						<InputContainer>
							<EmailInput placeholder="이메일을 입력하세요" />
							<RequestButton onClick={handleRequestVerification}>
								{isVerificationRequested ? '다시 전송' : '인증요청'}
							</RequestButton>
							<CancelButton onClick={handleCancelClick}>취소</CancelButton>
						</InputContainer>
						{isVerificationRequested && (
							<InputContainer>
								<NumInput placeholder="인증번호를 입력하세요" />
								<VerifyButton>확인</VerifyButton>
							</InputContainer>
						)}
					</EmailEditBox>
				) : (
					<Box>
						<Content>siusy2618@naver.com</Content>
						<EditButton onClick={handleEditClick}>수정</EditButton>
					</Box>
				)}
			</ContentBox>

			<ContentBox>
				<ContentName>이름</ContentName>
				<Box>
					<Content>임세연</Content>
				</Box>
			</ContentBox>

			<ContentBox>
				<ContentName>연락처</ContentName>
				{isEditingPhone ? (
					<ContentBox>
						<PhoneBox>
							<PhoneInput placeholder="010" />
							<PhoneInput placeholder="1234" />
							<PhoneInput placeholder="5678" />
							<ConfirmButton>확인</ConfirmButton>
							<CancelButton2 onClick={handlePhoneCancelClick}>취소</CancelButton2>
						</PhoneBox>
					</ContentBox>
				) : (
					<Box>
						<Content>010-3112-4483</Content>
						<EditButton onClick={handlePhoneEditClick}>수정</EditButton>
					</Box>
				)}
			</ContentBox>

			<ContentBox>
				<ContentName>생년월일</ContentName>
				{isEditingBirth ? (
					<ContentBox>
						<PhoneBox>
							<PhoneInput placeholder="YYYY" />
							<PhoneInput placeholder="MM" />
							<PhoneInput placeholder="DD" />
							<ConfirmButton>확인</ConfirmButton>
							<CancelButton2 onClick={handleBirthCancelClick}>취소</CancelButton2>
						</PhoneBox>
					</ContentBox>
				) : (
					<Box>
						<Content>2002-12-02</Content>
						<EditButton onClick={handleBirthEditClick}>저정</EditButton>
					</Box>
				)}
			</ContentBox>
		</Container>
	);
}
