import React from 'react';
import styled from 'styled-components';

const getBackgroundColor = (category) => {
    let color;
    switch (category) {
        case 1:
            color = '#FCC400';
            break;
        case 2:
            color = '#77AFF2';
            break;
        case 3:
            color = '#BB7AEF';
            break;
        case 4:
            color = '#78D333';
            break;
        case 5:
            color = '#FA7C79';
            break;
        case 6:
            color = '#F99538';
            break;
        case 7:
            color = '#707070';
            break;
        default:
            color = '#707070';
    }
    return color;
};

const Tag = styled.div`
    display: flex;
    height: 22px;
    padding: 0px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    background-color: ${(props) => getBackgroundColor(props.category)};
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 6px;
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default function CareerNameTag({careerName = [], category}) {
    // careerName이 배열인지 확인하고 배열로 변환
    const careerNames = Array.isArray(careerName) ? careerName : [careerName];

    return (
        <TagContainer>
            {careerNames.map((name, index) => (
                <Tag key={index} category={category}>{name}</Tag>
            ))}
        </TagContainer>
    );
}
