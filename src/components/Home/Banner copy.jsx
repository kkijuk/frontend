import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Container = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 188px;
  border-radius: 10px;
  border: none;
  background: var(--gray-05, #F1F1F1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const CountPage = styled.div`
    width: 30px;
    height: 18px;
    flex-shrink: 0;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.25);

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const CountPageText = styled.h6`
    color: ${props => props.fontColor || '#707070'};
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
`;

const BannerSlide = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;



const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


export default function Banner({ banners }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(()=>{
      console.log(banners);
    },[]);

    const handleClick = () => {
      if (banners.url) {
          window.open(banners.url, '_blank');
      }
  };

    const handleAfterChange = (current) => {
        setCurrentSlide(current);
      };

    return (
        <Container>
            <Slider {...settings} afterChange={handleAfterChange}>
                {banners.map((banner, index) => (
                <p>hi</p>
                //   <BannerSlide 
                //     key={index} 
                //     // style={{ backgroundImage: `url(${banner.image})` }} 

                //     onClick={() => handleClick(banner.url)}
                // >
                //   <img src='${banner.image}'/>
                // </BannerSlide>
            ))}
            </Slider>
            <CountPage>
                <CountPageText fontColor='white'>
                    {currentSlide + 1}
                </CountPageText>
                <CountPageText>/</CountPageText>
                <CountPageText>
                    {banners.length}
                </CountPageText>
            </CountPage>

        </Container>
    )
}