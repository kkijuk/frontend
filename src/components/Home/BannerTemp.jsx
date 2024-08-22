import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TempBanner from '../../assets/TempBanner.gif';
import { useNavigate } from 'react-router-dom';

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
    font-family: Regular;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
`;

export default function BannerTemp({}) {
    const [currentSlide, setCurrentSlide] = useState(1);
    const navigate = useNavigate();

    const handleClick = () => {
        if (currentSlide === 1) {
            window.open('https://www.instagram.com/kki.juk/', '_blank');
        } else if (currentSlide === 2) {
            window.open('https://forms.gle/y3VPjQaWBbVyegwk7', '_blank');
        } else if (currentSlide === 3) {
            navigate('/signup');
        }
    };

/*     useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => {
                if (prevSlide >= 3) {
                    return 1; // 3이 된 뒤에 1로 초기화
                }
                return prevSlide + 1;
            });
        }, 6000); // 6초마다

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []); */

    useEffect(() => {
        const updateSlide = (newSlide, delay) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    setCurrentSlide(newSlide);
                    resolve();
                }, delay);
            });
        };

        const cycleSlides = async () => {
            await updateSlide(2, 3500); // 3.5초 후에 2로 변경
            await updateSlide(3, 6000); // 6초 후에 3으로 변경
            await updateSlide(1, 6000); // 6초 후에 1로 변경
            await updateSlide(1, 2500); // 2.5초 후에 1로 변경

            // 이후 무한 반복
            setTimeout(cycleSlides, 0); // 사이클 반복
        };

        cycleSlides(); // 사이클 시작
        return () => {
        };
    }, []);

    return (
        <Container>
          <img
                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                src={TempBanner}
                alt="배너"
                onClick={() => handleClick()}
              />
            <CountPage>
                <CountPageText fontColor='white'>
                    {currentSlide}
                </CountPageText>
                <CountPageText>/</CountPageText>
                <CountPageText>
                    {3}
                </CountPageText>
            </CountPage>

        </Container>
    )
}