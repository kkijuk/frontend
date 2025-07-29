import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../../Axios';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails'; // API 호출을 위해 import
import { Color } from '../../constants/color';

const BackgroundSection = styled.div`
    position: relative;
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${Color.gray06};
    padding: 20px 0;
    min-height: 110vh;  
    box-sizing: border-box;

     @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
     width: 450px;
  }
`;

const ContentSection = styled.div`
    max-width: 820px;
    margin: 0 auto;
    padding: -40px;
    background-color: ${Color.gray06};
    border-radius: 15px;
    margin-top: -50px;
    

`;

const AdListStyled = styled.div`
    padding: 20px;
    border-radius: 10px;
    margin-top: 30px;
`;

const AdItem = styled.div`
    background-color: ${Color.white};
  border: 1px solid ${Color.gray04};
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
    cursor: pointer;
    display: flex;
    flex-direction: column;
`;

const AdDetails = styled.div`
    color: ${Color.gray01};
`;

const AdTitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-top: 12px;
`;

const RecruitTitleForRecruitResult = styled.div`
    color: ${Color.black};
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 5px;
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

const RecruitTitleForReviewResult = styled.div`
    color: ${Color.black};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: -10px;
`;

const ReviewHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 7px;
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-left: 29px;
  }
`;

const ReviewTitle = styled.div`
    color: ${Color.black};
    font-family: Medium;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 5px;
    margin-left: 29px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0px;
    font-size: 16px;
  }
`;

const ReviewContent = styled.div`
   color: ${Color.black};
     font-family: Regular;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 11px;
    margin-left: 29px;

     @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

const ReviewDate = styled.div`
   color: ${Color.gray02};
   text-align: right;
   font-family: Normal;
   line-height: normal;
   margin-top: 5px;
   margin-right: 50px;
   font-size: 14px;
   font-style: normal;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 0;
    margin-left: 0;
    text-align: left;
    font-size: 12px;
    align-self: flex-start;
  }
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 13px;
`;

const Tag = styled.span`
  background: ${Color.gray06};
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 12px;
  color: ${Color.gray02};
`;

const StatusCircleForRecruitResult = styled.span`
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({ status }) => {
         if (status === '미지원') return Color.gray04;
    if (status === '지원 예정') return Color.gray03;
    if (status === '진행 중') return Color.gray02;
    if (status === '합격') return Color.subGn;
    if (status === '불합격') return Color.subRd;
    return Color.gray02;
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
         if (status === '미지원') return Color.gray04;
    if (status === '지원 예정') return Color.gray03;
    if (status === '진행 중') return Color.gray02;
    if (status === '합격') return Color.subGn;
    if (status === '불합격') return Color.subRd;
    return Color.gray02;
    }};
    margin-left: -5px; 
    margin-right: 9px;
    margin-top: -10px;
`;


const DateContainer = styled.div`
    color: ${Color.gray02};
    text-align: right;
    font-size: 12px;
    font-family: Normal;
    line-height: normal;
    margin-left: auto;
    align-self: center;
    padding-right: 15px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 29px;
    margin-top: 4px;
    text-align: left;
    padding-right: 0;
    width: fit-content;
    order: 1; 
  }
`;

const CategoryTitle = styled.div`
    color: ${Color.black};
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;
    margin-top: 20px;
`;

const ReviewDivider = styled.div`
  height: 1px;
   background-color: ${Color.gray04};
  margin: 16px 0 10px 29px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return isMobile;
  };
  
const SearchList = ({ recruits, activeTab, searchTerm, isSearchClicked, onTabChange }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    if (isSearchClicked && (!recruits || recruits.length === 0)) {
        return (
            <BackgroundSection 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', // 기존 UI 유지
                gap: '10px' // 요소 간 간격 추가
            }}
        >
            <p style={{ 
                color: '#707070', 
                fontSize: '16px', 
                marginTop: '-600px' // 검색 결과 없음 메시지만 위로 올리기
            }}>
                ‘{searchTerm}’의 검색 결과가 없어요
            </p>
                <button 
                    onClick={() => navigate('/apply-status')} 
                    style={{ 
                        backgroundColor: Color.main01, 
                        color: 'white', 
                        whiteSpace: 'nowrap', 
                        padding: '7px 45px', 
                        borderRadius: '10px', 
                        border: 'none', 
                        width: '180px',
                        height: '32px',
                        fontSize: '13px', 
                        cursor: 'pointer', 
                        marginTop: '-10px' 
                    }}
                >
                    내 공고 보러가기
                </button>
            </BackgroundSection>
        );
    }

    // 공고와 후기의 개수 계산
    const recruitCount = recruits.filter((recruit) => !recruit.reviews || recruit.reviews.length === 0).length;
    const reviewCount = recruits.reduce((count, recruit) => count + (recruit.reviews ? recruit.reviews.length : 0), 0);

    const handleJobClick = async (ad) => { 
        console.log('Selected ad:', ad);
    
        try {
            // 공고 ID가 있으면 공고 상세 데이터 가져오기
            const response = await api.get(`/recruit/${ad.recruitId}`);
            const fullAdDetails = { 
                ...response.data, 
                id: ad.recruitId, 
                introduceId: response.data.introduceId ?? 0
            };
    
            console.log('Full ad details:', fullAdDetails);
    
            // 공고 상세 페이지로 이동 (공고후기 클릭 시에도 공고 ID를 이용해서 이동)
            navigate(`/apply-detail/${ad.recruitId}`, { state: { job: fullAdDetails } });
    
        } catch (error) {
            console.error('Failed to fetch recruit details:', error);
        }
    };

    return (
        <BackgroundSection>
            <ContentSection>
                <AdListStyled>
                    {/* 공고 제목 표시 */}
                    {activeTab === '전체' && recruitCount > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CategoryTitle>
                            공고 ({recruitCount})
                        </CategoryTitle>
                         <button
                onClick={() => onTabChange?.('공고')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#707070',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                결과 전체보기
              </button>
            </div>
                    )}

                    {/* 공고 리스트 */}
                    {(activeTab === '전체'
  ? recruits.filter((recruit) => !recruit.reviews || recruit.reviews.length === 0).slice(0, 3)
  : recruits.filter((recruit) => !recruit.reviews || recruit.reviews.length === 0)
).map((recruit) => {

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
                           <AdItem key={recruit.recruitId} onClick={() => handleJobClick(recruit)}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <TagContainer>
      {recruit.tags?.map((tag, idx) => (
        <Tag key={idx}>{tag}</Tag>
      ))}
    </TagContainer>

    {/* 데스크탑일 때만 오른쪽 상단에 날짜 표시 */}
    {!isMobile && (
      <DateContainer>
        {formattedStartTime} ~ {formattedEndTime}
      </DateContainer>
    )}
  </div>

  <AdDetails>
    <AdTitleContainer>
      <StatusCircleForRecruitResult status={recruit.status} />
      <RecruitTitleForRecruitResult>
        {recruit.recruitTitle}
      </RecruitTitleForRecruitResult>
    </AdTitleContainer>

    {/* 반응형일 때만 제목 아래 날짜 표시 */}
    {isMobile && (
      <DateContainer style={{ marginTop: '6px', marginLeft: '29px' }}>
        {formattedStartTime} ~ {formattedEndTime}
      </DateContainer>
    )}
  </AdDetails>
</AdItem>

                        );
                    })}

                    {/* 공고후기 제목 표시 */}
                    {activeTab === '전체' && reviewCount > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CategoryTitle>
                            공고후기 ({reviewCount})
                        </CategoryTitle>
                        <button
                onClick={() => onTabChange?.('공고후기')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#707070',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                결과 전체보기
              </button>
            </div>
                    )}

                                        {/* 후기 리스트 */}
                                       {(() => {
  // ✅ [수정된 부분 #1] 전체 탭일 경우, 공고후기(recruit + reviews 포함)에서 상위 3개만 추출
  const reviewRecruits =
    activeTab === '전체'
      ? recruits.filter((recruit) => recruit.reviews && recruit.reviews.length > 0).slice(0, 3)
      : recruits.filter((recruit) => recruit.reviews && recruit.reviews.length > 0); // ✅ [원래대로] 공고후기 탭이면 전체 출력

  // ✅ [수정된 부분 #2] 위에서 추출한 reviewRecruits를 map으로 렌더링
  return reviewRecruits.map((recruit) => {
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
                                      
                                    </DateContainer>
                                </div>
                                <AdDetails>
                                    <AdTitleContainer>
                                        <StatusCircleForReviewResult status={recruit.status} />
                                        <RecruitTitleForReviewResult>
                                            {recruit.recruitTitle}
                                        </RecruitTitleForReviewResult>
                                    </AdTitleContainer>
                                    {recruit.reviews.map((review, index) => (
                                        <div key={recruit.recruitId} onClick={() => handleJobClick(recruit)} style={{ cursor: 'pointer' }}>
                                            {index > 0 && <ReviewDivider />}
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
                    });
})()}
                </AdListStyled>
            </ContentSection>
        </BackgroundSection>
    );
};

export default SearchList;


