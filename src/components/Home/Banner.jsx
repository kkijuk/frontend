import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';


const Container = styled.div`
  flex-shrink: 0;
  width: 820px;
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
  border: 1px solid red;
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
  background: #000000;
`;



const settings = {
  /*
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,*/

      dots: true,
      infinite: true,
      arrows: false, //TODO issues with previous arrow on carousel
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 5000
      // ,
      // adaptiveHeight: true

};


export default function Banner({}) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleClick = (url) => {
      if (url) {
          window.open(url, '_blank');
      }
  };

  const handleAfterChange = (current) => {
    console.log("Current slide:", current);
    setCurrentSlide(current);
  };

    return (
        <Container>
            <Slider {...settings} afterChange={handleAfterChange}>
                <BannerSlide onClick={() => handleClick('https://www.instagram.com/kki.juk/')}>
                    <img src="https://i.ibb.co/hXPctnH/Frame-241.png" alt="My Image"></img>
                </BannerSlide>
                <BannerSlide onClick={() => handleClick('https://forms.gle/y3VPjQaWBbVyegwk7')}>
                    <img src="https://i.ibb.co/BgYmmv7/Frame-242.png" alt="My Image"></img>
                </BannerSlide>
                <BannerSlide>
                    <img src="https://i.ibb.co/Y8HdHQH/Frame-243.png" alt="My Image"></img>
                </BannerSlide>
            </Slider>
            <CountPage>
                <CountPageText fontColor='white'>
                    {currentSlide + 1}
                </CountPageText>
                <CountPageText>/</CountPageText>
                <CountPageText>
                    {3}
                </CountPageText>
            </CountPage>

        </Container>
    )
}