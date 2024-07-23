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
      case '아르바이트':
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

  const Circle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => getBackgroundColor(props.category)};
  margin: 0 6px 6px 0;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function CareerCategoryCircle({ category }) {
    return (
        <TagContainer>
          <Circle category={category} />
        </TagContainer>
    );
}
