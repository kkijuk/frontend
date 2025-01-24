import React, { useState } from 'react';
import styled from 'styled-components';
import { quitUser } from '../../api/Mypage/mypage';

const Container = styled.div`
	width: 525px;
	height: 381px;
	flex-shrink: 0;
	border-radius: 10px;
	background: #fff;
	border: 1px solid black;

	display: flex;
	flex-direction: column;
	justify-content: center; /*세로 가운데 오게 해주는거..*/
	align-items: center;

	position: relative; /* CloseButton 위치 기준 */
`;

const CloseButton = styled.div`
	position: absolute; /* 위치를 절대적으로 설정 */
	top: 20px; /* 위쪽에서 20px */
	right: 20px; /* 오른쪽에서 20px */
	width: 20px;
	height: 20px;
	cursor: pointer;

	svg {
		width: 100%;
		height: 100%;
		fill: #999; /* SVG 색상 */
	}
`;
const Title = styled.div`
	color: var(--gray-01, #424242);
	text-align: center;
	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-top: 30px;
`;

const TextContainer = styled.div`
	margin-top: 50px;
`;
const TextBox = styled.div`
	margin-top: 20px;
`;

const Text = styled.div`
	color: #000;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CheckContainer = styled.div`
	display: flex;
	justify-content: center; /*세로 가운데 오게 해주는거..*/
	align-items: center; /*세로 가운데 오게 해주는거..*/

	margin-top: 49px;
	gap: 10px;
`;

const CheckBox = styled.div`
	width: 19px;
	height: 19px;
	flex-shrink: 0;
	border-radius: 2px;
	border: 1px solid #707070;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	svg {
		display: ${(props) => (props.checked ? 'block' : 'none')};
		fill: var(--main-01, #3aaf85);
	}
`;

const CheckText = styled.div`
	color: #000;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
const Button = styled.button`
	width: 425px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: ${(props) => (props.disabled ? 'var(--gray-03, #d9d9d9)' : 'var(--main-01, #3AAF85)')};
	border: none;
	margin-top: 35px;
	color: ${(props) => (props.disabled ? 'var(--gray-02, #707070)' : '#fff')};
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export default function QuitMember({ onClose }) {
	const [isChecked, setIsChecked] = useState(false);

	const toggleCheck = () => {
		setIsChecked(!isChecked); // 체크박스 상태 토글
	};

	const handleQuit = async () => {
		try {
			await quitUser();
			alert('탈퇴 처리가 요청되었습니다. 계정은 7일 이내 삭제되며, 그 전에 로그인하면 취소됩니다.');
			if (onClose) onClose(); // 모달 닫기 콜백
		} catch (error) {
			alert('탈퇴 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	return (
		<Container>
			<CloseButton>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</CloseButton>
			<Title>계정 탈퇴</Title>
			<TextContainer>
				<Text>탈퇴하기 버튼을 클릭하면, 7일 후 회원님의 계정을 탈퇴 처리합니다.</Text>
				<TextBox></TextBox>
				<Text>탈퇴 시점으로부터 7일이 경과하면 기록한 모든 정보는 완전히 삭제되며,</Text>
				<Text>7일 이내에 다시 로그인하면 탈퇴 처리가 취소됩니다.</Text>
			</TextContainer>
			<CheckContainer>
				<CheckBox checked={isChecked} onClick={toggleCheck}>
					<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
						<path d="M16.8889 0H2.11111C0.939444 0 0 0.95 0 2.11111V16.8889C0 18.05 0.939444 19 2.11111 19H16.8889C18.0606 19 19 18.05 19 16.8889V2.11111C19 0.95 18.0606 0 16.8889 0ZM7.38889 14.7778L2.11111 9.5L3.59944 8.01167L7.38889 11.7906L15.4006 3.77889L16.8889 5.27778L7.38889 14.7778Z" />
					</svg>
				</CheckBox>
				<CheckText>탈퇴 시 유의사항을 확인하였으며, 모두 동의합니다.</CheckText>
			</CheckContainer>
			<Button disabled={!isChecked} onClick={handleQuit}>
				탈퇴하기
			</Button>
		</Container>
	);
}
