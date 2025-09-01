import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Color } from "@/constants/color";
import SvgIcon from "@/components/shared/SvgIcon";
import CareerTagSearch from "@/components/chip/CareerTagSearch";
import { readMaster } from "@/api/Intro/master";
import { readIntro } from "@/api/Intro/intro";
import { ViewCareerDetail } from "@/api/Mycareer/ViewCareerDetail";
import useIntroHelperDetail from "@/hooks/Intro/useIntroHelperDetail";
import getColorByCategory from "@/utils/getColorByCategory";

const tags = ["동아리", "서비스 기획", "디자인", "개발"]; // 예시 태그

const DetailDisplay =({target, onBack}) => {
    const {data: vm, isLoading, isError, error} = useIntroHelperDetail(target);

    useEffect(() => {
        if (vm) {
            console.log('상세 조회 결과:', vm);
        }
    }, [vm]);

    //vm이 undefined가 아닐 때만 getColorByCategory 실행
    const rawCategory = vm?.category || ""; 
    const careerColor = getColorByCategory(rawCategory);

    return(
        <DetailContainer>
            <GoBackWrapper onClick={onBack}>
                <SvgIcon name="Arrow-back" color={Color.gray02} />
                <p>검색 결과</p>
            </GoBackWrapper>

            {isLoading && <p>로딩 중...</p>}
            {isError && <p>에러 발생: {error.message}</p>}

            {!isLoading && !isError && vm && (
                <>
                <DetailHeader>
                    {/* 활동 정보('활동기록 검색'에서만 활성화) */}
                    <HeaderForActivity>
                        <SvgIcon name="career-ellipse" size={14} color={careerColor}/>
                        {vm.subTitle ? <SubTitle>{vm.title} / {vm.subTitle}</SubTitle> : null}
                    </HeaderForActivity>

                    {/* 활동기록 제목 or 자기소개서 상세내용 제목 */}
                    {(vm.kind === "intro-master" || vm.kind === "intro-regular") && (
                        <>
                            <Title>{vm.title}</Title>
                            <TagDateRow>
                                <TagContainer>
                                    {vm.tags?.map((tag) => (
                                        <CareerTagSearch
                                            key = {tag}
                                            tag = {tag}
                                            surface = 'white'
                                        />
                                    ))}
                                </TagContainer>
                                <Date>{vm.dateText}</Date>
                            </TagDateRow>
                        </>
                    )}
                </DetailHeader>

                <DetailBody>
                    {vm.kind === "activity" ? (
                        vm.blocks.map((b,i) => (
                            <QnAWrapper key={i}>
                                <Title>{b.title}</Title>
                                <TagDateRow>
                                    <TagContainer>
                                        {b.tags?.map((tag, j) => (
                                            <CareerTagSearch
                                                key={j}
                                                tag={tag}
                                                surface='white'
                                            />
                                        ))}
                                    </TagContainer>
                                    <Date>{b.dateText}</Date>
                                </TagDateRow>
                                <Answer>{b.content}</Answer>
                            </QnAWrapper>
                        ))
                    ) : (
                        vm.qna.map((q, i) => (
                            <QnAWrapper key={i}>
                                <Question>{q.number !== null ? `${q.number}. ${q.title}` : q.title}</Question>
                                <Answer>{q.content}</Answer>
                            </QnAWrapper>
                        ))
                    )}
                
                </DetailBody>
                </>
            )}
        </DetailContainer>
    )
}

export default DetailDisplay;

const DetailContainer = styled.div`
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const GoBackWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    
    color: ${Color.gray02};
    font-size: 16px;
    font-family: 'Regular';

    cursor: pointer;

    & p {
        margin: 0;
    }
`;

const DetailHeader = styled.div`
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const HeaderForActivity = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

const DetailBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
`;

const Title = styled.div`
    font-size: 28px;
    font-family: 'Bold';
    color: ${Color.black};
`;

const SubTitle = styled.p`
    font-size: 12px;
    font-family: 'Regular';
    color: ${Color.gray01};
    margin: 0;
`;

const TagDateRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
`;

const TagContainer = styled.div`
    flex: 1;
    min-width: 0px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    white-space: nowrap;

    /* 옵션: 스크롤바 숨기기 */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`

const Date = styled.p`
    flex: 0 0 auto;
    font-size: 14px;
    font-family: 'Regular';
    color: ${Color.gray02};
    margin: 0;
`;

const QnAWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Question = styled.p`
    font-size: 16px;
    font-family: 'Semi-Bold';
    color: ${Color.black};
    margin: 0;
`;

const Answer = styled.p`
    font-size: 14px;
    font-family: 'Regular';
    color: ${Color.black};
    margin: 0 0 0 16px;
`;
