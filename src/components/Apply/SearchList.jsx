import React from 'react';
import styled from 'styled-components';

const BackgroundSection = styled.div`
    position: relative;
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f0f0f0;
    padding: 20px 0;
    box-sizing: border-box;
`;

const ContentSection = styled.div`
    max-width: 820px;
    margin: 0 auto;
    padding: -40px;
    background-color: #f0f0f0;
    border-radius: 15px;
    margin-top: -40px;
`;

const AdListStyled = styled.div`
    padding: 20px;
    border-radius: 10px;
    margin-top: 30px;
`;

const AdItem = styled.div`
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
    cursor: pointer;
    display: flex;
    flex-direction: column;
`;

const AdDetails = styled.div`
    color: #555;
`;

const AdTitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-top: 12px;
`;

const RecruitTitleForRecruitResult = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 5px;
`;

const RecruitTitleForReviewResult = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: -41px;
`;

const ReviewHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 7px;
`;

const ReviewTitle = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 5px;
    margin-left: 29px;
`;

const ReviewContent = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 11px;
    margin-left: 29px;
`;

const ReviewDate = styled.div`
   color: var(--gray-02, #707070);
   text-align: right;
   font-family: Normal;
   line-height: normal;
   margin-top: 5px;
   margin-right: 50px;
   font-size: 14px;
   font-style: normal;
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 13px;
`;

const Tag = styled.span`
    background: #f5f5f5;
    border-radius: 10px;
    padding: 4px 8px;
    font-size: 12px;
    color: #707070;
`;

const StatusCircleForRecruitResult = styled.span`
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({ status }) => {
        if (status === 'UNAPPLIED') return '#D9D9D9';
        if (status === 'PLANNED') return '#B0B0B0';
        if (status === 'APPLYING') return '#707070';
        if (status === 'ACCEPTED') return '#78D333';
        if (status === 'REJECTED') return '#FA7C79';
        return '#707070';
    }};
    margin-right: 10px; 
    margin-top: 5px;
`;

const StatusCircleForReviewResult = styled.span`
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({ status }) => {
        if (status === 'UNAPPLIED') return '#D9D9D9';
        if (status === 'PLANNED') return '#B0B0B0';
        if (status === 'APPLYING') return '#707070';
        if (status === 'ACCEPTED') return '#78D333';
        if (status === 'REJECTED') return '#FA7C79';
        return '#707070';
    }};
    margin-left: -5px; 
    margin-right: 9px;
    margin-top: -41px;
`;


const DateContainer = styled.div`
    color: var(--gray-02, #707070);
    text-align: right;
    font-size: 12px;
    font-family: Normal;
    line-height: normal;
    margin-left: auto;
    align-self: center;
    padding-right: 15px;
`;

const CategoryTitle = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;
    margin-top: 20px;
`;

const SearchList = ({ recruits, activeTab }) => {
    if (!recruits || recruits.length === 0) {
        return (
            <BackgroundSection>
                {/* 검색 결과가 없을 때 UI 처리 없어도 될듯,,*/}
            </BackgroundSection>
        );
    }

    // 공고와 후기의 개수 계산
    const recruitCount = recruits.filter((recruit) => !recruit.reviews || recruit.reviews.length === 0).length;
    const reviewCount = recruits.reduce((count, recruit) => count + (recruit.reviews ? recruit.reviews.length : 0), 0);

    return (
        <BackgroundSection>
            <ContentSection>
                <AdListStyled>
                    {/* 공고 제목 표시 */}
                    {activeTab === '전체' && recruitCount > 0 && (
                        <CategoryTitle>
                            공고 ({recruitCount})
                        </CategoryTitle>
                    )}

                    {/* 공고 리스트 */}
                    {recruits.map((recruit) => {
                        if (recruit.reviews && recruit.reviews.length > 0) return null;

                        const formattedStartTime = new Date(recruit.startTime).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        });
                        const formattedEndTime = new Date(recruit.endTime).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        });

                        return (
                            <AdItem key={recruit.recruitId}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <TagContainer>
                                        {recruit.tags &&
                                            recruit.tags.map((tag, tagIdx) => (
                                                <Tag key={tagIdx}>{tag}</Tag>
                                            ))}
                                    </TagContainer>
                                    <DateContainer>
                                        {formattedStartTime} ~ {formattedEndTime}
                                    </DateContainer>
                                </div>

                                <AdDetails>
                                    <AdTitleContainer>
                                        <StatusCircleForRecruitResult status={recruit.status} />
                                        <RecruitTitleForRecruitResult>
                                            {recruit.recruitTitle}
                                        </RecruitTitleForRecruitResult>
                                    </AdTitleContainer>
                                </AdDetails>
                            </AdItem>
                        );
                    })}

                    {/* 공고후기 제목 표시 */}
                    {activeTab === '전체' && reviewCount > 0 && (
                        <CategoryTitle>
                            공고후기 ({reviewCount})
                        </CategoryTitle>
                    )}

                                        {/* 후기 리스트 */}
                                        {recruits.map((recruit) => {
                        if (!recruit.reviews || recruit.reviews.length === 0) return null;

                        const formattedStartTime = new Date(recruit.startTime).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        });
                        const formattedEndTime = new Date(recruit.endTime).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        });

                        return (
                            <AdItem key={recruit.recruitId}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <TagContainer>
                                        {recruit.tags &&
                                            recruit.tags.map((tag, tagIdx) => (
                                                <Tag key={tagIdx}>{tag}</Tag>
                                            ))}
                                    </TagContainer>
                                    <DateContainer>
                                        {formattedStartTime} ~ {formattedEndTime}
                                    </DateContainer>
                                </div>
                                <AdDetails>
                                    <AdTitleContainer>
                                        <StatusCircleForReviewResult status={recruit.status} />
                                        <RecruitTitleForReviewResult>
                                            {recruit.recruitTitle}
                                        </RecruitTitleForReviewResult>
                                    </AdTitleContainer>
                                    {recruit.reviews.map((review) => (
                                        <div key={review.reviewId}>
                                            <ReviewHeader>
                                                <ReviewTitle>{review.reviewTitle}</ReviewTitle>
                                                <ReviewDate>{review.reviewDate}</ReviewDate>
                                            </ReviewHeader>
                                            <ReviewContent>{review.reviewContent}</ReviewContent>
                                        </div>
                                    ))}
                                </AdDetails>
                            </AdItem>
                        );
                    })}
                </AdListStyled>
            </ContentSection>
        </BackgroundSection>
    );
};

export default SearchList;


