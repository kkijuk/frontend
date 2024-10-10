import React from 'react';
import styled from 'styled-components';


const Box = styled.div`
    width: 820px;
    height: 175px;
    flex-shrink: 0;
    /* Box를 가운데 정렬 */
    display: flex;
    justify-content: center; 
    align-items: center; 
    flex-direction: column; /* 세로로 배치 */

    
    border: 1px solid black;
    box-sizing: border-box;
`;

const Filter = styled.div`
    width: 820px;
    height: 145px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--gray-03, #D9D9D9);
    background: var(--white, #FFF);

`;

const FilterReset = styled.div`
    width: 99px;
    height: 20px;
    margin-right: 20px;
    margin-left: 701px;
    flex-shrink: 0;
    background: var(--white, #FFF);
    margin-top: 10px;

    border:1px solid black;
    
    /* 추가된 부분: 가로 중앙 정렬 */
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
`
const ResetIcon = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 5px; /* 아이콘과 텍스트 사이 간격 추가 */
   

    svg {
        width: 100%;
        height: 100%;
    }
`;

const ResetText = styled.div`
    width: 74px;
    height: 20px;
    color: var(--gray-02, #707070);
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    /*세로로 가운데 정렬*/
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
`;
const EmptyBox = styled.div`
    width: 820px;
    height: 17px;
`;

const ContentBox = styled.div`
    width: 789px;
    height: 25px;
    
    box-sizing: border-box;
    border: 1px solid black;
    
    /* ContentBox 사이 간격 18px 추가 */
    &:not(:last-child) {
        margin-bottom: 18px;
;`

const TitleText = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 31px;
    margint-right: 40px; 오른쪽에 40픽셀 떨어뜨리고 다른 내용 넣어주기
`;

export default function SearchFilter(){
    return(
        <Box>
            <Filter>
                <EmptyBox></EmptyBox>
                <ContentBox>
                    <TitleText>대상</TitleText>
                </ContentBox>
                <ContentBox>
                    <TitleText>정렬</TitleText>
                </ContentBox>
                <ContentBox>
                    <TitleText>기간</TitleText>
                </ContentBox>
                <EmptyBox></EmptyBox>
            </Filter>
            <FilterReset>
            <ResetIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                        <path d="M11.9985 7.00146H16.8569V2.14307" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.8301 11.8301C16.4273 13.3337 15.5395 14.6623 14.3046 15.6099C13.0697 16.5574 11.5566 17.0711 10 17.0711C8.44342 17.0711 6.93033 16.5574 5.69541 15.6099C4.46049 14.6623 3.57275 13.3337 3.16987 11.8301C2.767 10.3266 2.87151 8.73212 3.46719 7.29402C4.06286 5.85592 5.11642 4.65457 6.46447 3.87628C7.81251 3.09798 9.37969 2.78625 10.923 2.98943C12.4662 3.1926 13.8993 3.89933 15 5" stroke="#707070" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </ResetIcon> 
                <ResetText>필터 초기화</ResetText>
            </FilterReset>
        </Box>
    )
}
