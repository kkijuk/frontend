import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../api/Home/getUserInfo';

const Container = styled.div`
	flex-shrink: 0;
	width: 240px;
	height: 160px;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const TextContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 12px;
	margin-bottom: 0;

	color: var(--black, #000);
	text-align: center;
	font-family: Regular;
	font-size: 14px;
	font-style: normal;
`;

const BoldText = styled.h5`
	color: var(--black, #000);
	font-family: Bold;
	font-size: ${(props) => props.fontSize || '14px'};
	font-style: normal;
	margin: 0;
`;

const GreenSpan = styled.span`
	color: #3aaf85;
`;

const BoxContainer = styled.div`
	flex-shrink: 0;
	width: 100%;
	height: 50px;
	display: flex;
	margin-top: 9px;
	margin-bottom: 10px;
	gap: 10px;
	align-items: center;
	justify-content: center;
	align-items: center;
`;

const CountBox = styled.div`
	width: 105px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);
	align-items: center;

	display: flex;
	width: 105px;
	height: 50px;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	color: var(--black, #000);
	text-align: center;
	font-family: Regular;
	font-size: 12px;
	font-style: normal;
	line-height: normal;
	cursor: pointer;
`;

const OKButton = styled.button`
	width: 220px;
	height: 30px;
	flex-shrink: 0;
	border: none;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	margin-bottom: 8px;

	color: var(--white, #fff);
	text-align: center;
	font-family: Bold;
	font-size: 12px;
	font-style: normal;
	line-height: normal;

	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&:hover {
		background-color: #35a576;
	}
`;

const LoginButton = styled.button`
	width: 220px;
	height: 30px;
	flex-shrink: 0;
	border: none;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	margin-bottom: 8px;
	margin-top: 20px;

	color: var(--white, #fff);
	text-align: center;
	font-family: Bold;
	font-size: 12px;
	font-style: normal;
	line-height: normal;

	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&:hover {
		background-color: #35a576;
	}
`;

const SignupButton = styled.button`
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Regular;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	border: none;
	background: none;
	cursor: pointer;
`;

export default function LoginProfileBox() {
	const navigate = useNavigate();
	const [userName, setUserName] = useState('');
	const [monthDuration, setMonthDuration] = useState(0);
	const [careerCount, setCareerCount] = useState(0);
	const [recruitCount, setRecruitCount] = useState(0);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo();
				if (data) {
					setUserName(data.userName);
					setMonthDuration(data.monthDuration);
					setCareerCount(data.careerCount);
					setRecruitCount(data.recruitCount);
				} else {
					console.error('Failed to fetch data');
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchUserInfo();
	}, []);

	const goCareer = () => {
		window.scrollTo(0, 0);
		navigate('/mycareer');
	};

	const goCareerAdd = () => {
		window.scrollTo(0, 0);
		navigate('/mycareer', { state: { showModal: true } });
	};

	const goApply = () => {
		window.scrollTo(0, 0);
		navigate('/apply-status');
	};

	return (
		<Container>
			<TextContainer>
				안녕하세요 {userName} 님,
				<BoldText>
					<GreenSpan>끼적</GreenSpan>한 지 {monthDuration}개월이 지났어요!
				</BoldText>
			</TextContainer>
			<BoxContainer>
				<CountBox onClick={goCareer}>
					내 활동
					<BoldText fontSize="12px">{careerCount}</BoldText>
				</CountBox>
				<CountBox onClick={goApply}>
					지원현황
					<BoldText fontSize="12px">{recruitCount}</BoldText>
				</CountBox>
			</BoxContainer>
			<OKButton onClick={goCareerAdd}>활동 추가하기</OKButton>
		</Container>
	);
}