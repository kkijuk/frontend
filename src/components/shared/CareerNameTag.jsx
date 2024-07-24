import React from 'react';
import styled from 'styled-components';

const getBackgroundColor = (category) => {
    let color;
    switch (category) {
      case '동아리':
        color = '#FCC400';
        break;
      case '대외활동':
        color = '#77AFF2';
        break;
      case '공모전/대회':
        color = '#BB7AEF';
        break;
      case '프로젝트':
        color = '#78D333';
        break;
      case '아르바이트/인턴':
        color = '#FA7C79';
        break;
      case '교육':
        color = '#F99538';
        break;
      case '기타 활동':
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
    return (
        <TagContainer>
            {careerName.map((careerName, index) => (
                <Tag key={index} category={category}>{careerName}</Tag>
            ))}
        </TagContainer>
    );
}
