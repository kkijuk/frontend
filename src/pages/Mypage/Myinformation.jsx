import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SubNav from '../../components/Mypage/SubNav';
import QuitMember from '../../components/Modal/QuitMember';
import styled from 'styled-components';
import axios from 'axios';
import { fetchUserInfo, changeUserInfo, sendCode } from '../../api/Mypage/mypage';

const ContentBox = styled.div`
	width: 450px;
	height: auto;

	margin-bottom: 30px;
`;

const TitleBox = styled.div`
	width: 540px;
	display: flex;
	align-items: center; /* 수직 정렬 */

	gap: 10px;
	border: 1px solid black;
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
`;

const EmailInput = styled.input`
	width: 280px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: #f5f5f5;
	color: #000;
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

const Container1 = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	border: 1px solid black;
	margin-bottom: 30px;
`;

const Text1 = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Text2 = styled.div`
	margin-bottom: ${(props) => props.marginBottom};
	color: var(--main-01, #3aaf85);
	font-family: regular;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-top: 32px;
`;

const Input = styled.input`
	height: 50px;
	border-radius: 10px;
	width: 400px;
	background-color: ${(props) => props.backgroundColor || '#F5F5F5'};
	color: ${(props) => props.color || 'black'};
	border: ${(props) => props.border || 'none'};
	border-color: ${(props) => props.borderColor || 'black'};

	fint-family: regular;
	font-size: 15px;
	padding-left: 20px; /* padding-left 속성 추가 */
	box-sizing: border-box;
`;

const CheckBoxContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 129px;
	margin-left: 102px;
`;

const CheckBoxContainer1 = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 20px;
	margin-left: 52px;
`;

const CustomCheckBox = styled.input.attrs({ type: 'checkbox' })`
	width: 19px;
	height: 19px;
	border-radius: 4px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: #fff;
`;

const Button = styled.button`
	width: 400px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	border: none;
	color: #fff;

	margin-left: 32px;
	margin-top: 34px;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

// 모달 배경 (뒤 어둡게 처리)
const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5); /* 반투명 어두운 배경 */
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000; /* 다른 요소들 위에 표시되도록 설정 */
`;

// QuitMember 모달을 가운데 정렬
const ModalContainer = styled.div`
	position: relative;
	width: auto;
	height: auto;
	z-index: 1010; /* ModalOverlay보다 위에 위치 */
`;

const DeleteAccount = styled.div`
	display: flex;
	justify-content: center; /* 가운데 정렬 */
	align-items: center;
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
	text-decoration: underline; /* 밑줄 스타일 적용 */
	cursor: pointer;
	margin-top: 20px;
`;

const Bottom = styled.div`
	width: 464px;
	height: 196px;
	margin-top: 47px;
`;

export default function MyInformation() {
	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [isVerificationRequested, setIsVerificationRequested] = useState(false);
	const [isEditingPhone, setIsEditingPhone] = useState(false);
	const [isEditingBirth, setIsEditingBirth] = useState(false); // 생년월일 수정 상태 추가
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

	const [emailInput, setEmailInput] = useState('');
	const [phoneInputs, setPhoneInputs] = useState({ part1: '', part2: '', part3: '' });
	const [birthInputs, setBirthInputs] = useState({ year: '', month: '', day: '' });

	const [prevEmail, setPrevEmail] = useState('');
	const [prevPhoneInputs, setPrevPhoneInputs] = useState({ part1: '', part2: '', part3: '' });
	const [prevBirthInputs, setPrevBirthInputs] = useState({ year: '', month: '', day: '' });

	const [marketingAgreed, setMarketingAgreed] = useState(false);

	//Tag 가져오기
	const location = useLocation();
	const receivedSocialType = location.state?.socialType || '';
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
				setBirthDate(data.birthDate);

				// Set initial values for inputs
				setEmailInput(data.email);
				const [part1, part2, part3] = data.phoneNumber.split('-');
				setPhoneInputs({ part1, part2, part3 });

				const [year, month, day] = data.birthDate.split('-');
				setBirthInputs({ year, month, day });

				setMarketingAgreed(data.marketingAgree === 'BOTH');
			} catch (error) {
				console.error('사용자 정보를 가져오는 중 오류 발생:', error);
			}
		};
		fetchUserData();
	}, []);

	const handleMarketingAgreement = (marketingAgree) => {
		switch (marketingAgree) {
			case 'BOTH':
				setAgreements({ snsAgreed: true, emailAgreed: true });
				setAllAgreed(true);
				break;
			case 'EMAIL':
				setAgreements({ snsAgreed: false, emailAgreed: true });
				setAllAgreed(true);
				break;
			case 'SMS':
				setAgreements({ snsAgreed: true, emailAgreed: false });
				setAllAgreed(true);
				break;
			case 'NONE':
			default:
				setAgreements({ snsAgreed: false, emailAgreed: false });
				setAllAgreed(false);
				break;
		}
	};

	const handleEditClick = () => {
		setIsEditingEmail(true);
		setIsVerificationRequested(false); // 초기화
	};

	const handleCancelClick = () => {
		setIsEditingEmail(false);
		setIsVerificationRequested(false); // 초기화
	};

	// 이메일 인증 요청
	const handleRequestVerification = async () => {
		try {
			await sendCode(emailInput);
			setIsVerificationRequested(true);
			alert('인증번호가 전송되었습니다.');
		} catch (error) {
			alert('인증번호 전송에 실패했습니다.');
		}
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

	const handleAgreementChange = (event) => {
		const { name, checked } = event.target;

		setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }));
		const allChecked = Object.values({ ...agreements, [name]: checked }).every((value) => value === true);
		setAllAgreed(allChecked);
	};

	const handleAllAgreementChange = (event) => {
		const { checked } = event.target;
		setAllAgreed(checked);
		setAgreements({ snsAgreed: checked, emailAgreed: checked });
	};

	const handleBirthDateChange = (e) => {
		const input = e.target.value.replace(/-/g, '');
		if (input.length > 8) return;

		let formattedInput = input;
		if (input.length > 4) {
			formattedInput = `${input.slice(0, 4)}-${input.slice(4, 6)}`;
		}
		if (input.length > 6) {
			formattedInput = `${formattedInput}-${input.slice(6, 8)}`;
		}

		setBirthDate(formattedInput);
	};

	// '광고성 정보 수신 동의' 체크 변경
	const handleMarketingAgreementChange = (event) => {
		setMarketingAgreed(event.target.checked);
	};

	//저장 버튼 눌렀을때 수정된 정보 백엔드로 전달
	const handleSave = async () => {
		const marketingAgree = marketingAgreed ? 'BOTH' : 'NONE';

		const formattedPhoneNumber = `${phoneInputs.part1}-${phoneInputs.part2}-${phoneInputs.part3}`;
		const formattedBirthDate = `${birthInputs.year}-${birthInputs.month}-${birthInputs.day}`;

		try {
			await changeUserInfo(formattedPhoneNumber, formattedBirthDate, marketingAgree);
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
		setPrevPhoneInputs(phoneInputs); // 기존 값 백업
		setIsEditingPhone(true);
	};

	const handleCancelEditPhone = () => {
		setPhoneInputs(prevPhoneInputs); // 기존 값 복원
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
		const formattedPhone = `${phoneInputs.part1}-${phoneInputs.part2}-${phoneInputs.part3}`;
		setPhoneNumber(formattedPhone);
		setIsEditingPhone(false);
	};

	const handleSaveBirth = () => {
		const formattedBirth = `${birthInputs.year}-${birthInputs.month}-${birthInputs.day}`;
		setBirthDate(formattedBirth);
		setIsEditingBirth(false);
	};

	return (
		<Container1>
			<SubNav></SubNav>
			<Container>
				<TitleBox>
					<Text1>선택약관 동의 변경</Text1>
					<Tag socialType={receivedSocialType}>{socialTypeMap[receivedSocialType] || receivedSocialType}</Tag>
				</TitleBox>

				<ContentBox>
					<ContentName>이메일</ContentName>
					{isEditingEmail ? (
						<EmailEditBox>
							<InputContainer>
								<EmailInput value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
								<RequestButton onClick={handleRequestVerification}>
									{isVerificationRequested ? '다시 전송' : '인증요청'}
								</RequestButton>
								<CancelButton onClick={handleCancelEditEmail}>취소</CancelButton>
							</InputContainer>
							{isVerificationRequested && (
								<InputContainer>
									<NumInput placeholder="인증번호를 입력하세요" />
									<ConfirmButton onClick={handleSaveEmail}>확인</ConfirmButton>
								</InputContainer>
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
								<div>
									<PhoneInput
										value={phoneInputs.part1}
										onChange={(e) => setPhoneInputs({ ...phoneInputs, part1: e.target.value })}
									/>
									<PhoneInput
										value={phoneInputs.part2}
										onChange={(e) => setPhoneInputs({ ...phoneInputs, part2: e.target.value })}
									/>
									<PhoneInput
										value={phoneInputs.part3}
										onChange={(e) => setPhoneInputs({ ...phoneInputs, part3: e.target.value })}
									/>
								</div>
								<ConfirmButton onClick={handleSavePhone}>확인</ConfirmButton>
								<CancelButton2 onClick={handleCancelEditPhone}>취소</CancelButton2>
							</PhoneBox>
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
								<div>
									<PhoneInput
										value={birthInputs.year}
										onChange={(e) => setBirthInputs({ ...birthInputs, year: e.target.value })}
									/>
									<PhoneInput
										value={birthInputs.month}
										onChange={(e) => setBirthInputs({ ...birthInputs, month: e.target.value })}
									/>
									<PhoneInput
										value={birthInputs.day}
										onChange={(e) => setBirthInputs({ ...birthInputs, day: e.target.value })}
									/>
								</div>
								<ConfirmButton onClick={handleSaveBirth}>확인</ConfirmButton>
								<CancelButton2 onClick={handleCancelEditBirth}>취소</CancelButton2>
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
				<Text1>선택약관 동의 변경</Text1>
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
