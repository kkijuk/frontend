import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Color } from '@/constants/color';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Autoplay 모듈 추가
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//ver2

const Container = styled.div`
	width: 100%; /*820*/
	max-width: 820px;
	height: 88px;

	flex-shrink: 0;
	border-radius: 10px;
	/*	background: ${Color.gray05}; */
	z-index: 1;
	overflow: hidden;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		height: auto;
	}
`;

const BannerImage = styled.img`
	width: 100%; /*820*/
	height: 88px; /*88*/
	object-fit: cover;
	cursor: pointer;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		height: auto; /* 자동으로 비율 유지 */
		aspect-ratio: 820 / 88; /* 비율을 유지해주기 위해 */
	}
`;

const BannerComponent = ({ banners }) => {
	return (
		<Container>
			<Swiper
				speed={500}
				loop={true}
				spaceBetween={0} //SwiperSlide간의 간격
				slidesPerView={1} //Swpier 한 번에 보여지는 slide 갯수
				//navigation //파랑색.. 좌우로 넘기는거
				pagination={{ clickable: true }} //하단에 동그라미로 넘길 수 있게 하는거 클릭 가능하게 하려고 true
				autoplay={{ delay: 3000 }} // 3초마다 자동으로 넘어감
				modules={[Navigation, Pagination, Autoplay]} // Autoplay 모듈 추가
			>
				{banners.map((banner, index) => (
					<SwiperSlide key={index}>
						<BannerImage src={banner.image} alt={`Banner ${index + 1}`} />
					</SwiperSlide>
				))}
			</Swiper>
		</Container>
	);
};

export default BannerComponent;