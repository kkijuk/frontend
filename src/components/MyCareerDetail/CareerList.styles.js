// src/components/MyCareerDetail/CareerList.styles.js
import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  max-width: 720px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 40px;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    padding: 12px 15px;
    box-sizing: border-box;
  }
`;

export const Title = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Contents = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  p {
    font-family: regular;
    margin: 0;
  }
`;

export const Date = styled.div`
  color: var(--gray-02, #707070);
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TitleDateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Line = styled.div`
  width: 800px;
  height: 2px;
  background: var(--gray-03, #d9d9d9);
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

export const SvgIcon = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 24px;
  right: 40px;
  cursor: pointer;
`;

export const AbilityTagWrapper = styled.div`
  width: 100%;
  padding-right: 40px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-right: 30px;
  }
`;
