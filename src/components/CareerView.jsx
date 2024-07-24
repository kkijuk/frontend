import React from 'react';
import styled from 'styled-components';

const ViewToggleStyled = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ToggleButton = styled.button`
  padding: 8px 10px;
  border-radius: 10px 10px 0px 0px;
  background-color: ${props => (props.active ? '#F1F1F1' : 'white')};
  cursor: pointer;
  border: 2px solid ${props => (props.active ? '#F1F1F1' : 'white')};
  width: 85px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${props => (props.active ? '#3AAF85' : '#707070')}; /* 활성화 상태에 따라 글자 색 변경 */
`;

const ViewTitleContainer = styled.div`
  margin-left: 18px;
`

const ViewTitle = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const CareerView = ({ view, onToggle }) => {
  return (
    <>
    <ViewTitleContainer>
      <ViewTitle>활동 목록</ViewTitle>
    </ViewTitleContainer>
    <ViewToggleStyled>

        <ToggleButton active={view === 'date'} onClick={() => onToggle('date')}>
          시간순
        </ToggleButton>
        <ToggleButton active={view === 'category'} onClick={() => onToggle('category')}>
          분류별
        </ToggleButton>

    </ViewToggleStyled>
    </>
  );
};

export default CareerView;


