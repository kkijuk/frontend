import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Autoplay 모듈 추가
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Container = styled.div`
	width: 820px;
	height: 188px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-05, #f1f1f1);
`;

const Banner = styled.div``;

const BannerImage = styled.img`
	width: 820px;
	height: 188px;
	object-fit: cover;
	cursor: pointer;
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
						<a href={banner.url} target="_blank" rel="noopener noreferrer">
							{' '}
							{/* 링크 추가 */}
							<BannerImage src={banner.image} alt={`Banner ${index + 1}`} />
						</a>
					</SwiperSlide>
				))}
			</Swiper>
		</Container>
	);
};

export default BannerComponent;
