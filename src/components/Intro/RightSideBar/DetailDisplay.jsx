import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Color } from "@/constants/color";
import SvgIcon from "@/components/shared/SvgIcon";
import CareerTagSearch from "@/components/chip/CareerTagSearch";
import { readMaster } from "@/api/Intro/master";
import { readIntro } from "@/api/Intro/intro";
import { ViewCareerDetail } from "@/api/Mycareer/ViewCareerDetail";
import { ca } from "date-fns/locale";

const tags = ["동아리", "서비스 기획", "디자인", "개발"]; // 예시 태그

const categoryMapping = {
				ACTIVITY: 'activity',
				PROJECT: 'project',
				EDU: 'edu',
				EMP: 'employment',
				CIRCLE: 'circle',
				COM: 'competition',
				ETC: 'ETC',
			};

// {type: 'activity', id: item.careerId, careerType: item.category}
// 또는 {type: 'intro', id, introKind: isMaster ? 'master' : 'regular'}
const DetailDisplay =({target, onBack}) => {
    
    useEffect(() => {
        console.log('target: ', target);
        const fetchDetail = async () => {
            try{
                if (target.type === 'activity') {
                    const result = await ViewCareerDetail(target.id, categoryMapping[target.careerType.categoryEnName]);
                    console.log('activity result:', result);
                } 
                else if (target.type === 'intro' && target.introKind === 'master') {
                    const result = await readMaster();
                    console.log('master intro result:', result);
                } 
                else if (target.type === 'intro' && target.introKind === 'regular') {
                    const result = await readIntro(target.id);
                    console.log('regular intro result:', result);
                }
            } catch (error) {
                console.error('Error fetching detail:', error);
            }
        };
        fetchDetail();
    }, [target]);

    return(
        <DetailContainer>
            <GoBackWrapper onClick={onBack}>
                <SvgIcon name="Arrow-back" color={Color.gray02} />
                <p>검색 결과</p>
            </GoBackWrapper>
            <DetailHeader>
                <subTitle>앱 서비스 개발 동아리/UMC</subTitle>
                <Title>UMC 6기 디자인 부원 모집</Title>
                <TagDateRow>
                    <TagContainer>
                        {tags.map((tag, index) => (
                            <CareerTagSearch
                                key = {tag}
                                tag = {tag}
                                surface = 'white'
                            />
                        ))}
                    </TagContainer>
                    <Date>2025.03.15</Date>
                </TagDateRow>
            </DetailHeader>
            <DetailBody>
                <QnAWrapper>
                    <Question>이 공고에 지원하려면 어떻게 하나요?</Question>
                    <Answer>지원하려면 아래의 지원 버튼을 클릭하세요.</Answer>
                </QnAWrapper>
                <QnAWrapper>
                    <Question>이 공고에 지원하려면 어떻게 하나요?</Question>
                    <Answer>지원하려면 아래의 지원 버튼을 클릭하세요.</Answer>
                </QnAWrapper>
                <QnAWrapper>
                    <Question>이 공고에 지원하려면 어떻게 하나요?</Question>
                    <Answer>지원하려면 아래의 지원 버튼을 클릭하세요.</Answer>
                </QnAWrapper>
            </DetailBody>
        </DetailContainer>
    )
}

export default DetailDisplay;

const DetailContainer = styled.div`
    width: 100%;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const DetailBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Title = styled.p`
    font-size: 28px;
    font-family: 'Bold';
    color: ${Color.black};
    margin: 0;
`;

const subTitle = styled.p`
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
