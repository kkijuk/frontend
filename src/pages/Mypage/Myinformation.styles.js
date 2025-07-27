import styled from 'styled-components';

export const Container1 = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 50px;
	width: 100%;
	max-width: 820px;
	padding: 0 40px;
	margin: 0 auto;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		padding: 0 16px;
		box-sizing: border-box;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 12px;
	width: 100%;
	max-width: 464px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 0 20px;
	}
`;

export const ContentBox = styled.div`
	width: 100%;
	max-width: 450px;
	height: auto;
	margin-bottom: 36px;
`;

export const TitleBox = styled.div`
	max-width: 540px;
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 32px;
	justify-content: flex-start;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

export const Tag = styled.div`
	width: 65px;
	height: 25px;
	border-radius: 10px;
	background: ${(props) => (props.socialType === 'KAKAO' ? 'var(--sub-ye, #fcc400)' : '#03C75A')};
	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	line-height: 25px;
`;

export const ContentName = styled.div`
	height: 21px;
	color: var(--main-01, #3aaf85);
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 500;
	margin-bottom: 20px;
`;

export const Box = styled.div`
	width: 100%;
	max-width: 430px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 20px;
	margin-bottom: 36px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		margin-left: 0;
	}
`;

export const Content = styled.div`
	height: 25px;
	color: #000;
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
`;

export const EditButton = styled.button`
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
	font-weight: 500;
`;

export const EmailEditBox = styled.div`
	width: auto;
	margin-left: 10px;
	margin-bottom: 20px;
`;

export const InputContainer = styled.div`
	display: flex;
	gap: 7px;
	align-items: center;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-direction: column;
		align-items: flex-start;
		width: 280px;
	}
`;

export const EmailInput = styled.input`
	width: 280px;
	height: 50px;
	border-radius: 10px;
	background: #f5f5f5;
	border: none;
	padding-left: 20px;
	box-sizing: border-box;
	font-family: Pretendard;
	font-size: 15px;
	color: #000;
`;

export const EmailButtonGroup = styled.div`
	display: flex;
	gap: 6px;
	margin-top: 8px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-direction: row;
		width: 100%;
	}
`;

export const NumInput = styled.input`
	height: 50px;
	border-radius: 10px;
	background: #f5f5f5;
	border: none;
	padding-left: 20px;
	box-sizing: border-box;
	font-family: Pretendard;
	font-size: 15px;
	color: #000;
	margin-top: 5px;
`;

export const RequestButton = styled.button`
	width: 70px;
	height: 40px;
	padding: 6px 10px;
	border-radius: 10px;
	background: #3aaf85;
	color: white;
	border: none;
	font-family: Pretendard;
	font-size: 13px;
	cursor: pointer;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 137.5px;
		margin-left: 0;
	}
`;

export const CancelButton = styled.button`
	width: 70px;
	height: 40px;
	padding: 6px 10px;
	border-radius: 10px;
	border: 1px solid #707070;
	background: #fff;
	color: #707070;
	font-family: Pretendard;
	font-size: 13px;
	cursor: pointer;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 137.5px;
	}
`;

export const VerifyButton = styled.button`
	width: 70px;
	height: 40px;
	padding: 6px 10px;
	border-radius: 10px;
	background: #3aaf85;
	color: white;
	border: none;
	font-family: Pretendard;
	font-size: 13px;
	margin-left: 7px;
`;

export const NumInputWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 280px;
`;

export const TimerText = styled.div`
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
	color: #fa7c79;
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
`;

export const ErrorText = styled.div`
	color: #fa7c79;
	font-family: Pretendard;
	font-size: 14px;
	margin-top: 5px;
`;

export const ErrorMessage = styled.p`
	color: var(--sub-rd, #fa7c79);
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;
	margin-top: 5px;
`;

export const PhoneBox = styled.div`
	width: auto;
	display: flex;
	gap: 7px;
	align-items: center;
	margin-left: 10px;
	margin-bottom: 30px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const PhoneInput = styled.input`
	width: 280px;
	height: 50px;
	padding: 16px 20px;
	border-radius: 10px;
	background: #f5f5f5;
	border: none;
	box-sizing: border-box;
`;

export const PhoneButtonGroup = styled.div`
	display: flex;
	gap: 6px;
	margin-top: 8px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-direction: row;
		width: 100%;
	}
`;

export const ConfirmButton = styled.button`
	width: 70px;
	height: 40px;
	padding: 6px 10px;
	border-radius: 10px;
	background: #3aaf85;
	color: white;
	border: none;
	font-family: Pretendard;
	font-size: 13px;
	margin-left: 2px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 137.5px;
	}
`;

export const CancelButton2 = styled.button`
	width: 70px;
	height: 40px;
	padding: 6px 10px;
	border-radius: 10px;
	border: 1px solid #707070;
	background: #fff;
	color: #707070;
	font-family: Pretendard;
	font-size: 13px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 137.5px;
	}
`;

export const BirthButtonGroup = styled.div`
	display: flex;
	gap: 6px;
	margin-top: 8px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		flex-direction: row;
		width: 280px;
	}
`;

export const Bottom = styled.div`
	width: 100%;
	max-width: 464px;
	height: auto;
	margin-top: 18px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 0 20px;
	}
`;

export const CheckBoxContainer1 = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-left: 52px;
`;

export const CustomCheckBox = styled.input.attrs({ type: 'checkbox' })`
	width: 19px;
	height: 19px;
	border-radius: 4px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: #fff;
`;

export const Button = styled.button`
	width: 400px;
	height: 50px;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	border: none;
	color: #fff;
	margin-left: 32px;
	margin-top: 48px;
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 500;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		margin: 30px auto 0 auto;
	}
`;

export const DeleteAccount = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
	text-decoration: underline;
	cursor: pointer;
	margin-top: 20px;
`;

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

export const ModalContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: auto;
	height: auto;
	z-index: 1010;
`;

export const Text1 = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 20px;
	font-weight: 700;
`;
