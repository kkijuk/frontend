import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SubNav from '../../components/Mypage/SubNav';
import QuitMember from '../../components/Modal/QuitMember';
import styled from 'styled-components';
import axios from 'axios';
import { fetchUserInfo, changeUserInfo, sendCode, verifyCode } from '../../api/Mypage/mypage';

//추가
import DateInput from '../../components/Modal/AddCareerModal/DateInput';

import {
	Container,
	Container1,
	ContentBox,
	TitleBox,
	Tag,
	ContentName,
	Box,
	Content,
	EditButton,
	EmailEditBox,
	InputContainer,
	EmailInput,
	EmailButtonGroup,
	NumInput,
	RequestButton,
	CancelButton,
	VerifyButton,
	NumInputWrapper,
	TimerText,
	ErrorText,
	ErrorMessage,
	PhoneBox,
	PhoneInput,
	PhoneButtonGroup,
	ConfirmButton,
	CancelButton2,
	BirthButtonGroup,
	Bottom,
	CheckBoxContainer1,
	CustomCheckBox,
	Button,
	DeleteAccount,
	ModalOverlay,
	ModalContainer,
	Text1,
} from './Myinformation.styles.js';

export default function MyInformation() {
	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [isVerificationRequested, setIsVerificationRequested] = useState(false);
	const [isEditingPhone, setIsEditingPhone] = useState(false);
	const [isEditingBirth, setIsEditingBirth] = useState(false); // 생년월일 수정 상태 추가
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

	const [emailInput, setEmailInput] = useState('');
	const [phoneInput, setPhoneInput] = useState('');
	const [birthInputs, setBirthInputs] = useState({ year: '', month: '', day: '' });

	const [prevEmail, setPrevEmail] = useState('');
	const [prevBirthInputs, setPrevBirthInputs] = useState({ year: '', month: '', day: '' });
	const [birthTimestamp, setBirthTimestamp] = useState(null);

	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const [marketingAgreed, setMarketingAgreed] = useState(false);

	const [verificationCode, setVerificationCode] = useState('');
	const [timer, setTimer] = useState(0);
	const [isTimerExpired, setIsTimerExpired] = useState(false);
	const [isRequesting, setIsRequesting] = useState(false);
	const [socialType, setSocialType] = useState('');

	const [isVerified, setIsVerified] = useState(false);
	const [phoneError, setPhoneError] = useState(''); // 에러 메시지 상태 추가
	const [errorMessage, setErrorMessage] = useState(''); // 새로운 상태 추가

	const socialTypeMap = {
		KAKAO: '카카오',
		NAVER: '네이버',
	};

	//개인정보 가져오기
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await fetchUserInfo();
				setEmail(data.email);
				setName(data.name);
				setPhoneNumber(data.phoneNumber);
				setPhoneInput(data.phoneNumber.replace(/-/g, '')); //하이픈 제거한 값 input에 넣어주기
				setBirthDate(data.birthDate);
				setBirthTimestamp(new Date(data.birthDate).getTime());
				setSocialType(data.socialType);

				// Set initial values for inputs
				setEmailInput(data.email);

				//삭제!!
				//const [part1, part2, part3] = data.phoneNumber.split('-');
				//setPhoneInputs({ part1, part2, part3 });

				const [year, month, day] = data.birthDate.split('-');
				setBirthInputs({ year, month, day });

				setMarketingAgreed(data.marketingAgree === 'BOTH');
			} catch (error) {
				console.error('사용자 정보를 가져오는 중 오류 발생:', error);
			}
		};
		fetchUserData();
	}, []);

	//이메일 인증 요청
	const handleRequestVerification = async () => {
		if (isRequesting) {
			alert('전송 중입니다. 잠시만 기다려주세요.');
			return;
		}
		try {
			console.log('이메일 인증 요청 중:', emailInput);

			setIsRequesting(true);
			const response = await sendCode(emailInput);
			console.log('이메일 인증 요청 성공:', response);

			setIsVerificationRequested(true);
			setTimer(300); // 5분 설정
			setIsTimerExpired(false);
			alert('인증번호가 전송되었습니다.');
		} catch (error) {
			alert('인증번호 전송에 실패했습니다.');
		} finally {
			setIsRequesting(false);
		}
	};

	const handleOpenModal = () => {
		setIsModalOpen(true); // 모달 열기
	};

	const handleCloseModal = () => {
		setIsModalOpen(false); // 모달 닫기
	};

	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [birthDate, setBirthDate] = useState('');

	const [allAgreed, setAllAgreed] = useState(false);
	const [agreements, setAgreements] = useState({
		snsAgreed: false,
		emailAgreed: false,
	});

	// '광고성 정보 수신 동의' 체크 변경
	const handleMarketingAgreementChange = (event) => {
		setMarketingAgreed(event.target.checked);
	};

	//저장 버튼 눌렀을때 수정된 정보 백엔드로 전달
	const handleSave = async () => {
		const marketingAgree = marketingAgreed ? 'BOTH' : 'NONE';

		const onlyDigits = phoneInput.replace(/\D/g, '');
		const formattedPhoneNumber = `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(3, 7)}-${onlyDigits.slice(7)}`;
		const formattedBirthDate = new Date(birthTimestamp).toISOString().slice(0, 10);

		try {
			await changeUserInfo(emailInput, formattedPhoneNumber, formattedBirthDate, marketingAgree);
			alert('저장이 완료되었습니다.');
		} catch (error) {
			alert('저장 중 오류가 발생했습니다.');
		}
	};

	// 이메일 수정 기능
	const handleEditEmail = () => {
		setPrevEmail(emailInput);
		setIsEditingEmail(true);
		setIsVerificationRequested(false);
	};

	const handleCancelEditEmail = () => {
		setEmailInput(prevEmail);
		setIsEditingEmail(false);
		setIsVerificationRequested(false);
	};

	//  핸드폰 번호 수정
	const handleEditPhone = () => {
		setIsEditingPhone(true);
	};

	const handleCancelEditPhone = () => {
		setPhoneInput(phoneNumber.replace(/-/g, '')); // 기존 번호 다시 설정
		setIsEditingPhone(false);
	};

	// 생년월일 수정
	const handleEditBirth = () => {
		setPrevBirthInputs(birthInputs); // 기존 값 백업
		setIsEditingBirth(true);
	};

	const handleCancelEditBirth = () => {
		setBirthInputs(prevBirthInputs); // 기존 값 복원
		setIsEditingBirth(false);
	};

	const handleSaveEmail = () => {
		setEmail(emailInput);
		setIsEditingEmail(false);
	};

	const handleSavePhone = () => {
		const validPrefixes = ['010', '011', '012', '013', '014', '015', '016', '017', '018', '019'];
		const onlyDigits = phoneInput.replace(/\D/g, ''); // 숫자만 추출

		// 1. 비어있는 경우
		if (!onlyDigits) {
			setPhoneError('연락처를 입력해주세요.');
			return;
		}

		// 2. 길이 확인 (11자리여야 함)
		if (onlyDigits.length !== 11) {
			setPhoneError('올바른 연락처를 입력해주세요.');
			return;
		}

		// 3. 유효한 앞자리 확인
		const prefix = onlyDigits.slice(0, 3);
		if (!validPrefixes.includes(prefix)) {
			setPhoneError('올바른 연락처를 입력해주세요.');
			return;
		}

		// 4. 에러 없음 → 저장 진행
		setPhoneError('');

		// 포맷팅하여 실제 저장
		const formatted = `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(3, 7)}-${onlyDigits.slice(7)}`;
		setPhoneNumber(formatted); // 화면 표시용
		setIsEditingPhone(false);

		console.log('연락처 저장:', formatted);
	};

	const handleSaveBirth = () => {
		const formattedBirth = new Date(birthTimestamp).toISOString().slice(0, 10);
		setBirthDate(formattedBirth);
		setIsEditingBirth(false);
	};

	const handleVerifyCode = async () => {
		if (!verificationCode) {
			alert('인증번호를 입력하세요.');
			return;
		}

		try {
			const response = await verifyCode({
				authNumber: String(verificationCode),
				email: emailInput,
			});

			console.log('서버 응답 데이터:', response); // 응답 전체 로그 출력
			console.log('서버 응답 데이터 내용:', response?.data); // 응답 객체 내부 데이터 확인

			// 응답이 예상과 다를 수 있으니 여러 값으로 체크
			if (response === true) {
				alert('인증이 완료되었습니다.');
				setEmail(emailInput);
				setIsVerified(true); // 인증 성공 상태 업데이트
				setTimeout(() => setIsEditingEmail(false), 500); // 이메일 수정 창 닫기 (0.5초 후)
				setErrorMessage(''); // 에러 메시지 초기화
			} else {
				const errorMsg = response?.data?.message || '인증번호 확인 중 오류가 발생했습니다.';
				setErrorMessage(errorMsg);
			}
		} catch (error) {
			console.error('인증번호 확인 중 오류 발생:', error?.response?.data || error?.message);

			// 에러 메시지만 설정 (alert 없음)
			setErrorMessage(error.response.data.message);
		}
	};

	//인증번호타이머
	useEffect(() => {
		if (isVerificationRequested && timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
		if (timer === 0 && isVerificationRequested) {
			setIsTimerExpired(true);
		}
	}, [timer, isVerificationRequested]);

	return (
		<Container1>
			<SubNav></SubNav>
			<Container>
				<TitleBox>
					<Text1>개인정보 수정</Text1>
					<Tag socialType={socialType}>{socialTypeMap[socialType] || socialType}</Tag>
				</TitleBox>

				<ContentBox>
					<ContentName>이메일</ContentName>
					{isEditingEmail ? (
						<EmailEditBox>
							<InputContainer>
								<EmailInput value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
								<EmailButtonGroup>
									<RequestButton onClick={handleRequestVerification}>
										{isVerificationRequested ? '재전송' : '인증요청'}
									</RequestButton>
									<CancelButton onClick={handleCancelEditEmail}>취소</CancelButton>
								</EmailButtonGroup>
							</InputContainer>
							{isVerificationRequested && (
								<>
									<InputContainer>
										<NumInputWrapper>
											<NumInput
												placeholder="인증번호를 입력하세요"
												value={verificationCode}
												onChange={(e) => setVerificationCode(e.target.value)}
												disabled={isTimerExpired}
											/>
											<TimerText>
												{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
											</TimerText>
										</NumInputWrapper>
										<VerifyButton onClick={handleVerifyCode} disabled={isTimerExpired}>
											확인
										</VerifyButton>
									</InputContainer>

									{(errorMessage || isTimerExpired) && (
										<ErrorText>{errorMessage || '시간이 초과되었습니다. 다시 요청해주세요.'}</ErrorText>
									)}
								</>
							)}
						</EmailEditBox>
					) : (
						<Box>
							<Content>{email}</Content>
							<EditButton onClick={handleEditEmail}>수정</EditButton>
						</Box>
					)}
				</ContentBox>

				<ContentBox>
					<ContentName>이름</ContentName>
					<Box>
						<Content>{name}</Content>
					</Box>
				</ContentBox>

				<ContentBox>
					<ContentName>연락처</ContentName>
					{isEditingPhone ? (
						<ContentBox>
							<PhoneBox>
								<PhoneInput value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
								<PhoneButtonGroup>
									<ConfirmButton onClick={handleSavePhone}>확인</ConfirmButton>
									<CancelButton2 onClick={handleCancelEditPhone}>취소</CancelButton2>
								</PhoneButtonGroup>
							</PhoneBox>
							{phoneError && <ErrorMessage>{phoneError}</ErrorMessage>} {/* 에러 메시지 표시 */}
						</ContentBox>
					) : (
						<Box>
							<Content>{phoneNumber}</Content>
							<EditButton onClick={handleEditPhone}>수정</EditButton>
						</Box>
					)}
				</ContentBox>

				<ContentBox>
					<ContentName>생년월일</ContentName>
					{isEditingBirth ? (
						<ContentBox>
							<PhoneBox>
								<DateInput
									value={birthTimestamp}
									onChange={(timestamp) => setBirthTimestamp(timestamp)}
									disabled={false}
								/>
								<BirthButtonGroup>
									<ConfirmButton onClick={handleSaveBirth}>확인</ConfirmButton>
									<CancelButton2 onClick={handleCancelEditBirth}>취소</CancelButton2>
								</BirthButtonGroup>
							</PhoneBox>
						</ContentBox>
					) : (
						<Box>
							<Content>{birthDate}</Content>
							<EditButton onClick={handleEditBirth}>수정</EditButton>
						</Box>
					)}
				</ContentBox>
			</Container>
			<Bottom>
				<TitleBox>
					<Text1>선택약관 동의 변경</Text1>
				</TitleBox>
				<CheckBoxContainer1>
					<CustomCheckBox
						id="agree_check_all"
						name="agree_check_all"
						checked={marketingAgreed}
						onChange={handleMarketingAgreementChange}
					/>
					<label htmlFor="agree_check_all">광고성 정보 수신 동의</label>
				</CheckBoxContainer1>
				<Button onClick={handleSave}>저장</Button> {/* 저장 버튼 클릭 시 handleSave 호출 */}
				<DeleteAccount onClick={handleOpenModal}>회원탈퇴</DeleteAccount>
			</Bottom>
			{/* 회원탈퇴 모달 */}
			{isModalOpen && (
				<ModalOverlay>
					<ModalContainer>
						<QuitMember onClose={handleCloseModal} />
					</ModalContainer>
				</ModalOverlay>
			)}
		</Container1>
	);
}
