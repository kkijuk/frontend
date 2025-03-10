import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import OnboardingMain from '../Onboarding/main';
import OnboardingLayout from '../Onboarding/OnboardingLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import MycareerImg from '../../assets/onboarding/onboarding2.png';
import ApplyImg from '../../assets/onboarding/onboarding3.png';
import HistoryImg from '../../assets/onboarding/onboarding4.png';

const BlurContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(4px);
	z-index: 4;
`;

const BaseContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;
	align-items: center; /* ✅ 내부 요소 가운데 정렬 */
	justify-content: center; /* ✅ 내부 요소 수직 중앙 정렬 */
	width: 480px;
	height: 540px;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;
	z-index: 5;

	border: 1px solid black;
`;

const SwiperStyled = styled(Swiper)`
	width: 480px; /*원래 100% height도*/
	height: 540px;

	.swiper-slide {
		opacity: 1 !important; /* ✅ 모든 슬라이드를 똑같이 보이게 설정 */
		z-index: 3 !important; /* ✅ 네 번째 슬라이드만 정상적으로 보이는 문제 방지 */
	}

	/* 페이지네이션 스타일 */
	.swiper-pagination {
		position: absolute;
		bottom: 14px; /* 아래쪽 여백 조절 */
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.swiper-pagination-bullet {
		width: 10px;
		height: 10px;
		background: #d9d9d9; /* 원하는 색상 */
	}

	.swiper-pagination-bullet-active {
		background: #88d1b6; /* 활성화된 페이지네이션 색상 */
	}
`;

const CheckContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	align-self: stretch;

	border: 1px solid black;
`;

const CheckBoxContainer = styled.div`
	display: flex; /* ✅ 가로 정렬 */
	align-items: center; /* ✅ 세로 중앙 정렬 */
	width: auto;
	height: auto;
	gap: 8px;
`;

const CheckBox = styled.div`
	width: 18px;
	height: 18px;

	border-radius: 2px;
	border: 1px solid var(--gray-02, #707070);
	background: var(--white, #fff);
`;

const CheckText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CloseText = styled.div`
	color: var(--white, #fff);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;
`;

export default function OnboardingModal({ onClose }) {
	const [isChecked, setIsChecked] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const swiperRef = useRef(null);

	// 로컬스토리지 확인해서 모달 숨길지 결정
	useEffect(() => {
		const lastClosedDate = localStorage.getItem('hideOnboardingModal');
		const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)
		if (lastClosedDate === today) {
			setIsVisible(false);
		}
	}, []);

	const toggleCheck = () => {
		setIsChecked(!isChecked);
	};

	// 닫기 버튼 클릭 시
	const handleClose = () => {
		if (isChecked) {
			const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 저장
			localStorage.setItem('hideOnboardingModal', today);
		}
		setIsVisible(false);
		onClose?.(); // 필요하면 상위에서 모달 관리
	};

	if (!isVisible) return null; // 모달 숨김

	return (
		<BlurContainer>
			<BaseContainer>
				<SwiperStyled modules={[Pagination]} pagination={{ clickable: true }} slidesPerView={1}>
					{/* 첫 번째 슬라이드 */}
					<SwiperSlide>
						<OnboardingMain onNext={() => swiperRef.current?.slideTo(1)} />
					</SwiperSlide>

					{/* 두 번째 슬라이드 */}
					<SwiperSlide>
						<OnboardingLayout
							title="내커리어"
							contentTitle="내가 그동안 뭐 했더라?"
							contentText1="나중에 정리하느라 허둥지둥하지 말고,"
							contentText2="끼적에 차곡차곡 활동을 쌓아놔요!"
							img={MycareerImg}
							url="https://www.kkijuk.com/mycareer"
						/>
					</SwiperSlide>

					{/* 세 번째 슬라이드 */}
					<SwiperSlide>
						<OnboardingLayout
							title="서류준비"
							contentTitle="이력서? 자기소개서? 너무 어려워..."
							contentText1="내커리어에 적어둔 경험을"
							contentText2="서류에 활용할 수 있게 채워줘요!"
							img={ApplyImg}
							url="https://www.kkijuk.com/history"
						/>
					</SwiperSlide>

					{/* 네 번째 슬라이드 */}
					<SwiperSlide>
						<OnboardingLayout
							title="지원관리"
							contentTitle="저번에 면접 어땠었지?"
							contentText1="여기저기 흩어져 있던 지원 현황과"
							contentText2="잊기 쉬운 전형 후기를 한눈에 확인해요!"
							img={HistoryImg}
							url="https://www.kkijuk.com/apply-schedule"
						/>
					</SwiperSlide>
				</SwiperStyled>
				<CheckContainer>
					<CheckBoxContainer onClick={toggleCheck}>
						<CheckBox checked={isChecked}>
							{isChecked && (
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
									<path
										d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
										fill="#fff"
									/>
								</svg>
							)}
						</CheckBox>
						<CheckText>오늘 하루 보지 않기</CheckText>
					</CheckBoxContainer>
					<CloseText onClick={handleClose}>닫기</CloseText>
				</CheckContainer>
			</BaseContainer>
		</BlurContainer>
	);
}
