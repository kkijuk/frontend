import React from 'react';
import styled from 'styled-components';
import CareerNameTag from '../components/shared/CareerNameTag';

const TimelineBox = styled.div`
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--gray-03, #D9D9D9);
    background-color: white;
    padding: 15px;
    margin-bottom: 50px;
    margin-left: 18px;
`;

const CareerNameT = styled.div`
    margin-left: 23px;
`

const TimelineDate = styled.div`
    color: var(--gray-02, #707070);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

const CareerTimeline = ({ data }) => {
    const careerNames = data.map(item => item.careerName);
    const categories = data.map(item => item.category);
    return (
        <TimelineBox>
            <CareerNameT>
                {careerNames.map((careerName, index) => (
                    <CareerNameTag
                        key={index}
                        careerName={[careerName]}
                        category={categories[index]}
                    />
                ))}
            </CareerNameT>
            <TimelineDate>날짜 들어갈 곳</TimelineDate>
        </TimelineBox>
    );
}

export default CareerTimeline;
