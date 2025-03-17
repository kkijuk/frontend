import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import Slide1 from '../../assets/onboarding/onboarding1.png';
import Slide2 from '../../assets/onboarding/onboarding2.png';
import Slide3 from '../../assets/onboarding/onboarding3.png';
import Slide4 from '../../assets/onboarding/onboarding4.png';

import OnboardingButton from '../shared/OnboardingButton';
import LastButton from '../shared/OnboardingLastButton';

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
	align-items: center;
	justify-content: center;
	width: 480px;
	height: 567px;
	gap: 8px;
	z-index: 5;
`;

const SwiperStyled = styled(Swiper)`
	width: 480px;
	height: 540px;

	.swiper-slide {
		opacity: 1 !important;
		z-index: 3 !important;
	}

	.swiper-pagination {
		position: absolute;
		bottom: 14px;
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.swiper-pagination-bullet {
		width: 10px;
		height: 10px;
		background: #d9d9d9;
	}

	.swiper-pagination-bullet-active {
		background: #88d1b6;
	}
`;

const CheckContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 8px;
`;

const CheckBoxContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	gap: 8px;
`;

const CheckBox = styled.div`
	width: 18px;
	height: 18px;
	display: flex;
	align-items: center;
	justify-content: center;

	${({ isChecked }) =>
		isChecked
			? `
      border: none;
      background: none;
    `
			: `
      border-radius: 2px;
      border: 1px solid var(--gray-02, #707070);
      background: var(--white, #fff);
	  box-sizing: border-box;


    `}
`;

//체크된 상태에서 SVG 아이콘을 렌더링하는 컴포넌트
const CheckedIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
		<path
			d="M0 2C0 0.89543 0.895431 0 2 0H16C17.1046 0 18 0.895431 18 2V16C18 17.1046 17.1046 18 16 18H2C0.89543 18 0 17.1046 0 16V2Z"
			fill="white"
		/>
		<path
			d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
			fill="#707070"
		/>
	</svg>
);

const CheckText = styled.div`
	color: var(--white, #fff);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CloseText = styled.div`
	color: var(--gray-03, #d9d9d9);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;
`;

const SlideImage = styled.img`
	width: 100%;
	height: auto;
`;

export default function OnboardingModal({ onClose }) {
	const [isChecked, setIsChecked] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const swiperRef = useRef(null);

	// `console.log` 추가해서 상태 변화 확인
	const toggleCheck = () => {
		setIsChecked((prev) => {
			console.log('CheckBox 클릭됨. isChecked 상태:', !prev);
			return !prev;
		});
	};

	// 로컬스토리지 확인해서 모달 숨길지 결정
	useEffect(() => {
		const lastClosedDate = localStorage.getItem('hideOnboardingModal');
		const today = new Date().toISOString().split('T')[0];
		if (lastClosedDate === today) {
			setIsVisible(false);
		}
	}, []);

	// 닫기 버튼 클릭 시
	const handleClose = () => {
		if (isChecked) {
			const today = new Date().toISOString().split('T')[0];
			localStorage.setItem('hideOnboardingModal', today);
		}
		setIsVisible(false);
		onClose?.();
	};

	const goToNextSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.slideTo(1); // 0부터 시작하는 인덱스이므로 1 = 두 번째 슬라이드
		}
	};

	if (!isVisible) return null;

	return (
		<BlurContainer>
			<BaseContainer>
				<SwiperStyled
					modules={[Pagination]}
					pagination={{ clickable: true }}
					slidesPerView={1}
					onSwiper={(swiper) => (swiperRef.current = swiper)}>
					<SwiperSlide>
						<SlideImage src={Slide1} alt="온보딩 1" />
						<OnboardingButton onClick={goToNextSlide} />
					</SwiperSlide>

					<SwiperSlide>
						<SlideImage src={Slide2} alt="온보딩 2" />
					</SwiperSlide>

					<SwiperSlide>
						<SlideImage src={Slide3} alt="온보딩 3" />
					</SwiperSlide>

					<SwiperSlide>
						<SlideImage src={Slide4} alt="온보딩 4" />
						<LastButton onClick={handleClose} />
					</SwiperSlide>
				</SwiperStyled>
				<CheckContainer>
					<CheckBoxContainer onClick={toggleCheck}>
						<CheckBox isChecked={isChecked}>{isChecked && <CheckedIcon />}</CheckBox>
						<CheckText>오늘 하루 보지 않기</CheckText>
					</CheckBoxContainer>
					<CloseText onClick={handleClose}>닫기</CloseText>
				</CheckContainer>
			</BaseContainer>
		</BlurContainer>
	);
}
